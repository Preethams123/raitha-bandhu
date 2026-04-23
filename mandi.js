// ─── MANDI PAGE LOGIC ───────────────────────────────────────────
let isShowingAll = false;
let summaryFilterState = 'all';
const PAGINATION_LIMIT = 12;

function setSummaryFilter(state) {
  summaryFilterState = state;
  isShowingAll = false;
  renderMandi();
}

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  populateCategoryFilter();
  checkURLCategory();
  
  // Set explicit dynamic date
  const pageSub = document.querySelector(".hero-sub, .page-sub");
  if (pageSub) {
    const dObj = new Date();
    const dateStr = tDate(dObj, true);
    pageSub.textContent = `${t('live_prices_for')} ${dateStr} — ${t('mandi_page_sub').split('—')[1]}`;
  }
  
  renderMandi();
  bindFilters();
});

function populateCategoryFilter() {
  const sel = document.getElementById("catFilter");
  if (!sel) return;
  const cats = [...new Set(CROPS.map(c => c.category))];
  cats.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = `• ${categoryName(cat)}`;
    sel.appendChild(opt);
  });
}

function checkURLCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat) {
    const sel = document.getElementById("catFilter");
    if (sel) sel.value = cat;
  }
}

function getFilteredSorted() {
  const search = document.getElementById("mandiSearch")?.value.trim().toLowerCase() || "";
  const cat = document.getElementById("catFilter")?.value || "";
  const season = document.getElementById("seasonFilter")?.value || "";
  const sort = document.getElementById("sortFilter")?.value || "price-desc";

  let crops = CROPS.filter(c => {
    if (search && !c.name.toLowerCase().includes(search)) return false;
    if (cat && c.category !== cat) return false;
    if (season && c.season !== season) return false;
    return true;
  });

  crops.sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.todayPrice - b.todayPrice;
      case "price-desc": return b.todayPrice - a.todayPrice;
      case "name-asc": return a.name.localeCompare(b.name);
      case "trending-up": return (b.todayPrice - b.yesterdayPrice) - (a.todayPrice - a.yesterdayPrice);
      case "trending-down": return (a.todayPrice - a.yesterdayPrice) - (b.todayPrice - b.yesterdayPrice);
      case "risk-low": {
        const riskOrder = { Low: 0, Medium: 1, High: 2 };
        return riskOrder[calculateRisk(a)] - riskOrder[calculateRisk(b)];
      }
      default: return b.todayPrice - a.todayPrice;
    }
  });

  return crops;
}

function renderMandi() {
  const grid = document.getElementById("mandiGrid");
  const pag = document.getElementById("mandiPagination");
  if (!grid) return;

  const baseCrops = getFilteredSorted();
  updateSummary(baseCrops);
  grid.innerHTML = "";
  if (pag) pag.innerHTML = "";

  // Apply summary toggle filter
  let displayCrops = baseCrops;
  if (summaryFilterState === 'rising') displayCrops = baseCrops.filter(c => c.todayPrice > c.yesterdayPrice);
  else if (summaryFilterState === 'falling') displayCrops = baseCrops.filter(c => c.todayPrice < c.yesterdayPrice);
  else if (summaryFilterState === 'balanced') displayCrops = baseCrops.filter(c => c.todayPrice === c.yesterdayPrice);

  if (displayCrops.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-icon">🌾</div>
        <p>${t('empty_mandi')}</p>
      </div>
    `;
    return;
  }

  const tDateObj = new Date();
  const yDateObj = new Date(tDateObj);
  yDateObj.setDate(yDateObj.getDate() - 1);
  const tStr = tDate(tDateObj);
  const yStr = tDate(yDateObj);

  const cropsToRender = isShowingAll ? displayCrops : displayCrops.slice(0, PAGINATION_LIMIT);

  const user = getSession();
  const mandiName = user ? user.mandi : null;

  cropsToRender.forEach(crop => {
    const todayP = getMandiPrice(crop, mandiName);
    const yestP  = getMandiPrice({ ...crop, todayPrice: crop.yesterdayPrice }, mandiName);
    const diff   = todayP - yestP;
    const pct    = ((diff / yestP) * 100).toFixed(1);
    const trend  = diff > 0 ? { cls: "up", arrow: "↑" } : diff < 0 ? { cls: "down", arrow: "↓" } : { cls: "flat", arrow: "→" };
    
    const risk = calculateRisk(crop);
    const profit = calculateProfit(crop).toFixed(1);

    const riskDotColor = risk === "Low" ? "#4caf50" : risk === "Medium" ? "#ff9800" : "#f44336";

    const card = document.createElement("div");
    card.className = "mandi-card";
    card.setAttribute("data-id", crop.id);
    card.style.backgroundImage = `url('${getCropImageUrl(crop.name)}')`;

    card.innerHTML = `
      <div class="card-content" style="padding: 16px;">
        <div class="mc-header">
          <div class="mc-info">
            <div class="mc-name">${cropName(crop)} ${mandiName ? '<span style="font-size:10px; opacity:0.6;">📍 '+mandiName+'</span>' : ''}</div>
            <div class="mc-cat">${categoryIcon(crop.category)} ${categoryName(crop.category)} · ${seasonName(crop.season)}</div>
          </div>
        </div>

        <div class="mc-prices">
          <div class="mc-today">
            <div class="mc-price-label">${t('live_price')} (${tStr})</div>
            <div class="mc-price-val">₹${todayP.toLocaleString()}<span class="mc-price-unit">${t('per_qtl')}</span></div>
          </div>
          <div class="mc-yesterday">
            <div class="mc-price-label">${t('past_price')} (${yStr})</div>
            <div class="mc-price-val muted">₹${yestP.toLocaleString()}<span class="mc-price-unit">${t('per_qtl')}</span></div>
          </div>
        </div>

        <div class="mc-footer">
          <span class="mc-change ${trend.cls}">
            <span class="price-trend ${trend.cls}">${trend.arrow}</span> ₹${Math.abs(diff)} (${Math.abs(pct)}%)
          </span>
          <span class="${parseFloat(profit) >= 0 ? 'profit-pos' : 'profit-neg'}">
            ${t('yearly_profit')}: ${parseFloat(profit) >= 0 ? '+' : ''}${profit}%
          </span>
        </div>

        <div class="mc-demand">
          <span class="demand-label">${t('demand')}: ${crop.demandScore}% &nbsp;|&nbsp; <span class="risk-badge ${riskClass(risk)}">${t(risk === 'Low' ? 'low_risk' : risk === 'Medium' ? 'medium_risk' : 'high_risk')}</span></span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      saveRecentCrop(crop.id);
      window.location.href = `crop.html?id=${crop.id}`;
    });

    grid.appendChild(card);
  });

  if (pag && displayCrops.length > PAGINATION_LIMIT) {
    const btn = document.createElement("button");
    btn.className = "btn-pagination";
    btn.innerHTML = isShowingAll ? t('show_less') : `${t('show_all')} ${displayCrops.length} ${t('crops')} ↓`;
    btn.onclick = () => {
      isShowingAll = !isShowingAll;
      renderMandi();
      if (!isShowingAll) {
        // Scroll back up elegantly
        window.scrollTo({ top: grid.offsetTop - 80, behavior: "smooth" });
      }
    };
    pag.appendChild(btn);
  }
}

function updateSummary(crops) {
  const sum = document.getElementById("mandiSummary");
  if (!sum) return;
  const total = crops.length;
  const gainers = crops.filter(c => c.todayPrice > c.yesterdayPrice).length;
  const losers = crops.filter(c => c.todayPrice < c.yesterdayPrice).length;
  const balanced = crops.filter(c => c.todayPrice === c.yesterdayPrice).length;
  const avg = total > 0 ? Math.round(crops.reduce((s, c) => s + c.todayPrice, 0) / total) : 0;

  sum.innerHTML = `
    <div class="mandi-stat-card msc-blue ${summaryFilterState === 'all' ? 'active-summary' : ''}" onclick="setSummaryFilter('all')">
      <div class="ms-icon">📋</div>
      <div class="ms-info">
        <div class="ms-val">${total}</div>
        <div class="ms-label" data-i18n="summary_total">${t('summary_total')}</div>
      </div>
    </div>
    <div class="mandi-stat-card msc-green ${summaryFilterState === 'rising' ? 'active-summary' : ''}" onclick="setSummaryFilter('rising')">
      <div class="ms-icon">📈</div>
      <div class="ms-info">
        <div class="ms-val">${gainers}</div>
        <div class="ms-label">${t('summary_rising')}</div>
      </div>
    </div>
    <div class="mandi-stat-card msc-purple ${summaryFilterState === 'balanced' ? 'active-summary' : ''}" onclick="setSummaryFilter('balanced')">
      <div class="ms-icon">⚖️</div>
      <div class="ms-info">
        <div class="ms-val">${balanced}</div>
        <div class="ms-label">${t('summary_stable')}</div>
      </div>
    </div>
    <div class="mandi-stat-card msc-red ${summaryFilterState === 'falling' ? 'active-summary' : ''}" onclick="setSummaryFilter('falling')">
      <div class="ms-icon">📉</div>
      <div class="ms-info">
        <div class="ms-val">${losers}</div>
        <div class="ms-label">${t('summary_falling')}</div>
      </div>
    </div>
    <div class="mandi-stat-card msc-orange">
      <div class="ms-icon">💰</div>
      <div class="ms-info">
        <div class="ms-val">₹${avg.toLocaleString()}</div>
        <div class="ms-label">${t('summary_avg')}</div>
      </div>
    </div>
  `;
}

function bindFilters() {
  ["mandiSearch", "catFilter", "seasonFilter", "sortFilter"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(id === "mandiSearch" ? "input" : "change", () => {
      isShowingAll = false;
      summaryFilterState = 'all';
      renderMandi();
    });
  });
}

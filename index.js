// ─── INDEX PAGE LOGIC ───────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  setHeroQuote();
  initLiveDataWidgets();
  renderBestCrops();
  renderRecentCrops();
  renderCategories();
});

function setHeroQuote() {
  const quoteEl = document.getElementById("heroQuote");
  if (quoteEl) {
    quoteEl.textContent = `"${getRandomQuote()}"`;
  }
}

// ─── LIVE DATA WIDGETS ──────────────────────────────────────────

async function initLiveDataWidgets() {
  const dash = document.getElementById("liveDashboard");
  if (!dash) return;
  
  const month = new Date().getMonth();
  let seasonKey = "season_zaid";
  if (month >= 5 && month <= 9) seasonKey = "season_kharif";
  else if (month >= 10 || month <= 1) seasonKey = "season_rabi";
  
  dash.innerHTML = `
    <div class="live-widget">
      <div class="live-widget-icon">📅</div>
      <div>
        <div class="live-widget-title">${t('active_season')}</div>
        <div class="live-widget-val">${t(seasonKey)}</div>
        <div class="live-widget-sub">
          <span class="pulse-dot"></span>
          ${getCurrentLang() === 'kn' ? 'ನೇರ ಋತು' : 'Live Season'}
        </div>
      </div>
    </div>
    <div class="live-widget" id="weatherWidget">
      <div class="live-widget-icon">☁️</div>
      <div>
        <div class="live-widget-title">${t('live_weather')}</div>
        <div class="live-widget-val">...</div>
      </div>
    </div>
  `;
  
  try {
    // Open-Meteo Free API (Bangalore/Karnataka Default)
    const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=12.97&longitude=77.59&current=temperature_2m,precipitation&timezone=Asia%2FKolkata");
    const data = await res.json();
    const temp = data.current.temperature_2m;
    const precip = data.current.precipitation;
    const icon = precip > 0 ? "🌧️" : temp > 30 ? "☀️" : "⛅";
    
    const user = (typeof getSession === "function") ? getSession() : null;
    const locationLabel = (user && user.location) ? user.location : "Karnataka";

    document.getElementById("weatherWidget").innerHTML = `
      <div class="live-widget-icon">${icon}</div>
      <div>
        <div class="live-widget-title">${locationLabel}</div>
        <div class="live-widget-val">${temp}°C</div>
        <div class="live-widget-sub">
          <span class="pulse-dot"></span>
          ${getCurrentLang() === 'kn' ? 'ಇಂದಿನ ವರದಿ' : 'Daily Report'}
        </div>
      </div>
    `;
  } catch(e) {
    console.error("Weather load failed", e);
  }
}

// ─── BEST CROPS GRID ────────────────────────────────────────────

function renderBestCrops() {
  const grid = document.getElementById("bestGrid");
  if (!grid) return;

  const user = getSession();
  const mandiName = user ? user.mandi : null;
  const best = getBestCrops();
  grid.innerHTML = "";

  best.forEach((crop, i) => {
    const todayP = getMandiPrice(crop, mandiName);
    const yestP  = getMandiPrice({ ...crop, todayPrice: crop.yesterdayPrice }, mandiName);
    const diff   = todayP - yestP;
    const trend  = diff > 0 ? { cls: "up", arrow: "↑" } : diff < 0 ? { cls: "down", arrow: "↓" } : { cls: "flat", arrow: "→" };
    
    const risk = calculateRisk(crop);
    const profit = calculateProfit(crop).toFixed(1);

    const card = document.createElement("div");
    card.className = "crop-card";
    card.setAttribute("data-id", crop.id);
    card.style.backgroundImage = `url('${getCropImageUrl(crop.name)}')`;

    card.innerHTML = `
      <div class="card-rank">#${i + 1}</div>
      <div class="card-content">
        <div class="card-name">${cropName(crop)} ${mandiName ? '<span style="font-size:10px; opacity:0.6;">📍 '+mandiName+'</span>' : ''}</div>
        <div class="card-cat">${categoryIcon(crop.category)} ${categoryName(crop.category)}</div>
        <div class="card-price">
          <span class="price-val">₹${todayP.toLocaleString()}</span>
          <span class="price-unit">${t('per_qtl')}</span>
          <span class="price-trend ${trend.cls}">${trend.arrow}</span>
        </div>
        <div class="card-meta">
          <span class="risk-badge ${riskClass(risk)}">${t(risk === 'Low' ? 'low_risk' : risk === 'Medium' ? 'medium_risk' : 'high_risk')}</span>
          <span class="${parseFloat(profit) >= 0 ? 'profit-pos' : 'profit-neg'}">${parseFloat(profit) >= 0 ? '+' : ''}${profit}%</span>
        </div>
        <div class="card-score">${t('smart_score_label') || 'Smart Score'}: ${Math.round(calculateScore(crop))}</div>
      </div>
    `;

    card.addEventListener("click", () => {
      saveRecentCrop(crop.id);
      window.location.href = `crop.html?id=${crop.id}`;
    });

    grid.appendChild(card);
  });
}

// ─── RECENTLY VIEWED GRID ────────────────────────────────────────

function renderRecentCrops() {
  const grid = document.getElementById("recentGrid");
  const hint = document.getElementById("recent-hint");
  if (!grid) return;

  const recent = getRecentCrops();
  grid.innerHTML = "";

  if (recent.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>${t('section_recent_hint')}</p>
      </div>
    `;
    return;
  }

  if (hint) hint.textContent = `${recent.length} ${t('viewed_recently')}`;

  recent.forEach(crop => {
    const trend = trendArrow(crop);
    const risk = calculateRisk(crop);

    const card = document.createElement("div");
    card.className = "crop-card";
    card.setAttribute("data-id", crop.id);
    card.style.backgroundImage = `url('${getCropImageUrl(crop.name)}')`;

    card.innerHTML = `
      <div class="card-content">
        <div class="card-name">${cropName(crop)}</div>
        <div class="card-cat">${categoryIcon(crop.category)} ${categoryName(crop.category)}</div>
        <div class="card-price">
          <span class="price-val">₹${crop.todayPrice.toLocaleString()}</span>
          <span class="price-unit">${t('per_qtl')}</span>
          <span class="price-trend ${trend.cls}">${trend.arrow}</span>
        </div>
        <div class="card-meta">
          <span class="risk-badge ${riskClass(risk)}">${t(risk === 'Low' ? 'low_risk' : risk === 'Medium' ? 'medium_risk' : 'high_risk')}</span>
          <span class="season-tag">${seasonName(crop.season)}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      saveRecentCrop(crop.id);
      window.location.href = `crop.html?id=${crop.id}`;
    });

    grid.appendChild(card);
  });
}

// ─── CATEGORIES ─────────────────────────────────────────────────

function renderCategories() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;

  const categories = [...new Set(CROPS.map(c => c.category))];
  
  categories.forEach(cat => {
    const count = CROPS.filter(c => c.category === cat).length;
    const div = document.createElement("div");
    div.className = "cat-card";
    div.style.backgroundImage = `url('${getCropImageUrl(cat + " harvest field")}')`;

    div.innerHTML = `
      <div class="cat-icon">${categoryIcon(cat)}</div>
      <div class="cat-name">${categoryName(cat)}</div>
      <div class="cat-count">${count} ${t('crops_word') || 'crops'}</div>
    `;

    div.addEventListener("click", () => {
      window.location.href = `mandi.html?cat=${encodeURIComponent(cat)}`;
    });

    grid.appendChild(div);
  });
}

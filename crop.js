// ─── CROP DETAIL PAGE ───────────────────────────────────────────

let priceChart = null;
let demandChart = null;
let currentCrop = null;
let showing30 = true;

document.addEventListener("DOMContentLoaded", () => {
  initSearch();

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.querySelector(".detail-layout").innerHTML =
      `<div class="empty-state" style="margin:60px auto"><div class="empty-icon">❌</div><p>No crop selected. <a href="index.html" style="color:var(--green)">Go back to Home</a></p></div>`;
    return;
  }

  const crop = getCropById(id);
  if (!crop) {
    document.querySelector(".detail-layout").innerHTML =
      `<div class="empty-state" style="margin:60px auto"><div class="empty-icon">❌</div><p>Crop not found. <a href="index.html" style="color:var(--green)">Go back to Home</a></p></div>`;
    return;
  }

  currentCrop = crop;
  saveRecentCrop(crop.id);
  
  // Apply Background Image to Hero
  const heroEl = document.querySelector(".detail-hero");
  if(heroEl) {
    heroEl.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('${getCropImageUrl(crop.name)}')`;
  }

  renderCropDetail(crop);
  renderCharts(crop, true);
  renderCropInfo(crop);
  renderHybrids(crop);
  renderDiseases(crop);
  renderDistrictInsights(crop);
  renderSellInsights(crop);
  renderGrowingStatus(crop);
  renderRecommendation(crop);
  renderAdvancedRisk(crop);
  renderSeedStats(crop);
  renderAlternatives(crop);

  // Chart tab toggle
  document.getElementById("tab30").addEventListener("click", () => {
    if (showing30) return;
    showing30 = true;
    document.getElementById("tab30").classList.add("active");
    document.getElementById("tab12").classList.remove("active");
    renderCharts(crop, true);
  });

  document.getElementById("tab12").addEventListener("click", () => {
    if (!showing30) return;
    showing30 = false;
    document.getElementById("tab12").classList.add("active");
    document.getElementById("tab30").classList.remove("active");
    renderCharts(crop, false);
  });
});

// ─── CROP HERO ───────────────────────────────────────────────────

function renderCropDetail(crop) {
  const appName = t('app_name');
  document.title = `${cropName(crop)} — ${appName}`;
  const pt = document.getElementById("pageTitle");
  if (pt) pt.textContent = `${cropName(crop)} — ${appName}`;

  // MANDI AWARE PRICING (NEW)
  const user = getSession();
  const mandiName = user ? user.mandi : null;
  const mandiToday = getMandiPrice(crop, mandiName);
  const mandiYest  = getMandiPrice({ ...crop, todayPrice: crop.yesterdayPrice }, mandiName);
  const diff = mandiToday - mandiYest;
  const pct = ((diff / mandiYest) * 100).toFixed(1);
  const trend = diff > 0 ? { cls: "up", arrow: "↑" } : diff < 0 ? { cls: "down", arrow: "↓" } : { cls: "flat", arrow: "→" };

  const yStr = tDate(new Date(Date.now() - 86400000));
  const vsLabel = getCurrentLang() === 'kn' ? 'ಗೆ ಹೋಲಿಸಿದರೆ' : 'vs';

  document.getElementById("cropIcon").innerHTML = `<img src="${getCropImageUrl(crop.name)}" alt="${crop.name}" class="dh-crop-img">`;
  document.getElementById("cropName").textContent = cropName(crop);
  document.getElementById("cropCat").textContent = `${categoryName(crop.category)}`;
  document.getElementById("cropSeason").textContent = `🌤 ${seasonName(crop.season)} ${t('season_label')}`;
  document.getElementById("cropHarvest").textContent = `⏱ ${crop.harvestTimeMonth} ${t('harvest_label')}`;

  document.getElementById("cropToday").innerHTML = `₹${mandiToday.toLocaleString()}`;
  document.getElementById("cropChange").innerHTML = `
    <span class="${trend.cls}">
      ${trend.arrow} ₹${Math.abs(diff).toLocaleString()} (${Math.abs(pct)}%) ${vsLabel} ${yStr}
    </span>
  `;
  document.getElementById("cropYesterday").textContent =
    `${t('past_close')} (${yStr}): ₹${mandiYest.toLocaleString()}`;

  if(mandiName) {
    const locEl = document.getElementById("curLoc");
    if(locEl) locEl.textContent = `📍 ${mandiName}`;
  }

  // Metrics
  const risk    = calculateRisk(crop);
  const profit  = calculateProfit(crop);
  
  // Risk
  const riskEl = document.getElementById("riskVal");
  riskEl.textContent = t(risk === 'Low' ? 'low_risk' : risk === 'Medium' ? 'medium_risk' : 'high_risk');
  riskEl.className = `metric-val ${risk === "Low" ? "up" : risk === "High" ? "down" : ""}`;

  // Highlight card border
  const riskCard = document.getElementById("riskCard");
  if (risk === "Low")    riskCard.style.borderTop = "4px solid #4caf50";
  if (risk === "Medium") riskCard.style.borderTop = "4px solid #ff9800";
  if (risk === "High")   riskCard.style.borderTop = "4px solid #f44336";

  // Profit
  const profitEl = document.getElementById("profitVal");
  profitEl.textContent = `${profit >= 0 ? "+" : ""}${profit.toFixed(1)}%`;
  profitEl.className = `metric-val ${profit >= 0 ? "profit-pos" : "profit-neg"}`;

  // Popularity Badge
  const popularityBadge = document.getElementById("popularityBadge");
  if (crop.farmersGrowing > 150) {
    popularityBadge.style.display = "block";
    popularityBadge.style.background = "rgba(255,255,255,0.1)";
    popularityBadge.style.color = "#fff";
    popularityBadge.textContent = t('badge_popular');
  } else if (crop.demandScore > 90) {
    popularityBadge.style.display = "block";
    popularityBadge.style.background = "rgba(255,255,255,0.1)";
    popularityBadge.style.color = "#fff";
    popularityBadge.textContent = t('badge_high_demand');
  } else {
    popularityBadge.style.display = "none";
  }

  // District Popularity
  document.getElementById("growingCountVal").textContent = crop.farmersGrowing.toLocaleString();

  // Demand
  document.getElementById("demandVal").textContent = `${crop.demandScore}/100`;

  // Price Range (Simplified Analytics)
  const minPrice = Math.min(...crop.prices);
  const maxPrice = Math.max(...crop.prices);
  document.getElementById("priceRangeLabel").textContent = `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`;

  // Sell Strategy
  const strategy = getSellStrategy(crop);
  const sd = document.getElementById("sellDecision");
  sd.textContent = strategy.decision === "WAIT" ? t('strategy_wait') : t('strategy_sell');
  sd.style.color = strategy.decision === "WAIT" ? "#b45309" : "#047857";
}

function renderDistrictInsights(crop) {
  const container = document.getElementById("districtInsights");
  if (!container) return;
  const user = getSession();
  const district = (user && user.location) ? user.location : "Bangalore Rural";
  const insights = getDistrictInsights(district);

  const translatedTopCrops = (insights.topCrops || []).map(name => {
    const c = CROPS.find(cr => cr.name === name);
    return c ? cropName(c) : name;
  });

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:8px;">
      <div style="font-size:14px; color:var(--text-sub);">${t('label_region')}: <strong>${district}</strong></div>
      <div style="font-size:14px; color:var(--text-sub);">${t('label_cultivated_area')}: <strong>${insights.area}</strong></div>
      <div style="font-size:14px; color:var(--text-sub);">${t('label_market_presence')}: <strong>${insights.production} ${t('nav_intelligence')}</strong></div>
      <div style="font-size:12px; margin-top:8px; padding:8px; background:rgba(255,255,255,0.05); border-radius:6px;">
        ${t('label_top_crops')}: ${translatedTopCrops.join(", ")}
      </div>
    </div>
  `;
}

function renderSellInsights(crop) {
  const container = document.getElementById("sellInsights");
  if (!container) return;
  const strategy = getSellStrategy(crop);
  const isKn = getCurrentLang() === "kn";
  const monthAvg = Math.round(crop.prices.reduce((a,b)=>a+b,0)/12);

  const curPriceLabel = t('label_current_price');
  const avgPriceLabel = t('label_monthly_avg');
  const reasonLabel = t('label_reason');

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px;">
      <div style="display:flex; justify-content:space-between; font-size:14px;">
        <span>${curPriceLabel}</span>
        <span style="font-weight:700;">₹${crop.todayPrice.toLocaleString()}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:14px;">
        <span>${avgPriceLabel}</span>
        <span style="font-weight:700;">₹${monthAvg.toLocaleString()}</span>
      </div>
      <hr style="border:0; border-top:1px solid #fed7aa;">
      <div style="font-size:15px; font-weight:800; color:#c2410c;">
        ${strategy.decision === "WAIT" ? t('sell_suggested_wait').replace('{days}', strategy.days) : t('sell_suggested_now')}
      </div>
      <div style="font-size:12px; color:#9a3412;">${reasonLabel} ${isKn ? (strategy.decision === "WAIT" ? t('sell_reason_up') : t('sell_reason_peak')) : strategy.reason}</div>
    </div>
  `;
}

// ─── ADVANCED RISK ────────────────────────────────────────────────

function renderAdvancedRisk(crop) {
  const pviVal = Math.round(crop.priceStdDev || 0);
  const pviEl = document.getElementById("pviVal");
  pviEl.textContent = pviVal > 0 ? `±₹${pviVal.toLocaleString()} (${t('label_pvi_note')})` : "—";
  
  // Animate PVI Bar (Ratio to base price)
  const pviPct = Math.min(100, (pviVal / (crop.basePrice || 1000)) * 200);
  document.getElementById("pviBar").style.width = pviPct + "%";
  
  const wRisk = crop.weatherRisk || 0;
  const wRiskEl = document.getElementById("weatherRiskVal");
  const probLabel = `% ${t('label_probability')}`;
  wRiskEl.textContent = `${wRisk}${probLabel}`;
  document.getElementById("weatherRiskBar").style.width = wRisk + "%";

  const sent = crop.sentimentScore || 0;
  const sentEl = document.getElementById("sentimentVal");
  const scoreLabel = `/100 ${t('label_sentiment_score')}`;
  sentEl.textContent = `${sent}${scoreLabel}`;
  document.getElementById("sentimentBar").style.width = sent + "%";
}


// ─── CROP INSIGHTS ───────────────────────────────────────────────

function renderCropInfo(crop) {
  const textEl = document.getElementById("cropInfoText");
  const gridEl = document.getElementById("cropInfoGrid");
  
  if (!textEl || !gridEl) return;

  const isKn = getCurrentLang() === "kn";

  const seasonDescEn = {
    "Kharif": "the monsoon season, requiring excellent drainage to prevent waterlogging",
    "Rabi": "the dry winter season, relying on healthy irrigation reserves",
    "Summer": "the hot summer months, where strict soil moisture management is critical",
    "Winter": "the cool winter months, ideal for slow and robust maturation"
  };
  const seasonDescKn = {
    "Kharif": "ಮುಂಗಾರು ಋತು, ಉತ್ತಮ ಒಳಚರಂಡಿ ಅಗತ್ಯ",
    "Rabi": "ಹಿಂಗಾರು ಋತು, ನೀರಾವರಿ ಅಗತ್ಯ",
    "Summer": "ಬಿಸಿ ಬೇಸಿಗೆ, ಮಣ್ಣಿನ ತೇವಾಂಶ ನಿರ್ವಹಣೆ ಅಗತ್ಯ",
    "Winter": "ತಂಪಾದ ಚಳಿಗಾಲ, ನಿಧಾನ ಮಾಗುವಿಕೆಗೆ ಸೂಕ್ತ"
  };

  if (isKn) {
    const desc = `${cropName(crop)} ಒಂದು ಹೆಚ್ಚು ಬೇಡಿಕೆಯ ${categoryName(crop.category).toLowerCase()} ಆಗಿದ್ದು, ${seasonDescKn[crop.season] || 'ಸ್ಥಳೀಯ ಋತು'}ದಲ್ಲಿ ಬೆಳೆಯಲಾಗುತ್ತದೆ. ಸಾಮಾನ್ಯವಾಗಿ ಕೊಯ್ಲಿಗೆ ಸರಿಸುಮಾರು ${crop.harvestTimeMonth} ತಿಂಗಳು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ. ನೆಡುವ ಮೊದಲು ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.`;
    textEl.textContent = desc;
  } else {
    const desc = `${crop.name} is a highly demanded ${crop.category.toLowerCase()} typically cultivated during ${seasonDescEn[crop.season] || 'the local season'}. It takes approximately ${crop.harvestTimeMonth} months to mature and yield for harvest. Farmers should ensure robust soil health before planting.`;
    textEl.textContent = desc;
  }

  const soilMap = {
    "Vegetable": t("soil_sandy_loam"), "Fruit": t("soil_well_drained"),
    "Flower": t("soil_rich_organic"), "Grain": t("soil_clay_loam"),
    "Pulse": t("soil_dry_sandy"), "Oilseed": t("soil_alluvial"),
    "Cash Crop": t("soil_deep_black"), "Spice": t("soil_laterite"), "Medicinal": t("soil_well_drained_sandy")
  };
  const waterMap = {
    "Kharif": t("water_high_rainfed"), "Rabi": t("water_moderate_irrigate"), "Summer": t("water_very_high"), "Winter": t("water_low_to_moderate")
  };

  const soil = soilMap[crop.category] || t("soil_standard");
  const water = waterMap[crop.season] || t("water_moderate");
  const spacing = (Math.floor(Math.random() * 3) + 2) * 10 + " cm";
  const temp = crop.season === "Winter" ? "15°C - 25°C" : "25°C - 35°C";

  const lSoil = t("ideal_soil");
  const lWater = t("water_need");
  const lSpacing = t("row_spacing");
  const lTemp = t("ideal_temp");

  gridEl.innerHTML = `
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lSoil}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${soil}</div>
    </div>
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lWater}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${water}</div>
    </div>
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lSpacing}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${spacing}</div>
    </div>
    <div style="background:var(--bg); padding:16px; border-radius:8px; border:1px solid var(--border);">
      <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">${lTemp}</div>
      <div style="font-size:16px; font-weight:800; color:var(--text); margin-top:2px;">${temp}</div>
    </div>
  `;
}

// ─── CHARTS ──────────────────────────────────────────────────────

function renderCharts(crop, show30) {
  renderPriceChart(crop, show30);
}

// Helper to calculate simple moving average
function calculateSMA(data, windowSize) {
  let ma = [];
  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) {
      ma.push(null);
    } else {
      let sum = 0;
      for (let j = 0; j < windowSize; j++) {
        sum += data[i - j];
      }
      ma.push(sum / windowSize);
    }
  }
  return ma;
}

function renderPriceChart(crop, show30) {
  const ctx = document.getElementById("priceChart").getContext("2d");

  const isKn = getCurrentLang() === "kn";
  let labels = [];
  const today = new Date();

  if (show30) {
    // Last 30 days
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const day = d.getDate();
      const month = isKn ? MONTH_NAMES.kn[d.getMonth()] : MONTH_NAMES.en[d.getMonth()];
      labels.push(`${day} ${month}`);
    }
  } else {
    // 12 Months ending at current month
    const monthsEn = MONTH_NAMES.en;
    const monthsKn = MONTH_NAMES.kn;
    const currentMonth = today.getMonth();
    for (let i = 11; i >= 0; i--) {
      const m = (currentMonth - i + 12) % 12;
      labels.push(isKn ? monthsKn[m] : monthsEn[m]);
    }
  }

  const data = show30 ? crop.prices30Days : crop.prices;
  
  // Calculate Moving Average (3 day window for 30d, 2 month window for 12m)
  const maWindow = show30 ? 5 : 2; 
  const maData = calculateSMA(data, maWindow);

  const startPrice = data[0];
  const endPrice = data[data.length - 1];
  const isOverallUp = endPrice >= startPrice;
  
  // Create beautiful gradient based on overall trend
  const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
  if (isOverallUp) {
    gradientFill.addColorStop(0, "rgba(76, 175, 80, 0.4)");
    gradientFill.addColorStop(1, "rgba(76, 175, 80, 0.0)");
  } else {
    gradientFill.addColorStop(0, "rgba(244, 67, 54, 0.4)");
    gradientFill.addColorStop(1, "rgba(244, 67, 54, 0.0)");
  }

  if (priceChart) priceChart.destroy();

  priceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${show30 ? (isKn ? '5-ದಿನ ಸ.ಚ.ಸ' : '5-Day MA') : (isKn ? '2-ತಿಂಗಳ ಸ.ಚ.ಸ' : '2-Month MA')}`,
          data: maData,
          borderColor: "rgba(255, 255, 255, 0.4)", // White dashed for MA
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
          tension: 0.4
        },
        {
          label: `${cropName(crop)} (₹/${isKn ? 'ಕ್ವಿಂಟಾಲ್' : 'quintal'})`,
          data,
          segment: {
            borderColor: ctx => ctx.p0.parsed.y <= ctx.p1.parsed.y ? '#4caf50' : '#f44336'
          },
          backgroundColor: gradientFill,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointRadius: show30 ? 0 : 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#ffffff",
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: true, position: 'top', labels: { boxWidth: 10, usePointStyle: true } },
        tooltip: {
          backgroundColor: "#1a1a1a",
          titleColor: "#ffffff",
          bodyColor: "#dddddd",
          callbacks: {
            label: ctx => {
               const maLabel = t('ma_label');
               const priceLabel = t('price_label');
               if (ctx.datasetIndex === 0) return `${maLabel}: ₹${ctx.raw ? ctx.raw.toFixed(0).toLocaleString() : '-'}`;
               return `${priceLabel}: ₹${ctx.raw.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: "#f0f0f0", drawBorder: false },
          ticks: { color: "#666", font: { size: 12 }, maxTicksLimit: show30 ? 10 : 12 }
        },
        y: {
          grid: { color: "#f0f0f0", drawBorder: false },
          ticks: {
            color: "#666",
            font: { size: 12 },
            callback: v => "₹" + (v >= 1000 ? (v/1000).toFixed(1)+"k" : v)
          }
        }
      }
    }
  });
}

function renderHybrids(crop) {
  const container = document.getElementById("hybridList");
  if (!container) return;
  
  // Show up to 6 hybrids
  let list = crop.hybrids.slice(0, 6);
  
  container.innerHTML = list.map(h => {
    const key = `hybrid_${h.toLowerCase().replace(/ /g, '_').replace(/-/g, '_')}`;
    const translatedName = t(key);
    const displayName = (translatedName !== key) ? translatedName : h;

    return `
      <div style="padding: 12px; background: rgba(15, 23, 42, 0.03); border-radius: 12px; margin-bottom: 8px; border-left: 5px solid #0f172a; font-weight: 700; color: #0f172a; display: flex; justify-content: space-between; align-items: center;">
        <span>✨ ${displayName}</span>
        <span style="font-size: 10px; background: rgba(15, 23, 42, 0.08); padding: 2px 8px; border-radius: 10px;">${seasonName(crop.season)}</span>
      </div>
    `;
  }).join('');
}

function renderDiseases(crop) {
  const container = document.getElementById("diseaseList");
  if (!container) return;
  
  const cropDiseases = DISEASE_DETAILS[crop.name] || [
    { name: "Leaf Spot", symptoms: "Small brown circles on leaves", prevention: "Crop rotation, clean seeds" },
    { name: "Root Rot", symptoms: "Wilting, black roots", prevention: "Avoid overwatering, well-drained soil" }
  ];

  container.innerHTML = cropDiseases.map(d => {
    // Simple translation for common diseases if keys exist
    const dName = t(`disease_${d.name.toLowerCase().replace(/ /g, '_')}`);
    const dSymp = t(`symptom_${d.name.toLowerCase().replace(/ /g, '_')}`);
    const dPrev = t(`prevent_${d.name.toLowerCase().replace(/ /g, '_')}`);

    return `
      <div style="padding: 12px; background: #fff1f2; color: #e11d48; border-radius: 10px; margin-bottom: 12px; border: 1px solid #fecdd3;">
        <div style="font-weight: 800; display:flex; align-items:center; gap:6px;">🦠 ${dName !== `disease_${d.name.toLowerCase().replace(/ /g, '_')}` ? dName : d.name}</div>
        <div style="font-size: 11px; margin-top:4px; opacity:0.8;"><strong>${t('label_symptoms')}:</strong> ${dSymp !== `symptom_${d.name.toLowerCase().replace(/ /g, '_')}` ? dSymp : d.symptoms}</div>
        <div style="font-size: 11px; margin-top:2px; color:#9f1239;"><strong>${t('label_prevention')}:</strong> ${dPrev !== `prevent_${d.name.toLowerCase().replace(/ /g, '_')}` ? dPrev : d.prevention}</div>
      </div>
    `;
  }).join('');
}

function renderGrowingStatus(crop) {
  const container = document.getElementById("growingStatus");
  if (!container) return;

  const user = getSession();
  const isGrowing = user && user.growing && user.growing.toLowerCase() === crop.name.toLowerCase(); 
  const isKn = getCurrentLang() === "kn";
  
  const step1Title = t('step1_title');
  const step2Title = t('step2_title');
  const qGrowing = t('q_growing').replace('{crop}', cropName(crop));
  const qSelling = t('q_selling');
  const qInterested = t('q_interested');
  
  const livePriceLabel = t('live_mandi_price');
  const forecastLabel = t('harvest_forecast');
  
  const btnYesSell = t('btn_sell_now');
  const btnNoKeep = t('btn_keep_growing');
  const btnStartCrop = t('btn_start_cropping');
  const btnLater = t('btn_maybe_later');

  if (isGrowing) {
    container.innerHTML = `
      <div style="background: #ffffff; border: 1px solid rgba(15, 23, 42, 0.1); padding: 32px; border-radius: 32px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
          <div>
            <div style="font-size: 13px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px;">${step2Title}</div>
            <div style="font-size: 24px; font-weight: 900; color: #0f172a; margin-top: 8px; letter-spacing: -0.5px;">${qSelling}</div>
          </div>
          <div style="text-align: right; background: #f8fafc; padding: 12px 20px; border-radius: 20px; border: 1px solid #e2e8f0;">
            <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">${livePriceLabel}</div>
            <div style="font-size: 32px; font-weight: 950; color: #0f172a; margin-top: 2px;">₹${getMandiPrice(crop, user?user.mandi:null).toLocaleString()}</div>
          </div>
        </div>
        <div style="display: flex; gap: 16px;">
          <button onclick="alert('${isKn ? "ಖರೀದಿದಾರರ ಪೋರ್ಟಲ್‌ಗೆ ಹೋಗಲಾಗುತ್ತಿದೆ..." : "Proceeding to Direct-to-Buyer Portal..."}')" style="flex:1.5; padding: 18px; background: #0f172a; color: white; border-radius: 20px; font-weight: 800; font-size: 15px; border:none; cursor:pointer; box-shadow: 0 10px 20px rgba(15,23,42,0.15); transition: transform 0.2s;">${btnYesSell}</button>
          <button onclick="alert('${isKn ? "ನಾವು ಗಮನಿಸುತ್ತೇವೆ... ಬೆಲೆ ಹೆಚ್ಚಾದಾಗ ನಿಮಗೆ ತಿಳಿಸುತ್ತೇವೆ!" : "Keeping track... we will notify you of price peaks!"}')" style="flex:1; padding: 18px; background: white; border: 2px solid #e2e8f0; color: #475569; border-radius: 20px; font-weight: 800; font-size: 15px; cursor:pointer; transition: background 0.2s;">${btnNoKeep}</button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div style="background: #ffffff; border: 1px solid rgba(15, 23, 42, 0.1); padding: 32px; border-radius: 32px; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.05);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
          <div>
            <div style="font-size: 13px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px;">${step1Title}</div>
            <div style="font-size: 24px; font-weight: 900; color: #0f172a; margin-top: 8px; letter-spacing: -0.5px;">${qInterested}</div>
          </div>
          <div style="text-align: right; background: #f8fafc; padding: 12px 20px; border-radius: 20px; border: 1px solid #e2e8f0;">
            <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">${forecastLabel}</div>
            <div style="font-size: 32px; font-weight: 950; color: #0f172a; margin-top: 2px;">₹${crop.projectedPrice.toLocaleString()}</div>
          </div>
        </div>
        <div style="display: flex; gap: 16px;">
          <button onclick="updateUserCrop('${crop.name}')" style="flex:1.5; padding: 18px; background: #0f172a; color: white; border-radius: 20px; font-weight: 800; font-size: 15px; border:none; cursor:pointer; box-shadow: 0 10px 20px rgba(15,23,42,0.15); transition: transform 0.2s;">${btnStartCrop}</button>
          <button onclick="alert('${isKn ? "ವಿಶ್ ಲಿಸ್ಟ್‌ಗೆ ಉಳಿಸಲಾಗಿದೆ!" : "Saved to wishlist!"}')" style="flex:1; padding: 18px; background: white; border: 2px solid #e2e8f0; color: #475569; border-radius: 20px; font-weight: 800; font-size: 15px; cursor:pointer; transition: background 0.2s;">${btnLater}</button>
        </div>
      </div>
    `;
  }
}

function updateUserCrop(cropName) {
  const user = getSession();
  if(!user) { window.location.href='login.html'; return; }
  user.growing = cropName;
  localStorage.setItem('raitha_user', JSON.stringify(user));
  alert("Profile Updated! You are now tracking " + cropName);
  window.location.reload();
}

function renderSeedStats(crop) {
  const statEl = document.getElementById("seedStat");
  const barEl = document.getElementById("seedBar");
  if (!statEl || !barEl) return;

  const avg = Math.round(crop.seedSold.reduce((a, b) => a + b, 0) / 12);
  const isKn = getCurrentLang() === "kn";
  
  statEl.textContent = `${avg.toLocaleString()} ${isKn ? 'ಕೆಜಿ' : 'Kg'} / ${isKn ? 'ತಿಂಗಳು' : 'Month'}`;
  
  const max = 600; // Reference max
  const pct = Math.min(100, (avg / max) * 100);
  barEl.style.width = pct + "%";
}

// ─── RECOMMENDATION ──────────────────────────────────────────────

function renderRecommendation(crop) {
  const risk   = calculateRisk(crop);
  const profit = calculateProfit(crop);
  const score  = calculateScore(crop);

  const recBox      = document.getElementById("recBox");
  const recIcon     = document.getElementById("recIcon");
  const recText     = document.getElementById("recText");
  const recDecision = document.getElementById("recDecision");

  let icon, text, decision, decisionClass;

  if (risk === "High") {
    icon = "⚠️";
    decisionClass = "rec-risk";
    decision = t('high_risk_reward');
    text = `${cropName(crop)} ${t('rec_high_risk')}`;
  } else if (Math.round(score) > 130) {
    icon = "✅";
    decisionClass = "rec-go";
    decision = t('highly_recommended');
    text = `${cropName(crop)} ${t('rec_strong')}`;
  } else if (Math.round(score) > 100) {
    icon = "👍";
    decisionClass = "rec-go";
    decision = t('recommended');
    text = `${cropName(crop)} ${t('rec_steady')}`;
  } else if (Math.round(score) > 75) {
    icon = "⚡";
    decisionClass = "rec-caution";
    decision = t('grow_with_care');
    text = `${cropName(crop)} ${t('rec_fluctuating')} (${t('label_pvi_note')}: ±₹${Math.round(crop.priceStdDev)})`;
  } else {
    icon = "❌";
    decisionClass = "rec-risk";
    decision = t('not_recommended');
    text = `${cropName(crop)} ${t('rec_poor')}`;
  }

  recIcon.textContent = icon;
  recText.textContent = text;
  recBox.className = "rec-box " + decisionClass;

  recDecision.innerHTML = `
    <span class="rec-badge">${decision}</span>
    <span class="rec-score">${t('analysis_score')}: ${Math.round(score)}</span>
  `;
}

// ─── ALTERNATIVES ─────────────────────────────────────────────────

function renderAlternatives(crop) {
  const list = document.getElementById("altList");
  if (!list) return;

  const alts = getAlternatives(crop);

  if (alts.length === 0) {
    list.innerHTML = `<p style="color:#777;font-size:14px">${t('no_alternatives')}</p>`;
    return;
  }

  list.innerHTML = "";

  alts.forEach((alt, i) => {
    const risk  = calculateRisk(alt);
    const trend = trendArrow(alt);

    const div = document.createElement("div");
    div.className = "alt-item";
    div.setAttribute("data-id", alt.id);

    div.innerHTML = `
      <div class="alt-rank">#${i + 1}</div>
      <div class="alt-icon">${categoryIcon(alt.category)}</div>
      <div class="alt-info">
        <div class="alt-name">${cropName(alt)}</div>
        <div class="alt-cat">${t('cat_' + alt.category.toLowerCase())} · ${seasonName(alt.season)}</div>
      </div>
      <div class="alt-right">
        <div class="alt-price">₹${alt.todayPrice.toLocaleString()}</div>
        <div class="alt-price-unit">${t('per_qtl')}</div>
        <div class="alt-trend ${trend.cls}">${trend.arrow}</div>
        <span class="risk-badge ${riskClass(risk)}" style="font-size:11px">${t(risk === 'Low' ? 'low_risk' : risk === 'Medium' ? 'medium_risk' : 'high_risk')}</span>
      </div>
    `;

    div.addEventListener("click", () => {
      saveRecentCrop(alt.id);
      window.location.href = `crop.html?id=${alt.id}`;
    });

    list.appendChild(div);
  });
}

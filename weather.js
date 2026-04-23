async function initWeather() {
  const user = getSession();
  const district = user ? user.location : "Bangalore Rural";
  const curLoc = document.getElementById('curLoc');
  if(curLoc) curLoc.textContent = `📍 ${district}, Karnataka`;

  try {
    // We use Open-Meteo with coords for Karnataka regions (defaulting to Bangalore)
    const lat = 12.97;
    const lon = 77.59;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&timezone=Asia%2FKolkata`;
    
    const res = await fetch(url);
    const data = await res.json();

    // Current
    const current = data.current;
    document.getElementById('curTemp').textContent = `${Math.round(current.temperature_2m)}°C`;
    document.getElementById('curHum').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('curRain').textContent = `${current.precipitation} mm`;
    document.getElementById('curWind').textContent = `${current.wind_speed_10m} km/h`;
    document.getElementById('curDesc').textContent = current.precipitation > 0 ? t("weather_rainy") : t("weather_sunny");
    document.getElementById('curIcon').textContent = current.precipitation > 0 ? "🌧️" : "☀️";
    document.getElementById('curUV').textContent = data.daily.uv_index_max[0];

    // Seasonal Rain Calculation
    const month = new Date().getMonth();
    let seasonKey = "weather_winter";
    let expectedRain = 45; // mm
    if (month >= 5 && month <= 9) { seasonKey = "weather_monsoon"; expectedRain = 850; }
    else if (month >= 2 && month <= 4) { seasonKey = "weather_summer"; expectedRain = 120; }
    
    const rainEl = document.getElementById('seasonalRainVal');
    const lblEl = document.getElementById('seasonNameLbl');
    if (rainEl) rainEl.textContent = `${expectedRain} mm`;
    if (lblEl) lblEl.textContent = t(seasonKey);

    // Forecast
    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = data.daily.time.map((time, i) => {
      const date = new Date(time);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const max = data.daily.temperature_2m_max[i];
      const min = data.daily.temperature_2m_min[i];
      const rain = data.daily.precipitation_sum[i];
      const icon = rain > 1 ? "🌧️" : max > 32 ? "☀️" : "⛅";

      return `
        <div class="f-day">
          <div class="f-date">${day}</div>
          <div class="f-icon">${icon}</div>
          <div class="f-temp-max">${Math.round(max)}°</div>
          <div class="f-temp-min">${Math.round(min)}°</div>
          <div class="f-rain">${rain}mm</div>
        </div>
      `;
    }).join('');

    renderRainfallChart();

  } catch(e) {
    console.error("Weather fetch failed", e);
  }
}

function renderRainfallChart() {
  const ctx = document.getElementById('rainfallChart');
  if(!ctx) return;
  
  const isKn = getCurrentLang() === 'kn';
  const months = isKn ? MONTH_NAMES.kn : MONTH_NAMES.en;
  
  // Realistically curated rainfall data for Karnataka (mm)
  const data = [1.2, 5.4, 18.5, 45.2, 110.4, 210.8, 280.5, 230.2, 160.4, 140.8, 45.6, 12.4];
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: isKn ? 'ಮಳೆ (mm)' : 'Rainfall (mm)',
        data: data,
        backgroundColor: 'rgba(3, 105, 161, 0.6)',
        borderColor: '#0369a1',
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f0f0f0' },
          ticks: { callback: v => v + 'mm' }
        },
        x: {
          grid: { display: false }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initWeather);

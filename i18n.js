// ============================================================
// RAITHA — Bilingual Engine (English / ಕನ್ನಡ)
// ============================================================

const LANG_KEY = "raitha_lang";

function getCurrentLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

function toggleLanguage() {
  const current = getCurrentLang();
  localStorage.setItem(LANG_KEY, current === "en" ? "kn" : "en");
  location.reload(); // Reload so all JS-rendered content re-renders in new language
}

function t(key) {
  const lang = getCurrentLang();
  return (UI_STRINGS[lang] && UI_STRINGS[lang][key]) ? UI_STRINGS[lang][key] : (UI_STRINGS["en"][key] || key);
}

function cropName(crop) {
  if (getCurrentLang() === "kn" && crop.nameKn) return crop.nameKn;
  return crop.name;
}

function categoryName(cat) {
  const lang = getCurrentLang();
  return (CATEGORY_NAMES[lang] && CATEGORY_NAMES[lang][cat]) ? CATEGORY_NAMES[lang][cat] : cat;
}

function seasonName(season) {
  const lang = getCurrentLang();
  return (SEASON_NAMES[lang] && SEASON_NAMES[lang][season]) ? SEASON_NAMES[lang][season] : season;
}

// ─── UI STRINGS ──────────────────────────────────────────────
const UI_STRINGS = {
  en: {
    // App Brand
    app_name: "Raitha Bandhu",
    welcome_to: "WELCOME TO",
    splash_name: "RAITHA BANDHU",
    app_tagline: "Smart Crop System",

    // Stats
    stat_crops_tracked: "Crops Tracked",
    stat_categories: "Categories",
    stat_days: "Days of Data",
    smart_score_label: "Smart Score",
    crops_word: "crops",
    viewed_recently: "crops viewed recently",

    // Nav
    nav_home: "Home",
    nav_mandi: "Mandi Prices",
    nav_weather: "Weather",
    nav_contact: "Contact",
    search_placeholder: "Search crops…",
    search_btn: "Search",
    nav_login: "Login",
    nav_profile: "Profile",
    nav_logout: "Logout",
    hybrid_varieties: "Hybrid Varieties",
    common_diseases: "Common Diseases",
    currently_growing: "Currently Growing",
    farmers_growing: "Farmers Growing",
    label_district: "District",
    label_taluk: "Taluk",
    label_mandi: "Nearest Mandi",
    label_soil: "Soil Type",
    label_water: "Water Availability",
    label_user_name: "Full Name",
    label_phone: "Phone Number",
    label_cropping_pattern: "Cropping Pattern",
    question_cropping: "Are you currently cropping this?",
    question_sell: "Do you need to sell now?",
    welcome_user: "Hello, ",
    profile_region: "Region",
    profile_active_crop: "Active Crop",
    profile_mandi: "Saved Mandi",
    btn_logout_account: "Sign Out",
    btn_save_profile: "Save Farm Profile",
    btn_analyze_new: "Analyze New Crop",
    btn_update_farm: "Update Farm Profile",
    btn_run_analysis: "Run Analysis Engine",
    btn_view_guide: "View Guide",
    nav_intelligence: "Intelligence",
    nav_analysis: "Crop Analysis",
    nav_watchlist: "Watchlist",
    stat_live_season: "Live Season",
    stat_profit_forecast: "Profit Forecast",
    stat_crop_health: "Crop Health Status",
    stat_est_yield: "Est. Yield",
    stat_est_cost: "Est. Cost",
    stat_net_profit: "Net Profit",
    title_standing_crop: "🌱 Standing Crop Monitor",
    label_currently_growing: "CURRENTLY GROWING:",
    label_weather_station: "Weather Station",

    // Notice
    notice_bar: "⚠️ All prices are in ₹ per quintal (100 kg) — Updated daily from major agricultural mandis",

    // Hero
    hero_title: "Grow with Precision. Earn with Confidence.",
    hero_sub: "Live mandi prices, crop demand trends, and smart recommendations to help you choose the right crop this season.",
    hero_btn_mandi: "📊 View Mandi Prices",
    hero_btn_best: "🏆 Best Crops",
    stat_crops_tracked: "Crops Tracked",
    stat_categories: "Categories",
    stat_days: "Days of Data",
    stat_days_data: "Days of Data",

    // Sections
    section_recent: "🕒 Recently Viewed Crops",
    section_recent_hint: "Search for a crop to see your history here",
    section_best: "🏆 Best Crops to Grow This Season",
    section_best_sub: "Ranked by profitability + demand + low risk",
    section_categories: "Browse by Category",
    section_categories_sub: "Tap a category to see all crops and prices",

    // Mandi Page
    mandi_page_title: "📊 Live Mandi Prices",
    mandi_page_sub: "Today's prices per quintal for all crops — compare, filter, and click any crop for full details",
    filter_search: "Search Crop",
    filter_category: "Category",
    filter_all_categories: "All Categories",
    filter_season: "Season",
    filter_all_seasons: "All Seasons",
    filter_sort: "Sort By",
    sort_price_high: "Price: High to Low",
    sort_price_low: "Price: Low to High",
    sort_name_az: "Name A to Z",
    sort_trending_up: "Rising Prices ↑",
    sort_trending_down: "Falling Prices ↓",
    sort_risk_low: "Lowest Risk First",
    summary_total: "Total Crops Listed",
    summary_rising: "Prices Rising ↑",
    summary_stable: "Stable Prices ≈",
    summary_falling: "Prices Falling ↓",
    summary_avg: "Avg Price / Quintal",
    show_all: "Show All",
    show_less: "Show Less ↑",
    crops: "Crops",
    live_price: "Live",
    past_price: "Past",
    demand: "Demand",
    risk: "Risk",
    low_risk: "Low Risk",
    medium_risk: "Medium Risk",
    high_risk: "High Risk",
    yearly_profit: "Yr",
    per_qtl: "/qtl",

    // Crop Detail
    smart_rec: "Smart Recommendation",
    analyzing: "Analyzing crop data…",
    risk_level: "Risk Level",
    yearly_profit_label: "Yearly Profit",
    demand_score: "Demand Score",
    smart_score: "Smart Score",
    forecast_7d: "7-Day Forecast",
    price_trend_title: "📉 Price Trend (₹ per quintal)",
    last_30_days: "Last 30 Days",
    last_12_months: "12 Months",
    seed_demand_title: "📦 Seed Demand — Last 12 Months (Kg Sold)",
    growing_guide: "🌱 Crop Insights & Growing Guide",
    avg_demand: "📦 Avg Local Market Demand",
    sell_suggested_wait: "Suggested: Wait {days} days",
    sell_suggested_now: "Suggested: Sell Now!",
    sell_reason_up: "Prices trending up",
    sell_reason_peak: "Current market peak reached",
    better_alternatives: "🔄 Better Alternatives",
    same_season: "Same season crops with better scores",
    no_alternatives: "No same-season alternatives found.",
    risk_analyzer: "📊 Advanced Risk Analyzer",
    risk_analyzer_sub: "Data-driven market stability metrics",
    pvi_label: "Price Volatility Index (PVI)",
    weather_risk_label: "Season Weather Risk",
    market_sentiment: "Market Sentiment",
    season_label: "Season",
    harvest_label: "months to harvest",
    per_quintal: "per quintal (100 kg)",
    past_close: "Past close",
    ideal_soil: "Ideal Soil Type",
    water_need: "Water Need",
    row_spacing: "Row Spacing",
    ideal_temp: "Ideal Temp",
    prob: "% Probability",
    score_label: "/100 Score",
    highly_recommended: "HIGHLY RECOMMENDED",
    recommended: "RECOMMENDED",
    grow_with_care: "GROW WITH CARE",
    high_risk_reward: "HIGH RISK — HIGH REWARD",
    not_recommended: "NOT RECOMMENDED",
    analysis_score: "Analysis Score",
    ma_label: "Moving Avg",
    price_label: "Price",
    day_short: "Day",

    serve_states: "Serving all districts of Karnataka.",
    monthly_rainfall_analysis: "Rainfall Intelligence Dashboard (Current Year)",
    expected_rain: "Expected Seasonal Rain",
    empty_mandi: "No crops found. Try changing your filters.",
    live_prices_for: "Live prices for",

    // Recommendations
    rec_strong: "has strong market demand and favorable price trends. This is a very profitable option for your farm this season.",
    rec_steady: "has steady demand. A reliable crop requiring standard maintenance. Expect moderate but stable returns.",
    rec_fluctuating: "shows fluctuating prices. Ensure you have necessary risk mitigation before planting heavily.",
    rec_high_risk: "prices swing dramatically. Only grow this if you have cold storage options or a pre-arranged buyer contract.",
    rec_poor: "has poor market sentiment and dropping prices. Consider switching to one of the better alternatives shown below.",

    // Contact
    contact_title: "📞 Contact Us",
    contact_sub: "Need help? Our team is ready to assist farmers across India.",
    helpline_title: "Farmer Helpline",
    helpline_note: "Free • Mon–Sat, 8 AM – 6 PM",
    whatsapp_title: "WhatsApp Support",
    whatsapp_note: "Send crop name to get today's price",
    email_title: "Email",
    email_note: "Reply within 24 hours",
    kisan_title: "Kisan Call Centre",
    kisan_note: "Government of India • 24×7 toll-free",
    nearest_mandi: "Nearest Mandi",
    find_mandi: "enam.gov.in — Find your local mandi",

    // Footer
    footer_tagline: "Empowering farmers with real-time crop data, mandi prices, and smart recommendations to maximize earnings.",
    footer_quick_links: "Quick Links",
    footer_contact_details: "Contact Details",
    footer_copy: "© 2025 Raitha Bandhu — Smart Crop Decision System.",
    footer_note: "All prices in ₹/quintal (100 kg) • Data is for guidance only",
    footer_helpline: "📞 Helpline: 1800-123-4567",
    footer_whatsapp: "📱 WhatsApp: +91 98765 43210",
    footer_email: "✉️ help@raitha.in",
    // Mandi Page
    mandi_page_title: "Live Mandi Prices",
    mandi_page_sub: "Today's prices per quintal for all crops — compare and filter",
    filter_search: "Search Crop",
    filter_category: "Category",
    filter_season: "Season",
    filter_sort: "Sort By",
    filter_all_categories: "All Categories",
    filter_all_seasons: "All Seasons",
    sort_price_high: "Price: High to Low",
    sort_price_low: "Price: Low to High",
    sort_name_az: "Name A to Z",
    sort_trending_up: "Rising Prices ↑",
    sort_risk_low: "Lowest Risk First",
    
    // Auth Page
    back_to_home: "← Back to Home Page",
    login_welcome_back: "Welcome Back",
    login_create_account: "Create Account",
    login_phone: "Phone Number",
    login_pass: "Password",
    login_btn: "Login",
    login_no_account: "Don't have an account?",
    login_create_link: "Create Account",
    login_full_name: "Full Name",
    login_signup_btn: "Sign Up",
    login_have_account: "Already have an account?",
    login_instead_link: "Login instead",
    signup_name_placeholder: "Enter your name",
    login_pass_create: "Create Password",
    
    // Weather Conditions
    weather_rainy: "Rainy Conditions",
    weather_sunny: "Mostly Sunny",
    weather_clear: "Clear Sky",
    weather_monsoon: "Monsoon Season",
    weather_winter: "Winter Season",
    weather_summer: "Summer Season",
    weather_planning: "7-Day Planning Forecast",
    humidity: "Humidity",
    wind_speed: "Wind Speed",
    uv_index: "UV Index",
    rainfall: "Rainfall",
    
    // Districts Served
    states_title: "Serving all districts of Karnataka.",
    states_list: "Bangalore Rural | Kolar | Chikkaballapur | Mysuru | Belagavi | Shimoga | Davangere | Bagalkot",
    
    // Weather Planning
    expected_rain: "Expected Seasonal Rain",
    current_season_rain: "Current Season Rainfall",

    // Active Season Widget
    active_season: "Active Season",
    indian_agri: "Indian Agriculture",
    live_weather: "Live Weather",
    central_india_weather: "Central India Weather",
    season_kharif: "Kharif (Monsoon)",
    season_rabi: "Rabi (Winter)",
    season_zaid: "Zaid (Summer)",

    // Crop Insights
    label_region: "Region",
    label_cultivated_area: "Cultivated Area",
    label_market_presence: "Market Presence",
    label_top_crops: "Top crops here",
    label_current_price: "Current Price",
    label_monthly_avg: "Monthly Average",
    label_reason: "Reason",
    badge_popular: "POPULAR",
    badge_high_demand: "HIGH DEMAND",
    
    // Interactive Status
    step1_title: "Step 1: Planning",
    step2_title: "Step 2: Harvesting & Sales",
    q_growing: "Are you currently growing {crop}?",
    q_selling: "Are you now selling this crop?",
    q_interested: "Are you interested to crop this?",
    live_mandi_price: "LIVE MANDI PRICE",
    harvest_forecast: "HARVEST FORECAST (EST.)",
    btn_sell_now: "YES, SELL NOW",
    btn_keep_growing: "NOT YET, KEEP GROWING",
    btn_start_cropping: "YES, START CROPPING",
    btn_maybe_later: "MAYBE LATER",

    // Mandi Details
    per_qtl_unit: "per quintal (100 kg)",
    label_sell_strategy: "Sell Strategy",
    strategy_wait: "Wait for Peak",
    strategy_sell: "Sell Now",
    strategy_hold: "Hold Stock",

    // Diseases
    label_symptoms: "Symptoms",
    label_prevention: "Prevention",

    // Advanced Risk
    label_pvi: "Price Change Range (Monthly)",
    label_pvi_note: "PVI",
    label_market_sentiment: "Market Sentiment",
    label_sentiment_score: "score",
    label_weather_risk: "Weather Risk",
    label_probability: "probability",

    // Categories (Short)
    cat_vegetable: "Vegetable",
    cat_fruit: "Fruit",
    cat_spice: "Spice",
    cat_flower: "Flower",
    cat_grain: "Grain",

    // Soil & Water
    soil_sandy_loam: "Sandy Loam",
    soil_well_drained: "Well-Drained Loamy",
    soil_rich_organic: "Rich Organic",
    soil_clay_loam: "Clay Loam",
    soil_dry_sandy: "Dry Sandy",
    soil_alluvial: "Alluvial",
    soil_deep_black: "Deep Black Soil",
    soil_laterite: "Laterite",
    soil_well_drained_sandy: "Well-Drained Sandy",
    soil_standard: "Standard Loam",

    water_high_rainfed: "High (Rainfed)",
    water_moderate_irrigate: "Moderate (Irrigate)",
    water_very_high: "Very High",
    water_low_to_moderate: "Low to Moderate",
    water_moderate: "Moderate",

    // Diseases Content
    disease_leaf_spot: "Leaf Spot",
    symptom_leaf_spot: "Small brown circles on leaves",
    prevent_leaf_spot: "Crop rotation, clean seeds",
    disease_root_rot: "Root Rot",
    symptom_root_rot: "Wilting, black roots",
    prevent_root_rot: "Avoid overwatering, well-drained soil",

    // Extended Diseases
    disease_early_blight: "Early Blight",
    disease_bacterial_wilt: "Bacterial Wilt",
    disease_leaf_curl_virus: "Leaf Curl Virus",
    disease_purple_blotch: "Purple Blotch",
    disease_downy_mildew: "Downy Mildew",
    disease_panama_wilt: "Panama Wilt",
    disease_sigatoka_leaf_spot: "Sigatoka Leaf Spot",
    
    // Hybrids
    hybrid_arka_rakshak: "Arka Rakshak",
    hybrid_pusa_hybrid_4: "Pusa Hybrid-4",
    hybrid_abhinav: "Abhinav",
    hybrid_us_440: "US-440",
    hybrid_bharat: "Bharat",
    hybrid_indra: "Indra",
    hybrid_orobelle: "Orobelle",
    hybrid_gladiator: "Gladiator",
    hybrid_first_red: "First Red",
    hybrid_taj_mahal: "Taj Mahal",
    
    // Header Titles
    district_insights_title: "District Insights",
    smart_selling_title: "Smart Selling Insight",
  },

  kn: {
    // App Brand
    app_name: "ರೈತ ಬಂಧು",
    welcome_to: "ಸ್ವಾಗತ",
    splash_name: "ರೈತ ಬಂಧು",
    app_tagline: "ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ಮಾಹಿತಿ ವ್ಯವಸ್ಥೆ",
    
    // Nav
    nav_home: "ಮುಖಪುಟ",
    nav_mandi: "ಮಾರುಕಟ್ಟೆ ದರ",
    nav_weather: "ಹವಾಮಾನ",
    nav_contact: "ಸಂಪರ್ಕ",
    search_placeholder: "ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ…",
    search_btn: "ಹುಡುಕಿ",
    nav_login: "ಲಾಗಿನ್",
    nav_profile: "ಪ್ರೊಫೈಲ್",
    nav_logout: "ಲಾಗ್ ಔಟ್",
    hybrid_varieties: "ಹೈಬ್ರಿಡ್ ತಳಿಗಳು",
    common_diseases: "ಸಾಮಾನ್ಯ ರೋಗಗಳು",
    currently_growing: "ಪ್ರಸ್ತುತ ಬೆಳೆಯುತ್ತಿರುವ",
    farmers_growing: "ಬೆಳೆಯುತ್ತಿರುವ ರೈತರು",
    label_district: "ಜಿಲ್ಲೆ",
    label_taluk: "ತಾಲ್ಲೂಕು",
    label_mandi: "ಹತ್ತಿರದ ಮಂಡಿ",
    label_soil: "ಮಣ್ಣಿನ ವಿಧ",
    label_water: "ನೀರಿನ ಲಭ್ಯತೆ",
    label_user_name: "ಪೂರ್ಣ ಹೆಸರು",
    label_phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    label_cropping_pattern: "ಬೆಳೆ ಪದ್ಧತಿ",
    question_cropping: "ನೀವು ಇದನ್ನು ಪ್ರಸ್ತುತ ಬೆಳೆಯುತ್ತಿದ್ದೀರಾ?",
    question_sell: "ನೀವು ಈಗ ಮಾರಾಟ ಮಾಡಬೇಕೇ?",
    welcome_user: "ನಮಸ್ಕಾರ, ",
    profile_region: "ಪ್ರದೇಶ",
    profile_active_crop: "ಸಕ್ರಿಯ ಬೆಳೆ",
    profile_mandi: "ಉಳಿಸಿದ ಮಂಡಿ",
    btn_logout_account: "ಲಾಗ್ ಔಟ್",
    btn_save_profile: "ಫಾರ್ಮ್ ಪ್ರೊಫೈಲ್ ಉಳಿಸಿ",
    btn_analyze_new: "ಹೊಸ ಬೆಳೆ ವಿಶ್ಲೇಷಿಸಿ",
    btn_update_farm: "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ",
    btn_run_analysis: "ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ",
    btn_view_guide: "ಮಾರ್ಗದರ್ಶಿ ನೋಡಿ",
    nav_intelligence: "ಬುದ್ಧಿವಂತಿಕೆ",
    nav_analysis: "ಬೆಳೆ ವಿಶ್ಲೇಷಣೆ",
    nav_watchlist: "ವಾಚ್ ಲಿಸ್ಟ್",
    stat_live_season: "ನೇರ ಋತು",
    stat_profit_forecast: "ಲಾಭದ ಮುನ್ಸೂಚನೆ",
    stat_crop_health: "ಬೆಳೆ ಆರೋಗ್ಯ ಸ್ಥಿತಿ",
    stat_est_yield: "ಅಂದಾಜು ಇಳುವರಿ",
    stat_est_cost: "ಅಂದಾಜು ವೆಚ್ಚ",
    stat_net_profit: "ನಿವ್ವಳ ಲಾಭ",
    title_standing_crop: "🌱 ಬೆಳೆ ಮಾನಿಟರ್",
    label_currently_growing: "ಪ್ರಸ್ತುತ ಬೆಳೆಯುತ್ತಿರುವುದು:",
    label_weather_station: "ಹವಾಮಾನ ಕೇಂದ್ರ",

    // Notice
    notice_bar: "⚠️ ಎಲ್ಲಾ ಬೆಲೆಗಳು <strong>ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ)</strong> ಗೆ ಇವೆ — ಪ್ರಮುಖ ಕೃಷಿ ಮಂಡಿಗಳಿಂದ ಪ್ರತಿದಿನ ನವೀಕರಿಸಲಾಗುತ್ತದೆ",

    // Hero
    hero_title: "ನಿಖರವಾಗಿ ಬೆಳೆಯಿರಿ. ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಸಂಪಾದಿಸಿ.",
    hero_sub: "ನಿಮ್ಮ ಬೆಳೆ ಆಯ್ಕೆಗೆ ಸಹಾಯ ಮಾಡಲು ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು, ಬೇಡಿಕೆ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸುಗಳು ಇಲ್ಲಿವೆ.",
    hero_btn_mandi: "📊 ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ನೋಡಿ",
    hero_btn_best: "🏆 ಉತ್ತಮ ಬೆಳೆಗಳು",
    stat_crops_tracked: "ಬೆಳೆಗಳು",
    stat_categories: "ವರ್ಗಗಳು",
    stat_days: "ದಿನಗಳ ಮಾಹಿತಿ",
    stat_days_data: "ದಿನಗಳ ಮಾಹಿತಿ",

    // Sections
    section_recent: "🕒 ಇತ್ತೀಚೆಗೆ ನೋಡಿದ ಬೆಳೆಗಳು",
    section_recent_hint: "ನಿಮ್ಮ ಇತಿಹಾಸವನ್ನು ನೋಡಲು ಬೆಳೆಯನ್ನು ಹುಡುಕಿ",
    section_best: "🏆 ಈ ಹಂಗಾಮಿನಲ್ಲಿ ಬೆಳೆಯಲು ಉತ್ತಮ ಬೆಳೆಗಳು",
    section_best_sub: "ಲಾಭದಾಯಕತೆ + ಬೇಡಿಕೆ + ಕಡಿಮೆ ಅಪಾಯದ ಆಧಾರದ ಮೇಲೆ",
    section_categories: "ವರ್ಗದ ಪ್ರಕಾರ ನೋಡಿ",
    section_categories_sub: "ಎಲ್ಲಾ ಬೆಳೆಗಳು ಮತ್ತು ಬೆಲೆಗಳನ್ನು ನೋಡಲು ವರ್ಗವನ್ನು ಒತ್ತಿ",

    // Mandi Page
    mandi_page_title: "📊 ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    mandi_page_sub: "ಎಲ್ಲಾ ಬೆಳೆಗಳಿಗೆ ಇಂದಿನ ಕ್ವಿಂಟಾಲ್ ಬೆಲೆಗಳು — ಹೋಲಿಸಿ, ಫಿಲ್ಟರ್ ಮಾಡಿ ಮತ್ತು ವಿವರಗಳಿಗಾಗಿ ಬೆಳೆಯನ್ನು ಒತ್ತಿ",
    filter_search: "ಬೆಳೆ ಹುಡುಕಿ",
    filter_category: "ವರ್ಗ",
    filter_all_categories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    filter_season: "ಹಂಗಾಮು",
    filter_all_seasons: "ಎಲ್ಲಾ ಹಂಗಾಮುಗಳು",
    filter_sort: "ಕ್ರಮಗೊಳಿಸಿ",
    sort_price_high: "ಬೆಲೆ: ಹೆಚ್ಚು ಇಂದ ಕಡಿಮೆ",
    sort_price_low: "ಬೆಲೆ: ಕಡಿಮೆ ಇಂದ ಹೆಚ್ಚು",
    sort_name_az: "ಹೆಸರು A to Z",
    sort_trending_up: "ಹೆಚ್ಚುತ್ತಿರುವ ಬೆಲೆಗಳು ↑",
    sort_trending_down: "ಇಳಿಯುತ್ತಿರುವ ಬೆಲೆಗಳು ↓",
    sort_risk_low: "ಕಡಿಮೆ ಅಪಾಯ ಮೊದಲು",
    summary_total: "ಒಟ್ಟು ಬೆಳೆಗಳು",
    show_less: "ಕಡಿಮೆ ತೋರಿಸಿ ↑",
    crops: "ಬೆಳೆಗಳು",
    live_price: "ಇಂದು",
    past_price: "ನಿನ್ನೆ",
    demand: "ಬೇಡಿಕೆ",
    risk: "ಅಪಾಯ",
    low_risk: "ಕಡಿಮೆ ಅಪಾಯ",
    medium_risk: "ಮಧ್ಯಮ ಅಪಾಯ",
    high_risk: "ಹೆಚ್ಚು ಅಪಾಯ",
    yearly_profit: "ವಾರ್ಷಿಕ",
    per_qtl: "/ಕ್ವಿಂ",

    // Crop Detail
    smart_rec: "ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸು",
    analyzing: "ಬೆಳೆ ಮಾಹಿತಿ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ…",
    risk_level: "ಅಪಾಯ ಮಟ್ಟ",
    yearly_profit_label: "ವಾರ್ಷಿಕ ಲಾಭ",
    demand_score: "ಬೇಡಿಕೆ ಅಂಕ",
    smart_score: "ಸ್ಮಾರ್ಟ್ ಅಂಕ",
    forecast_7d: "7-ದಿನದ ಮುನ್ಸೂಚನೆ",
    price_trend_title: "📉 ದರ ಪ್ರವೃತ್ತಿ (₹ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್)",
    last_30_days: "ಕಳೆದ 30 ದಿನ",
    last_12_months: "12 ತಿಂಗಳು",
    seed_demand_title: "📦 ಬೀಜ ಬೇಡಿಕೆ — ಕಳೆದ 12 ತಿಂಗಳು (ಕೆಜಿ)",
    growing_guide: "🌱 ಬೆಳೆ ಮಾಹಿತಿ & ಬೆಳೆಸುವ ಮಾರ್ಗದರ್ಶಿ",
    avg_demand: "📦 ಸರಾಸರಿ ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ",
    sell_suggested_wait: "ಸಲಹೆ: {days} ದಿನಗಳು ಕಾಯಿರಿ",
    sell_suggested_now: "ಸಲಹೆ: ಈಗಲೇ ಮಾರಿ!",
    sell_reason_up: "ಬೆಲೆಗಳು ಏರುತ್ತಿವೆ",
    sell_reason_peak: "ಮಾರುಕಟ್ಟೆ ಗರಿಷ್ಠ ಮಟ್ಟ ತಲುಪಿದೆ",
    better_alternatives: "🔄 ಉತ್ತಮ ಪರ್ಯಾಯಗಳು",
    same_season: "ಉತ್ತಮ ಅಂಕ ಹೊಂದಿರುವ ಅದೇ ಋತುವಿನ ಬೆಳೆಗಳು",
    no_alternatives: "ಅದೇ ಋತುವಿನ ಪರ್ಯಾಯಗಳು ಸಿಗಲಿಲ್ಲ.",
    risk_analyzer: "📊 ಮುಂದುವರಿದ ಅಪಾಯ ವಿಶ್ಲೇಷಕ",
    risk_analyzer_sub: "ಡೇಟಾ ಆಧಾರಿತ ಮಾರುಕಟ್ಟೆ ಸ್ಥಿರತೆ ಮಾಹಿತಿ",
    pvi_label: "ದರ ಚಂಚಲತೆ ಸೂಚ್ಯಂಕ (PVI)",
    weather_risk_label: "ಋತು ಹವಾಮಾನ ಅಪಾಯ",
    market_sentiment: "ಮಾರುಕಟ್ಟೆ ಭಾವನೆ",
    season_label: "ಋತು",
    harvest_label: "ತಿಂಗಳು ಕೊಯ್ಲು",
    per_quintal: "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ)",
    past_close: "ಹಿಂದಿನ ದರ",
    ideal_soil: "ಸೂಕ್ತ ಮಣ್ಣಿನ ವಿಧ",
    water_need: "ನೀರಿನ ಅಗತ್ಯ",
    row_spacing: "ಸಾಲಿನ ಅಂತರ",
    ideal_temp: "ಸೂಕ್ತ ತಾಪಮಾನ",
    prob: "% ಸಂಭಾವ್ಯತೆ",
    score_label: "/100 ಅಂಕ",
    highly_recommended: "ಅತ್ಯಂತ ಶಿಫಾರಸು",
    recommended: "ಶಿಫಾರಸು",
    grow_with_care: "ಎಚ್ಚರಿಕೆಯಿಂದ ಬೆಳೆಸಿ",
    high_risk_reward: "ಹೆಚ್ಚು ಅಪಾಯ — ಹೆಚ್ಚು ಲಾಭ",
    not_recommended: "ಶಿಫಾರಸು ಮಾಡಲ್ಲ",
    analysis_score: "ವಿಶ್ಲೇಷಣೆ ಅಂಕ",
    ma_label: "ಸರಾ ಚಲನ",
    price_label: "ದರ",
    day_short: "ದಿನ",

    // Recommendations
    rec_strong: "ಪ್ರಬಲ ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆ ಮತ್ತು ಅನುಕೂಲಕರ ದರ ಪ್ರವೃತ್ತಿ ಹೊಂದಿದೆ. ಈ ಋತುವಿನಲ್ಲಿ ಇದು ಅತ್ಯಂತ ಲಾಭದಾಯಕ ಆಯ್ಕೆ.",
    rec_steady: "ಸ್ಥಿರ ಬೇಡಿಕೆ ಹೊಂದಿದೆ. ಸಾಧಾರಣ ಆದರೆ ಸ್ಥಿರ ಆದಾಯ ನಿರೀಕ್ಷಿಸಿ.",
    rec_fluctuating: "ಚಂಚಲ ದರ ತೋರಿಸುತ್ತದೆ. ಹೆಚ್ಚು ಬಿತ್ತನೆ ಮೊದಲು ಅಪಾಯ ತಗ್ಗಿಸುವ ಕ್ರಮ ತೆಗೆದುಕೊಳ್ಳಿ.",
    rec_high_risk: "ದರ ತೀವ್ರ ಏರಿಳಿತ ಅನುಭವಿಸುತ್ತದೆ. ಶೀತಲ ಸಂಗ್ರಹ ಅಥವಾ ಖರೀದಿದಾರ ಒಪ್ಪಂದ ಇದ್ದರೆ ಮಾತ್ರ ಬೆಳೆಸಿ.",
    rec_poor: "ಕಳಪೆ ಮಾರುಕಟ್ಟೆ ಭಾವನೆ ಮತ್ತು ಇಳಿಯುತ್ತಿರುವ ದರ. ಕೆಳಗೆ ತೋರಿಸಿದ ಉತ್ತಮ ಪರ್ಯಾಯ ಪರಿಗಣಿಸಿ.",

    // Contact
    contact_title: "📞 ಸಂಪರ್ಕಿಸಿ",
    contact_sub: "ಸಹಾಯ ಬೇಕೇ? ಭಾರತಾದ್ಯಂತ ರೈತರಿಗೆ ನೆರವಾಗಲು ತಂಡ ಸಿದ್ಧವಾಗಿದೆ.",
    helpline_title: "ರೈತ ಸಹಾಯ ಹಸ್ತ",
    helpline_note: "ಉಚಿತ • ಸೋಮ–ಶನಿ, ಬೆಳಗ್ಗೆ 8 – ಸಂಜೆ 6",
    whatsapp_title: "ವಾಟ್ಸ್ಆಪ್ ಬೆಂಬಲ",
    whatsapp_note: "ಇಂದಿನ ದರ ಪಡೆಯಲು ಬೆಳೆ ಹೆಸರು ಕಳುಹಿಸಿ",
    email_title: "ಇಮೇಲ್",
    email_note: "24 ಗಂಟೆಯಲ್ಲಿ ಉತ್ತರ",
    kisan_title: "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್",
    kisan_note: "ಭಾರತ ಸರ್ಕಾರ • 24×7 ಉಚಿತ",
    nearest_mandi: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ",
    find_mandi: "enam.gov.in — ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆ ಹುಡುಕಿ",

    // Footer
    footer_tagline: "ನೇರ ಬೆಳೆ ಮಾಹಿತಿ, ಮಾರುಕಟ್ಟೆ ದರ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸಿನ ಮೂಲಕ ರೈತರಿಗೆ ಅಧಿಕಾರ ನೀಡುವುದು.",
    footer_quick_links: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    footer_contact_details: "ಸಂಪರ್ಕ ವಿವರಗಳು",
    footer_copy: "© 2025 ರೈತ ಬಂಧು — ಸ್ಮಾರ್ಟ್ ಬೆಳೆ ನಿರ್ಧಾರ ವ್ಯವಸ್ಥೆ.",
    footer_note: "ಎಲ್ಲ ದರ ₹/ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ) • ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ",
    footer_helpline: "📞 ಸಹಾಯವಾಣಿ: 1800-123-4567",
    footer_whatsapp: "📱 ವಾಟ್ಸ್ಆಪ್: +91 98765 43210",
    footer_email: "✉️ help@raitha.in",
    footer_kisan: "🚨 ಕಿಸಾನ್ ಕಾಲ್: 1551 (24×7)",
    // States Served
    states_title: "ನಾವು ಭಾರತದಾದ್ಯಂತ ರೈತರಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುತ್ತೇವೆ.",
    states_list: "ಕರ್ನಾಟಕ | ಮಹಾರಾಷ್ಟ್ರ | ಪಂಜಾಬ್ | ಉತ್ತರ ಪ್ರದೇಶ | ಮಧ್ಯಪ್ರದೇಶ | ಗುಜರಾತ್ | ರಾಜಸ್ಥಾನ",

    // Active Season Widget
    active_season: "ಸಕ್ರಿಯ ಋತು",
    indian_agri: "ಭಾರತೀಯ ಕೃಷಿ",
    live_weather: "ನೇರ ಹವಾಮಾನ",
    central_india_weather: "ಮಧ್ಯ ಭಾರತ ಹವಾಮಾನ",
    season_kharif: "ಮುಂಗಾರು (ಖರೀಫ್)",
    season_rabi: "ಹಿಂಗಾರು (ರಬಿ)",
    season_zaid: "ಬೇಸಿಗೆ (ಜಾಯಿದ್)",

    // Districts Served
    states_title: "ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ.",
    states_list: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ | ಕೋಲಾರ | ಚಿಕ್ಕಬಳ್ಳಾಪುರ | ಮೈಸೂರು | ಬೆಳಗಾವಿ | ಶಿವಮೊಗ್ಗ | ದಾವಣಗೆರೆ | ಬಾಗಲಕೋಟೆ",
    
    // Weather
    humidity: "ಆರ್ದ್ರತೆ",
    rainfall: "ಮಳೆ",
    wind_speed: "ಗಾಳಿಯ ವೇಗ",
    uv_index: "ಯುವಿ ಸೂಚ್ಯಂಕ",
    weather_planning: "7-ದಿನದ ಯೋಜನೆ ಮುನ್ಸೂಚನೆ",
    expected_rain: "ನಿರೀಕ್ಷಿತ ಕಾಲೋಚಿತ ಮಳೆ",
    current_season_rain: "ಪ್ರಸ್ತುತ ಋತುವಿನ ಮಳೆ",
    monthly_rainfall_analysis: "ಮಾಸಿಕ ಮಳೆ ವಿಶ್ಲೇಷಣೆ (2025)",    serve_states: "ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ನಮ್ಮ ಸೇವೆ ಲಭ್ಯವಿದೆ.",
    monthly_rainfall_analysis: "ಮಳೆ ಬುದ್ಧಿವಂತಿಕೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ (ಪ್ರಸ್ತುತ ವರ್ಷ)",
    karnataka_states: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ | ಕೋಲಾರ | ಚಿಕ್ಕಬಳ್ಳಾಪುರ | ಮೈಸೂರು | ಬೆಳಗಾವಿ | ಶಿವಮೊಗ್ಗ | ದಾವಣಗೆರೆ | ಬಾಗಲಕೋಟೆ",
    empty_mandi: "ಬೆಳೆಗಳು ಸಿಗಲಿಲ್ಲ. ಫಿಲ್ಟರ್ ಬದಲಿಸಿ ಪ್ರಯತ್ನಿಸಿ.",
    live_prices_for: "ನೇರ ದರಗಳು",

    // Auth Page
    back_to_home: "← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    login_welcome_back: "ಸ್ವಾಗತ",
    login_create_account: "ಖಾತೆ ತೆರೆಯಿರಿ",
    login_phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
    login_pass: "ಪಾಸ್ ವರ್ಡ್",
    login_btn: "ಲಾಗಿನ್",
    login_no_account: "ಖಾತೆ ಇಲ್ಲವೇ?",
    login_create_link: "ಖಾತೆ ತೆರೆಯಿರಿ",
    login_full_name: "ಪೂರ್ಣ ಹೆಸರು",
    login_signup_btn: "ಸೈನ್ ಅಪ್",
    login_have_account: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    login_instead_link: "ಲಾಗಿನ್ ಮಾಡಿ",
    signup_name_placeholder: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    login_pass_create: "ಪಾಸ್ ವರ್ಡ್ ರಚಿಸಿ",

    // Weather Conditions
    weather_rainy: "ಮಳೆಯ ವಾತಾವರಣ",
    weather_sunny: "ಹೆಚ್ಚಾಗಿ ಬಿಸಿಲು",
    weather_clear: "ಲಕ್ಷ್ಮಣ ಆಕಾಶ",
    weather_monsoon: "ಮುಂಗಾರು ಋತು",
    weather_winter: "ಚಳಿಗಾಲದ ಋತು",
    weather_summer: "ಬೇಸಿಗೆ ಋತು",
    weather_planning: "7-ದಿನದ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",

    // Crop Insights
    label_region: "ಪ್ರದೇಶ",
    label_cultivated_area: "ಬೆಳೆ ಪ್ರದೇಶ",
    label_market_presence: "ಮಾರುಕಟ್ಟೆ ಉಪಸ್ಥಿತಿ",
    label_top_crops: "ಇಲ್ಲಿನ ಪ್ರಮುಖ ಬೆಳೆಗಳು",
    label_current_price: "ಪ್ರಸ್ತುತ ಬೆಲೆ",
    label_monthly_avg: "ತಿಂಗಳ ಸರಾಸರಿ",
    label_reason: "ಕಾರಣ",
    badge_popular: "ಜನಪ್ರಿಯ",
    badge_high_demand: "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ",

    // Interactive Status
    step1_title: "ಹಂತ 1: ಯೋಜನೆ",
    step2_title: "ಹಂತ 2: ಕೊಯ್ಲು ಮತ್ತು ಮಾರಾಟ",
    q_growing: "ನೀವು ಈಗ {crop} ಬೆಳೆಯುತ್ತಿದ್ದೀರಾ?",
    q_selling: "ನೀವು ಈಗ ಈ ಬೆಳೆಯನ್ನು ಮಾರಾಟ ಮಾಡುತ್ತಿದ್ದೀರಾ?",
    q_interested: "ಈ ಬೆಳೆಯನ್ನು ಬೆಳೆಯಲು ನಿಮಗೆ ಆಸಕ್ತಿ ಇದೆಯೇ?",
    live_mandi_price: "ಲೈವ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ",
    harvest_forecast: "ಕೊಯ್ಲು ಮುನ್ಸೂಚನೆ (ಅಂದಾಜು)",
    btn_sell_now: "ಹೌದು, ಈಗಲೇ ಮಾರಿ",
    btn_keep_growing: "ಇಲ್ಲ, ಇನ್ನೂ ಬೆಳೆಯಲಿ",
    btn_start_cropping: "ಹೌದು, ಬೆಳೆಯಲು ಪ್ರಾರಂಭಿಸಿ",
    btn_maybe_later: "ನಂತರ ನೋಡೋಣ",

    // Mandi Details
    per_qtl_unit: "ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ (100 ಕೆಜಿ)",
    label_sell_strategy: "ಮಾರಾಟದ ತಂತ್ರ",
    strategy_wait: "ದರ ಹೆಚ್ಚಳಕ್ಕಾಗಿ ಕಾಯಿರಿ",
    strategy_sell: "ಈಗಲೇ ಮಾರಿ",
    strategy_hold: "ದಾಸ್ತಾನು ಇರಿಸಿ",

    // Diseases
    label_symptoms: "ಲಕ್ಷಣಗಳು",
    label_prevention: "ತಡೆಗಟ್ಟುವಿಕೆ",

    // Advanced Risk
    label_pvi: "ಬೆಲೆ ಬದಲಾವಣೆ ವ್ಯಾಪ್ತಿ (ಮಾಸಿಕ)",
    label_pvi_note: "ಬೆಲೆ ಏರಿಳಿತ ಸೂಚ್ಯಂಕ",
    label_market_sentiment: "ಮಾರುಕಟ್ಟೆ ಭಾವನೆ",
    label_sentiment_score: "ಅಂಕ",
    label_weather_risk: "ಹವಾಮಾನ ಅಪಾಯ",
    label_probability: "ಸಂಭಾವ್ಯತೆ",

    // Categories (Short)
    cat_vegetable: "ತರಕಾರಿ",
    cat_fruit: "ಹಣ್ಣು",
    cat_spice: "ಮಸಾಲೆ",
    cat_flower: "ಹೂವು",
    cat_grain: "ಧಾನ್ಯ",

    // Soil & Water
    soil_sandy_loam: "ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು",
    soil_well_drained: "ಉತ್ತಮ ಒಳಚರಂಡಿ",
    soil_rich_organic: "ಸಾವಯವ ಮಣ್ಣು",
    soil_clay_loam: "ಜೇಡಿ ಮಣ್ಣು",
    soil_dry_sandy: "ಒಣ ಮರಳು ಮಣ್ಣು",
    soil_alluvial: "ಮೆಕ್ಕಲು ಮಣ್ಣು",
    soil_deep_black: "ಆಳವಾದ ಕಪ್ಪು ಮಣ್ಣು",
    soil_laterite: "ಲ್ಯಾಟರೈಟ್",
    soil_well_drained_sandy: "ಒಳ್ಳೆ ಒಳಚರಂಡಿ ಮರಳು",
    soil_standard: "ಸಾಮಾನ್ಯ ಮಣ್ಣು",

    water_high_rainfed: "ಹೆಚ್ಚು (ಮಳೆ ಆಧಾರಿತ)",
    water_moderate_irrigate: "ಮಧ್ಯಮ (ನೀರಾವರಿ)",
    water_very_high: "ಅತ್ಯಧಿಕ",
    water_low_to_moderate: "ಕಡಿಮೆ ಇಂದ ಮಧ್ಯಮ",
    water_moderate: "ಮಧ್ಯಮ",

    // Diseases Content
    disease_leaf_spot: "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
    symptom_leaf_spot: "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ ಕಂದು ಬಣ್ಣದ ವೃತ್ತಗಳು",
    prevent_leaf_spot: "ಬೆಳೆ ಸರದಿ, ಶುದ್ಧ ಬೀಜಗಳ ಬಳಕೆ",
    disease_root_rot: "ಬೇರು ಕೊಳೆ ರೋಗ",
    symptom_root_rot: "ಬಾಡುವಿಕೆ, ಕಪ್ಪು ಬೇರುಗಳು",
    prevent_root_rot: "ಅತಿಯಾದ ನೀರು ತಪ್ಪಿಸಿ, ಉತ್ತಮ ಒಳಚರಂಡಿ",

    // Extended Diseases
    disease_early_blight: "ಶೀಘ್ರ ಅಂಗಮಾರಿ ರೋಗ",
    disease_bacterial_wilt: "ಬ್ಯಾಕ್ಟೀರಿಯಾದ ಬಾಡುವಿಕೆ",
    disease_leaf_curl_virus: "ಎಲೆ ಮುದುರು ವೈರಸ್",
    disease_purple_blotch: "ನೇರಳೆ ಮಚ್ಚೆ ರೋಗ",
    disease_downy_mildew: "ಮೃದು ಬೆಂಕಿ ರೋಗ",
    disease_panama_wilt: "ಪನಾಮಾ ಬಾಡುವಿಕೆ",
    disease_sigatoka_leaf_spot: "ಸಿಗಟೋಕಾ ಎಲೆ ಚುಕ್ಕೆ",

    // Hybrids
    hybrid_arka_rakshak: "ಅರ್ಕಾ ರಕ್ಷಕ್",
    hybrid_pusa_hybrid_4: "ಪೂಸಾ ಹೈಬ್ರಿಡ್-4",
    hybrid_abhinav: "ಅಭಿನವ್",
    hybrid_us_440: "ಯುಎಸ್-440",
    hybrid_bharat: "ಭಾರತ್",
    hybrid_indra: "ಇಂದ್ರ",
    hybrid_orobelle: "ಒರೊಬೆಲ್ಲೆ",
    hybrid_gladiator: "ಗ್ಲಾಡಿಯೇಟರ್",
    hybrid_first_red: "ಫಸ್ಟ್ ರೆಡ್",
    hybrid_taj_mahal: "ತಾಜ್ ಮಹಲ್",

    // Header Titles
    district_insights_title: "ಪ್ರಾದೇಶಿಕ ಒಳನೋಟಗಳು",
    smart_selling_title: "ಸ್ಮಾರ್ಟ್ ಮಾರಾಟ ಮಾಹಿತಿ",
  }
};

const MONTH_NAMES = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  kn: ["ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗ", "ಸೆಪ್ಟೆ", "ಅಕ್ಟೋ", "ನವೆ", "ಡಿಸೆ"]
};

const FULL_MONTH_NAMES = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  kn: ["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"]
};

function tDate(date, isFull = false) {
  const lang = getCurrentLang();
  const months = isFull ? FULL_MONTH_NAMES[lang] : MONTH_NAMES[lang];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  if (lang === "kn") {
    return `${day} ${month}, ${year}`;
  }
  return `${day} ${month} ${year}`;
}

// ─── CATEGORY NAMES ──────────────────────────────────────────
const CATEGORY_NAMES = {
  en: {
    Vegetable: "Vegetable", Fruit: "Fruit", Flower: "Flower",
    Grain: "Grain", Pulse: "Pulse", Oilseed: "Oilseed",
    "Cash Crop": "Cash Crop", Spice: "Spice", Medicinal: "Medicinal"
  },
  kn: {
    Vegetable: "ತರಕಾರಿ", Fruit: "ಹಣ್ಣು", Flower: "ಹೂವು",
    Grain: "ಧಾನ್ಯ", Pulse: "ಬೇಳೆಕಾಳು", Oilseed: "ಎಣ್ಣೆ ಬೀಜ",
    "Cash Crop": "ನಗದು ಬೆಳೆ", Spice: "ಮಸಾಲೆ", Medicinal: "ಔಷಧೀಯ"
  }
};

// ─── SEASON NAMES ─────────────────────────────────────────────
const SEASON_NAMES = {
  en: { Kharif: "Kharif", Rabi: "Rabi", Summer: "Summer", Winter: "Winter", Monsoon: "Monsoon", Zaid: "Zaid" },
  kn: { Kharif: "ಮುಂಗಾರು", Rabi: "ಹಿಂಗಾರು", Summer: "ಬೇಸಿಗೆ", Winter: "ಚಳಿಗಾಲ", Monsoon: "ಮಾನ್ಸೂನ್", Zaid: "ಜಾಯಿದ್" }
};

// ─── CROP NAME MAP ─────────────────────────────────────────────
const CROP_KANNADA_NAMES = {
  "veg-01": "ಟೊಮ್ಯಾಟೊ", "veg-02": "ಈರುಳ್ಳಿ", "veg-03": "ಆಲೂಗಡ್ಡೆ",
  "veg-04": "ಬದನೆ", "veg-05": "ಎಲೆಕೋಸು", "veg-06": "ಕ್ಯಾರೆಟ್",
  "veg-07": "ಹೂಕೋಸು", "veg-08": "ಪಾಲಕ್", "veg-09": "ಬಟಾಣಿ",
  "veg-10": "ಮೆಣಸಿನಕಾಯಿ", "veg-11": "ಕ್ಯಾಪ್ಸಿಕಂ", "veg-12": "ಸೌತೆಕಾಯಿ",
  "veg-13": "ಹಾಗಲಕಾಯಿ", "veg-14": "ಸೋರೆಕಾಯಿ", "veg-15": "ಕುಂಬಳಕಾಯಿ",
  "veg-16": "ಹೀರೆಕಾಯಿ", "veg-17": "ನುಗ್ಗೆ", "veg-18": "ಬೆಳ್ಳುಳ್ಳಿ",
  "veg-19": "ಶುಂಠಿ", "veg-20": "ಅರಿಶಿನ", "veg-21": "ಮೆಂತ್ಯ",
  "veg-22": "ಕೊತ್ತಂಬರಿ",
  "frt-01": "ಮಾವು", "frt-02": "ಬಾಳೆ", "frt-03": "ಪಪ್ಪಾಯ",
  "frt-04": "ಸೀಬೆ", "frt-05": "ದಾಳಿಂಬೆ", "frt-06": "ಕಲ್ಲಂಗಡಿ",
  "frt-07": "ಖರ್ಬೂಜ", "frt-08": "ದ್ರಾಕ್ಷಿ", "frt-09": "ಕಿತ್ತಳೆ",
  "frt-10": "ನಿಂಬೆ", "frt-11": "ಅನಾನಸ್", "frt-12": "ತೆಂಗು",
  "frt-13": "ಹಲಸು",
  "flw-01": "ಗುಲಾಬಿ", "flw-02": "ಚೆಂಡು ಹೂ", "flw-03": "ಮಲ್ಲಿಗೆ",
  "flw-04": "ತಾವರೆ", "flw-05": "ಸುಗಂಧರಾಜ", "flw-06": "ಶಿಲಿಭೃಂಗ",
  "grn-01": "ಅಕ್ಕಿ", "grn-02": "ಗೋಧಿ", "grn-03": "ಜೋಳ",
  "grn-04": "ಬಾರ್ಲಿ",
  "pls-01": "ಕಡಲೆ", "pls-02": "ಮಸೂರ", "pls-03": "ತೊಗರಿ",
  "med-01": "ಅಲೋವೆರ", "med-02": "ಅಶ್ವಗಂಧ", "med-03": "ತುಳಸಿ",
  "med-04": "ನಿಂಬೆ ಹುಲ್ಲು", "med-05": "ಪುದೀನ",
  "oil-01": "ಕಡಲೆಕಾಯಿ", "oil-02": "ಸಾಸಿವೆ",
  "spc-01": "ಜೀರಿಗೆ", "spc-04": "ಏಲಕ್ಕಿ", "spc-05": "ಕಾಳುಮೆಣಸು",
  "spc-06": "ಲವಂಗ", "spc-07": "ಕುಂಕುಮ ಕೇಸರಿ",
  "csh-01": "ಕಬ್ಬು", "csh-02": "ಹತ್ತಿ", "csh-03": "ಸೆಣಬು"
};

// ─── APPLY LANGUAGE TO PAGE ────────────────────────────────────
function applyLanguage() {
  const lang = getCurrentLang();

  // Update lang toggle button
  const btn = document.getElementById("langToggleBtn");
  if (btn) {
    btn.textContent = lang === "en" ? "ಕನ್ನಡ" : "English";
    btn.title = lang === "en" ? "Switch to Kannada" : "ಇಂಗ್ಲಿಷ್‌ಗೆ ಬದಲಿಸಿ";
  }

  // Swap header brand name
  document.querySelectorAll(".brand-name").forEach(el => {
    el.textContent = t("app_name");
  });

  // Swap splash titles
  const splashTitles = document.querySelectorAll(".splash-title");
  if (splashTitles.length >= 2) {
    splashTitles[0].textContent = t("welcome_to");
    splashTitles[1].textContent = t("splash_name");
  } else if (splashTitles.length === 1) {
    splashTitles[0].textContent = t("splash_name");
  }

  // Apply data-i18n text
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val) el.textContent = val;
  });

  // Apply data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = t(key);
    if (val) el.placeholder = val;
  });

  // Apply data-i18n-html
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    const val = t(key);
    if (val) el.innerHTML = val;
  });
}

// ─── AUTH HELPERS ──────────────────────────────────────────────
function getSession() {
  const user = localStorage.getItem('raitha_user');
  return user ? JSON.parse(user) : null;
}

function logout() {
  if (confirm("Sign out from Raitha Bandhu?")) {
    localStorage.removeItem('raitha_user');
    window.location.href = 'login.html';
  }
}

function updateAuthUI() {
  const user = getSession();
  const authContainer = document.getElementById('authSection');
  if (!authContainer) return;

  if (user && user.isLoggedIn) {
    authContainer.innerHTML = `
      <a href="profile.html" class="auth-btn profile-link">
        <span class="auth-icon">🧑‍🌾</span>
        <span class="auth-text">${t('nav_profile')}</span>
      </a>
      <button onclick="logout()" class="auth-btn logout-link">
        <span class="auth-text">${t('nav_logout')}</span>
      </button>
    `;
  } else {
    authContainer.innerHTML = `
      <a href="login.html" class="auth-btn login-link">
        <span class="auth-icon">👤</span>
        <span class="auth-text">${t('nav_login')}</span>
      </a>
    `;
  }
}

// Auto apply on load
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();
  updateAuthUI();
});

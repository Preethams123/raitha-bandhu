// ============================================================
// RAITHA — Smart Crop Data Layer
// Crops: Vegetables, Fruits, Flowers, Grains, Pulses, Spices, Medicinal
// ============================================================

const FARMER_QUOTES = {
  en: [
    "Agriculture is our wisest pursuit — it contributes most to real wealth, good morals, and happiness. — Thomas Jefferson",
    "The farmer buys retail, sells wholesale, and pays the freight both ways.",
    "Farming isn't just a job; it's a way of life that sustains the world.",
    "To plant a garden is to believe in tomorrow.",
    "Agriculture is the most healthful, most useful, and most noble employment of man. — George Washington",
    "The ultimate goal of farming is not growing crops, but the cultivation and perfection of human beings."
  ],
  kn: [
    "ಕೃಷಿ ನಮ್ಮ ಬುದ್ಧಿವಂತ ಪ್ರಯಾಸ — ಅದು ನಿಜವಾದ ಸಂಪತ್ತು, ಒಳ್ಳೆಯ ನೈತಿಕತೆ ಮತ್ತು ಸಂತೋಷಕ್ಕೆ ಅತ್ಯಂತ ಕೊಡುಗೆ ನೀಡುತ್ತದೆ. — ಜೆಫರ್ಸನ್",
    "ರೈತ ಚಿಲ್ಲರೆ ಕೊಳ್ಳುತ್ತಾನೆ, ಸಗಟಿಗೆ ಮಾರುತ್ತಾನೆ, ಉಭಯ ದಿಕ್ಕಿನಲ್ಲೂ ಸಾಗಣೆ ಶುಲ್ಕ ನೀಡುತ್ತಾನೆ.",
    "ಕೃಷಿ ಕೇವಲ ಕೆಲಸವಲ್ಲ; ಅದು ಜಗತ್ತನ್ನು ಪೋಷಿಸುವ ಜೀವನ ಶೈಲಿ.",
    "ತೋಟ ಬೆಳೆಸುವುದು ನಾಳೆಯ ಮೇಲೆ ನಂಬಿಕೆ ಇಡುವುದು.",
    "ಕೃಷಿ ಮಾನವನ ಅತ್ಯಂತ ಆರೋಗ್ಯಕರ, ಉಪಯುಕ್ತ ಮತ್ತು ಉದಾತ್ತ ಉದ್ಯೋಗ. — ಜಾರ್ಜ್ ವಾಷಿಂಗ್ಟನ್",
    "ಕೃಷಿಯ ಅಂತಿಮ ಗುರಿ ಬೆಳೆ ಬೆಳೆಯುವುದಲ್ಲ, ಮಾನವನ ಸಂಸ್ಕರಣೆ ಮತ್ತು ಪರಿಪೂರ್ಣತೆ."
  ]
};

function getRandomQuote() {
  const lang = (typeof getCurrentLang === "function") ? getCurrentLang() : "en";
  const quotes = FARMER_QUOTES[lang] || FARMER_QUOTES["en"];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function getCropImageUrl(name) {
  // Using Bing Image Proxy for direct, real thumbnails
  return `https://tse1.mm.bing.net/th?q=${encodeURIComponent(name + " farm crop field agriculture")}&w=400&h=300&c=7&rs=1&p=0`;
}

function seededRand(seed) {
  let s = seed;
  return function () {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return ((s >>> 0) / 0xffffffff);
  };
}

function generatePrices(base, volatility, seed) {
  const rand = seededRand(seed);
  return Array.from({ length: 12 }, (_, i) => {
    const seasonal = Math.sin((i / 11) * Math.PI) * volatility * 0.4;
    const noise = (rand() - 0.5) * volatility;
    return Math.max(200, Math.round(base + seasonal + noise));
  });
}

function generate30DayPrices(base, volatility, seed) {
  const rand = seededRand(seed + 999);
  let currentPrice = base;
  return Array.from({ length: 30 }, (_, i) => {
    const trend = (rand() - 0.48) * (volatility / 10); // Slight trend bias
    currentPrice = Math.max(200, currentPrice + trend);
    return Math.round(currentPrice);
  });
}

function generateSeedSold(base, seed) {
  const rand = seededRand(seed + 1234);
  return Array.from({ length: 12 }, () =>
    Math.max(10, Math.round(base + (rand() - 0.5) * base * 0.4))
  );
}

const HYBRID_DATA = {
  "Tomato": ["Arka Rakshak", "Pusa Hybrid-4", "Abhinav", "US-440"],
  "Onion": ["Agrifound Dark Red", "N-53", "Bhima Super", "Arka Kalyan"],
  "Potato": ["Kufri Jyoti", "Kufri Bahar", "Kufri Pukhraj"],
  "Brinjal": ["Pusa Hybrid-6", "Arka Navneet", "Arka Nidhi"],
  "Cabbage": ["Pusa Drum Head", "Golden Acre", "Green Express"],
  "Carrot": ["Pusa Kesar", "Pusa Meghali", "Nantes"],
  "Cauliflower": ["Pusa Snowball", "Pusa Katki", "Pusa Hybrid-2"],
  "Spinach": ["Pusa Jyoti", "All Green", "Palak Selection"],
  "Peas": ["Arkel", "Bonneville", "Azad P-1"],
  "Chilli": ["Arka Meghana", "G-4", "Pusa Sadabahar", "Tejaswini"],
  "Capsicum": ["Bharat", "Indra", "Orobelle"],
  "Cucumber": ["Pusa Sanyog", "Pant Khira-1", "Malini"],
  "Bitter Gourd": ["Pusa Vishesh", "Arka Harit", "Priya"],
  "Bottle Gourd": ["Pusa Naveen", "Arka Bahar", "Samrat"],
  "Pumpkin": ["Arka Chandan", "Pusa Vishwas", "CO-1"],
  "Ridge Gourd": ["Arka Sumeet", "Pusa Nasdar", "Satputia"],
  "Drumstick": ["PKM-1", "ODC-3", "Bhagya"],
  "Garlic": ["Yamuna Safed", "G-282", "Agrifound White"],
  "Ginger": ["Rio-de-Janeiro", "Maran", "Varada"],
  "Turmeric": ["Selam", "IISR Pragati", "Pratibha"],
  "Fenugreek": ["Pusa Early Bunching", "Kasuri Methi"],
  "Coriander": ["Pusa Selection-360", "Pant Haritma"],
  "Mango": ["Amrapali", "Mallika", "Dashehari Hybrid"],
  "Banana": ["G-9 (Grand Naine)", "Robusta", "Rasthali"],
  "Papaya": ["Pusa Nanha", "Co-7", "Red Lady"],
  "Guava": ["Allahabad Safeda", "L-49", "Arka Mridula"],
  "Pomegranate": ["Bhagwa", "Mridula", "Ganesh"],
  "Watermelon": ["Arka Manik", "Sugar Baby", "Kiran"],
  "Muskmelon": ["Arka Jeet", "Pusa Sharbati"],
  "Grapes": ["Thompson Seedless", "Anab-e-Shahi", "Sonaka"],
  "Orange": ["Nagpur Mandarin", "Coorg Mandarin"],
  "Lemon": ["Vikram", "Sai Sharbati"],
  "Pineapple": ["Giant Kew", "Queen"],
  "Coconut": ["TxD Hybrid", "DxT Hybrid"],
  "Jackfruit": ["Palur-1", "PLR-2"],
  "Rose": ["Gladiator", "First Red", "Taj Mahal"],
  "Marigold": ["Pusa Narangi", "Pusa Basanti"],
  "Jasmine": ["Arka Surabhi", "CO-1"],
  "Lotus": ["Red Lotus", "White Lotus"],
  "Tuberose": ["Prajwal", "Vaibhav"],
  "Chrysanthemum": ["Pusa Anmol", "Pusa Centenary"],
  "Rice": ["BPT-5204", "MTU-1010", "IR-64"],
  "Wheat": ["HD-2967", "PBW-343", "WH-1105"],
  "Maize": ["HQPM-1", "Pusa Hybrid-1"],
  "Barley": ["BH-393", "RD-2035"],
  "Chickpea": ["JG-11", "Pusa-256", "Vijay"],
  "Lentil": ["Pusa Vaibhav", "L-4076"],
  "Pigeon Pea": ["CO-6", "LRG-41"],
  "Aloe Vera": ["Desert Queen", "Standard Aloe"],
  "Ashwagandha": ["Jawahar Asgand-20", "POSHITA"],
  "Tulsi": ["Krishna Tulsi", "Rama Tulsi"],
  "Lemongrass": ["Krishna", "Cauvery"],
  "Mint": ["Kosi", "Himalaya"],
  "Groundnut": ["Kadiri-6", "TAG-24"],
  "Mustard": ["Pusa Bold", "Varuna"],
  "Cumin": ["GC-4", "RZ-19"],
  "Cardamom": ["Mudigere-1", "Appangala-1"],
  "Black Pepper": ["Panniyur-1", "Panniyur-5"],
  "Clove": ["Zanzibar", "Special Selection"],
  "Saffron": ["Kashmir Special"],
  "Sugarcane": ["CO-86032", "CO-0238"],
  "Cotton": ["H-4", "Bunny", "Bt Cotton"],
  "Jute": ["JRO-524", "JRC-321"]
};

const DISEASE_DATA = {
  "Vegetable": ["Early Blight", "Powdery Mildew", "Damping Off", "Bacterial Wilt"],
  "Fruit": ["Fruit Rot", "Anthracnose", "Mealy Bugs", "Leaf Curl"],
  "Grain": ["Leaf Rust", "Blast", "Smut", "Stem Borer"],
  "Flower": ["Botrytis", "Thrips", "Aphids", "Root Rot"],
  "Pulse": ["Fusarium Wilt", "Pod Borer", "Mosaic Virus"],
  "Oilseed": ["White Rust", "Alternaria Blight"],
  "Spice": ["Downy Mildew", "Rhizome Rot"],
  "Medicinal": ["Leaf Spot", "Root Knot Nematode"],
  "Cash Crop": ["Red Rot", "Bollworm", "Wilt"]
};

const DISTRICT_DATA = {
  "Bangalore Rural": { 
    topCrops: ["Tomato", "Grapes", "Rose"], area: "12,400 Ha", production: "2.4L MT", yield: "High",
    taluks: {
      "Devanahalli": ["Devanahalli Mandi", "Avathi Market"],
      "Doddaballapura": ["Doddaballapura Main Mandi", "Tubagere Center"],
      "Hoskote": ["Hoskote APMC", "Sulibele Market"],
      "Nelamangala": ["Nelamangala APMC"]
    }
  },
  "Kolar": { 
    topCrops: ["Tomato", "Mango", "Potato"], area: "45,000 Ha", production: "8.1L MT", yield: "Very High",
    taluks: {
      "Kolar": ["Kolar APMC (Tomato Hub)", "Vokkaleri Market"],
      "Malur": ["Malur APMC", "Lakkur Center"],
      "Bangarapet": ["Bangarapet Mandi"],
      "Mulbagal": ["Mulbagal APMC"]
    }
  },
  "Chikkaballapur": { 
    topCrops: ["Onion", "Grapes", "Pomegranate"], area: "32,000 Ha", production: "5.5L MT", yield: "High",
    taluks: {
      "Chintamani": ["Chintamani APMC", "Kaiwara Market"],
      "Sidlaghatta": ["Sidlaghatta Silk/Agri Mandi"],
      "Gauribidanur": ["Gauribidanur APMC"]
    }
  },
  "Mysuru": { 
    topCrops: ["Banana", "Turmeric", "Ginger"], area: "28,000 Ha", production: "4.2L MT", yield: "Moderate",
    taluks: {
      "Nanjangud": ["Nanjangud APMC"],
      "Hunsur": ["Hunsur Mandi"],
      "T.Narasipura": ["T.Narasipura Market"]
    }
  },
  "Belagavi": { 
    topCrops: ["Sugarcane", "Onion", "Maize"], area: "85,000 Ha", production: "15.2L MT", yield: "High",
    taluks: {
      "Athani": ["Athani APMC"],
      "Gokak": ["Gokak Mandi"],
      "Chikkodi": ["Chikkodi Market"]
    }
  },
  "Shimoga": { 
    topCrops: ["Arecanut", "Ginger", "Banana"], area: "62,000 Ha", production: "3.5L MT", yield: "Moderate",
    taluks: {
      "Sagar": ["Sagar APMC", "Jog Falls Market"],
      "Thirthahalli": ["Thirthahalli Mandi"],
      "Shikaripura": ["Shikaripura Market"]
    }
  },
  "Davangere": {
    topCrops: ["Maize", "Rice", "Cotton"], area: "55,000 Ha", production: "4.8L MT", yield: "High",
    taluks: {
      "Davangere": ["Davangere APMC", "Harihara Mandi"],
      "Channagiri": ["Channagiri Market"]
    }
  },
  "Bagalkot": {
    topCrops: ["Sugarcane", "Pomegranate", "Onion"], area: "48,000 Ha", production: "5.2L MT", yield: "High",
    taluks: {
      "Mudhol": ["Mudhol APMC"],
      "Jamkhandi": ["Jamkhandi Mandi"]
    }
  }
};

function getMandiPrice(crop, mandiName) {
  if (!mandiName) return crop.todayPrice;
  let hash = 0;
  for (let i = 0; i < mandiName.length; i++) hash = mandiName.charCodeAt(i) + ((hash << 5) - hash);
  const offset = (hash % 15) * 10; 
  return Math.round(crop.todayPrice + offset);
}

const DISEASE_DETAILS = {
  "Tomato": [
    { name: "Early Blight", symptoms: "Dark spots with rings on leaves", prevention: "Crop rotation, copper fungicides" },
    { name: "Bacterial Wilt", symptoms: "Sudden wilting of whole plant", prevention: "Soil solarization, resistant varieties" },
    { name: "Leaf Curl Virus", symptoms: "Curled, yellowing leaves", prevention: "Control whiteflies, use nets" }
  ],
  "Onion": [
    { name: "Purple Blotch", symptoms: "Purple lesions on leaves", prevention: "Seed treatment, proper drainage" },
    { name: "Downy Mildew", symptoms: "Furry grey mold on leaves", prevention: "Maintain spacing, fungicide spray" }
  ],
  "Banana": [
    { name: "Panama Wilt", symptoms: "Yellowing of leaf margins", prevention: "Flood fallowing, avoid infected suckers" },
    { name: "Sigatoka Leaf Spot", symptoms: "Long brown spots on leaves", prevention: "Timely leaf pruning, drainage" }
  ]
};

const RAW_CROPS = [
  // ─── VEGETABLES ────────────────────────────────────────────
  { id: "veg-01", name: "Tomato",      category: "Vegetable", season: "Winter",  harvestTimeMonth: 3,  basePrice: 1500, volatility: 900,  demandScore: 88, seedBase: 320 },
  { id: "veg-02", name: "Onion",       category: "Vegetable", season: "Winter",  harvestTimeMonth: 4,  basePrice: 1200, volatility: 1100, demandScore: 92, seedBase: 400 },
  { id: "veg-03", name: "Potato",      category: "Vegetable", season: "Winter",  harvestTimeMonth: 3,  basePrice: 900,  volatility: 450,  demandScore: 95, seedBase: 500 },
  { id: "veg-04", name: "Brinjal",     category: "Vegetable", season: "Summer",  harvestTimeMonth: 2,  basePrice: 800,  volatility: 300,  demandScore: 65, seedBase: 150 },
  { id: "veg-05", name: "Cabbage",     category: "Vegetable", season: "Winter",  harvestTimeMonth: 3,  basePrice: 600,  volatility: 250,  demandScore: 60, seedBase: 120 },
  { id: "veg-06", name: "Carrot",      category: "Vegetable", season: "Winter",  harvestTimeMonth: 3,  basePrice: 1100, volatility: 350,  demandScore: 72, seedBase: 180 },
  { id: "veg-07", name: "Cauliflower", category: "Vegetable", season: "Winter",  harvestTimeMonth: 3,  basePrice: 900,  volatility: 400,  demandScore: 68, seedBase: 140 },
  { id: "veg-08", name: "Spinach",     category: "Vegetable", season: "Winter",  harvestTimeMonth: 1,  basePrice: 700,  volatility: 200,  demandScore: 70, seedBase: 200 },
  { id: "veg-09", name: "Peas",        category: "Vegetable", season: "Winter",  harvestTimeMonth: 2,  basePrice: 1800, volatility: 450,  demandScore: 80, seedBase: 260 },
  { id: "veg-10", name: "Chilli",      category: "Vegetable", season: "Summer",  harvestTimeMonth: 3,  basePrice: 3500, volatility: 1200, demandScore: 85, seedBase: 220 },
  { id: "veg-11", name: "Capsicum",    category: "Vegetable", season: "Winter",  harvestTimeMonth: 3,  basePrice: 2200, volatility: 600, demandScore: 78, seedBase: 190 },
  { id: "veg-12", name: "Cucumber",    category: "Vegetable", season: "Summer",  harvestTimeMonth: 2,  basePrice: 700,  volatility: 250,  demandScore: 62, seedBase: 130 },
  { id: "veg-13", name: "Bitter Gourd",category: "Vegetable", season: "Summer",  harvestTimeMonth: 2,  basePrice: 1200, volatility: 350,  demandScore: 58, seedBase: 100 },
  { id: "veg-14", name: "Bottle Gourd",category: "Vegetable", season: "Summer",  harvestTimeMonth: 2,  basePrice: 600,  volatility: 200,  demandScore: 55, seedBase: 110 },
  { id: "veg-15", name: "Pumpkin",     category: "Vegetable", season: "Summer",  harvestTimeMonth: 3,  basePrice: 700,  volatility: 250,  demandScore: 60, seedBase: 120 },
  { id: "veg-16", name: "Ridge Gourd", category: "Vegetable", season: "Summer",  harvestTimeMonth: 2,  basePrice: 800,  volatility: 250,  demandScore: 52, seedBase: 90  },
  { id: "veg-17", name: "Drumstick",   category: "Vegetable", season: "Summer",  harvestTimeMonth: 4,  basePrice: 1500, volatility: 400,  demandScore: 64, seedBase: 100 },
  { id: "veg-18", name: "Garlic",      category: "Vegetable", season: "Winter",  harvestTimeMonth: 5,  basePrice: 4000, volatility: 1500, demandScore: 88, seedBase: 280 },
  { id: "veg-19", name: "Ginger",      category: "Vegetable", season: "Kharif",  harvestTimeMonth: 8,  basePrice: 5000, volatility: 1800, demandScore: 82, seedBase: 200 },
  { id: "veg-20", name: "Turmeric",    category: "Vegetable", season: "Kharif",  harvestTimeMonth: 9,  basePrice: 6500, volatility: 1500, demandScore: 78, seedBase: 160 },
  { id: "veg-21", name: "Fenugreek",   category: "Vegetable", season: "Winter",  harvestTimeMonth: 2,  basePrice: 1200, volatility: 300,  demandScore: 66, seedBase: 140 },
  { id: "veg-22", name: "Coriander",   category: "Vegetable", season: "Winter",  harvestTimeMonth: 2,  basePrice: 800,  volatility: 350,  demandScore: 73, seedBase: 180 },

  // ─── FRUITS ────────────────────────────────────────────────
  { id: "frt-01", name: "Mango",       category: "Fruit",     season: "Summer",  harvestTimeMonth: 4,  basePrice: 3500, volatility: 1200, demandScore: 95, seedBase: 300 },
  { id: "frt-02", name: "Banana",      category: "Fruit",     season: "Kharif",  harvestTimeMonth: 12, basePrice: 1500, volatility: 350,  demandScore: 90, seedBase: 350 },
  { id: "frt-03", name: "Papaya",      category: "Fruit",     season: "Kharif",  harvestTimeMonth: 9,  basePrice: 800,  volatility: 250,  demandScore: 72, seedBase: 160 },
  { id: "frt-04", name: "Guava",       category: "Fruit",     season: "Winter",  harvestTimeMonth: 6,  basePrice: 1200, volatility: 300,  demandScore: 75, seedBase: 180 },
  { id: "frt-05", name: "Pomegranate", category: "Fruit",     season: "Rabi",    harvestTimeMonth: 5,  basePrice: 4500, volatility: 900, demandScore: 85, seedBase: 200 },
  { id: "frt-06", name: "Watermelon",  category: "Fruit",     season: "Summer",  harvestTimeMonth: 3,  basePrice: 600,  volatility: 200,  demandScore: 80, seedBase: 220 },
  { id: "frt-07", name: "Muskmelon",   category: "Fruit",     season: "Summer",  harvestTimeMonth: 3,  basePrice: 800,  volatility: 250,  demandScore: 70, seedBase: 160 },
  { id: "frt-08", name: "Grapes",      category: "Fruit",     season: "Rabi",    harvestTimeMonth: 4,  basePrice: 3000, volatility: 800, demandScore: 82, seedBase: 180 },
  { id: "frt-09", name: "Orange",      category: "Fruit",     season: "Winter",  harvestTimeMonth: 5,  basePrice: 2000, volatility: 500,  demandScore: 78, seedBase: 160 },
  { id: "frt-10", name: "Lemon",       category: "Fruit",     season: "Rabi",    harvestTimeMonth: 3,  basePrice: 2500, volatility: 900, demandScore: 80, seedBase: 200 },
  { id: "frt-11", name: "Pineapple",   category: "Fruit",     season: "Kharif",  harvestTimeMonth: 15, basePrice: 1500, volatility: 350,  demandScore: 68, seedBase: 120 },
  { id: "frt-12", name: "Coconut",     category: "Fruit",     season: "Kharif",  harvestTimeMonth: 12, basePrice: 1800, volatility: 300,  demandScore: 82, seedBase: 250 },
  { id: "frt-13", name: "Jackfruit",   category: "Fruit",     season: "Summer",  harvestTimeMonth: 4,  basePrice: 2000, volatility: 450,  demandScore: 60, seedBase: 90  },

  // ─── FLOWERS ───────────────────────────────────────────────
  { id: "flw-01", name: "Rose",        category: "Flower",    season: "Winter",  harvestTimeMonth: 2,  basePrice: 5000, volatility: 1500, demandScore: 92, seedBase: 280 },
  { id: "flw-02", name: "Marigold",    category: "Flower",    season: "Winter",  harvestTimeMonth: 2,  basePrice: 1200, volatility: 400,  demandScore: 85, seedBase: 320 },
  { id: "flw-03", name: "Jasmine",     category: "Flower",    season: "Summer",  harvestTimeMonth: 1,  basePrice: 6000, volatility: 1800, demandScore: 88, seedBase: 260 },
  { id: "flw-04", name: "Lotus",       category: "Flower",    season: "Summer",  harvestTimeMonth: 2,  basePrice: 3000, volatility: 900, demandScore: 75, seedBase: 140 },
  { id: "flw-05", name: "Tuberose",    category: "Flower",    season: "Summer",  harvestTimeMonth: 3,  basePrice: 4000, volatility: 1100, demandScore: 78, seedBase: 160 },
  { id: "flw-06", name: "Chrysanthemum",category:"Flower",    season: "Winter",  harvestTimeMonth: 2,  basePrice: 2500, volatility: 700, demandScore: 72, seedBase: 140 },

  // ─── GRAINS & PULSES ───────────────────────────────────────
  { id: "grn-01", name: "Rice",        category: "Grain",     season: "Kharif",  harvestTimeMonth: 4,  basePrice: 2200, volatility: 300,  demandScore: 95, seedBase: 600 },
  { id: "grn-02", name: "Wheat",       category: "Grain",     season: "Rabi",    harvestTimeMonth: 5,  basePrice: 2100, volatility: 280,  demandScore: 93, seedBase: 580 },
  { id: "grn-03", name: "Maize",       category: "Grain",     season: "Kharif",  harvestTimeMonth: 4,  basePrice: 1800, volatility: 300,  demandScore: 82, seedBase: 400 },
  { id: "grn-04", name: "Barley",      category: "Grain",     season: "Rabi",    harvestTimeMonth: 4,  basePrice: 1600, volatility: 250,  demandScore: 72, seedBase: 280 },
  { id: "pls-01", name: "Chickpea",    category: "Pulse",     season: "Rabi",    harvestTimeMonth: 4,  basePrice: 5500, volatility: 800, demandScore: 85, seedBase: 320 },
  { id: "pls-02", name: "Lentil",      category: "Pulse",     season: "Rabi",    harvestTimeMonth: 4,  basePrice: 6000, volatility: 850, demandScore: 82, seedBase: 280 },
  { id: "pls-03", name: "Pigeon Pea",  category: "Pulse",     season: "Kharif",  harvestTimeMonth: 5,  basePrice: 7000, volatility: 1000, demandScore: 80, seedBase: 260 },

  // ─── MEDICINAL / HERBAL (NEW CATEGORY) ─────────────────────
  { id: "med-01", name: "Aloe Vera",   category: "Medicinal", season: "Kharif",  harvestTimeMonth: 12, basePrice: 2500, volatility: 200,  demandScore: 78, seedBase: 150 },
  { id: "med-02", name: "Ashwagandha", category: "Medicinal", season: "Rabi",    harvestTimeMonth: 6,  basePrice: 12000, volatility: 2000, demandScore: 85, seedBase: 120 },
  { id: "med-03", name: "Tulsi",       category: "Medicinal", season: "Kharif",  harvestTimeMonth: 3,  basePrice: 3000, volatility: 400,  demandScore: 72, seedBase: 180 },
  { id: "med-04", name: "Lemongrass",  category: "Medicinal", season: "Kharif",  harvestTimeMonth: 6,  basePrice: 1800, volatility: 300,  demandScore: 68, seedBase: 200 },
  { id: "med-05", name: "Mint",        category: "Medicinal", season: "Summer",  harvestTimeMonth: 2,  basePrice: 1200, volatility: 250,  demandScore: 75, seedBase: 220 },
  
  // ─── OIL SEEDS & SPICES ────────────────────────────────────
  { id: "oil-01", name: "Groundnut",   category: "Oilseed",   season: "Kharif",  harvestTimeMonth: 4,  basePrice: 5500, volatility: 800, demandScore: 82, seedBase: 300 },
  { id: "oil-02", name: "Mustard",     category: "Oilseed",   season: "Rabi",    harvestTimeMonth: 4,  basePrice: 6000, volatility: 850, demandScore: 78, seedBase: 260 },
  { id: "spc-01", name: "Cumin",       category: "Spice",     season: "Rabi",    harvestTimeMonth: 3,  basePrice: 22000, volatility: 4000, demandScore: 85, seedBase: 180 },
  { id: "spc-04", name: "Cardamom",    category: "Spice",     season: "Kharif",  harvestTimeMonth: 3,  basePrice: 80000, volatility: 12000, demandScore: 78, seedBase: 80 },
  { id: "spc-05", name: "Black Pepper",category: "Spice",     season: "Kharif",  harvestTimeMonth: 6,  basePrice: 50000, volatility: 8000, demandScore: 75, seedBase: 70 },
  { id: "spc-06", name: "Clove",       category: "Spice",     season: "Kharif",  harvestTimeMonth: 6,  basePrice: 70000, volatility: 9000, demandScore: 70, seedBase: 60 },
  { id: "spc-07", name: "Saffron",     category: "Spice",     season: "Winter",  harvestTimeMonth: 2,  basePrice: 180000, volatility: 25000, demandScore: 99, seedBase: 22 },

  // ─── CASH CROPS ────────────────────────────────────────────
  { id: "csh-01", name: "Sugarcane",   category: "Cash Crop", season: "Kharif",  harvestTimeMonth: 12, basePrice: 350,  volatility: 40,   demandScore: 90, seedBase: 500 },
  { id: "csh-02", name: "Cotton",      category: "Cash Crop", season: "Kharif",  harvestTimeMonth: 6,  basePrice: 6500, volatility: 1100, demandScore: 85, seedBase: 380 },
  { id: "csh-03", name: "Jute",        category: "Cash Crop", season: "Kharif",  harvestTimeMonth: 4,  basePrice: 4500, volatility: 700, demandScore: 70, seedBase: 200 }
];

// ─── BUILD FULL DATASET ────────────────────────────────────────
const CROPS = RAW_CROPS.map((crop, index) => {
  const seed = index * 7 + 13;
  const prices = generatePrices(crop.basePrice, crop.volatility, seed);
  const prices30Days = generate30DayPrices(prices[10], crop.volatility, seed + 500);
  const seedSold = generateSeedSold(crop.seedBase, seed + 2000);
  const nameKn = (typeof CROP_KANNADA_NAMES !== "undefined" && CROP_KANNADA_NAMES[crop.id]) ? CROP_KANNADA_NAMES[crop.id] : crop.name;

  const todayPrice = prices30Days[29];
  const yesterdayPrice = prices30Days[28];

  // Advanced Risk Metrics (Logic-Heavy)
  const priceStdDev = calculateVolatilityScore(prices);
  const rand = seededRand(seed + 3000);
  
  // 1. Weather Risk: Logical based on season suitability
  const month = new Date().getMonth();
  const isCorrectSeason = (crop.season === "Winter" && (month >= 10 || month <= 2)) || 
                          (crop.season === "Summer" && (month >= 3 && month <= 5)) ||
                          (crop.season === "Kharif" && (month >= 6 && month <= 9));
  
  const weatherRiskRaw = isCorrectSeason ? (rand() * 15 + 10) : (rand() * 40 + 40);
  const weatherRisk = Math.floor(weatherRiskRaw);
  
  // 2. Sentiment Score: Reacts to price trend
  const priceTrend = todayPrice > yesterdayPrice ? 10 : -15;
  const sentimentScore = Math.min(100, Math.max(0, crop.demandScore + priceTrend + Math.floor(rand() * 10 - 5)));
  
  // 3. 7-Day Forecasting Logic
  const priceDelta = todayPrice - yesterdayPrice; 
  const pviRatio = priceStdDev / (crop.basePrice || 1);
  const volatilityNoise = (rand() - 0.5) * (priceStdDev * 0.2);
  
  // Forecast = Current + (Trend Velocity) + (Market Sentiment Effect) + (PVI Noise)
  let projectedPrice = todayPrice + (priceDelta * 1.8) + (sentimentScore * 0.2) + volatilityNoise;
  
  // Safety bounds
  projectedPrice = Math.max(crop.basePrice * 0.5, Math.round(projectedPrice));

  // Add Hybrid and Disease info
  const hybrids = HYBRID_DATA[crop.name] || ["Local Variety", "Improved Selection"];
  const diseases = DISEASE_DATA[crop.category] || ["General Leaf Spot", "Root Rot"];

  // Farmers Growing Logic: Linked to seed adoption but localized
  const farmersGrowing = Math.floor((crop.seedBase / 10) + (rand() * 200));

  // Add Survey-Logic Parameters
  const soilMap = {
    "Vegetable": "Sandy Loam", "Fruit": "Well-Drained Loamy", "Flower": "Rich Organic", 
    "Grain": "Clay Loam", "Pulse": "Dry Sandy", "Oilseed": "Alluvial",
    "Cash Crop": "Deep Black Soil", "Spice": "Laterite", "Medicinal": "Well-Drained Sandy"
  };
  const waterMap = {
    "Kharif": "High", "Rabi": "Moderate", "Summer": "Very High", "Winter": "Low"
  };

  return {
    ...crop,
    nameKn,
    prices,
    prices30Days,
    seedSold,
    todayPrice,
    yesterdayPrice,
    projectedPrice,
    priceStdDev,
    weatherRisk,
    sentimentScore,
    hybrids,
    diseases,
    farmersGrowing,
    idealSoil: soilMap[crop.category] || "Red Loam",
    waterNeed: waterMap[crop.season] || "Moderate"
  };
});

// ─── INTELLIGENCE ENGINE ────────────────────────────────────────

function calculateVolatilityScore(prices) {
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
}

function calculateVolatility(crop) {
  const max = Math.max(...crop.prices);
  const min = Math.min(...crop.prices);
  return max - min;
}

function calculateRisk(crop) {
  const currentMonth = new Date().getMonth();
  
  // 1. VOLATILITY PILLAR (1-Year Data)
  const pviRatio = crop.priceStdDev / (crop.basePrice || 1);
  const volatilityBase = pviRatio * 130;
  
  // 2. TREND PILLAR (Yesterday vs Today)
  // If price is crashing relative to yesterday, risk spikes
  const trendRisk = crop.todayPrice < crop.yesterdayPrice ? 15 : -5;
  
  // 3. SATURATION PILLAR (Seed Sales vs Harvest Timing)
  // Check seed sales from [harvestTimeMonth] months ago
  const lookbackMonth = (currentMonth - crop.harvestTimeMonth + 12) % 12;
  const historicSeedSold = crop.seedSold[lookbackMonth] || 0;
  const saturationRisk = historicSeedSold > 400 ? 12 : 0; // High seeds then = Glut now
  
  // 4. HARVEST SPIKE (Current Supply)
  const isHarvestMonth = currentMonth === crop.harvestTimeMonth;
  const harvestRisk = isHarvestMonth ? 10 : 0;
  
  // 5. DEMAND BUFFER
  const demandBuffer = crop.demandScore * 0.25;

  // 6. MARKET SATURATION (User Feedback Integration)
  const user = (typeof getSession === "function") ? getSession() : null;
  let saturationPenalty = (user && user.cropping && user.cropping.includes("Monocropping")) ? 10 : 0;
  
  // If user is already growing this crop, risk might be higher due to lack of diversification
  if (user && user.growing && user.growing.toLowerCase().includes(crop.name.toLowerCase())) {
    saturationPenalty += 15;
  }

  // 7. EXTERNAL SATURATION (Total Farmers Growing)
  const externalSaturation = Math.floor(crop.farmersGrowing / 15);

  // Final Composite Score
  const totalRiskScore = volatilityBase + trendRisk + saturationRisk + harvestRisk + (crop.weatherRisk * 0.6) + saturationPenalty + externalSaturation - demandBuffer;
  
  if (totalRiskScore > 40) return "High";
  if (totalRiskScore < 18) return "Low";
  return "Medium";
}

function calculateProfit(crop) {
  return ((crop.todayPrice - crop.prices[0]) / crop.prices[0]) * 100;
}

function calculateScore(crop) {
  const user = getSession();
  const district = (user && user.location) ? user.location : "Bangalore Rural";
  const distInfo = DISTRICT_DATA[district] || DISTRICT_DATA["Bangalore Rural"];
  
  // 1. Soil Match (25%)
  const soilMatch = (user && user.soil && crop.idealSoil === user.soil) ? 100 : 60;
  
  // 2. Water Match (15%)
  const waterMatch = (user && user.water && crop.season === "Summer" && user.water === "Rainfed") ? 30 : 90;
  
  // 3. Season Match (20%)
  const month = new Date().getMonth();
  const isCorrectSeason = (crop.season === "Winter" && (month >= 10 || month <= 2)) || 
                          (crop.season === "Summer" && (month >= 3 && month <= 5)) ||
                          (crop.season === "Kharif" && (month >= 6 && month <= 9));
  const seasonMatch = isCorrectSeason ? 100 : 20;

  // 4. District Popularity (15%)
  const isPopInDist = distInfo.topCrops.includes(crop.name) ? 100 : 50;

  // 5. Market Demand (15%)
  const demandScore = crop.demandScore;

  // 6. Price Trend (10%)
  const trendMatch = crop.todayPrice >= crop.yesterdayPrice ? 100 : 40;

  // Final Weighted Aggregate
  const finalScore = (soilMatch * 0.25) + (waterMatch * 0.15) + (seasonMatch * 0.20) + (isPopInDist * 0.15) + (demandScore * 0.15) + (trendMatch * 0.10);
  
  return finalScore;
}

function getSellStrategy(crop) {
  const current = crop.todayPrice;
  const forecast = crop.projectedPrice;
  
  if (forecast > current) {
    const days = Math.floor(Math.random() * 5) + 3;
    return { decision: "WAIT", action: "Wait for Peak", days, reason: "Prices trending up" };
  } else {
    return { decision: "SELL", action: "Sell Now", days: 0, reason: "Current market peak reached" };
  }
}

function getDistrictInsights(districtName) {
  return DISTRICT_DATA[districtName] || DISTRICT_DATA["Bangalore Rural"];
}

function getAlternatives(selected) {
  const currentRisk = calculateRisk(selected);
  const currentROI  = ((selected.projectedPrice - selected.todayPrice) / selected.todayPrice) * 100;

  return CROPS
    .filter(c => c.season === selected.season && c.id !== selected.id)
    .map(c => {
       const altRisk = calculateRisk(c);
       const altROI  = ((c.projectedPrice - c.todayPrice) / c.todayPrice) * 100;
       
       // Score balance: high ROI, low risk, high adoption
       // We favor drops in risk and bumps in ROI
       const riskBonus = (altRisk === 'Low' && currentRisk !== 'Low') ? 40 : (altRisk === 'Medium' && currentRisk === 'High') ? 20 : 0;
       const roiScore = altROI * 2;
       
       const totalAltScore = roiScore + riskBonus + (c.demandScore * 0.3);
       return { ...c, altScore: totalAltScore };
    })
    .sort((a, b) => b.altScore - a.altScore)
    .slice(0, 8);
}

function getBestCrops() {
  // Determine dynamically the active season to ensure we strictly only recommend crops viable RIGHT NOW
  const month = new Date().getMonth(); // 0 is January
  let activeSeasons = ["Rabi", "Winter"];
  if (month >= 5 && month <= 9) activeSeasons = ["Kharif", "Monsoon"];
  if (month === 3 || month === 4) activeSeasons = ["Summer", "Zaid"];

  return CROPS
    .filter(c => activeSeasons.includes(c.season))
    .filter(c => c.todayPrice >= c.yesterdayPrice) // Strictly assigned on best daily prices
    .map(c => {
       // Supercharge the ranking score based on today's price surge trajectory
       const priceDelta = c.todayPrice - c.yesterdayPrice;
       const surgeBonus = priceDelta > 0 ? (priceDelta / 2) : 0;
       return { ...c, score: calculateScore(c) + surgeBonus };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);
}

function getCropById(id) {
  return CROPS.find(c => c.id === id);
}

function getCropByName(name) {
  return CROPS.find(c => c.name.toLowerCase() === name.toLowerCase());
}

// ─── RECENTLY VIEWED ────────────────────────────────────────────

function saveRecentCrop(cropId) {
  let recent = JSON.parse(localStorage.getItem("raithaRecent")) || [];
  recent = recent.filter(id => id !== cropId);
  recent.unshift(cropId);
  recent = recent.slice(0, 6);
  localStorage.setItem("raithaRecent", JSON.stringify(recent));
}

function getRecentCrops() {
  const recent = JSON.parse(localStorage.getItem("raithaRecent")) || [];
  return recent.map(id => CROPS.find(c => c.id === id)).filter(Boolean);
}

// ─── HEADER SCROLL ──────────────────────────────────────────────

(function initHeader() {
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (!header) return;

    const currentScroll = window.scrollY;
    if (Math.abs(currentScroll - lastScrollY) < 5) return;

    if (currentScroll < 60) {
      header.classList.remove("scrolled", "hidden");
    } else if (currentScroll > lastScrollY) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
      header.classList.add("scrolled");
    }

    lastScrollY = currentScroll;
  });
})();

// ─── SEARCH INIT ───────────────────────────────────────────────

// ─── SEARCH INIT ───────────────────────────────────────────────

function initSearch() {
  const input = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  const searchBtn = document.getElementById("searchBtn");

  if (!input || !suggestionsBox) return;

  function doSearch(val) {
    const trimmed = val.trim().toLowerCase();
    if (!trimmed) return;
    
    // Search both languages
    const match = CROPS.find(c => 
      c.name.toLowerCase().includes(trimmed) || 
      (c.nameKn && c.nameKn.includes(trimmed)) ||
      (CROP_KANNADA_NAMES[c.id] && CROP_KANNADA_NAMES[c.id].includes(trimmed))
    );

    if (match) {
      saveRecentCrop(match.id);
      window.location.href = `crop.html?id=${match.id}`;
    }
  }

  input.addEventListener("input", () => {
    const val = input.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (!val) {
      suggestionsBox.classList.remove("open");
      return;
    }

    const filtered = CROPS.filter(c => 
      c.name.toLowerCase().includes(val) || 
      (c.nameKn && c.nameKn.includes(val)) ||
      (CROP_KANNADA_NAMES[c.id] && CROP_KANNADA_NAMES[c.id].includes(val))
    ).slice(0, 6);

    if (filtered.length === 0) {
      suggestionsBox.classList.remove("open");
      return;
    }

    filtered.forEach(crop => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      const knName = cropName(crop);
      const displayName = getCurrentLang() === 'kn' ? knName : (crop.name + ' (' + knName + ')');
      
      div.innerHTML = `
        <span class="suggestion-icon">${categoryIcon(crop.category)}</span>
        <span style="flex:1"><strong>${displayName}</strong></span>
        <span class="suggestion-cat">${categoryName(crop.category)}</span>
      `;
      div.addEventListener("click", () => {
        input.value = (getCurrentLang() === 'kn' ? knName : crop.name);
        suggestionsBox.classList.remove("open");
        saveRecentCrop(crop.id);
        window.location.href = `crop.html?id=${crop.id}`;
      });
      suggestionsBox.appendChild(div);
    });

    suggestionsBox.classList.add("open");
  });

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") doSearch(input.value);
  });

  if (searchBtn) {
    searchBtn.addEventListener("click", () => doSearch(input.value));
  }

  document.addEventListener("click", e => {
    if (!e.target.closest(".search-bar")) {
      suggestionsBox.classList.remove("open");
    }
  });
}

// ─── HEADER TICKER & STATUS ────────────────────────────────────
function initHeaderFeatures() {
  const ticker = document.getElementById("headerTicker");
  if (!ticker) return;

  const topCrops = CROPS.slice().sort((a,b) => (b.todayPrice - b.yesterdayPrice) - (a.todayPrice - a.yesterdayPrice)).slice(0, 5);
  let tickerHtml = "";
  
  topCrops.forEach(c => {
    const diff = c.todayPrice - c.yesterdayPrice;
    const arrow = diff > 0 ? "↑" : diff < 0 ? "↓" : "→";
    const cls = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
    tickerHtml += `
      <span class="ticker-item">
        ${cropName(c)} 
        <span class="${cls}">${arrow} ₹${Math.abs(diff)}</span>
      </span>
      <span class="ticker-sep">•</span>
    `;
  });
  
  ticker.innerHTML = tickerHtml + tickerHtml; // Double for seamless loop
}

function categoryIcon(cat) {
  const map = {
    Vegetable: "fresh vegetables isolated white background",
    Fruit: "fresh tropical fruits isolated",
    Flower: "beautiful flowers macro isolated",
    Grain: "golden wheat harvest isolated",
    Pulse: "pulse seeds beans isolated",
    Oilseed: "sunflower seeds isolated",
    "Cash Crop": "sugarcane plant isolated",
    Spice: "indian spices bowl isolated",
    Medicinal: "medicinal herbs green leaves isolated"
  };
  const query = map[cat] || "green agriculture plant isolated";
  
  // Returning a realistic photo thumbnail instead of an emoji!
  return `<img src="https://tse1.mm.bing.net/th?q=${encodeURIComponent(query)}&w=128&h=128&c=7&rs=1&p=0" class="real-cat-icon" alt="${cat}" loading="lazy" />`;
}

function riskClass(risk) {
  if (risk === "Low") return "risk-low";
  if (risk === "Medium") return "risk-medium";
  return "risk-high";
}

function trendArrow(crop) {
  const diff = crop.todayPrice - crop.yesterdayPrice;
  if (diff > 0) return { arrow: "↑", cls: "up" };
  if (diff < 0) return { arrow: "↓", cls: "down" };
  return { arrow: "→", cls: "flat" };
}

function formatPrice(p) {
  if (p >= 1000) return "₹" + (p / 1000).toFixed(1) + "k";
  return "₹" + p;
}

// ─── SPLASH SCREEN LOGIC ──────────────────────────────────────────────
window.addEventListener('load', () => {
  const splash = document.getElementById("splashScreen");
  if (splash) {
    // Artificial 600ms delay to display the pulsing logo gracefully
    setTimeout(() => {
      splash.classList.add("splash-hidden");
    }, 600);
  }
});

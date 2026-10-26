import { Product, EditorialStory, StoreLocation, DigitalCertificate } from '../types/jewellery';

export const HERO_BRIDAL_IMG = '/src/assets/images/hero_bridal_necklace_1793039179119.jpg';
export const SOLITAIRE_RING_IMG = '/src/assets/images/solitaire_diamond_ring_1793039124766.jpg';
export const TEMPLE_NECKLACE_IMG = '/src/assets/images/temple_gold_necklace_1793039125026.jpg';
export const EMERALD_EARRINGS_IMG = '/src/assets/images/emerald_polki_earrings_1793039124399.jpg';
export const ARTISAN_CRAFT_IMG = '/src/assets/images/editorial_artisan_craft_1793039124711.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-bridal-01',
    name: 'The Royal Mayura Uncut Diamond Necklace',
    category: 'Bridal',
    metal: '22K Yellow Gold',
    purity: 'BIS 916 Hallmarked Gold',
    grossWeight: 54.2,
    netGoldWeight: 46.8,
    diamondWeight: 4.8,
    gemstones: 'Natural Zambian Emerald Drops & Polki Diamonds',
    price: 385000,
    mrp: 420000,
    makingCharges: 32000,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'BRIDAL EDIT',
    image: HERO_BRIDAL_IMG,
    images: [
      HERO_BRIDAL_IMG,
      TEMPLE_NECKLACE_IMG,
      EMERALD_EARRINGS_IMG
    ],
    description: 'An imperial bridal choker handcrafted in 22K gold, set with luminous flat-cut Polki diamonds and dangling with certified teardrop Zambian emerald beads. Inspired by the royal courts of Rajasthan, each stone is secured in pure gold foil bezel setting.',
    hallmarkNumber: 'BIS-916-KA-489201',
    certNumber: 'SGL-IND-2026-99381',
    certAgency: 'SGL',
    inStock: true,
    shipsInDays: 2,
    dimensions: 'Length 40cm with adjustable zari cord',
    tryOnSupported: true,
    tryOnType: 'necklace'
  },
  {
    id: 'prod-ring-01',
    name: 'Elysian Solitaire Rose Gold Engagement Ring',
    category: 'Solitaires',
    metal: '18K Rose Gold',
    purity: 'BIS 750 Hallmarked Gold',
    grossWeight: 4.6,
    netGoldWeight: 4.3,
    diamondWeight: 1.25,
    gemstones: 'VVS1 Clarity, E-Color Round Brilliant Diamond',
    price: 148000,
    mrp: 165000,
    makingCharges: 9500,
    rating: 4.95,
    reviewsCount: 52,
    badge: 'BESTSELLER',
    image: SOLITAIRE_RING_IMG,
    images: [
      SOLITAIRE_RING_IMG,
      HERO_BRIDAL_IMG
    ],
    description: 'A breathtaking 1.25 ct solitaire diamond set in an arched cathedral silhouette with knife-edge shank in 18K rose gold. The pavilion setting maximizes light entry for peerless fire and brilliance.',
    hallmarkNumber: 'BIS-750-MH-112044',
    certNumber: 'GIA-24891104',
    certAgency: 'GIA',
    inStock: true,
    shipsInDays: 1,
    dimensions: 'Standard Indian Ring Size 12 (Resizable)',
    tryOnSupported: true,
    tryOnType: 'ring'
  },
  {
    id: 'prod-temple-01',
    name: 'Heritage Lakshmi Kasu Mala Gold Harame',
    category: 'Temple',
    metal: '22K Antique Yellow Gold',
    purity: 'BIS 916 Hallmarked Gold',
    grossWeight: 68.5,
    netGoldWeight: 65.2,
    gemstones: 'Natural Burmese Rubies & Seed Pearls',
    price: 495000,
    mrp: 535000,
    makingCharges: 42000,
    rating: 5.0,
    reviewsCount: 29,
    badge: 'HERITAGE',
    image: TEMPLE_NECKLACE_IMG,
    images: [
      TEMPLE_NECKLACE_IMG,
      HERO_BRIDAL_IMG
    ],
    description: 'Centuries of Dravidian temple jewellery tradition brought to life. Embellished with 48 hand-stamped gold coins depicting Goddess Lakshmi seated on a lotus, flanked by peacock motifs encrusted with pigeon-blood rubies.',
    hallmarkNumber: 'BIS-916-TN-802319',
    certNumber: 'BIS-CERT-2026-44',
    certAgency: 'BIS',
    inStock: true,
    shipsInDays: 3,
    dimensions: '60cm length with gold loop link chain',
    tryOnSupported: true,
    tryOnType: 'necklace'
  },
  {
    id: 'prod-earring-01',
    name: 'Celestial Polki & Emerald Jhumka Earrings',
    category: 'Diamond',
    metal: '22K Gold',
    purity: 'BIS 916 Hallmarked Gold',
    grossWeight: 26.4,
    netGoldWeight: 22.8,
    diamondWeight: 2.1,
    gemstones: 'Polki Diamond and Zambian Emerald Drops',
    price: 198000,
    mrp: 215000,
    makingCharges: 18500,
    rating: 4.85,
    reviewsCount: 44,
    badge: 'NEW ARRIVAL',
    image: EMERALD_EARRINGS_IMG,
    images: [
      EMERALD_EARRINGS_IMG,
      SOLITAIRE_RING_IMG
    ],
    description: 'Bell-shaped jhumkas adorned with floral stud motifs, intricate filigree jali lattice, and a cascade of naturally faceted emerald and seed pearl tassels.',
    hallmarkNumber: 'BIS-916-DL-773120',
    certNumber: 'IGI-J3902914',
    certAgency: 'IGI',
    inStock: true,
    shipsInDays: 2,
    dimensions: 'Height 5.2cm, Width 2.4cm with screw back post',
    tryOnSupported: true,
    tryOnType: 'earrings'
  },
  {
    id: 'prod-gold-02',
    name: 'Aethelgard Hand-Carved Gold Kada Bangle',
    category: 'Gold',
    metal: '22K Pure Gold',
    purity: 'BIS 916 Hallmarked Gold',
    grossWeight: 38.0,
    netGoldWeight: 38.0,
    price: 285000,
    mrp: 305000,
    makingCharges: 21000,
    rating: 4.9,
    reviewsCount: 22,
    badge: 'LIMITED PIECE',
    image: TEMPLE_NECKLACE_IMG,
    images: [
      TEMPLE_NECKLACE_IMG,
      HERO_BRIDAL_IMG
    ],
    description: 'Solid 22K gold bangle with subtle hand-chiseled geometric facets that catch light with every gesture. Finished with a hidden spring clasp for effortless wear.',
    hallmarkNumber: 'BIS-916-KA-550291',
    certNumber: 'BIS-CERT-2026-92',
    certAgency: 'BIS',
    inStock: true,
    shipsInDays: 1,
    dimensions: 'Size 2.6 (Inner diameter 60mm)',
    tryOnSupported: true,
    tryOnType: 'bangle'
  },
  {
    id: 'prod-solitaire-02',
    name: 'Eternal Radiance Tennis Bracelet',
    category: 'Diamond',
    metal: '18K White Gold',
    purity: 'BIS 750 Hallmarked Gold',
    grossWeight: 14.8,
    netGoldWeight: 11.2,
    diamondWeight: 5.5,
    gemstones: '52 Matched Round Brilliant Diamonds (EF/VVS)',
    price: 360000,
    mrp: 395000,
    makingCharges: 28000,
    rating: 4.92,
    reviewsCount: 17,
    badge: 'BESTSELLER',
    image: SOLITAIRE_RING_IMG,
    images: [
      SOLITAIRE_RING_IMG,
      EMERALD_EARRINGS_IMG
    ],
    description: 'A seamless river of 52 precisely matched round diamonds prong-set in 18K white gold with double security safety clasp.',
    hallmarkNumber: 'BIS-750-MH-994821',
    certNumber: 'IGI-B772019',
    certAgency: 'IGI',
    inStock: true,
    shipsInDays: 2,
    dimensions: 'Length 17.8cm (7 inches)',
    tryOnSupported: true,
    tryOnType: 'bangle'
  }
];

export const EDITORIAL_STORIES: EditorialStory[] = [
  {
    id: 'story-01',
    title: 'The Alchemy of 22K Kundan & Polki',
    subtitle: 'Behind the jeweler bench: How 16th-century Mughal goldsmithing methods survive in modern workshops.',
    category: 'CRAFTSMANSHIP',
    readTime: '4 min read',
    author: 'Devraj Singh, Master Jeweller',
    date: 'October 2026',
    image: ARTISAN_CRAFT_IMG,
    content: 'Kundan is not merely an alloy; it is 99.9% pure 24-karat refined gold foils pressed by hand around uncut diamonds at room temperature. The molecular bond achieved through cold pressure creates a water-tight nest for gemstones, preserving brilliance across centuries without chemical adhesives.'
  },
  {
    id: 'story-02',
    title: 'Navigating The 4Cs in Natural Solitaires',
    subtitle: 'Cut, Color, Clarity, and Carat weight: What truly matters when purchasing an heirloom diamond.',
    category: 'BUYER GUIDE',
    readTime: '6 min read',
    author: 'Meenakshi Sundaram, GIA Graduate Gemologist',
    date: 'October 2026',
    image: SOLITAIRE_RING_IMG,
    content: 'While carat weight commands the initial conversation, cut precision accounts for more than 50% of a diamond’s visual fire and light return. A master cut makes a 1.2ct diamond sparkle more brilliantly than a poorly cut 1.5ct stone.'
  },
  {
    id: 'story-03',
    title: 'Dravidian Temple Gold: Symbols & Significance',
    subtitle: 'The iconography of Goddess Lakshmi, sacred peacocks, and temple architecture translated into gold.',
    category: 'HERITAGE',
    readTime: '5 min read',
    author: 'Prof. R. Venkataraghavan, Art Historian',
    date: 'September 2026',
    image: TEMPLE_NECKLACE_IMG,
    content: 'Historically commissioned for temple deities, Kasu Mala coin chains and Nakshi repoussé work served as both spiritual talismans and family wealth stores. Each coin is struck using hand-engraved bronze dies dating back over a hundred years.'
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-blr-01',
    name: 'DS Flagship Boutique — Indiranagar',
    city: 'Bengaluru',
    address: '100 Feet Road, 12th Main Corner, HAL 2nd Stage, Indiranagar, Bengaluru 560038',
    phone: '+91 80 4920 1800',
    hours: '10:30 AM – 8:30 PM (Daily)',
    goldRateToday: 7485,
    distance: '3.2 km away',
    inStockPieces: 340
  },
  {
    id: 'store-chn-01',
    name: 'DS Heritage Salon — T. Nagar',
    city: 'Chennai',
    address: 'Usman Road, North Usman Block, T. Nagar, Chennai 600017',
    phone: '+91 44 2815 9090',
    hours: '10:00 AM – 9:00 PM (Daily)',
    goldRateToday: 7490,
    distance: 'Flagship Store',
    inStockPieces: 520
  },
  {
    id: 'store-cbe-01',
    name: 'DS Bridal Atelier — Race Course',
    city: 'Coimbatore',
    address: 'Race Course Road, Opp. Thomas Park, Coimbatore 641018',
    phone: '+91 422 222 4500',
    hours: '10:30 AM – 8:00 PM (Mon–Sat)',
    goldRateToday: 7480,
    distance: 'Bespoke Lounge',
    inStockPieces: 210
  },
  {
    id: 'store-mum-01',
    name: 'DS Haute Joaillerie — Bandra',
    city: 'Mumbai',
    address: 'Turner Road, Bandra West, Mumbai 400050',
    phone: '+91 22 6710 4400',
    hours: '11:00 AM – 8:30 PM (Daily)',
    goldRateToday: 7495,
    distance: 'Private Suite',
    inStockPieces: 290
  }
];

export const USER_CERTIFICATES: DigitalCertificate[] = [
  {
    id: 'cert-001',
    productName: 'The Royal Mayura Uncut Diamond Choker',
    purchaseDate: '14 Jan 2026',
    invoiceNumber: 'INV-DS-2026-0891',
    hallmarkId: 'BIS-916-KA-489201',
    certAgency: 'SGL & BIS Govt. of India',
    purityKarat: '22K Gold (91.6% Pure)',
    certifiedWeight: 54.2,
    originalValue: 385000,
    currentEstimatedValue: 405600
  },
  {
    id: 'cert-002',
    productName: '1.25 ct Elysian Solitaire Diamond Ring',
    purchaseDate: '08 Mar 2025',
    invoiceNumber: 'INV-DS-2025-4120',
    hallmarkId: 'BIS-750-MH-112044',
    certAgency: 'GIA (Gemological Institute of America)',
    purityKarat: '18K Rose Gold & VVS1 Diamond',
    certifiedWeight: 4.6,
    originalValue: 135000,
    currentEstimatedValue: 148000
  }
];

export const GOLD_RATE_HISTORY_30D = [
  { day: 'Day 1', rate: 7320 },
  { day: 'Day 5', rate: 7345 },
  { day: 'Day 10', rate: 7390 },
  { day: 'Day 15', rate: 7360 },
  { day: 'Day 20', rate: 7410 },
  { day: 'Day 25', rate: 7450 },
  { day: 'Day 28', rate: 7465 },
  { day: 'Today', rate: 7485 }
];

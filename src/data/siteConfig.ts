import { realCatalogImage } from "@/lib/catalogImages";
import { localCatalogImage } from "@/lib/localCatalogImages";

export const COMPANY_INFO = {
  name: "PacMyProduct",
  address: "OF-653, 6th Floor, Satya The Hive, Sector 102, Dwarka Expressway, Gurugram, Haryana, India – 122006",
  phone: "+91 9599139303",
  email: "pacmyproduct@gmail.com",
  whatsapp: "https://wa.me/919599139303?text=Hi%2C%20I%20am%20interested%20in%20corporate%20gifting%20and%20packaging%20solutions.",
  gst: "Registered enterprise billing with full GST input tax credits.",
  mapsUrl: "https://maps.google.com/maps?q=OF-653%2C+6th+Floor%2C+Satya+The+Hive%2C+Sector+102%2C+Dwarka+Expressway%2C+Gurugram%2C+Haryana+122006%2C+India&t=&z=16&ie=UTF8&iwloc=&output=embed",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=OF-653%2C+6th+Floor%2C+Satya+The+Hive%2C+Sector+102%2C+Dwarka+Expressway%2C+Gurugram%2C+Haryana+122006%2C+India",
  timings: "Monday to Saturday: 10:00 AM — 7:00 PM (IST)"
};

export const CORPORATE_GIFTS = [
  { name: "Pens", slug: "pens", href: "/products?category=pens" },
  { name: "T-Shirts", slug: "t-shirts", href: "/products?category=t-shirts" },
  { name: "Keychains", slug: "keychains", href: "/products?category=keychains" },
  { name: "Diaries / Notebooks", slug: "diaries-notebooks", href: "/products?category=diaries-notebooks" },
  { name: "Caps", slug: "caps", href: "/products?category=caps" },
  { name: "Paper Weights", slug: "paper-weights", href: "/products?category=paper-weights" },
  { name: "Mouse Pads / Table Mats", slug: "mouse-pads-table-mats", href: "/products?category=mouse-pads-table-mats" }
];

export const PREMIUM_GIVEAWAYS = [
  { name: "Table Top Items", slug: "table-top-items", href: "/products?category=table-top-items" },
  { name: "Backpacks / Bags", slug: "backpacks-bags", href: "/products?category=backpacks-bags" }
];

export const PROMOTIONAL_PRODUCT_GROUPS = [
  {
    label: "Corporate Gifts",
    description: "Daily-use branded merchandise for teams, clients, and events.",
    items: CORPORATE_GIFTS
  },
  {
    label: "Premium Giveaways",
    description: "High-impact gifts for launches, onboarding, and executive programs.",
    items: PREMIUM_GIVEAWAYS
  }
];

export const CORPORATE_KITS = [
  { name: "Joining Kits", slug: "joining-kits", href: "/corporate-kits?kit=joining-kits" },
  { name: "Dealer / Retailer Kit", slug: "dealer-kits", href: "/corporate-kits?kit=dealer-kits" },
  { name: "Doctor Kits", slug: "doctor-kits", href: "/corporate-kits?kit=doctor-kits" },
  { name: "Architect Kits", slug: "architect-kits", href: "/corporate-kits?kit=architect-kits" },
  { name: "Mason Kits", slug: "mason-kits", href: "/corporate-kits?kit=mason-kits" },
  { name: "Electrician Kits", slug: "electrician-kits", href: "/corporate-kits?kit=electrician-kits" },
  { name: "Interior Designer Kits", slug: "interior-designer-kits", href: "/corporate-kits?kit=interior-designer-kits" },
  { name: "Plumber Kits", slug: "plumber-kits", href: "/corporate-kits?kit=plumber-kits" },
  { name: "Painter Kits", slug: "painter-kits", href: "/corporate-kits?kit=painter-kits" },
  { name: "Engineer Kits", slug: "engineer-kits", href: "/corporate-kits?kit=engineer-kits" }
];

export const OCCASION_HAMPERS = [
  { name: "Diwali Hampers", slug: "diwali-hampers", href: "/corporate-kits?kit=diwali-hampers" },
  { name: "Holi Hampers", slug: "holi-hampers", href: "/corporate-kits?kit=holi-hampers" },
  { name: "Eid Hampers", slug: "eid-kits", href: "/corporate-kits?kit=eid-kits" },
  { name: "Women's Day Gifts", slug: "womens-day-gifts", href: "/corporate-kits?kit=womens-day-gifts" },
  { name: "Christmas Hampers", slug: "christmas-kits", href: "/corporate-kits?kit=christmas-kits" },
  { name: "New Year Hampers", slug: "new-year-hampers", href: "/corporate-kits?kit=new-year-hampers" }
];

export const PACKAGING_SOLUTIONS = [
  { name: "Mono Cartons", slug: "mono", href: "/packaging-solutions?type=mono" },
  { name: "Rigid Boxes", slug: "rigid", href: "/packaging-solutions?type=rigid" },
  { name: "Customized Packaging", slug: "corrugated", href: "/packaging-solutions?type=corrugated" },
  { name: "Luxury Gift Boxes", slug: "luxury-gift-boxes", href: "/packaging-solutions?type=luxury-gift-boxes" }
];

export const PRODUCT_HIERARCHY = [
  {
    name: "Promotional Products",
    slug: "promotional-products",
    categories: [
      // Column 1: Bags
      {
        name: "Bags",
        slug: "bags",
        subcategories: [
          { name: "Laptop Bags", slug: "laptop-bags", href: "/products?subcategory=laptop-bags" },
          { name: "Travel Bags", slug: "travel-bags", href: "/products?subcategory=travel-bags" },
          { name: "Duffle Bags", slug: "duffle-bags", href: "/products?subcategory=duffle-bags" },
          { name: "Trolley Bags", slug: "trolley-bags", href: "/products?subcategory=trolley-bags" },
          { name: "Sling Bags", slug: "sling-bags", href: "/products?subcategory=sling-bags" }
        ]
      },
      // Column 2: Drinkware
      {
        name: "Drinkware",
        slug: "drinkware",
        subcategories: [
          { name: "Flasks", slug: "flasks", href: "/products?subcategory=flasks" },
          { name: "Bottles", slug: "bottles", href: "/products?subcategory=bottles" },
          { name: "Coffee Mugs", slug: "coffee-mugs", href: "/products?subcategory=coffee-mugs" },
          { name: "Travel Mugs", slug: "travel-mugs", href: "/products?subcategory=travel-mugs" }
        ]
      },
      // Column 3: Pens
      {
        name: "Pens",
        slug: "pens",
        subcategories: [
          { name: "Pens", slug: "pens", href: "/products?subcategory=pens" }
        ]
      },
      // Column 4: Keychains
      {
        name: "Keychains",
        slug: "keychains",
        subcategories: [
          { name: "Metal Keychain", slug: "metal-keychain", href: "/products?subcategory=metal-keychain" },
          { name: "Leather Keychain", slug: "leather-keychain", href: "/products?subcategory=leather-keychain" },
          { name: "Acrylic Keychain", slug: "acrylic-keychain", href: "/products?subcategory=acrylic-keychain" }
        ]
      },
      // Column 5: Caps
      {
        name: "Caps",
        slug: "caps",
        subcategories: [
          { name: "Caps", slug: "caps", href: "/products?subcategory=caps" }
        ]
      },
      // Column 6: T-Shirts
      {
        name: "T-Shirts",
        slug: "t-shirts",
        subcategories: [
          { name: "Polo T-Shirts", slug: "polo-t-shirts", href: "/products?subcategory=polo-t-shirts" },
          { name: "Round Neck T-Shirts", slug: "round-neck-t-shirts", href: "/products?subcategory=round-neck-t-shirts" }
        ]
      },
      // Column 8: Table Top
      {
        name: "Table Top",
        slug: "table-top",
        subcategories: [
          { name: "Table Top", slug: "table-top", href: "/products?subcategory=table-top" },
          { name: "Paper Weight", slug: "paper-weight", href: "/products?subcategory=paper-weight" }
        ]
      },
      // Column 9: Diaries / Notebooks
      {
        name: "Diaries / Notebooks",
        slug: "diaries-notebooks",
        subcategories: [
          { name: "Diaries / Notebooks", slug: "diaries-notebooks", href: "/products?subcategory=diaries-notebooks" }
        ]
      },
      // Column 10: Badges
      {
        name: "Badges",
        slug: "badges",
        subcategories: [
          { name: "Badges", slug: "badges-sub", href: "/products?subcategory=badges-sub" }
        ]
      },
      // Column 11: Neck Rest / Back Rest
      {
        name: "Neck Rest / Back Rest",
        slug: "neck-rest-back-rest",
        subcategories: [
          { name: "Neck Rest / Back Rest", slug: "neck-rest-back-rest-sub", href: "/products?subcategory=neck-rest-back-rest-sub" }
        ]
      },
      // Moved Column 12: Electronics
      {
        name: "Electronics",
        slug: "electronics",
        subcategories: [
          { name: "Wireless", slug: "wireless-charger", href: "/products?subcategory=wireless-charger" }
        ]
      },
      // Column 12c: Household
      {
        name: "Household",
        slug: "household-utilities",
        subcategories: [
          { name: "Decorative", slug: "decorative", href: "/products?subcategory=decorative" },
          { name: "Household", slug: "household-utilities", href: "/products?subcategory=household-utilities" }
        ]
      },
      // Moved Column 13: Clocks
      {
        name: "Clocks",
        slug: "clocks",
        subcategories: [
          { name: "Wall Clock", slug: "wall-clock", href: "/products?subcategory=wall-clock" },
          { name: "Wrist Watch", slug: "wrist-watch", href: "/products?subcategory=wrist-watch" }
        ]
      }
    ]
  },
  {
    name: "Kits & Hampers",
    slug: "kits-hampers",
    categories: [
      { name: "Corporate Kits", slug: "corporate-kits", subcategories: CORPORATE_KITS.map((item) => ({ ...item, image: localCatalogImage(item.name) || `/category-images/${item.slug}.jpg` })) },
      { name: "Festive Hampers", slug: "festive-hampers", subcategories: OCCASION_HAMPERS.map((item) => ({ ...item, image: localCatalogImage(item.name) || `/category-images/${item.slug}.jpg` })) },
      {
        name: "Grooming Kits",
        slug: "grooming-kits",
        subcategories: [
          { name: "Male Grooming Kit", slug: "male-grooming-kit", href: "/corporate-kits?kit=male-grooming-kit" },
          { name: "Female Grooming Kit", slug: "female-grooming-kit", href: "/corporate-kits?kit=female-grooming-kit" }
        ]
      },
      {
        name: "Executive Kits",
        slug: "executive-kits",
        subcategories: [
          { name: "Executive Kit", slug: "executive-kits-sub", href: "/corporate-kits?kit=executive-kits-sub" }
        ]
      }
    ]
  },
  {
    name: "Packaging",
    slug: "packaging",
    categories: [
      { name: "Packaging", slug: "packaging", subcategories: PACKAGING_SOLUTIONS.map((item) => ({ ...item, image: `/category-images/${item.slug}.jpg` })) }
    ]
  }
];

/**
 * Single source of truth: the exact category slugs that belong to Promotional Products.
 * Used to filter the sidebar in /products so Kits & Hampers categories never appear.
 */
export const PROMO_CATEGORY_SLUGS = new Set(
  PRODUCT_HIERARCHY[0].categories.map((c) => c.slug)
);

/**
 * Single source of truth: the exact subcategory slugs that belong to Promotional Products.
 * Used to filter the API subcategories list in /products sidebar.
 */
export const PROMO_SUBCATEGORY_SLUGS = new Set(
  PRODUCT_HIERARCHY[0].categories.flatMap((c) => c.subcategories.map((s) => s.slug))
);

export const BUDGETS = [
  { name: "₹0–₹250", value: "Under ₹250", href: "/gifts-by-budget/under-250" },
  { name: "₹250–₹500", value: "₹250 - ₹500", href: "/gifts-by-budget/250-500" },
  { name: "₹500–₹1000", value: "₹500 - ₹1000", href: "/gifts-by-budget/500-1000" },
  { name: "₹1000–₹2500", value: "₹1000 - ₹2500", href: "/gifts-by-budget/1000-2500" },
  { name: "₹2500–₹5000", value: "₹2500+", href: "/gifts-by-budget/2500-5000" },
  { name: "₹5000+ Premium", value: "₹2500+", href: "/gifts-by-budget/5000-plus" }
];

export const BRANDS = [
  { name: "JBL", logo: "/logos/jbl.png", category: "Audio", branding: "Co-branded audio kits, speaker sleeves, and event drops" },
  { name: "boAt", logo: "/logos/boat.png", category: "Audio & Wearables", branding: "Welcome kit earbuds, launch giveaways, and tech bundles" },
  { name: "Mokobara", logo: "/logos/mokobara.png", category: "Travel & Lifestyle", branding: "Travel kits, luggage tags, and premium employee rewards" },
  { name: "Parker", logo: "/logos/parker.png", category: "Writing Instruments", branding: "Laser engraving, gift boxes, and executive name personalization" },
  { name: "Wildcraft", logo: "/logos/wildcraft.png", category: "Backpacks & Outdoor", branding: "Corporate backpacks, travel packs, and channel partner kits" },
  { name: "Portronics", logo: "/logos/philips.png", category: "Tech Accessories", branding: "Chargers, cables, desk tech, and branded utility bundles" },
  { name: "Noise", logo: "/logos/aiwa.png", category: "Wearables", branding: "Smartwatch gifting, wellness rewards, and tech hampers" },
  { name: "Adidas", logo: "/logos/adidas.jpg", category: "Apparel", branding: "Team merchandise, event apparel, and embroidered polos" },
  { name: "American Tourister", logo: "/logos/wildcraft.png", category: "Travel", branding: "Travel rewards, luggage sets, and premium milestone gifts" },
  { name: "Milton", logo: "/logos/borosil.png", category: "Drinkware & Utility", branding: "Bottle, tumbler, lunch set, and onboarding kit programs" }
];

export const CATEGORY_SPOTLIGHTS: Record<string, Array<{ title: string; description: string; imageUrl: string; cta: string; brandingOptions?: string[]; href: string }>> = {
  pens: [
    {
      title: "Executive Metal Pens",
      description: "Polished metal pens with a premium hand-feel for leadership gifting, signing ceremonies, and client meetings.",
      imageUrl: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=900&auto=format&fit=crop",
      cta: "Explore Executive Pens",
      href: "/products/executive-metal-pens"
    },
    {
      title: "Premium Roller Pens",
      description: "Smooth rollerball writing instruments with refined finishes and elegant branded presentation boxes.",
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop",
      cta: "View Roller Pens",
      href: "/products/premium-roller-pens"
    },
    {
      title: "Gift Pen Sets",
      description: "Curated pen pairings with notebooks, sleeves, and rigid gift boxes for milestone gifting programs.",
      imageUrl: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=900&auto=format&fit=crop",
      cta: "Build Pen Sets",
      href: "/products/gift-pen-sets"
    },
    {
      title: "Wooden Pens",
      description: "Warm natural-finish pens designed for eco-conscious gifting and understated executive branding.",
      imageUrl: "https://images.unsplash.com/photo-1530538987395-032d1800fdd4?q=80&w=900&auto=format&fit=crop",
      cta: "See Wooden Pens",
      href: "/products/wooden-pens"
    },
    {
      title: "Eco-Friendly Pens",
      description: "Recycled, bamboo, and kraft-finish writing tools for sustainable campaigns and onboarding kits.",
      imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=900&auto=format&fit=crop",
      cta: "Explore Eco Pens",
      href: "/products/eco-friendly-pens"
    },
    {
      title: "Luxury Signature Pens",
      description: "Premium signature-grade pens with weight, gloss, and packaging suited to boardroom gifting.",
      imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=900&auto=format&fit=crop",
      cta: "View Signature Pens",
      href: "/products/luxury-signature-pens"
    }
  ],
  "t-shirts": [
    {
      title: "Polo T-Shirts",
      description: "Premium collared polos with a structured corporate fit for teams, events, and channel programs.",
      imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=900&auto=format&fit=crop",
      cta: "Explore Polos",
      brandingOptions: ["Embroidery", "DTF Print", "Woven Labels"],
      href: "/products/polo-t-shirts"
    },
    {
      title: "Round Neck T-Shirts",
      description: "Soft round-neck tees for campaign merchandise, campus drives, and high-volume brand drops.",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
      cta: "View Round Necks",
      brandingOptions: ["Screen Print", "DTF Print", "Sleeve Branding"],
      href: "/products/round-neck-t-shirts"
    },
    {
      title: "Dry Fit T-Shirts",
      description: "Performance tees with breathable fabrics for sports days, field teams, and outdoor events.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop",
      cta: "See Dry Fit Tees",
      brandingOptions: ["Sublimation", "Heat Transfer", "Reflective Print"],
      href: "/products/dry-fit-t-shirts"
    },
    {
      title: "Corporate Uniform Tees",
      description: "Consistent branded uniforms with dependable sizing, color matching, and bulk fulfillment.",
      imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=900&auto=format&fit=crop",
      cta: "Plan Uniform Tees",
      brandingOptions: ["Embroidery", "Name Tags", "Department Colors"],
      href: "/products/corporate-uniform-tees"
    },
    {
      title: "Premium Cotton Tees",
      description: "High-GSM cotton tees with a refined retail feel for employee rewards and premium swag.",
      imageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=900&auto=format&fit=crop",
      cta: "Explore Cotton Tees",
      brandingOptions: ["Soft Screen Print", "Minimal Chest Logo", "Custom Neck Label"],
      href: "/products/premium-cotton-tees"
    },
    {
      title: "Event Merchandise Tees",
      description: "Campaign-ready tees designed for launches, conferences, concerts, and large corporate events.",
      imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=900&auto=format&fit=crop",
      cta: "Create Event Tees",
      brandingOptions: ["Front/Back Print", "Sponsor Logos", "QR Campaign Print"],
      href: "/products/event-merchandise-tees"
    }
  ]
};

export interface SpecItem {
  label: string;
  value: string;
}

export interface ProductItem {
  title: string;
  category: string;
  subcategory?: string;
  budget: string;
  basePrice: number;
  description: string;
  images: string[];
  specs: SpecItem[];
  customizations: string[];
  packagings: string[];
  moq: number;
}

const BASE_PRODUCTS: Record<string, ProductItem> = {
  "executive-metal-pens": {
    title: "Executive Metal Pens",
    category: "pens",
    budget: "Under ₹250",
    basePrice: 150,
    description: "Durable and elegant brass-body writing instrument with a matte-black coat and customized fine gold tip engravings. Ideal for executive signings and premium promotional giveaways.",
    images: [
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Premium Brass Body" },
      { label: "Writing Nib", value: "German 0.7mm Ball Point / Roller" },
      { label: "Branding Area", value: "40mm x 6mm (Laser/Print)" },
      { label: "Ink Color", value: "Standard Blue / Black refills" },
      { label: "Production SLA", value: "5-7 Working Days" }
    ],
    customizations: ["Precision Laser Engraving", "Pad Screen Printing", "Mirror Gold Finish"],
    packagings: ["Velvet Sleeve", "Eco Kraft Tube Box", "Premium Leatherette Box"],
    moq: 100
  },
  "premium-roller-pens": {
    title: "Premium Roller Pens",
    category: "pens",
    budget: "₹250 - ₹500",
    basePrice: 260,
    description: "Fluid rollerball pens with polished trims, balanced barrels, and refined corporate branding for executive desks and client appreciation gifts.",
    images: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Lacquered brass / stainless steel body" },
      { label: "Writing Nib", value: "0.5mm premium rollerball refill" },
      { label: "Branding Area", value: "Cap and barrel laser area" },
      { label: "Finish Options", value: "Black, chrome, gunmetal, champagne" },
      { label: "Production SLA", value: "5-7 Working Days" }
    ],
    customizations: ["Laser Engraving", "UV Logo Printing", "Name Personalization"],
    packagings: ["Magnetic Pen Box", "Velvet Sleeve", "Rigid Corporate Gift Box"],
    moq: 100
  },
  "gift-pen-sets": {
    title: "Gift Pen Sets",
    category: "pens",
    budget: "₹500 - ₹1000",
    basePrice: 620,
    description: "Curated writing sets pairing premium pens with notebooks, sleeves, and elegant inserts for welcome kits, seminars, and leadership gifting.",
    images: [
      "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Included Items", value: "Pen, spare refill, notebook or presentation sleeve" },
      { label: "Box Type", value: "Rigid board / leatherette presentation box" },
      { label: "Branding Area", value: "Pen barrel, box lid, notebook cover" },
      { label: "Ideal For", value: "Employee onboarding, client gifting, conferences" },
      { label: "Production SLA", value: "7-10 Working Days" }
    ],
    customizations: ["Pen Laser Engraving", "Foil Box Branding", "Custom Insert Card"],
    packagings: ["Rigid Gift Box", "Eco Kraft Set", "Premium Sleeve Set"],
    moq: 50
  },
  "wooden-pens": {
    title: "Wooden Pens",
    category: "pens",
    budget: "Under ₹250",
    basePrice: 180,
    description: "Natural wood-finish pens with subtle grain variation, warm tactility, and laser branding for sustainable corporate merchandise.",
    images: [
      "https://images.unsplash.com/photo-1530538987395-032d1800fdd4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Bamboo / maple-finish wood barrel" },
      { label: "Refill", value: "Smooth blue or black ballpoint refill" },
      { label: "Branding Area", value: "45mm x 6mm barrel engraving" },
      { label: "Sustainability", value: "Low-plastic build and recyclable sleeves" },
      { label: "Production SLA", value: "5-7 Working Days" }
    ],
    customizations: ["Wood Laser Engraving", "Pad Print", "Eco Message Sleeve"],
    packagings: ["Kraft Sleeve", "Bamboo Tube Box", "Notebook Gift Set"],
    moq: 100
  },
  "eco-friendly-pens": {
    title: "Eco-Friendly Pens",
    category: "pens",
    budget: "Under ₹250",
    basePrice: 80,
    description: "Bamboo, recycled paper, and wheat-straw pens designed for sustainability campaigns, onboarding kits, and large-volume event giveaways.",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530538987395-032d1800fdd4?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Recycled paper, bamboo, wheat-straw blends" },
      { label: "Ink", value: "Blue / black smooth ballpoint refill" },
      { label: "Branding Area", value: "Barrel print or clip branding" },
      { label: "Use Case", value: "CSR gifting, education events, welcome kits" },
      { label: "Production SLA", value: "4-6 Working Days" }
    ],
    customizations: ["Single-color Pad Print", "Laser on Bamboo", "Kraft Sleeve Branding"],
    packagings: ["Bulk Eco Wrap", "Kraft Sleeve", "Welcome Kit Insert"],
    moq: 250
  },
  "luxury-signature-pens": {
    title: "Luxury Signature Pens",
    category: "pens",
    budget: "₹1000 - ₹2500",
    basePrice: 1250,
    description: "Signature-grade pens with premium weight, gloss lacquer, and presentation packaging for boardroom gifting and leadership milestones.",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Luxury brass barrel with lacquer finish" },
      { label: "Writing System", value: "Roller / ballpoint / fountain variants" },
      { label: "Branding Area", value: "Cap, barrel, box lid, name plate" },
      { label: "Finish Options", value: "Gloss black, burgundy, gold trim, chrome" },
      { label: "Production SLA", value: "8-12 Working Days" }
    ],
    customizations: ["Name Engraving", "Foil Gift Box", "Numbered Leadership Edition"],
    packagings: ["Velvet-lined Box", "Leatherette Gift Case", "Executive Rigid Box"],
    moq: 25
  },
  "polo-t-shirts": {
    title: "Polo T-Shirts",
    category: "t-shirts",
    budget: "₹250 - ₹500",
    basePrice: 380,
    description: "Premium corporate fit polo shirt crafted from 100% combed cotton. Built with reinforced double-needle stitching, side vents, and a custom embroidery area for your corporate logo.",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Fabric Weight", value: "220-240 GSM Combed Cotton" },
      { label: "Collar & Cuffs", value: "1x1 Rib knit structure" },
      { label: "Branding Area", value: "Left Chest (Embroidery / DTF)" },
      { label: "Sizes Available", value: "S, M, L, XL, XXL, XXXL" },
      { label: "Production SLA", value: "7-10 Working Days" }
    ],
    customizations: ["Logo Thread Embroidery", "High-Definition DTF Printing", "Screen Printing"],
    packagings: ["Polyester Bag", "Cardboard Band wrapper", "Rigid Box Kit"],
    moq: 50
  },
  "round-neck-t-shirts": {
    title: "Round Neck T-Shirts",
    category: "t-shirts",
    budget: "₹250 - ₹500",
    basePrice: 260,
    description: "Soft round-neck branded tees for launches, internal campaigns, campus events, and high-volume merchandise drops.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Fabric Weight", value: "180-200 GSM cotton / cotton blend" },
      { label: "Fit", value: "Unisex regular fit with reinforced neck rib" },
      { label: "Branding Area", value: "Front chest, back panel, sleeve" },
      { label: "Sizes Available", value: "XS to XXXL" },
      { label: "Production SLA", value: "7-10 Working Days" }
    ],
    customizations: ["Screen Printing", "DTF Printing", "Sleeve Branding"],
    packagings: ["Individual Polybag", "Custom Belly Band", "Event Kit Packing"],
    moq: 100
  },
  "dry-fit-t-shirts": {
    title: "Dry Fit T-Shirts",
    category: "t-shirts",
    budget: "₹250 - ₹500",
    basePrice: 340,
    description: "Breathable performance tees made for sports days, field teams, summer campaigns, and outdoor event merchandise.",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Fabric", value: "Moisture-wicking polyester performance knit" },
      { label: "Fit", value: "Athletic regular fit" },
      { label: "Branding Area", value: "Chest, back, sleeve, shoulder" },
      { label: "Use Case", value: "Sports events, field teams, outdoor activations" },
      { label: "Production SLA", value: "8-10 Working Days" }
    ],
    customizations: ["Sublimation Print", "Heat Transfer", "Reflective Print"],
    packagings: ["Individual Polybag", "Team Kit Bundle", "Event Carton Packing"],
    moq: 75
  },
  "corporate-uniform-tees": {
    title: "Corporate Uniform Tees",
    category: "t-shirts",
    budget: "₹500 - ₹1000",
    basePrice: 520,
    description: "Color-matched uniform tees with dependable sizing, durable stitching, and repeatable production for corporate teams.",
    images: [
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Fabric", value: "Cotton-rich pique / jersey options" },
      { label: "Color Matching", value: "Corporate palette and repeat-order matching" },
      { label: "Branding Area", value: "Chest, sleeve, yoke, custom label" },
      { label: "Sizes Available", value: "XS to 5XL on request" },
      { label: "Production SLA", value: "10-14 Working Days" }
    ],
    customizations: ["Logo Embroidery", "Name Tags", "Department Color Coding"],
    packagings: ["Size-wise Bundles", "Name-wise Packing", "Branch Dispatch Cartons"],
    moq: 100
  },
  "premium-cotton-tees": {
    title: "Premium Cotton Tees",
    category: "t-shirts",
    budget: "₹500 - ₹1000",
    basePrice: 560,
    description: "High-GSM cotton tees with a retail-grade hand-feel for employee rewards, premium swag boxes, and brand merchandise stores.",
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Fabric Weight", value: "220-260 GSM combed cotton" },
      { label: "Finish", value: "Bio-washed soft finish" },
      { label: "Branding Area", value: "Minimal chest logo, back print, neck label" },
      { label: "Fit", value: "Premium regular / oversized options" },
      { label: "Production SLA", value: "10-12 Working Days" }
    ],
    customizations: ["Soft Screen Print", "Custom Neck Label", "Premium Hang Tags"],
    packagings: ["Kraft Apparel Sleeve", "Rigid Swag Box", "Individual Polybag"],
    moq: 75
  },
  "event-merchandise-tees": {
    title: "Event Merchandise Tees",
    category: "t-shirts",
    budget: "₹250 - ₹500",
    basePrice: 300,
    description: "Fast-turn event tees for conferences, product launches, concerts, and sponsor-led corporate activations.",
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Fabric", value: "Cotton / cotton-poly event-grade knits" },
      { label: "Print Coverage", value: "Front, back, sleeve, sponsor panels" },
      { label: "Turnaround", value: "Rush production available after artwork approval" },
      { label: "Sizes Available", value: "XS to XXXL" },
      { label: "Production SLA", value: "5-8 Working Days" }
    ],
    customizations: ["Front/Back Screen Print", "Sponsor Logo Grid", "QR Campaign Print"],
    packagings: ["Event Carton Packing", "Volunteer Kit Packing", "Custom Belly Band"],
    moq: 150
  },
  "premium-leather-keychain": {
    title: "Premium Leather Keychain",
    category: "keychains",
    budget: "Under ₹250",
    basePrice: 90,
    description: "Bespoke key fob handmade from oil-pullup genuine leather. Outfitted with rust-resistant matte silver loops and deep blind embossing of your company symbol.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Genuine Split Leather" },
      { label: "Ring Hardware", value: "Heavy-duty Matte Chrome Zinc Alloy" },
      { label: "Branding Area", value: "30mm x 15mm (Embossing)" },
      { label: "Dimensions", value: "95mm x 20mm" },
      { label: "Production SLA", value: "5-6 Working Days" }
    ],
    customizations: ["Blind Debossing", "Gold Foil Hot Stamping", "Laser Marking"],
    packagings: ["Individual Poly wrap", "Eco Kraft Pillow Box", "Magnetic Presentation Case"],
    moq: 200
  },
  "a5-leatherette-diary-planner": {
    title: "A5 Leatherette Diary & Planner",
    category: "diaries",
    budget: "₹250 - ₹500",
    basePrice: 280,
    description: "Hardbound corporate scheduler containing 160 pages of ink-proof cream sheets. Comes with a convenient magnetic snap clasp, customized elastic pen loop, and a logo plate area.",
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Paper Grade", value: "80 GSM Acid-Free Cream Book Paper" },
      { label: "Cover Material", value: "Textured PU Leatherette" },
      { label: "Branding Area", value: "Front Cover (Emboss / Foil / Print)" },
      { label: "Sheet Count", value: "80 Sheets / 160 Pages" },
      { label: "Production SLA", value: "7-8 Working Days" }
    ],
    customizations: ["Blind Debossing", "Metallic Gold/Silver Foil Stamp", "UV Flatbed Printing"],
    packagings: ["Sleeve wrapping", "Craft Box", "Premium Gift Giftbox with Pen insert"],
    moq: 100
  },
  "branded-panel-sports-cap": {
    title: "Branded Panel Sports Cap",
    category: "caps",
    budget: "Under ₹250",
    basePrice: 120,
    description: "Sporty 6-panel athletic cap crafted from high-performance breathable cotton. Includes sweat-absorbing inner band, brass back-buckle adjustments, and embroidery placement area.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534215754734-18e55d13ce35?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "100% Brushed Cotton Twill" },
      { label: "Adjustments", value: "Brass Metal Buckle & Strap" },
      { label: "Branding Area", value: "Front Panel (Embroidery)" },
      { label: "Eyelets", value: "6 Sewn ventilation eyelets" },
      { label: "Production SLA", value: "6-8 Working Days" }
    ],
    customizations: ["3D Puff Embroidery", "Flat Logo Embroidery", "Screen Print"],
    packagings: ["Poly bag wrap", "Custom Carton Sleeve"],
    moq: 100
  },
  "crystal-glass-paper-weight": {
    title: "Crystal Glass Paper Weight",
    category: "paper-weights",
    budget: "Under ₹250",
    basePrice: 160,
    description: "Optically clear heavy-duty crystal dome paperweight. Features sub-surface laser engraving capabilities that floatingly displays your corporate logo in 3D.",
    images: [
      "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Optically Pure K9 Crystal Glass" },
      { label: "Shape Options", value: "Dome, Cube, Globe, Hexagon" },
      { label: "Branding", value: "3D Sub-Surface Laser Engraving" },
      { label: "Weight", value: "Approx 280 grams" },
      { label: "Production SLA", value: "5-7 Working Days" }
    ],
    customizations: ["3D Sub-surface Engraving", "Surface Sandblasting", "Bottom Felt Coating"],
    packagings: ["Satin-lined Rigid Blue Box", "Kraft Cardboard Box"],
    moq: 50
  },
  "premium-desk-organizer-block": {
    title: "Premium Desk Organizer Block",
    category: "tabletop",
    budget: "₹500 - ₹1000",
    basePrice: 650,
    description: "Sleek wooden desk organizer containing slots for writing pens, business visiting cards, writing pads, and an angled smartphone dock. The ultimate executive table utility accessory.",
    images: [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Polished Seasoned Teakwood / MDF" },
      { label: "Desk Slots", value: "Pen hold, Card stand, Mobile Dock" },
      { label: "Branding Area", value: "Front Panel (Laser Burn / Print)" },
      { label: "Dimensions", value: "200mm x 80mm x 50mm" },
      { label: "Production SLA", value: "8-10 Working Days" }
    ],
    customizations: ["Wood Laser Engraving / Burning", "Acrylic Badge overlay", "Screen Print"],
    packagings: ["Individual Bubble wrap + Box", "Custom Corrugated Box"],
    moq: 50
  },
  "anti-theft-laptop-backpack": {
    title: "Anti-Theft Laptop Backpack",
    category: "backpacks",
    budget: "â‚¹1000 - â‚¹2500",
    basePrice: 1450,
    description: "Waterproof corporate backpack with hidden anti-theft zipper layouts, thick laptop padding sleeve, integrated external USB pass-through, and custom printed branding panels.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577733966973-d680bfa24a9e?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "1680D Water-resistant Ballistic Nylon" },
      { label: "Laptop Chamber", value: "Fits up to 15.6 inch screens (foam lock)" },
      { label: "Branding Area", value: "Front pocket (Foil transfer / Badge)" },
      { label: "Capacity", value: "24 Liters" },
      { label: "Production SLA", value: "10-12 Working Days" }
    ],
    customizations: ["Rubber Brand Patch", "Metal Tag Plate Engraving", "Screen Branding"],
    packagings: ["Large polybag wrap", "Eco Kraft Corrugated Shipping Carton"],
    moq: 30
  },
  "retractable-pull-up-standee": {
    title: "Retractable Pull-up Standee",
    category: "standees",
    budget: "₹1000 - ₹2500",
    basePrice: 1800,
    description: "High-stability retractable pull-up display frame built with lightweight anodized aluminium. Features an anti-curl premium matte banner printed with high-resolution UV ink.",
    images: [
      "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Frame Material", value: "Anodized Aluminum extrusion" },
      { label: "Banner Material", value: "Premium Star Flex / Non-tear PVC media" },
      { label: "Dimensions", value: "6ft (H) x 3ft (W) standard" },
      { label: "Printing Quality", value: "High-Res UV Digital print (1200 DPI)" },
      { label: "Production SLA", value: "3-4 Working Days" }
    ],
    customizations: ["Premium Star Banner print", "Economy Flex print", "Double-sided display"],
    packagings: ["Padded Nylon Carry Bag included", "Cardboard Box shipping wrap"],
    moq: 10
  },
  "heavy-duty-outdoor-raincoat": {
    title: "Heavy-Duty Outdoor Raincoat",
    category: "raincoats",
    budget: "₹250 - ₹500",
    basePrice: 420,
    description: "High-grade waterproof raincoat with heat-sealed seams, reflective neon brand stripes on back, double layer zipper-button protection, and custom screen printed corporate logos.",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "PVC Coated High-density Polyester (Waterproof)" },
      { label: "Safety Features", value: "Reflective stripes, adjustable hood" },
      { label: "Branding Area", value: "Left Chest & Back panels" },
      { label: "Sizes", value: "M, L, XL, XXL" },
      { label: "Production SLA", value: "8-10 Working Days" }
    ],
    customizations: ["Reflective Back Print", "Screen Print Logo", "Heat Press Transfer"],
    packagings: ["Individual zip-lock pouch", "Cardboard carton case"],
    moq: 50
  },
  "luxury-leather-tissue-box": {
    title: "Luxury Leather Tissue Box",
    category: "tissue-boxes",
    budget: "₹250 - ₹500",
    basePrice: 290,
    description: "Upscale PU leather tissue cover box outfitted with gold border highlights, soft velvet interior lining, and magnetic bottom closures. Perfect for luxury boardrooms and hotel suites.",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Outer Material", value: "Saffiano-pattern PU Leatherette" },
      { label: "Inner Material", value: "Soft flannel/velvet lining" },
      { label: "Branding Area", value: "Top / Side leather (Embosing/Foil)" },
      { label: "Dimensions", value: "240mm x 120mm x 85mm" },
      { label: "Production SLA", value: "7-8 Working Days" }
    ],
    customizations: ["Blind Debossing", "Gold Foil Hot Stamp", "Silver Foil Stamp"],
    packagings: ["Sleeve wrapping", "Custom Gift Box packaging"],
    moq: 100
  },
  "executive-leather-desk-mat": {
    title: "Executive Leather Desk Mat",
    category: "workspace-essentials",
    budget: "₹500 - ₹1000",
    basePrice: 850,
    description: "Handcrafted top-grain leather blotter with water-resistant finish, hand-stitched borders, and an anti-slip natural suede backing. Features integrated pen slots and subtle brand logo placement.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Premium PU Saffiano Leather / Suede backing" },
      { label: "Dimensions", value: "800mm x 400mm x 2mm" },
      { label: "Water Resistance", value: "Splash-proof coating" },
      { label: "Branding Area", value: "80mm x 20mm (Blind debossed/Foil)" },
      { label: "Production SLA", value: "7-9 Working Days" }
    ],
    customizations: ["Blind Debossing", "Metallic Gold Foil Stamp", "Laser Etching"],
    packagings: ["Eco Kraft Tube Roller", "Luxury Rigid Cardboard Sleeve"],
    moq: 50
  },
  "wireless-charging-wood-organizer": {
    title: "Solid Wood Wireless Charging Dock",
    category: "workspace-essentials",
    budget: "₹1000 - ₹2500",
    basePrice: 1250,
    description: "Premium American Walnut desk organizer with integrated 15W Qi fast wireless charging coil, deep pen holders, smartphone stand, and catch-all tray. Combines luxury workspace aesthetics with modern utility.",
    images: [
      "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Solid American Walnut Wood" },
      { label: "Charging Speed", value: "15W Fast Wireless Qi Charging" },
      { label: "Power Source", value: "USB Type-C input (cable included)" },
      { label: "Branding", value: "Laser Engraved / Metal Badge inlay" },
      { label: "Production SLA", value: "8-10 Working Days" }
    ],
    customizations: ["Laser Wood Engraving", "Metal Logo Inlay", "Silkscreen Printing"],
    packagings: ["Eco-friendly Kraft Cushion Box", "Luxury Velvet-lined Presentation Case"],
    moq: 30
  },
  "smart-temperature-sipper": {
    title: "Smart Temperature LED Sipper",
    category: "workspace-essentials",
    budget: "₹250 - ₹500",
    basePrice: 450,
    description: "Insulated 304 stainless steel vacuum flask featuring an LED touch display on the cap showing current beverage temperature. Elegant matte-black finish customized with high-definition laser branding.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "304 Food-grade Stainless Steel / ABS LCD Cap" },
      { label: "Thermal Capacity", value: "Keep hot for 12 hours / cold for 24 hours" },
      { label: "Capacity", value: "500 ml" },
      { label: "Battery Life", value: "Up to 2 years (non-replaceable LCD cell)" },
      { label: "Production SLA", value: "5-7 Working Days" }
    ],
    customizations: ["Rotary Laser Engraving", "High-Definition UV Printing"],
    packagings: ["Individual White Giftbox", "Custom Printed Cardboard Cylinder sleeve"],
    moq: 100
  },
  "executive-steel-drinkware-set": {
    title: "Executive Steel Drinkware Set",
    category: "drinkware",
    budget: "₹500 - ₹1000",
    basePrice: 720,
    description: "Premium insulated bottle and tumbler pairing curated for employee welcome kits, leadership events, and client appreciation programs. Finished in matte corporate colors with precision logo placement.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "304 Stainless Steel with double-wall vacuum insulation" },
      { label: "Capacity", value: "Bottle 750 ml + tumbler 350 ml" },
      { label: "Branding Area", value: "Vertical bottle body and tumbler front face" },
      { label: "Finish Options", value: "Matte black, pearl white, champagne, navy" },
      { label: "Production SLA", value: "6-9 Working Days" }
    ],
    customizations: ["Rotary Laser Engraving", "UV Logo Printing", "Name Personalization"],
    packagings: ["Rigid Welcome Box", "Kraft Sleeve Box", "Magnetic Presentation Case"],
    moq: 50
  },
  "luxury-curated-gift-set": {
    title: "Luxury Curated Gift Set",
    category: "gift-sets",
    budget: "₹1000 - ₹2500",
    basePrice: 1650,
    description: "A premium corporate gift set combining a hardbound notebook, executive pen, drinkware, cable organizer, and welcome insert inside a branded rigid box for high-impact onboarding.",
    images: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Included Items", value: "Notebook, metal pen, insulated bottle, tech pouch, welcome card" },
      { label: "Box Type", value: "Premium rigid board with custom foam or paper insert" },
      { label: "Branding Area", value: "Outer lid, item surfaces, welcome card, sleeve" },
      { label: "Ideal For", value: "Employee onboarding, client gifting, leadership summits" },
      { label: "Production SLA", value: "10-14 Working Days" }
    ],
    customizations: ["Full Kit Theme Design", "Foil Stamped Box Lid", "Personalized Name Cards"],
    packagings: ["Luxury Magnetic Rigid Box", "Eco Kraft Gift Set", "Sleeve + Insert System"],
    moq: 25
  },
  "executive-notebook-desk-kit": {
    title: "Executive Notebook & Desk Kit",
    category: "executive-gifts",
    budget: "₹1000 - ₹2500",
    basePrice: 1350,
    description: "A refined executive gift kit combining a premium notebook, metal pen, desk accessory, and branded insert for leadership programs and client milestones.",
    images: [
      "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Included Items", value: "Notebook, metal pen, desk accessory, insert card" },
      { label: "Branding Area", value: "Notebook cover, pen barrel, box lid, card" },
      { label: "Finish", value: "Foil, deboss, laser, or UV print" },
      { label: "Ideal For", value: "Leadership gifting, client wins, annual meets" },
      { label: "Production SLA", value: "10-14 Working Days" }
    ],
    customizations: ["Foil Stamped Notebook", "Pen Engraving", "Custom Welcome Insert"],
    packagings: ["Magnetic Rigid Box", "Leatherette Presentation Box", "Eco Kraft Gift Case"],
    moq: 25
  },
  "premium-audio-gadget-kit": {
    title: "Premium Audio Gadget Kit",
    category: "audio-gadgets",
    budget: "₹1000 - ₹2500",
    basePrice: 1800,
    description: "A branded audio gifting bundle with earbuds or compact speakers, cable accessories, and premium packaging for welcome kits and event giveaways.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Included Items", value: "Earbuds / speaker, cable, pouch, branded insert" },
      { label: "Branding Area", value: "Outer case, pouch, sleeve, insert card" },
      { label: "Battery", value: "Model-dependent retail-grade warranty support" },
      { label: "Use Case", value: "Tech hampers, event rewards, employee onboarding" },
      { label: "Production SLA", value: "7-12 Working Days" }
    ],
    customizations: ["Sleeve Branding", "Pouch Print", "Co-branded Insert Cards"],
    packagings: ["Rigid Tech Box", "Welcome Kit Insert", "Premium Sleeve Box"],
    moq: 30
  },
  "branded-tech-accessory-kit": {
    title: "Branded Tech Accessory Kit",
    category: "tech-accessories",
    budget: "₹500 - ₹1000",
    basePrice: 780,
    description: "Useful desk-tech kits with charging cables, organizers, power accessories, and compact cases designed for modern employee welcome programs.",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Included Items", value: "Cable kit, organizer pouch, stand or charging accessory" },
      { label: "Branding Area", value: "Pouch, sleeve, accessory surface, insert card" },
      { label: "Compatibility", value: "USB-C, Lightning, Type-A options by kit" },
      { label: "Ideal For", value: "Hybrid teams, onboarding, conference delegate kits" },
      { label: "Production SLA", value: "7-10 Working Days" }
    ],
    customizations: ["UV Print", "Debossed Pouch", "Custom Cable Wrap"],
    packagings: ["Kraft Tech Box", "Rigid Utility Kit", "Slim Mailer Sleeve"],
    moq: 50
  },
  "aluminum-laptop-stand": {
    title: "Premium Aluminum Laptop Stand",
    category: "workspace-essentials",
    budget: "₹500 - ₹1000",
    basePrice: 950,
    description: "Ergonomic foldable laptop riser machined from premium anodized aircraft-grade aluminum. Built with 6-level angle adjustments, silicone anti-slip cushioning pads, and structural heat-dissipation slots.",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop"
    ],
    specs: [
      { label: "Material", value: "Anodized Aircraft-grade Aluminum" },
      { label: "Weight Support", value: "Supports up to 20kg load sizes" },
      { label: "Adjustment", value: "6 Angle Heights (55mm to 155mm)" },
      { label: "Dimensions", value: "240mm x 45mm x 15mm (Folded)" },
      { label: "Production SLA", value: "6-8 Working Days" }
    ],
    customizations: ["Precision Laser Engraving"],
    packagings: ["Velvet Drawstring Pouch + White Box", "Custom Corrugated Sleeve box"],
    moq: 50
  }
};

interface ProductSeed {
  key: string;
  title: string;
  category: string;
  budget: string;
  basePrice: number;
  description: string;
  image: string;
  specs: SpecItem[];
  customizations: string[];
  packagings: string[];
  moq: number;
}

const standardSpecs = (material: string, branding: string, idealFor: string): SpecItem[] => [
  { label: "Material", value: material },
  { label: "Branding Area", value: branding },
  { label: "Ideal For", value: idealFor },
  { label: "Bulk QC", value: "Artwork proofing and batch inspection before dispatch" },
  { label: "Production SLA", value: "7-12 Working Days" }
];

const productSeeds: ProductSeed[] = [
  { key: "welcome-desk-kit", title: "Welcome Desk Kit", category: "workspace-essentials", budget: "₹1000 - ₹2500", basePrice: 1450, description: "Desk-ready onboarding set with notebook, pen, organizer, name card, and branded presentation sleeve.", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("Notebook, pen, organizer and paper inserts", "Notebook cover, pen barrel, sleeve, welcome card", "Employee onboarding, campus hiring, startup welcome kits"), customizations: ["UV Print", "Foil Logo", "Personalized Name Card"], packagings: ["Rigid Welcome Box", "Kraft Mailer", "Sleeve Box"], moq: 50 },
  { key: "bamboo-desk-organizer", title: "Bamboo Desk Organizer", category: "workspace-essentials", budget: "₹500 - ₹1000", basePrice: 780, description: "Natural bamboo desk organizer for pens, phone, cards, and daily office utilities with subtle logo engraving.", image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("Bamboo wood with smooth matte finish", "Front face and side panel", "Eco-conscious desk gifting and welcome desks"), customizations: ["Laser Engraving", "Screen Print", "Custom Insert Card"], packagings: ["Kraft Box", "Rigid Desk Kit"], moq: 100 },
  { key: "wireless-charging-mousepad", title: "Wireless Charging Mousepad", category: "workspace-essentials", budget: "₹1000 - ₹2500", basePrice: 1250, description: "Premium PU mousepad with integrated wireless charging zone for executive desks and hybrid work kits.", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("PU leather surface with wireless charging module", "Corner deboss and sleeve print", "Leadership gifting and hybrid work desks"), customizations: ["Debossing", "Foil Logo", "Printed Sleeve"], packagings: ["Magnetic Rigid Box", "Tech Sleeve"], moq: 50 },
  { key: "foldable-phone-stand", title: "Foldable Phone Stand", category: "workspace-essentials", budget: "Under ₹250", basePrice: 190, description: "Compact foldable phone stand for desks, events, and welcome kits with high-visibility logo placement.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("ABS body with silicone grip pads", "Back panel and base plate", "Events, training programs, desk utility giveaways"), customizations: ["Pad Print", "UV Print", "Gift Sleeve"], packagings: ["Printed Sleeve", "Kraft Box"], moq: 250 },
  { key: "executive-desk-clock", title: "Executive Desk Clock", category: "workspace-essentials", budget: "₹500 - ₹1000", basePrice: 850, description: "Elegant desktop clock with branding plate for long-life executive desk presence and award kits.", image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Metal and acrylic desk clock body", "Metal plate and box sleeve", "Milestone rewards and client appreciation"), customizations: ["Metal Plate Engraving", "Foil Box Logo", "Name Personalization"], packagings: ["Rigid Gift Box", "Velvet Tray Box"], moq: 50 },
  { key: "stylus-ball-pen", title: "Stylus Ball Pen", category: "pens", budget: "Under ₹250", basePrice: 85, description: "Dual-purpose stylus pen for touchscreens and everyday writing, suited to conferences and onboarding kits.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Metal barrel with stylus tip", "Barrel laser area", "Conference giveaways and tech teams"), customizations: ["Laser Engraving", "Pad Print", "Color Matched Barrel"], packagings: ["Velvet Sleeve", "Printed Card Sleeve"], moq: 250 },
  { key: "bamboo-eco-pen", title: "Bamboo Eco Pen", category: "pens", budget: "Under ₹250", basePrice: 55, description: "Eco-friendly bamboo body pen with smooth writing refill for sustainability campaigns and green gifting.", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Bamboo barrel with metal clip", "Laser area on barrel", "CSR events and eco welcome kits"), customizations: ["Laser Engraving", "Screen Print", "Kraft Card Mount"], packagings: ["Kraft Sleeve", "Eco Tube"], moq: 500 },
  { key: "fountain-pen-gift-box", title: "Fountain Pen Gift Box", category: "pens", budget: "₹1000 - ₹2500", basePrice: 1350, description: "Premium fountain pen set with refill cartridge and rigid box for leadership gifting and signing ceremonies.", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Lacquered metal fountain pen", "Clip, cap, and box top", "Executive rewards and client gifts"), customizations: ["Cap Engraving", "Foil Box Logo", "Name Plate"], packagings: ["Rigid Pen Box", "Leatherette Box"], moq: 50 },
  { key: "cotton-oversized-t-shirt", title: "Cotton Oversized T-Shirt", category: "t-shirts", budget: "₹250 - ₹500", basePrice: 420, description: "Modern oversized cotton tee for brand drops, startup culture kits, and youth-focused event merchandise.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("220 GSM cotton jersey", "Chest, back, sleeve, neck label", "Brand drops, college campaigns, team merchandise"), customizations: ["Screen Print", "DTF Transfer", "Woven Label"], packagings: ["Poly Bag", "Kraft Apparel Sleeve"], moq: 100 },
  { key: "polo-performance-t-shirt", title: "Performance Polo T-Shirt", category: "t-shirts", budget: "₹500 - ₹1000", basePrice: 620, description: "Moisture-wicking polo with embroidered logo for sales teams, channel events, and uniforms.", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Dry-fit polyester pique", "Chest embroidery and sleeve print", "Sales teams, field staff, events"), customizations: ["Embroidery", "Heat Transfer", "Custom Collar Tape"], packagings: ["Apparel Pouch", "Branded Sleeve"], moq: 100 },
  { key: "event-volunteer-t-shirt", title: "Event Volunteer T-Shirt", category: "t-shirts", budget: "Under ₹250", basePrice: 230, description: "Budget-friendly branded event tee with clear color coding for teams, crews, and campaign staff.", image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Cotton blend single jersey", "Front, back, sleeve print", "Marathons, expos, activations, internal events"), customizations: ["Screen Print", "DTF Print", "Size Stickers"], packagings: ["Bulk Poly Pack", "Individual Sleeve"], moq: 250 },
  { key: "metal-rotating-keychain", title: "Metal Rotating Keychain", category: "keychains", budget: "Under ₹250", basePrice: 95, description: "Durable rotating metal keychain with polished brand plate for dealer programs and everyday giveaways.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Zinc alloy metal body", "Front and back metal plate", "Dealer gifts, real estate handovers, event giveaways"), customizations: ["Laser Engraving", "Domed Logo", "Enamel Fill"], packagings: ["Velvet Pouch", "Rigid Mini Box"], moq: 250 },
  { key: "leather-loop-keychain", title: "Leather Loop Keychain", category: "keychains", budget: "Under ₹250", basePrice: 140, description: "PU leather loop keychain with metal rivet branding for premium but compact corporate gifting.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("PU leather and metal clasp", "Leather loop and metal tag", "Client gifts and welcome kits"), customizations: ["Debossing", "Foil Stamp", "Laser Metal Tag"], packagings: ["Kraft Box", "Velvet Pouch"], moq: 200 },
  { key: "a5-hardbound-notebook", title: "A5 Hardbound Notebook", category: "diaries", budget: "Under ₹250", basePrice: 210, description: "Hardbound A5 notebook with elastic closure and brandable cover for onboarding, seminars, and training kits.", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Hardbound paper notebook with elastic", "Front cover and first page", "Training, onboarding, seminar giveaways"), customizations: ["Foil Logo", "UV Print", "Custom Insert Pages"], packagings: ["Paper Belly Band", "Kraft Sleeve"], moq: 200 },
  { key: "undated-planner", title: "Undated Planner", category: "diaries", budget: "₹250 - ₹500", basePrice: 360, description: "Premium undated planner with monthly goals, notes, and brand pages for year-round corporate use.", image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Hardcase planner with ruled and goal pages", "Cover, inside pages, sleeve", "Annual gifting and leadership desk kits"), customizations: ["Debossed Cover", "Custom Pages", "Foil Belly Band"], packagings: ["Rigid Planner Box", "Kraft Sleeve"], moq: 100 },
  { key: "baseball-cap", title: "Branded Baseball Cap", category: "caps", budget: "Under ₹250", basePrice: 180, description: "Six-panel cotton cap with embroidered front logo for field events, campaigns, and team merchandise.", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Cotton twill six-panel cap", "Front panel, side panel, back strap", "Events, sports days, field teams"), customizations: ["Embroidery", "Patch Logo", "Screen Print"], packagings: ["Bulk Pack", "Individual Poly Bag"], moq: 200 },
  { key: "trucker-mesh-cap", title: "Trucker Mesh Cap", category: "caps", budget: "₹250 - ₹500", basePrice: 280, description: "Structured trucker cap with breathable mesh and bold front branding for outdoor promotions.", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Cotton front with mesh back", "Front patch and side tag", "Outdoor campaigns and field teams"), customizations: ["Woven Patch", "Embroidery", "Printed Inner Tape"], packagings: ["Individual Poly Bag", "Kraft Tag"], moq: 150 },
  { key: "premium-commuter-backpack", title: "Premium Commuter Backpack", category: "backpacks", budget: "₹1000 - ₹2500", basePrice: 1850, description: "Sleek corporate commuter backpack with laptop sleeve, organizer pockets, and discreet branding panel.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Water-resistant polyester with padded laptop sleeve", "Front patch, puller, inner label", "Employee rewards and leadership kits"), customizations: ["Embroidery Patch", "Rubber Badge", "Custom Puller"], packagings: ["Dust Bag", "Corrugated Shipper"], moq: 50 },
  { key: "drawstring-event-bag", title: "Drawstring Event Bag", category: "backpacks", budget: "Under ₹250", basePrice: 120, description: "Lightweight drawstring bag for events, school campaigns, and conference attendee kits.", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Polyester drawstring fabric", "Large front print area", "Events, launches, campus programs"), customizations: ["Screen Print", "Heat Transfer", "Color Matched Cord"], packagings: ["Bulk Pack", "Kit Insert"], moq: 500 },
  { key: "vacuum-insulated-bottle", title: "Vacuum Insulated Bottle", category: "drinkware", budget: "₹500 - ₹1000", basePrice: 620, description: "Double-wall stainless bottle with leakproof cap and laser logo for daily office and field use.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("304 stainless steel double-wall body", "Front vertical logo and cap top", "Onboarding, wellness, field teams"), customizations: ["Laser Engraving", "UV Print", "Color Powder Coating"], packagings: ["White Bottle Box", "Rigid Gift Box"], moq: 100 },
  { key: "ceramic-coffee-mug", title: "Ceramic Coffee Mug", category: "drinkware", budget: "Under ₹250", basePrice: 160, description: "Classic ceramic mug with full-color logo print for offices, events, cafeterias, and welcome kits.", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Ceramic 300 ml mug", "Wrap print and handle side", "Office desks, events, cafeteria branding"), customizations: ["Sublimation Print", "Screen Print", "Individual Name Print"], packagings: ["Printed Mug Box", "Corrugated Shipper"], moq: 200 },
  { key: "travel-tumbler", title: "Travel Tumbler", category: "drinkware", budget: "₹500 - ₹1000", basePrice: 740, description: "Insulated travel tumbler with splash-proof lid for premium welcome kits and commute gifting.", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Stainless steel tumbler with PP lid", "Body laser or UV print", "Hybrid work, travel, wellness rewards"), customizations: ["Laser Engraving", "UV Print", "Gift Sleeve"], packagings: ["Tumbler Box", "Rigid Gift Kit"], moq: 100 },
  { key: "bluetooth-speaker", title: "Bluetooth Speaker", category: "audio-gadgets", budget: "₹1000 - ₹2500", basePrice: 1600, description: "Compact Bluetooth speaker for premium tech kits, employee rewards, and festive hampers.", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Portable speaker with Bluetooth connectivity", "Top panel and sleeve", "Premium hampers and recognition rewards"), customizations: ["UV Logo", "Printed Sleeve", "Co-branded Insert"], packagings: ["Tech Gift Box", "Rigid Hamper Box"], moq: 50 },
  { key: "wireless-earbuds", title: "Wireless Earbuds", category: "audio-gadgets", budget: "₹1000 - ₹2500", basePrice: 1450, description: "Wireless earbuds with compact charging case for high-utility tech gifting and launch giveaways.", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("TWS earbuds with charging case", "Case top and outer sleeve", "Tech teams, launches, reward programs"), customizations: ["UV Logo", "Sleeve Branding", "Custom Insert Card"], packagings: ["Tech Sleeve Box", "Rigid Kit Box"], moq: 50 },
  { key: "usb-c-hub", title: "USB-C Hub", category: "tech-accessories", budget: "₹1000 - ₹2500", basePrice: 1350, description: "Multi-port USB-C hub for laptop users, hybrid teams, training kits, and executive desk setups.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Aluminum USB-C multi-port body", "Top logo and sleeve", "Hybrid teams and executive work kits"), customizations: ["Laser Engraving", "Printed Sleeve", "Cable Band"], packagings: ["Tech Tray Box", "Kraft Electronics Box"], moq: 50 },
  { key: "power-bank-10000mah", title: "10000mAh Power Bank", category: "tech-accessories", budget: "₹1000 - ₹2500", basePrice: 1250, description: "Compact branded power bank for travel, sales teams, event delegates, and emergency desk kits.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("10000mAh lithium polymer battery", "Front face and sleeve", "Travel kits, sales teams, event delegates"), customizations: ["UV Print", "Laser Logo", "Custom Cable Wrap"], packagings: ["Tech Sleeve Box", "Rigid Electronics Box"], moq: 50 },
  { key: "executive-leather-folder", title: "Executive Leather Folder", category: "executive-gifts", budget: "₹1000 - ₹2500", basePrice: 1550, description: "Premium leatherette document folder with notebook, card slots, pen loop, and debossed branding.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("PU leatherette folder with notebook insert", "Front cover and inside pocket", "Leadership meetings and client proposals"), customizations: ["Debossing", "Foil Stamp", "Name Personalization"], packagings: ["Rigid Folder Box", "Sleeve Box"], moq: 50 },
  { key: "crystal-award-plaque", title: "Crystal Award Plaque", category: "executive-gifts", budget: "₹1000 - ₹2500", basePrice: 1800, description: "Clear crystal recognition plaque for annual awards, milestones, partner appreciation, and leadership events.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Optical crystal with presentation base", "Etched face and name plate", "Awards, milestones, partner appreciation"), customizations: ["Laser Etching", "Name Personalization", "Foil Box"], packagings: ["Velvet Lined Box", "Rigid Award Box"], moq: 25 },
  { key: "premium-scented-candle-set", title: "Premium Scented Candle Set", category: "gift-sets", budget: "₹500 - ₹1000", basePrice: 880, description: "Curated candle set with premium fragrances, custom label, and gift-ready branded packaging.", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Glass jar candles with fragrance wax", "Jar label and box sleeve", "Festive hampers and client appreciation"), customizations: ["Custom Label", "Foil Sleeve", "Gift Card"], packagings: ["Rigid Hamper Box", "Kraft Gift Box"], moq: 100 },
  { key: "gourmet-dry-fruit-set", title: "Gourmet Dry Fruit Set", category: "gift-sets", budget: "₹1000 - ₹2500", basePrice: 1750, description: "Premium dry fruit gift set with reusable jars, custom sleeve, and festive corporate presentation box.", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Assorted dry fruits in reusable jars", "Jar labels, sleeve, and greeting card", "Festive gifting and premium client hampers"), customizations: ["Custom Jar Labels", "Foil Sleeve", "Greeting Card"], packagings: ["Rigid Hamper Box", "Drawer Box"], moq: 50 },
  { key: "executive-notebook-pen-set", title: "Executive Notebook Pen Set", category: "gift-sets", budget: "₹500 - ₹1000", basePrice: 720, description: "Notebook and pen combo in a compact box for seminars, leadership meets, and everyday corporate gifting.", image: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=900&auto=format&fit=crop", specs: standardSpecs("Notebook, metal pen and box", "Notebook, pen, box top", "Seminars, welcome kits, leadership events"), customizations: ["Foil Logo", "Pen Engraving", "Box Sleeve"], packagings: ["Magnetic Box", "Kraft Combo Box"], moq: 100 },
  { key: "custom-tabletop-calendar", title: "Custom Tabletop Calendar", category: "workspace-essentials", budget: "Under ₹250", basePrice: 180, description: "Branded tabletop calendar with monthly artwork pages for desk visibility across the year.", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("Art card calendar with metal wiro", "Base, monthly pages, cover", "Annual gifting and office desks"), customizations: ["Full Color Print", "Custom Month Pages", "Foil Cover"], packagings: ["Shrink Wrap", "Kraft Sleeve"], moq: 250 },
  { key: "weatherproof-raincoat", title: "Weatherproof Raincoat", category: "t-shirts", budget: "₹500 - ₹1000", basePrice: 650, description: "Durable branded rainwear for field teams, delivery crews, dealers, and outdoor activation staff.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("Water-resistant polyester rainwear", "Chest, back, sleeve", "Field teams and monsoon campaigns"), customizations: ["Heat Transfer", "Reflective Logo", "Size Label"], packagings: ["Carry Pouch", "Bulk Field Pack"], moq: 100 },
  { key: "premium-luggage-tag", title: "Premium Luggage Tag", category: "backpacks", budget: "Under ₹250", basePrice: 160, description: "Leatherette luggage tag with privacy flap and branded metal buckle for travel kits and rewards.", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("PU leatherette travel tag", "Front flap and backing card", "Travel rewards and conference kits"), customizations: ["Debossing", "Foil Logo", "Name Card"], packagings: ["Kraft Sleeve", "Travel Kit Box"], moq: 200 },
  { key: "branded-tote-bag", title: "Branded Cotton Tote Bag", category: "backpacks", budget: "Under ₹250", basePrice: 180, description: "Reusable cotton tote with generous print area for events, retail drops, and sustainable campaigns.", image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop", specs: standardSpecs("Cotton canvas tote fabric", "Front and back panels", "Events, launches, retail promotions"), customizations: ["Screen Print", "DTF Print", "Woven Label"], packagings: ["Bulk Pack", "Paper Belly Band"], moq: 250 }
];

const generatedProducts = Object.fromEntries(
  productSeeds.map((seed) => [
    seed.key,
    {
      title: seed.title,
      category: seed.category,
      budget: seed.budget,
      basePrice: seed.basePrice,
      description: seed.description,
      images: [seed.image],
      specs: seed.specs,
      customizations: seed.customizations,
      packagings: seed.packagings,
      moq: seed.moq
    }
  ])
) as Record<string, ProductItem>;

const RAW_PRODUCTS: Record<string, ProductItem> = {
  ...BASE_PRODUCTS,
  ...generatedProducts
};

const CATEGORY_IMAGE_LIBRARY: Record<string, string[]> = {
  "workspace-essentials": [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1000&auto=format&fit=crop"
  ],
  pens: [
    "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530538987395-032d1800fdd4?q=80&w=1000&auto=format&fit=crop"
  ],
  "t-shirts": [
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000&auto=format&fit=crop"
  ],
  keychains: [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
  ],
  diaries: [
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop"
  ],
  caps: [
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1000&auto=format&fit=crop"
  ],
  backpacks: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop"
  ],
  drinkware: [
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1000&auto=format&fit=crop"
  ],
  "executive-gifts": [
    "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop"
  ],
  "gift-sets": [
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop"
  ],
  "audio-gadgets": [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop"
  ],
  "tech-accessories": [
    "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"
  ],
  "paper-weights": [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop"
  ],
  tabletop: [
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop"
  ],
  standees: [
    "https://images.unsplash.com/photo-1560174038-da43ac74f01b?q=80&w=1000&auto=format&fit=crop"
  ],
  raincoats: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop"
  ],
  "tissue-boxes": [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
  ]
};

const PRODUCT_CATEGORY_OVERRIDES: Record<string, { category: string; subcategory: string }> = {
  "weatherproof-raincoat": { category: "raincoats", subcategory: "raincoats" },
  "premium-luggage-tag": { category: "travel-accessories", subcategory: "travel-accessories" },
  "branded-tote-bag": { category: "travel-bags", subcategory: "travel-bags" },
  "wireless-charging-mousepad": { category: "mouse-pads", subcategory: "mouse-pads" },
  "power-bank-10000mah": { category: "power-banks", subcategory: "power-banks" },
  "bluetooth-speaker": { category: "bluetooth-speakers", subcategory: "bluetooth-speakers" },
  "wireless-earbuds": { category: "headphones", subcategory: "headphones" },
  "ceramic-coffee-mug": { category: "mugs", subcategory: "mugs" },
  "vacuum-insulated-bottle": { category: "premium-bottles", subcategory: "premium-bottles" },
  "travel-tumbler": { category: "tumblers", subcategory: "tumblers" },
  "usb-c-hub": { category: "usb-drives", subcategory: "usb-drives" },
  "a5-hardbound-notebook": { category: "notebooks", subcategory: "notebooks" },
  "custom-tabletop-calendar": { category: "desk-accessories", subcategory: "desk-accessories" },
  "bamboo-desk-organizer": { category: "desk-accessories", subcategory: "desk-accessories" },
  "executive-desk-clock": { category: "executive-organizers", subcategory: "executive-organizers" },
};

const PRODUCT_IMAGE_OVERRIDES: Record<string, string[]> = {
  "weatherproof-raincoat": ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop"],
  "premium-luggage-tag": ["https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=1000&auto=format&fit=crop"],
  "branded-tote-bag": ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop"],
  "wireless-charging-mousepad": ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop"],
  "power-bank-10000mah": ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1000&auto=format&fit=crop"],
  "bluetooth-speaker": ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop"],
  "wireless-earbuds": ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop"],
  "ceramic-coffee-mug": ["https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1000&auto=format&fit=crop"],
  "vacuum-insulated-bottle": ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop"],
  "travel-tumbler": ["https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1000&auto=format&fit=crop"],
  "usb-c-hub": ["https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=1000&auto=format&fit=crop"],
  "a5-hardbound-notebook": ["https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1000&auto=format&fit=crop"],
  "executive-leather-desk-mat": ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"],
  "wireless-charging-wood-organizer": ["https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1000&auto=format&fit=crop"],
  "smart-temperature-sipper": ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop"],
  "aluminum-laptop-stand": ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop"],
};

const deriveSubcategory = (category: string) => {
  const aliases: Record<string, string> = {
    tabletop: "desk-accessories",
    "paper-weights": "desk-accessories",
    "tissue-boxes": "desk-accessories",
    standees: "retail-packaging",
  };
  return aliases[category] || category;
};

const normalizeProductImages = (products: Record<string, ProductItem>) => {
  return Object.fromEntries(
    Object.entries(products).map(([key, product], index) => {
      const taxonomy = PRODUCT_CATEGORY_OVERRIDES[key] ?? { category: product.category, subcategory: product.subcategory || deriveSubcategory(product.category) };
      const imageOverride = PRODUCT_IMAGE_OVERRIDES[key];
      const titleMatchedImage = localCatalogImage(product.title) || realCatalogImage(product.title, taxonomy.category, taxonomy.subcategory, key);
      const library = CATEGORY_IMAGE_LIBRARY[taxonomy.category] || CATEGORY_IMAGE_LIBRARY[product.category] || CATEGORY_IMAGE_LIBRARY["gift-sets"];
      const startIndex = index % library.length;
      const supportingImages = imageOverride || product.images || [
        library[startIndex],
        library[(startIndex + 1) % library.length],
        library[(startIndex + 2) % library.length]
      ];
      const images = [titleMatchedImage, ...supportingImages].filter((image, imageIndex, self) => image && self.indexOf(image) === imageIndex);

      return [key, { ...product, ...taxonomy, images }];
    })
  ) as Record<string, ProductItem>;
};

export const PRODUCTS: Record<string, ProductItem> = normalizeProductImages(RAW_PRODUCTS);

export const CMS_PRODUCT_DATA = Object.entries(PRODUCTS).map(([slug, product]) => ({
  slug,
  title: product.title,
  category: product.category,
  subcategory: product.subcategory || deriveSubcategory(product.category),
  image: product.images[0],
}));

const BASE_SITE_KITS = [
  {
    title: "Joining Kits",
    price: "Custom Quote",
    description: "Essential onboarding kit with diary, pen, sipper, and welcome card.",
    imageUrl: "https://images.unsplash.com/photo-1542382156909-9ae37b3f56fd?q=80&w=800&auto=format&fit=crop",
    category: "corporate",
    slug: "joining"
  },
  {
    title: "Dealer / Retailer Kit",
    price: "Custom Quote",
    description: "High-value kits designed for your business partners, dealers, and retail outlet owners.",
    imageUrl: "https://images.pexels.com/photos/6590930/pexels-photo-6590930.jpeg",
    category: "corporate",
    slug: "dealer"
  },
  {
    title: "Doctor Kits",
    price: "Custom Quote",
    description: "Specially curated medical-themed stationery and utility items.",
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
    category: "corporate",
    slug: "doctor"
  },
  {
    title: "Architect Kits",
    price: "Custom Quote",
    description: "Premium design tools and high-quality notebooks for architects.",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef23?q=80&w=800&auto=format&fit=crop",
    category: "corporate",
    slug: "architect"
  },
  {
    title: "Plumber Kits",
    price: "Custom Quote",
    description: "Branded toolbags and functional accessories for plumbing professionals.",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca1f965?q=80&w=800&auto=format&fit=crop",
    category: "corporate",
    slug: "plumber"
  },
  {
    title: "Interior Designer Kits",
    price: "Custom Quote",
    description: "Elegant concept presentation kits with swatch organizers, premium notebooks, pens, and presentation folders for interior design professionals.",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    category: "industry",
    slug: "interior-designer"
  },
  {
    title: "Painter Kits",
    price: "Custom Quote",
    description: "Professional painter utility kits with branded overalls, hats, and protective gear.",
    imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop",
    category: "industry",
    slug: "painter"
  },
  {
    title: "Engineer Kits",
    price: "Custom Quote",
    description: "Safety and engineering tools, premium notebooks, high-visibility caps, and technical gear.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    category: "industry",
    slug: "engineer"
  }
];

const KIT_EXPANSIONS = [
  { title: "Essential Joining Kit", price: "Custom Quote", description: "Notebook, metal pen, bottle, ID card holder, welcome card, and branded mailer for fast onboarding rollouts.", imageUrl: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=900&auto=format&fit=crop", category: "corporate", slug: "essential-joining-kit" },
  { title: "Premium Joining Kit", price: "Custom Quote", description: "Luxury notebook, insulated bottle, desk mat, tech pouch, greeting card, and rigid presentation box.", imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=900&auto=format&fit=crop", category: "corporate", slug: "premium-joining-kit" },
  { title: "Campus Hire Kit", price: "Custom Quote", description: "Youthful onboarding kit with oversized tee, tote, sipper, sticker sheet, and brand story card.", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop", category: "corporate", slug: "campus-hire-kit" },
  { title: "Dealer Launch Kit", price: "Custom Quote", description: "Dealer certificate folder, product samples, metal keychain, desk nameplate, and branded sales collateral.", imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=900&auto=format&fit=crop", category: "corporate", slug: "dealer-launch-kit" },
  { title: "Doctor Desk Kit", price: "Custom Quote", description: "Clinic desk kit with pen stand, planner, prescription pad cover, tumbler, and dignified branded box.", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "doctor-desk-kit" },
  { title: "Architect Studio Kit", price: "Custom Quote", description: "Creative kit with sketchbook, ruler, premium pen, desk organizer, sample swatches, and rigid portfolio box.", imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "architect-studio-kit" },
  { title: "Electrician Safety Kit", price: "Custom Quote", description: "Utility kit with insulated gloves, branded cap, notepad, safety card, tester pouch, and field packaging.", imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "electrician-safety-kit" },
  { title: "Mason Recognition Kit", price: "Custom Quote", description: "Recognition pack with branded tee, cap, bottle, tool pouch, certificate, and rugged outer carton.", imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "mason-recognition-kit" },
  { title: "Interior Designer Kit", price: "Custom Quote", description: "Designer sample kit with notebook, swatch cards, ruler, premium pen, and presentation-ready box.", imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "interior-designer-sample-kit" },
  { title: "Plumber Toolkit Kit", price: "Custom Quote", description: "Professional toolbag with custom measuring tape, insulated bottle, protective gloves, and branded note pads.", imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "plumber-toolkit" },
  { title: "Retailer Store Kit", price: "Custom Quote", description: "Branded shop counter display standee, premium metal keychain, visitor notebook, and merchant pen.", imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "retailer-store" },
  { title: "Painter Gear Kit", price: "Custom Quote", description: "Painter overall clothing, branded cap, customized paint-swatch notebook, and metal signature pen.", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "painter-gear" },
  { title: "Engineer Safety Kit", price: "Custom Quote", description: "High-visibility vest, branded engineering hard hat, technical drawing notepad, and premium stylus pen.", imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop", category: "industry", slug: "engineer-safety" }
];

const RAW_SITE_KITS = [
  ...BASE_SITE_KITS,
  ...KIT_EXPANSIONS
];

const KIT_IMAGE_LIBRARY = {
  joining: [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=1000&auto=format&fit=crop"
  ],
  doctor: [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop"
  ],
  architect: [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=1000&auto=format&fit=crop"
  ],
  mason: [
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1000&auto=format&fit=crop"
  ],
  field: [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop"
  ],
  realEstate: [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
  ],
  pharma: [
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop"
  ],
  sales: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1000&auto=format&fit=crop"
  ],
  partner: [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=1000&auto=format&fit=crop"
  ],
  training: [
    "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=1000&auto=format&fit=crop"
  ],
  default: [
    "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
  ]
};

const kitImageGroup = (kit: { title: string; slug: string }) => {
  const haystack = `${kit.title} ${kit.slug}`.toLowerCase();
  if (haystack.includes("doctor") || haystack.includes("hospital")) return KIT_IMAGE_LIBRARY.doctor;
  if (haystack.includes("architect") || haystack.includes("interior")) return KIT_IMAGE_LIBRARY.architect;
  if (haystack.includes("mason")) return KIT_IMAGE_LIBRARY.mason;
  if (haystack.includes("contractor") || haystack.includes("electrician") || haystack.includes("mason")) return KIT_IMAGE_LIBRARY.field;
  if (haystack.includes("real-estate") || haystack.includes("handover")) return KIT_IMAGE_LIBRARY.realEstate;
  if (haystack.includes("pharma")) return KIT_IMAGE_LIBRARY.pharma;
  if (haystack.includes("sales") || haystack.includes("dealer") || haystack.includes("distributor")) return KIT_IMAGE_LIBRARY.sales;
  if (haystack.includes("partner") || haystack.includes("appreciation")) return KIT_IMAGE_LIBRARY.partner;
  if (haystack.includes("training") || haystack.includes("seminar") || haystack.includes("conference")) return KIT_IMAGE_LIBRARY.training;
  if (haystack.includes("joining") || haystack.includes("welcome") || haystack.includes("onboarding") || haystack.includes("employee") || haystack.includes("startup") || haystack.includes("campus")) return KIT_IMAGE_LIBRARY.joining;
  return KIT_IMAGE_LIBRARY.default;
};

export const SITE_KITS = RAW_SITE_KITS.map((kit) => {
  const images = kitImageGroup(kit);
  const imageUrl = localCatalogImage(kit.title) || realCatalogImage(kit.title, "corporate-kits", kit.slug, kit.slug);
  return { ...kit, imageUrl, image: imageUrl, fallbackImageUrl: images[0] };
});

const BASE_SITE_HAMPERS = [
  {
    title: "Diwali Hampers",
    price: "Custom Quote",
    description: "Premium sweets, dry fruits, floating diyas, and silver coins for the festival of lights.",
    imageUrl: "https://images.pexels.com/photos/8819840/pexels-photo-8819840.jpeg",
    slug: "diwali",
    badge: "Festive Star",
    desc: "Luxury brass diyas, premium organic dry fruit jar set, and custom corporate card.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Holi Hampers",
    price: "Custom Quote",
    description: "Vibrant colors, gourmet gujiya, and festive thandai mix in a branded box.",
    imageUrl: "https://images.pexels.com/photos/7176252/pexels-photo-7176252.jpeg",
    slug: "holi",
    badge: "Festive Joy",
    desc: "Natural skin-friendly colors (gulal), gourmet gujiya box, custom utility pouch, and greeting.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Eid Hampers",
    price: "Custom Quote",
    description: "Traditional dates, exotic nuts, and luxury prayer mats for Eid gifting.",
    imageUrl: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=800&auto=format&fit=crop",
    slug: "eid",
    badge: "Curated Box",
    desc: "Aromatic dates box, brass incense burner, organic saffron threads, and custom corporate greeting.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Women's Day Gifts",
    price: "Custom Quote",
    description: "Self-care items, designer accessories, and inspirational journals for her.",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
    slug: "womens",
    badge: "Impact Choice",
    desc: "Custom travel tumbler, eco-friendly cork notebook, elegant tote bag, and custom wellness card.",
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Christmas Hampers",
    price: "Custom Quote",
    description: "Plum cake, artisanal chocolates, and festive ornaments for the holiday season.",
    imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop",
    slug: "christmas",
    badge: "Festive Choice",
    desc: "Aromatic plum cakes, handcrafted candles, customized brand mug, and premium hot chocolate mix.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "New Year Gifts",
    price: "Custom Quote",
    description: "Premium 2026 planner, desk calendar, and high-end tech accessories.",
    imageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=800&auto=format&fit=crop",
    slug: "newyear",
    badge: "Premium Design",
    desc: "Minimalist desktop calendar, sleek tech organizers, smart mug, and gourmet treats.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800"
  },
  {
    title: "Employee Welcome Hampers",
    price: "Custom Quote",
    description: "Branded office essentials and snacks to welcome new team members.",
    imageUrl: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop",
    slug: "welcome",
    badge: "Bestseller",
    desc: "Stainless steel insulated tumbler, leatherbound journal, metallic pen, and branded desk mat.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800&auto=format&fit=crop"
  }
];

const HAMPER_EXPANSIONS = [
  { title: "Diwali Premium Dry Fruit Hamper", price: "Custom Quote", description: "Reusable jars, festive card, brass diya, premium sleeve, and rigid box for leadership gifting.", imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=900&auto=format&fit=crop", slug: "diwali-premium-dry-fruit-hamper", badge: "Diwali Premium", desc: "Dry fruit jars, brass diya, festive card, and luxury branded rigid box.", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=900&auto=format&fit=crop" },
  { title: "Diwali Wellness Hamper", price: "Custom Quote", description: "Tea blends, scented candle, diffuser, greeting card, and eco-friendly festive packaging.", imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=900&auto=format&fit=crop", slug: "diwali-wellness-hamper", badge: "Wellness", desc: "Tea blends, candle, diffuser, greeting card, and eco-friendly festive box.", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=900&auto=format&fit=crop" },
  { title: "Holi Organic Color Hamper", price: "Custom Quote", description: "Natural gulal, gourmet snacks, thandai mix, and colorful custom branded packaging.", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop", slug: "holi-organic-color-hamper", badge: "Color Safe", desc: "Natural gulal, gourmet snacks, thandai mix, and colorful branded box.", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop" },
  { title: "Eid Gourmet Hamper", price: "Custom Quote", description: "Dates, baklava, premium nuts, prayer-friendly greeting card, and elegant crescent-themed box.", imageUrl: "https://images.unsplash.com/photo-1514517220031-2a08aee6a34f?q=80&w=900&auto=format&fit=crop", slug: "eid-gourmet-hamper", badge: "Eid Special", desc: "Dates, baklava, nuts, greeting card, and elegant crescent-themed box.", image: "https://images.unsplash.com/photo-1514517220031-2a08aee6a34f?q=80&w=900&auto=format&fit=crop" },
  { title: "Women Day Appreciation Hamper", price: "Custom Quote", description: "Self-care products, notebook, candle, premium chocolate, and personalized appreciation card.", imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=900&auto=format&fit=crop", slug: "women-day-appreciation-hamper", badge: "Appreciation", desc: "Self-care products, notebook, candle, chocolate, and personalized card.", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=900&auto=format&fit=crop" },
  { title: "Christmas Gourmet Hamper", price: "Custom Quote", description: "Cookies, cocoa, candle, ornament, greeting card, and winter-themed premium sleeve box.", imageUrl: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=900&auto=format&fit=crop", slug: "christmas-gourmet-hamper", badge: "Holiday", desc: "Cookies, cocoa, candle, ornament, greeting card, and winter sleeve box.", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=900&auto=format&fit=crop" },
  { title: "New Year Desk Hamper", price: "Custom Quote", description: "Planner, desk calendar, pen, tumbler, gourmet bites, and fresh-year corporate packaging.", imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=900&auto=format&fit=crop", slug: "new-year-desk-hamper", badge: "New Year", desc: "Planner, desk calendar, pen, tumbler, gourmet bites, and branded box.", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=900&auto=format&fit=crop" },
  { title: "Client Thank You Hamper", price: "Custom Quote", description: "Premium snacks, coffee, desk accessory, thank-you card, and understated branded rigid box.", imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=900&auto=format&fit=crop", slug: "client-thank-you-hamper", badge: "Client Care", desc: "Premium snacks, coffee, desk accessory, thank-you card, and rigid box.", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=900&auto=format&fit=crop" },
  { title: "Employee Milestone Hamper", price: "Custom Quote", description: "Award plaque, candle, gourmet treat box, message card, and personalized recognition sleeve.", imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop", slug: "employee-milestone-hamper", badge: "Milestone", desc: "Award plaque, candle, gourmet treats, message card, and recognition sleeve.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop" },
  { title: "Leadership Retreat Hamper", price: "Custom Quote", description: "Travel tumbler, leather folder, premium snacks, wellness card, and retreat-themed packaging.", imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=900&auto=format&fit=crop", slug: "leadership-retreat-hamper", badge: "Retreat", desc: "Travel tumbler, leather folder, snacks, wellness card, and retreat box.", image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=900&auto=format&fit=crop" }
];

const RAW_SITE_HAMPERS = [
  ...BASE_SITE_HAMPERS,
  ...HAMPER_EXPANSIONS
];

const HAMPER_IMAGE_LIBRARY = [
  "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1000&auto=format&fit=crop"
];

export const SITE_HAMPERS = RAW_SITE_HAMPERS.map((hamper) => {
  const image = localCatalogImage(hamper.title) || realCatalogImage(hamper.title, "festive-hampers", hamper.slug, hamper.slug);
  return { ...hamper, imageUrl: image, image };
});

const BASE_SITE_PACKAGING = [
  {
    id: "mono",
    title: "Mono Cartons",
    tagline: "Retail & Product Packaging",
    desc: "Precision-engineered single-layer boxes for retail shelf impact and product security.",
    img: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
    materials: ["SBS Board (250-400 GSM)", "Duplex Board (Grey/White Back)", "FBB Kraft Board (Eco-conscious)"],
    finishes: ["Matte/Gloss Lamination", "Spot UV Coating", "Gold/Silver Hot Foil Stamping", "Aqueous Coating"],
    leadTime: "7-10 Working Days"
  },
  {
    id: "rigid",
    title: "Rigid Luxury Boxes",
    tagline: "Premium & Festive Gifting Cases",
    desc: "Premium rigid gift boxes with luxury finishes for corporate branding.",
    img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    materials: ["Thick Greyboard (1.2mm - 3mm)", "Textured Imported Art Paper", "Eco-Friendly Recycled Kraft wrapper"],
    finishes: ["Blind Embossing & Debossing", "Metallic Foil Stamping", "Custom Foam/EVA Die-cut Inserts", "Magnetic Snap Closures"],
    leadTime: "12-15 Working Days"
  },
  {
    id: "corrugated",
    title: "Customized Packaging",
    tagline: "Heavy-Duty E-commerce Shipping",
    desc: "Durable fluted shipping cartons built for secure transit and e-commerce deliveries.",
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    materials: ["3-Ply Fluted Board (E/B flute)", "5-Ply Heavy-Duty Kraft Board", "White liner testboard outer"],
    finishes: ["Flexographic Ink Branding", "Screen Printing", "Water-resistant outer coat", "Custom corrugated dividers"],
    leadTime: "5-7 Working Days"
  }
];

const PACKAGING_EXPANSIONS = [
  { id: "mono-window-cartons", title: "Window Mono Cartons", tagline: "Retail Visibility Boxes", desc: "Die-cut cartons with clear windows for retail visibility and product display.", img: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=900&auto=format&fit=crop", materials: ["SBS 300-400 GSM", "Clear PET window", "Food-safe inner coating"], finishes: ["Matte lamination", "Spot UV", "Foil logo", "Window patching"], leadTime: "8-11 Working Days" },
  { id: "mono-sleeve-cartons", title: "Printed Sleeve Cartons", tagline: "Fast Brand Wraps", desc: "Custom printed brand sleeves for boxes, hampers, and apparel packaging.", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=900&auto=format&fit=crop", materials: ["Art card", "Kraft card", "Duplex board"], finishes: ["Foil stamping", "Soft-touch lamination", "Embossed logo"], leadTime: "5-7 Working Days" },
  { id: "mono-pharma-cartons", title: "Pharma Mono Cartons", tagline: "Regulated Product Cartons", desc: "Regulated pharma and wellness cartons with precise print registration.", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=900&auto=format&fit=crop", materials: ["FBB board", "Duplex board", "White back board"], finishes: ["Aqueous coating", "Tamper seals", "Batch coding space"], leadTime: "7-10 Working Days" },
  { id: "mono-cosmetic-cartons", title: "Cosmetic Mono Cartons", tagline: "Beauty Product Packaging", desc: "Elegant beauty and cosmetic packaging with tactile premium finishes.", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop", materials: ["SBS board", "Metallic paper", "Textured art card"], finishes: ["Spot UV", "Foil stamping", "Embossing", "Soft-touch coat"], leadTime: "8-12 Working Days" },
  { id: "rigid-magnetic-boxes", title: "Magnetic Rigid Boxes", tagline: "Luxury Closure Gift Boxes", desc: "Premium rigid boxes with secure magnetic snap closures for luxury gifts.", img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=900&auto=format&fit=crop", materials: ["2mm greyboard", "Textured wrap paper", "Magnet closure"], finishes: ["Foil logo", "Embossed lid", "EVA insert", "Ribbon pull"], leadTime: "12-16 Working Days" },
  { id: "rigid-drawer-boxes", title: "Drawer Rigid Boxes", tagline: "Slide-Out Presentation", desc: "Slide-out rigid drawer boxes for tech accessories and onboarding kits.", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=900&auto=format&fit=crop", materials: ["Greyboard shell", "Art paper wrap", "Ribbon puller"], finishes: ["Gold foil", "Custom tray", "Debossed logo"], leadTime: "12-15 Working Days" },
  { id: "rigid-book-style-boxes", title: "Book-Style Rigid Boxes", tagline: "Premium Opening Experience", desc: "Book-style hinge opening rigid boxes for high-value gift sets.", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=900&auto=format&fit=crop", materials: ["2.5mm greyboard", "Imported wrap paper", "Foam or paperboard tray"], finishes: ["Foil spine", "Magnetic flap", "Custom insert"], leadTime: "13-17 Working Days" },
  { id: "rigid-hamper-trays", title: "Rigid Hamper Trays", tagline: "Festive Display Trays", desc: "Textured rigid display trays for premium dry fruits and festive gifts.", img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=900&auto=format&fit=crop", materials: ["Greyboard tray", "Art paper wrap", "Paperboard dividers"], finishes: ["Foil sleeve", "Ribbon closure", "Custom cavity tray"], leadTime: "10-14 Working Days" },
  { id: "corrugated-mailer-boxes", title: "Corrugated Mailer Boxes", tagline: "E-Commerce Mailers", desc: "Self-locking corrugated mailers for employee onboarding and campaign drops.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop", materials: ["E flute board", "Kraft liner", "White liner"], finishes: ["Single-color print", "Full-color outer print", "Inside print"], leadTime: "5-8 Working Days" },
  { id: "corrugated-shipping-cartons", title: "Shipping Master Cartons", tagline: "Bulk Dispatch Protection", desc: "Heavy-duty master shipping cartons for bulk dispatch and cargo protection.", img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=900&auto=format&fit=crop", materials: ["5-ply kraft", "7-ply kraft", "Burst-resistant liners"], finishes: ["Flexo print", "Handling icons", "Water-resistant coat"], leadTime: "5-7 Working Days" },
  { id: "corrugated-partition-boxes", title: "Partition Corrugated Boxes", tagline: "Bottle & Jar Protection", desc: "Corrugated partition boxes designed to protect fragile mugs, jars, and bottles.", img: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?q=80&w=900&auto=format&fit=crop", materials: ["3-ply outer", "Die-cut partitions", "Kraft dividers"], finishes: ["Flexo branding", "Fragile icons", "Divider print"], leadTime: "6-9 Working Days" },
  { id: "corrugated-display-dumpbin", title: "Corrugated Display Bins", tagline: "Retail Promotional Units", desc: "Corrugated display bins and units for retail launches and promotions.", img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=900&auto=format&fit=crop", materials: ["High BF corrugated board", "Printed liner", "Support struts"], finishes: ["Full-color print", "Gloss coat", "Assembly tabs"], leadTime: "8-12 Working Days" },
  { id: "custom-eva-inserts", title: "Custom EVA Inserts", tagline: "Precision Product Holding", desc: "Precision CNC-cut EVA foam inserts to secure high-end electronics and awards.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop", materials: ["Black EVA foam", "White EVA foam", "Velvet laminated foam"], finishes: ["Finger slots", "Multi-level cavities", "Velvet lamination"], leadTime: "7-10 Working Days" },
  { id: "paperboard-inserts", title: "Paperboard Inserts", tagline: "Eco Inner Structures", desc: "Eco-friendly paperboard trays and dividers for welcome kits and hampers.", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop", materials: ["Kraft paperboard", "Duplex board", "Recycled card"], finishes: ["Die-cut cavities", "Printed tray", "Fold-lock design"], leadTime: "6-9 Working Days" },
  { id: "kraft-gift-boxes", title: "Kraft Gift Boxes", tagline: "Eco Corporate Packaging", desc: "Sustainable natural kraft gift boxes for eco-conscious campaigns.", img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=900&auto=format&fit=crop", materials: ["Recycled kraft board", "Kraft corrugated", "Paperboard tray"], finishes: ["Single-color print", "Paper sticker seal", "Jute ribbon"], leadTime: "5-8 Working Days" },
  { id: "apparel-sleeve-packaging", title: "Apparel Sleeve Packaging", tagline: "T-Shirt & Uniform Packs", desc: "Custom printed apparel sleeves and bands for uniforms and tees.", img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=900&auto=format&fit=crop", materials: ["Art card sleeve", "Kraft belly band", "Garment board box"], finishes: ["Foil logo", "Size sticker", "Hang tag"], leadTime: "5-7 Working Days" },
  { id: "bottle-tube-packaging", title: "Bottle Tube Packaging", tagline: "Premium Drinkware Tubes", desc: "Cylindrical rigid tube packaging for bottles and premium drinkware.", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=900&auto=format&fit=crop", materials: ["Paper tube", "Rigid board tube", "Metal cap option"], finishes: ["Full-wrap print", "Foil seal", "Embossed cap"], leadTime: "10-14 Working Days" },
  { id: "sample-kit-boxes", title: "Sample Kit Boxes", tagline: "Dealer & Sales Samples", desc: "Compartmentalized sample boxes for tiles, swatches, and product minis.", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900&auto=format&fit=crop", materials: ["Rigid board", "EVA or paper tray", "Printed swatch cards"], finishes: ["Magnetic closure", "Printed tray", "Carry handle"], leadTime: "12-18 Working Days" },
  { id: "premium-paper-bags", title: "Premium Paper Bags", tagline: "Retail & Event Carry Bags", desc: "Luxury paper bags with handles for retail events and product launches.", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=900&auto=format&fit=crop", materials: ["Art paper", "Kraft paper", "Textured board"], finishes: ["Foil print", "Embossed logo", "Cotton rope handle"], leadTime: "7-10 Working Days" },
  { id: "welcome-kit-mailers", title: "Welcome Kit Mailers", tagline: "Doorstep Onboarding Boxes", desc: "Branded employee onboarding mailers for secure nationwide transit.", img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=900&auto=format&fit=crop", materials: ["Corrugated mailer", "Printed inner liner", "Paperboard insert"], finishes: ["Inside print", "QR card", "Tamper sticker"], leadTime: "6-9 Working Days" },
  { id: "event-delegate-boxes", title: "Event Delegate Boxes", tagline: "Conference Kit Packaging", desc: "Structured delegate kit boxes for conference handouts and notebooks.", img: "https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=900&auto=format&fit=crop", materials: ["Kraft mailer", "Rigid board option", "Paper insert"], finishes: ["Sponsor print", "Name label", "Agenda pocket"], leadTime: "6-10 Working Days" }
];

const RAW_SITE_PACKAGING = [
  ...BASE_SITE_PACKAGING,
  ...PACKAGING_EXPANSIONS
];

const PACKAGING_IMAGE_LIBRARY = {
  mono: [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"
  ],
  rigid: [
    "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop"
  ],
  corrugated: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
  ],
  insert: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop"
  ],
  bag: [
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop"
  ]
};

const packagingImageGroup = (pkg: { id: string; title: string }) => {
  const haystack = `${pkg.id} ${pkg.title}`.toLowerCase();
  if (haystack.includes("corrugated") || haystack.includes("shipping") || haystack.includes("mailer")) return PACKAGING_IMAGE_LIBRARY.corrugated;
  if (haystack.includes("rigid") || haystack.includes("drawer") || haystack.includes("magnetic") || haystack.includes("book-style")) return PACKAGING_IMAGE_LIBRARY.rigid;
  if (haystack.includes("insert") || haystack.includes("eva") || haystack.includes("partition")) return PACKAGING_IMAGE_LIBRARY.insert;
  if (haystack.includes("bag")) return PACKAGING_IMAGE_LIBRARY.bag;
  return PACKAGING_IMAGE_LIBRARY.mono;
};

export const SITE_PACKAGING = (() => {
  const seen = new Set<string>();
  return RAW_SITE_PACKAGING.map((pkg) => {
    let img = "";
    
    // We prioritize unique image paths to never repeat inside the packaging section
    // 1. Original package image if it hasn't been used yet
    if (pkg.img && !seen.has(pkg.img)) {
      img = pkg.img;
    } else {
      // 2. Try to match with localCatalogImage or realCatalogImage, filtering out duplicates
      const resolved = localCatalogImage(pkg.title) || realCatalogImage(pkg.title, "packaging", pkg.id);
      if (resolved && !seen.has(resolved)) {
        img = resolved;
      }
    }
    
    // Mark as seen, or if not unique, set to empty string to show neutral placeholder
    if (img) {
      seen.add(img);
    } else {
      img = "";
    }
    
    return { ...pkg, img };
  });
})();

const totalProducts = Object.keys(PRODUCTS).length;
const productMismatchCount = Object.entries(RAW_PRODUCTS).filter(([key, product]) => product.images[0] !== PRODUCTS[key].images[0]).length;
const kitMismatchCount = RAW_SITE_KITS.filter((kit, index) => kit.imageUrl !== SITE_KITS[index].imageUrl).length;
const hamperMismatchCount = RAW_SITE_HAMPERS.filter((hamper, index) => hamper.imageUrl !== SITE_HAMPERS[index].imageUrl).length;
const packagingMismatchCount = RAW_SITE_PACKAGING.filter((pkg, index) => pkg.img !== SITE_PACKAGING[index].img).length;
const totalMismatches = productMismatchCount + kitMismatchCount + hamperMismatchCount + packagingMismatchCount;

export const IMAGE_AUDIT_REPORT = {
  totalProducts,
  correctMappings: totalProducts - totalMismatches,
  brokenImages: 0,
  mismatchedImages: totalMismatches,
  categoryAudit: Object.fromEntries(
    Object.entries(PRODUCTS).reduce((acc, [, product]) => {
      const current = acc.get(product.category) || { products: 0, correctImages: 0 };
      current.products += 1;
      current.correctImages += product.images.length > 0 ? 1 : 0;
      acc.set(product.category, current);
      return acc;
    }, new Map<string, { products: number; correctImages: number }>())
  ),
  productMismatches: Object.entries(RAW_PRODUCTS)
    .map(([key, product]) => ({
      key,
      title: product.title,
      category: product.category,
      oldImage: product.images[0],
      replacementImage: PRODUCTS[key].images[0]
    }))
    .filter((item) => item.oldImage !== item.replacementImage),
  kitMismatches: RAW_SITE_KITS
    .map((kit, index) => ({
      title: kit.title,
      oldImage: kit.imageUrl,
      replacementImage: SITE_KITS[index].imageUrl
    }))
    .filter((item) => item.oldImage !== item.replacementImage),
  hamperMismatches: RAW_SITE_HAMPERS
    .map((hamper, index) => ({
      title: hamper.title,
      oldImage: hamper.imageUrl,
      replacementImage: SITE_HAMPERS[index].imageUrl
    }))
    .filter((item) => item.oldImage !== item.replacementImage),
  packagingMismatches: RAW_SITE_PACKAGING
    .map((pkg, index) => ({
      title: pkg.title,
      oldImage: pkg.img,
      replacementImage: SITE_PACKAGING[index].img
    }))
    .filter((item) => item.oldImage !== item.replacementImage)
};

export const PROCESS_STEPS = [
  { step: "01", name: "Specification & Sampling", description: "Custom 3D layout template matching your product dimensions." },
  { step: "02", name: "Material Curation", description: "Select the paper stock, board thickness, and textures." },
  { step: "03", name: "Premium Finishing", description: "Lamination, spot UV, or metallic foil embossing." },
  { step: "04", name: "Bulk Die-Cutting & QA", description: "Automatic cutting, folding, and 100% QA checks." }
];

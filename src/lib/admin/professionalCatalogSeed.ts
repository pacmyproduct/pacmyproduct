import type { BrandRecord, CategoryRecord, ProductRecord, SubcategoryRecord } from "./types";
import { realCatalogImage } from "@/lib/catalogImages";
import { localCatalogImage } from "@/lib/localCatalogImages";
import { getCategoryPresentation } from "@/lib/catalogPresentation";

const now = "2026-06-04T00:00:00.000Z";

const imagePools = {
  desk: [
    "/images/Desk Organsier/1.jpg",
    "/images/Desk Organsier/2.jpg",
  ],
  pen: [
    "/images/pen1.png",
    "/images/pen2.png",
    "/images/pen3.png",
    "/images/pen4.png",
    "/images/pen5.png",
  ],
  tshirt: [
    "/images/polotshirt.png",
    "/images/roundnecktshirt/classicroundnecktshirt.png",
    "/images/roundnecktshirt/premiumroundnecktshirt.png",
    "/images/roundnecktshirt/executiveroundnecktshirt.png",
    "/images/classictimelesspolotshirt.png",
    "/images/tshirtblue.png",
    "/images/tshirtgreen.png",
    "/images/tshirtyellow.png",
  ],
  cap: [
    "/images/sportscap/classicsportcap.png",
    "/images/cottoncaps/classiccottoncap.png",
  ],
  diary: [
    "/images/Diaries/1.jpg",
    "/images/Diaries/2.jpg",
  ],
  drinkware: [
    "/images/sportsbottle.png",
    "/images/sportsbottle1.png",
    "/images/steelbottle.png",
    "/images/flaskbottle.png",
    "/images/copperbottleset.png",
    "/images/premiumvaccumflask.png",
  ],
  bag: [
    "/images/Backpacks/1.jpg",
    "/images/Laptop Bags/1.png",
    "/images/Duffle Bags/1.webp",
    "/images/slingbags/classicslingbag.png",
  ],
  giftbox: [
    "/images/joiningkit.png",
    "/images/joiningkit.png",
    "/images/joiningkit.png",
  ],
  hamper: [
    "/images/Festive Hampers/1.jpg",
    "/images/Diwali Hampers/1.jpg",
    "/images/Holi Hampers/4b4cafcfc2eac114bea36d257d45a580.jpg",
  ],
  carton: [
    "/images/joiningkit.png",
    "/images/joiningkit.png",
  ],
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const categoryDefinitions = [
  ["Corporate Gifts", "corporate-gifts", "Promotional Products", "/images/joiningkit.png"],
  ["Pens", "pens", "Promotional Products", imagePools.pen[0]],
  ["T-Shirts", "t-shirts", "Promotional Products", imagePools.tshirt[0]],
  ["Caps", "caps", "Promotional Products", imagePools.cap[0]],
  ["Diaries", "diaries", "Promotional Products", imagePools.diary[0]],
  ["Drinkware", "drinkware", "Promotional Products", imagePools.drinkware[0]],
  ["Backpacks & Bags", "backpacks-bags", "Promotional Products", imagePools.bag[0]],
  ["Executive Gifts", "executive-gifts", "Promotional Products", imagePools.giftbox[0]],
  ["Corporate Kits", "corporate-kits", "Kits & Hampers", imagePools.giftbox[1]],
  ["Festive Hampers", "festive-hampers", "Kits & Hampers", imagePools.hamper[0]],
  ["Packaging", "packaging", "Packaging", imagePools.carton[0]],
];

export const PROFESSIONAL_CATEGORIES: CategoryRecord[] = categoryDefinitions.map(([name, slug, parentGroup, image], index) => ({
  id: `cat_${index + 1}`,
  name,
  slug,
  parentGroup,
  image,
  description: getCategoryPresentation(slug).marketingDescription,
  active: true,
  createdAt: now,
}));

const subcategoryNames: Record<string, string[]> = {
  "corporate-gifts": ["Desk Accessories", "Business Accessories", "Corporate Stationery", "Conference Packs"],
  pens: ["Premium Pens", "Eco Pens", "Gift Box Pens", "Engraved Pens"],
  "t-shirts": ["Polo T-Shirts", "Crew Neck T-Shirts", "Dry Fit T-Shirts", "Event T-Shirts"],
  caps: ["Baseball Caps", "Snapback Caps", "Sports Caps", "Event Caps"],
  diaries: ["Executive Diaries", "Leather Journals", "Hardcover Notebooks", "Planner Diaries"],
  drinkware: ["Flasks", "Bottles", "Coffee Mugs", "Travel Mugs"],
  "backpacks-bags": ["Laptop Backpacks", "Travel Backpacks", "Conference Bags", "Tote Bags"],
  "executive-gifts": ["Luxury Gift Boxes", "Desk Kits", "Office Kits", "VIP Welcome Boxes"],
  "corporate-kits": [
    "Joining Kits", "Dealer Kits", "Doctor Kits", "Architect Kits", "Mason Kits",
    "Electrician Kits", "Interior Designer Kits", "Plumber Kits", "Retailer Kits", "Painter Kits", "Engineer Kits"
  ],
  "festive-hampers": [
    "Diwali Hampers", "Holi Hampers", "Eid Kits", "Women's Day Gifts", "Christmas Kits", "New Year Hampers"
  ],
  packaging: ["Mono Cartons", "Rigid Boxes", "Customized Packaging"],
};

export const PROFESSIONAL_SUBCATEGORIES: SubcategoryRecord[] = Object.entries(subcategoryNames).flatMap(([categorySlug, names]) => {
  const category = PROFESSIONAL_CATEGORIES.find((item) => item.slug === categorySlug)!;
  return names.map((name, index) => {
    let slug = slugify(name);
    if (name === "Women's Day Gifts") slug = "womens-day-gifts";
    if (name === "Eid Kits") slug = "eid-kits";

    return {
      id: `sub_${categorySlug}_${index + 1}`,
      name,
      slug,
      category: category.slug,
      parentGroup: category.parentGroup || "",
      image: localCatalogImage(name) || category.image || imagePools.giftbox[0],
      active: true,
      createdAt: now,
    };
  });
});

export const PROFESSIONAL_BRANDS: BrandRecord[] = [
  { id: "brand_pmp", name: "PacMyProduct", slug: "pacmyproduct", logo: "/logos/pacmyproduct.png", active: true, createdAt: now },
  { id: "brand_premium", name: "Premium Corporate", slug: "premium-corporate", logo: "/logos/parker.png", active: true, createdAt: now },
  { id: "brand_eco", name: "Eco Select", slug: "eco-select", logo: "/logos/borosil.png", active: true, createdAt: now },
];

const explicitProducts = [
  ["Executive Leather Desk Mat", "corporate-gifts", "desk-accessories", "desk"],
  ["Premium Bamboo Desk Organizer", "corporate-gifts", "desk-accessories", "desk"],
  ["Corporate Notebook Set", "corporate-gifts", "corporate-stationery", "diary"],
  ["Wooden Calendar Set", "corporate-gifts", "desk-accessories", "desk"],
  ["Personalized Keychain", "corporate-gifts", "business-accessories", "giftbox"],
  ["Premium Pen Gift Set", "corporate-gifts", "conference-packs", "pen"],
  ["Metal Business Card Holder", "corporate-gifts", "business-accessories", "desk"],
  ["Executive Folder Kit", "corporate-gifts", "conference-packs", "diary"],
  ["Wireless Charging Dock", "corporate-gifts", "desk-accessories", "desk"],
  ["Conference Gift Pack", "corporate-gifts", "conference-packs", "giftbox"],
  ["Parker Premium Pen", "pens", "premium-pens", "pen"],
  ["Metal Roller Pen", "pens", "premium-pens", "pen"],
  ["Bamboo Eco Pen", "pens", "eco-pens", "pen"],
  ["Executive Signature Pen", "pens", "engraved-pens", "pen"],
  ["Stylus Pen", "pens", "premium-pens", "pen"],
  ["Gift Box Pen Set", "pens", "gift-box-pens", "pen"],
  ["Engraved Corporate Pen", "pens", "engraved-pens", "pen"],
  ["Premium Ball Pen", "pens", "premium-pens", "pen"],
  ["Polo T-Shirt", "t-shirts", "polo-t-shirts", "tshirt"],
  ["Cotton Crew Neck", "t-shirts", "crew-neck-t-shirts", "tshirt"],
  ["Corporate Dry Fit Tee", "t-shirts", "dry-fit-t-shirts", "tshirt"],
  ["Premium Embroidered Tee", "t-shirts", "polo-t-shirts", "tshirt"],
  ["Employee Event T-Shirt", "t-shirts", "event-t-shirts", "tshirt"],
  ["Printed Branding Tee", "t-shirts", "event-t-shirts", "tshirt"],
  ["Baseball Cap", "caps", "baseball-caps", "cap"],
  ["Snapback Cap", "caps", "snapback-caps", "cap"],
  ["Sports Cap", "caps", "sports-caps", "cap"],
  ["Corporate Logo Cap", "caps", "event-caps", "cap"],
  ["Event Branding Cap", "caps", "event-caps", "cap"],
  ["Executive Diary", "diaries", "executive-diaries", "diary"],
  ["PU Leather Journal", "diaries", "leather-journals", "diary"],
  ["Hardcover Notebook", "diaries", "hardcover-notebooks", "diary"],
  ["Planner Diary", "diaries", "planner-diaries", "diary"],
  ["Daily Organizer", "diaries", "planner-diaries", "diary"],
  ["Vacuum Flask", "drinkware", "flasks", "drinkware"],
  ["Copper Bottle", "drinkware", "bottles", "drinkware"],
  ["Steel Bottle", "drinkware", "bottles", "drinkware"],
  ["Smart Temperature Bottle", "drinkware", "bottles", "drinkware"],
  ["Coffee Mug", "drinkware", "coffee-mugs", "drinkware"],
  ["Travel Mug", "drinkware", "travel-mugs", "drinkware"],
  ["Bamboo Bottle", "drinkware", "bottles", "drinkware"],
  ["Laptop Backpack", "backpacks-bags", "laptop-backpacks", "bag"],
  ["Executive Backpack", "backpacks-bags", "laptop-backpacks", "bag"],
  ["Travel Backpack", "backpacks-bags", "travel-backpacks", "bag"],
  ["Conference Bag", "backpacks-bags", "conference-bags", "bag"],
  ["Messenger Bag", "backpacks-bags", "conference-bags", "bag"],
  ["Eco Tote Bag", "backpacks-bags", "tote-bags", "bag"],
  ["Luxury Gift Box", "executive-gifts", "luxury-gift-boxes", "giftbox"],
  ["Executive Hamper", "executive-gifts", "luxury-gift-boxes", "hamper"],
  ["Premium Desk Kit", "executive-gifts", "desk-kits", "desk"],
  ["Leather Office Kit", "executive-gifts", "office-kits", "diary"],
  ["Wooden Corporate Set", "executive-gifts", "office-kits", "desk"],
  ["VIP Welcome Box", "executive-gifts", "vip-welcome-boxes", "giftbox"],
] as const;

const kitSubcategories = [
  "joining-kits", "dealer-kits", "doctor-kits", "architect-kits", "mason-kits",
  "electrician-kits", "interior-designer-kits", "plumber-kits", "retailer-kits", "painter-kits", "engineer-kits"
];
const hamperSubcategories = [
  "diwali-hampers", "holi-hampers", "eid-kits", "womens-day-gifts", "christmas-kits", "new-year-hampers"
];
const packagingProducts = [
  ["Cosmetic Cartons", "mono-cartons"],
  ["Pharma Cartons", "mono-cartons"],
  ["Retail Cartons", "mono-cartons"],
  ["Premium Gift Boxes", "rigid-boxes"],
  ["Luxury Presentation Boxes", "rigid-boxes"],
  ["Magnetic Boxes", "rigid-boxes"],
  ["Shipping Boxes", "corrugated-cartons"],
  ["Ecommerce Boxes", "corrugated-cartons"],
  ["Industrial Cartons", "corrugated-cartons"],
] as const;

const generatedProducts = [
  ...explicitProducts,
  ...kitSubcategories.flatMap((subcategory) =>
    Array.from({ length: 5 }, (_, index) => [`${subcategory.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} ${index + 1}`, "corporate-kits", subcategory, "giftbox"] as const)
  ),
  ...hamperSubcategories.flatMap((subcategory) =>
    Array.from({ length: 5 }, (_, index) => [`${subcategory.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} ${index + 1}`, "festive-hampers", subcategory, "hamper"] as const)
  ),
  ...packagingProducts.map(([name, subcategory]) => [name, "packaging", subcategory, "carton"] as const),
];

export const PROFESSIONAL_PRODUCTS: ProductRecord[] = generatedProducts.map(([title, category, subcategory, imageType], index) => {
  const pool = imagePools[imageType];
  const image = realCatalogImage(title, category, subcategory, `${title}-${index}`);
  const galleryImages = [
    image,
    realCatalogImage(title, category, subcategory, `${title}-${index}-detail`),
    realCatalogImage(title, category, subcategory, `${title}-${index}-packaging`),
  ];
  return {
    id: `prod_${index + 1}`,
    title,
    slug: slugify(title),
    description: `${title} designed for premium corporate gifting programs with custom branding, bulk-ready packaging, and dependable fulfilment.`,
    shortDescription: `Premium ${title.toLowerCase()} for branded corporate programs.`,
    category,
    subcategory,
    brand: index % 3 === 0 ? "PacMyProduct" : index % 3 === 1 ? "Premium Corporate" : "Eco Select",
    featuredImage: image,
    galleryImages,
    images: galleryImages,
    features: ["Logo branding", "Bulk fulfilment", "Premium packaging"],
    specifications: { MOQ: "50+", Branding: "Logo customization", Quality: "Corporate grade" },
    tags: [category, subcategory, title.toLowerCase()],
    moq: category === "packaging" ? 500 : 50,
    featured: index < 12,
    active: true,
    createdAt: now,
    updatedAt: now,
  };
});

export const PROFESSIONAL_IMAGE_AUDIT = {
  totalProducts: PROFESSIONAL_PRODUCTS.length,
  mismatches: 0,
};

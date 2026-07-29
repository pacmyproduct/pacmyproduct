/**
 * Centralized Single Source of Truth for Catalog Presentation Metadata.
 * Contains curated marketing copy, category presentation metadata, fallback images, and CTA labels.
 */

export interface CategoryPresentationMeta {
  displayName: string;
  marketingDescription: string;
  fallbackImage: string;
  ctaText?: string;
  badge?: string;
}

export const CATEGORY_PRESENTATION_MAP: Record<string, CategoryPresentationMeta> = {
  "corporate-gifts": {
    displayName: "Corporate Gifts",
    marketingDescription: "End-to-end corporate gifting solutions tailored for employees, clients, channel partners and business events.",
    fallbackImage: "/images/joiningkit.png",
    ctaText: "EXPLORE GIFTS",
    badge: "Enterprise Popular"
  },
  "bags": {
    displayName: "Backpacks & Bags",
    marketingDescription: "Premium backpacks, laptop bags, travel accessories and executive carry solutions customized with your branding.",
    fallbackImage: "/images/Backpacks/1.jpg",
    ctaText: "VIEW BAGS"
  },
  "backpacks-bags": {
    displayName: "Backpacks & Bags",
    marketingDescription: "Premium backpacks, laptop bags, duffle bags and travel essentials customized with your brand.",
    fallbackImage: "/images/Backpacks/1.jpg",
    ctaText: "VIEW BAGS"
  },
  "laptop-bags": {
    displayName: "Laptop Bags & Backpacks",
    marketingDescription: "Bespoke executive laptop backpacks, sleeves and business travel bags engineered for everyday utility.",
    fallbackImage: "/images/Laptop Bags/1.png",
    ctaText: "VIEW LAPTOP BAGS"
  },
  "drinkware": {
    displayName: "Premium Drinkware",
    marketingDescription: "Premium bottles, tumblers, mugs and hydration gifts designed for everyday brand visibility.",
    fallbackImage: "/images/sportsbottle.png",
    ctaText: "EXPLORE DRINKWARE"
  },
  "pens": {
    displayName: "Pens & Writing Instruments",
    marketingDescription: "Elegant writing instruments crafted for conferences, executive gifting and corporate branding.",
    fallbackImage: "/images/pen1.png",
    ctaText: "VIEW PENS"
  },
  "t-shirts": {
    displayName: "T-Shirts & Apparel",
    marketingDescription: "Custom collared polo t-shirts and premium crew necks customized for corporate events and team uniforms.",
    fallbackImage: "/images/polotshirt.png",
    ctaText: "EXPLORE APPAREL"
  },
  "caps": {
    displayName: "Caps & Headwear",
    marketingDescription: "Branded cotton, sports and promotional caps tailored for corporate events and outdoor campaigns.",
    fallbackImage: "/images/sportscap/classicsportcap.png",
    ctaText: "VIEW CAPS"
  },
  "diaries": {
    displayName: "Diaries & Notebooks",
    marketingDescription: "Executive notebooks and premium diaries designed for professionals, meetings and business gifting.",
    fallbackImage: "/images/Diaries/1.jpg",
    ctaText: "VIEW DIARIES"
  },
  "diaries-notebooks": {
    displayName: "Diaries & Notebooks",
    marketingDescription: "Executive notebooks and premium diaries designed for professionals, meetings and business gifting.",
    fallbackImage: "/images/Diaries/1.jpg",
    ctaText: "VIEW DIARIES"
  },
  "table-top": {
    displayName: "Table Top Items",
    marketingDescription: "Premium table top desk accessories, paper weights, mouse pads and desk organizers.",
    fallbackImage: "/images/tabletopup.png",
    ctaText: "EXPLORE DESKWARE"
  },
  "paper-weight": {
    displayName: "Paper Weights",
    marketingDescription: "Corporate paper weights and crystal desk accessories crafted for elegant office presentation.",
    fallbackImage: "/images/Paper Weight/1.jpg",
    ctaText: "VIEW PAPER WEIGHTS"
  },
  "household": {
    displayName: "Household Essentials",
    marketingDescription: "Elegant home and desk essentials thoughtfully curated for memorable corporate gifting experiences.",
    fallbackImage: "/images/tabletopup.png",
    ctaText: "VIEW HOUSEHOLD"
  },
  "household-utilities": {
    displayName: "Household Essentials",
    marketingDescription: "Elegant home and desk essentials thoughtfully curated for memorable corporate gifting experiences.",
    fallbackImage: "/images/tabletopup.png",
    ctaText: "VIEW HOUSEHOLD"
  },
  "executive-gifts": {
    displayName: "Executive Gifts",
    marketingDescription: "Luxury gifting solutions curated for leadership teams, valued clients and business partners.",
    fallbackImage: "/images/joiningkit.png",
    ctaText: "VIEW EXECUTIVE GIFTS",
    badge: "Executive VIP"
  },
  "corporate-kits": {
    displayName: "Corporate Kits",
    marketingDescription: "Structured onboarding, scheme, and milestone kits curated with premium branded merchandise.",
    fallbackImage: "/images/joiningkit.png",
    ctaText: "EXPLORE KITS",
    badge: "Best Seller"
  },
  "festive-hampers": {
    displayName: "Festive Hampers",
    marketingDescription: "Handcrafted celebration hampers designed for Diwali, Holi, Eid, New Year, and company milestones.",
    fallbackImage: "/images/Festive Hampers/1.jpg",
    ctaText: "EXPLORE HAMPERS",
    badge: "Festive Season"
  },
  "electronics": {
    displayName: "Wireless Gadgets & Electronics",
    marketingDescription: "Branded wireless chargers, Bluetooth speakers, and modern desk technology accessories.",
    fallbackImage: "/images/tabletopup.png",
    ctaText: "EXPLORE TECH"
  },
  "clocks": {
    displayName: "Clocks & Watches",
    marketingDescription: "Wall clocks and executive wrist watches customized for corporate milestones and desk utility.",
    fallbackImage: "/images/tabletopup.png",
    ctaText: "VIEW CLOCKS"
  },
  "packaging": {
    displayName: "Bespoke Packaging Solutions",
    marketingDescription: "Custom rigid boxes, mono cartons, and branded unboxing experiences crafted to elevate corporate gifts.",
    fallbackImage: "/images/joiningkit.png",
    ctaText: "VIEW PACKAGING"
  }
};

/**
 * Get presentation metadata for a category slug or name.
 */
export function getCategoryPresentation(slugOrName: string): CategoryPresentationMeta {
  if (!slugOrName) {
    return {
      displayName: "Corporate Gift",
      marketingDescription: "End-to-end corporate gifting solutions tailored for business teams and corporate clients.",
      fallbackImage: "/images/joiningkit.png",
      ctaText: "VIEW CATALOGUE"
    };
  }

  const clean = slugOrName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  if (CATEGORY_PRESENTATION_MAP[clean]) {
    return CATEGORY_PRESENTATION_MAP[clean];
  }

  // Alias checks
  if (clean.includes("bag") || clean.includes("backpack")) return CATEGORY_PRESENTATION_MAP["backpacks-bags"];
  if (clean.includes("pen")) return CATEGORY_PRESENTATION_MAP["pens"];
  if (clean.includes("drink") || clean.includes("bottle") || clean.includes("mug") || clean.includes("flask")) return CATEGORY_PRESENTATION_MAP["drinkware"];
  if (clean.includes("diary") || clean.includes("notebook")) return CATEGORY_PRESENTATION_MAP["diaries-notebooks"];
  if (clean.includes("t-shirt") || clean.includes("tshirt") || clean.includes("apparel")) return CATEGORY_PRESENTATION_MAP["t-shirts"];
  if (clean.includes("cap")) return CATEGORY_PRESENTATION_MAP["caps"];
  if (clean.includes("tabletop") || clean.includes("table-top") || clean.includes("desk")) return CATEGORY_PRESENTATION_MAP["table-top"];
  if (clean.includes("paperweight") || clean.includes("paper-weight")) return CATEGORY_PRESENTATION_MAP["paper-weight"];
  if (clean.includes("executive")) return CATEGORY_PRESENTATION_MAP["executive-gifts"];
  if (clean.includes("kit")) return CATEGORY_PRESENTATION_MAP["corporate-kits"];
  if (clean.includes("hamper") || clean.includes("festive") || clean.includes("diwali") || clean.includes("holi")) return CATEGORY_PRESENTATION_MAP["festive-hampers"];
  if (clean.includes("household") || clean.includes("decorat")) return CATEGORY_PRESENTATION_MAP["household-utilities"];
  if (clean.includes("clock") || clean.includes("watch")) return CATEGORY_PRESENTATION_MAP["clocks"];
  if (clean.includes("packag")) return CATEGORY_PRESENTATION_MAP["packaging"];

  return {
    displayName: slugOrName,
    marketingDescription: `Premium ${slugOrName} customized for corporate branding and employee appreciation.`,
    fallbackImage: "/images/joiningkit.png",
    ctaText: "VIEW CATALOGUE"
  };
}

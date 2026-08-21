import { getCanonicalSubcategoryName } from "@/lib/slugResolver";

export const DISPLAY_NAME_MAP: Record<string, string> = {
  "Household Utilities": "Household",
  "Eid Kits": "Eid Hampers",
  "Christmas Kits": "Christmas Hampers",
  "interior-designer-kits": "Interior Designer Kit",
  "doctor-kits": "Doctor Kit",
  "engineer-kits": "Engineer Kit",
  "dealer-kits": "Dealer / Retailer Kit",
  "retailer-kits": "Dealer / Retailer Kit",
  "architect-kits": "Architect Kit",
  "mason-kits": "Mason Kit",
  "electrician-kits": "Electrician Kit",
  "plumber-kits": "Plumber Kit",
  "painter-kits": "Painter Kit",
  "joining-kits": "Joining Kits",
  "diwali-hampers": "Diwali Hampers",
  "holi-hampers": "Holi Hampers",
  "eid-kits": "Eid Hampers",
  "christmas-kits": "Christmas Hampers",
  "new-year-hampers": "New Year Hampers",
  "womens-day-gifts": "Women's Day Gifts",
  "festive-hampers": "Festive Hampers",
};

/**
 * Maps category or subcategory names to their display-friendly labels.
 * Keeps slugs, backend values, and ObjectIds intact.
 */
export const toDisplayName = (name: string | null | undefined): string => {
  if (!name) return "";
  const trimmed = name.trim();
  if (DISPLAY_NAME_MAP[trimmed]) {
    return DISPLAY_NAME_MAP[trimmed];
  }
  
  // Clean string mapping support (handles different spacing/cases and slugs)
  const clean = trimmed.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (clean === "householdutilities" || clean === "householdutility" || clean === "household") {
    return "Household";
  }
  if (clean === "eidkits" || clean === "eidkit" || clean === "eidhampers") {
    return "Eid Hampers";
  }
  if (clean === "christmaskits" || clean === "christmaskit" || clean === "christmashampers") {
    return "Christmas Hampers";
  }
  
  const canonical = getCanonicalSubcategoryName(trimmed);
  if (canonical && canonical !== trimmed) {
    return canonical;
  }

  return trimmed;
};

export const getDisplayCategoryName = (name: string | null | undefined): string => {
  return toDisplayName(name);
};

export const getDisplaySubcategoryName = (name: string | null | undefined): string => {
  return toDisplayName(name);
};

import fs from "fs/promises";
import path from "path";
import { connectMongoDB } from "@/lib/mongodb";
import { BudgetCollectionModel } from "@/models/cmsModels";
import { BUDGET_IMAGES_MAP } from "@/lib/generatedImageMap";

export interface BudgetProduct {
  id: string;
  slug: string;
  displayName: string;
  category: string;
  description: string;
  featuredImage: string;
  gallery: string[];
  brandingOptions: string[];
  specifications: Record<string, string>;
  moq: number;
  brand?: string;
  buttonText?: string;
  price?: number | string;
  tags?: string[];
  order: number;
  active: boolean;
  cloudinaryPublicId?: string;
  galleryPublicIds?: string[];
}

export interface BudgetConfigItem {
  id: string;
  title: string;
  value: string;
  description: string;
  image: string;
  bannerImage?: string;
  subtitle?: string;
  buttonText?: string;
  displayOrder: number;
  active: boolean;
  publicId?: string;
  bannerPublicId?: string;
  images?: Array<{ url: string; publicId: string; isCover?: boolean }>;
  collectionImages?: Array<{ url: string; publicId: string; order: number; title: string; description: string }>;
  products?: BudgetProduct[];
}

export const defaultBudgets: BudgetConfigItem[] = [
  { id: "0-250", title: "₹0–250", value: "Under ₹250", description: "Perfect for Promotional Gifts", image: "", bannerImage: "", subtitle: "Affordable Gifting", buttonText: "Explore Collection", displayOrder: 1, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "250-500", title: "₹250–500", value: "₹250 - ₹500", description: "Perfect for Standard Swag", image: "", bannerImage: "", subtitle: "Value Swag Kits", buttonText: "Explore Collection", displayOrder: 2, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "500-1000", title: "₹500–1000", value: "₹500 - ₹1000", description: "Perfect for Premium Accessories", image: "", bannerImage: "", subtitle: "Premium Gifts", buttonText: "Explore Collection", displayOrder: 3, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "1000-2500", title: "₹1000–2500", value: "₹1000 - ₹2500", description: "Perfect for Executive Hampers", image: "", bannerImage: "", subtitle: "Executive Selection", buttonText: "Explore Collection", displayOrder: 4, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "2500-5000", title: "₹2500–5000", value: "₹2500+", description: "Perfect for Luxury & VIP Gifts", image: "", bannerImage: "", subtitle: "Luxury VIP Collection", displayOrder: 5, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] },
  { id: "5000", title: "₹5000+", value: "₹2500+", description: "Perfect for Ultra-Luxury VIP Gifts", image: "", bannerImage: "", subtitle: "Ultra-Luxury VIP", buttonText: "Explore Collection", displayOrder: 6, active: true, publicId: "", bannerPublicId: "", images: [], collectionImages: [], products: [] }
];

const RUNTIME_DIR = path.join(process.cwd(), "data", "runtime");
const BUDGETS_FILE = path.join(RUNTIME_DIR, "budgets.json");

async function getFirstPublicImage(id: string): Promise<string> {
  try {
    const folder = id === "5000" ? "5000+" : id;
    const files = BUDGET_IMAGES_MAP[folder] || [];
    const imgFile = files.find((f) => /\.(png|jpe?g|webp|svg)$/i.test(f));
    if (imgFile) {
      return `/${folder}/${imgFile}`;
    }
  } catch {
    // Ignore error
  }
  return "";
}

function sanitizeBudgetConfigItem(item: any, idx: number): BudgetConfigItem {
  const def = defaultBudgets.find((d) => d.id === item?.id) || defaultBudgets[idx] || defaultBudgets[0];

  let resolvedImages = Array.isArray(item?.images) ? item.images : [];
  if (resolvedImages.length === 0 && item?.image) {
    resolvedImages = [{ url: item.image, publicId: item.publicId || "", isCover: true }];
  }

  let coverItem = resolvedImages.find((img: any) => img?.isCover);
  if (!coverItem && resolvedImages.length > 0) {
    coverItem = resolvedImages[0];
  }

  const resolvedImage = coverItem ? coverItem.url : item?.image || def.image || "";
  const resolvedBannerImage = item?.bannerImage || resolvedImage || def.bannerImage || "";

  return {
    id: String(item?.id || def.id),
    title: String(item?.title || def.title),
    value: String(item?.value || def.value),
    description: item?.description ?? def.description ?? "",
    image: resolvedImage,
    bannerImage: resolvedBannerImage,
    subtitle: item?.subtitle ?? def.subtitle ?? "",
    buttonText: item?.buttonText ?? def.buttonText ?? "Explore Collection",
    displayOrder: typeof item?.displayOrder === "number" ? item.displayOrder : def.displayOrder,
    active: typeof item?.active === "boolean" ? item.active : def.active,
    publicId: item?.publicId ?? (coverItem ? coverItem.publicId : def.publicId) ?? "",
    bannerPublicId: item?.bannerPublicId ?? def.bannerPublicId ?? "",
    images: JSON.parse(JSON.stringify(resolvedImages)),
    collectionImages: JSON.parse(JSON.stringify(item?.collectionImages || [])),
    products: JSON.parse(JSON.stringify(item?.products || [])),
  };
}

async function loadFromDiskFile(): Promise<BudgetConfigItem[] | null> {
  try {
    const content = await fs.readFile(BUDGETS_FILE, "utf-8");
    const list = JSON.parse(content) as BudgetConfigItem[];
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
  } catch {
    // File read error or missing
  }
  return null;
}

async function writeToDiskFileBestEffort(data: BudgetConfigItem[]): Promise<void> {
  try {
    await fs.mkdir(RUNTIME_DIR, { recursive: true });
    await fs.writeFile(BUDGETS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err: any) {
    // On read-only filesystem (EROFS), ignore file write failures
    console.warn("[Budget CRUD] File write skipped or non-fatal error:", err?.message || err);
  }
}

export async function getBudgetsConfigService(): Promise<BudgetConfigItem[]> {
  try {
    const diskData = await loadFromDiskFile();

    if (process.env.MONGODB_URI) {
      await connectMongoDB();
      const mongoDocs = await BudgetCollectionModel.find({}).sort({ displayOrder: 1 }).lean<any[]>();

      const totalMongoProducts = (mongoDocs || []).reduce((acc, doc) => acc + (Array.isArray(doc?.products) ? doc.products.length : 0), 0);
      const totalDiskProducts = (diskData || []).reduce((acc, doc) => acc + (Array.isArray(doc?.products) ? doc.products.length : 0), 0);

      // If mongoDocs exist and contain products (or if disk file has no products), use MongoDB
      if (mongoDocs && mongoDocs.length > 0 && (totalMongoProducts > 0 || totalDiskProducts === 0)) {
        const sanitized = await Promise.all(
          mongoDocs.map(async (doc, idx) => {
            const item = sanitizeBudgetConfigItem(doc, idx);
            if (!item.image) {
              item.image = await getFirstPublicImage(item.id);
            }
            if (!item.bannerImage) {
              item.bannerImage = item.image;
            }
            return item;
          })
        );
        return sanitized;
      }

      // If Mongo is empty OR has 0 products while disk file has products, seed MongoDB from disk file (or defaultBudgets)
      console.log("[Budget CRUD] Seeding MongoDB budget collections from budgets.json / defaults...");
      const seedSource = diskData || defaultBudgets;

      const seededItems = await Promise.all(
        seedSource.map(async (rawItem, idx) => {
          const item = sanitizeBudgetConfigItem(rawItem, idx);
          if (!item.image) {
            item.image = await getFirstPublicImage(item.id);
          }
          if (!item.bannerImage) {
            item.bannerImage = item.image;
          }
          return item;
        })
      );

      // Save seeded items to MongoDB
      for (const item of seededItems) {
        await BudgetCollectionModel.findOneAndUpdate(
          { id: item.id },
          { $set: item },
          { upsert: true, returnDocument: "after" }
        );
      }

      return seededItems;
    }

    // Local / Offline fallback without MONGODB_URI
    const source = diskData || defaultBudgets;
    const mapped = await Promise.all(
      source.map(async (rawItem, idx) => {
        const item = sanitizeBudgetConfigItem(rawItem, idx);
        if (!item.image) {
          item.image = await getFirstPublicImage(item.id);
        }
        if (!item.bannerImage) {
          item.bannerImage = item.image;
        }
        return item;
      })
    );

    return mapped;
  } catch (err: any) {
    console.error("[Budget CRUD] Error in getBudgetsConfigService:", err?.message || err);
    return defaultBudgets;
  }
}

export async function saveBudgetsConfigService(data: BudgetConfigItem[]): Promise<{ success: boolean; message?: string }> {
  try {
    const sortedData = [...data].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    if (process.env.MONGODB_URI) {
      await connectMongoDB();

      for (const item of sortedData) {
        const sanitized = sanitizeBudgetConfigItem(item, 0);
        await BudgetCollectionModel.findOneAndUpdate(
          { id: item.id },
          { $set: sanitized },
          { upsert: true, returnDocument: "after" }
        );
      }

      console.log("[Budget CRUD] Successfully updated budget collections in MongoDB.", { count: sortedData.length });

      // Best effort file sync for local dev (ignored silently on read-only EROFS)
      await writeToDiskFileBestEffort(sortedData);

      return { success: true };
    }

    // If no MONGODB_URI is configured (local file mode)
    await writeToDiskFileBestEffort(sortedData);
    return { success: true };
  } catch (err: any) {
    console.error("[Budget CRUD] Error in saveBudgetsConfigService:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Failed to save budget collections.",
    };
  }
}

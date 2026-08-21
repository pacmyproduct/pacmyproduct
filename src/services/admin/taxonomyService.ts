import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { CategoryRecord, SubcategoryRecord } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { destroyCloudinaryAssets } from "@/lib/admin/cloudinaryLifecycle";
import { CategoryModel, SubcategoryModel } from "@/models/cmsModels";
import { getCanonicalCategorySlug, getCanonicalCategoryName, getCanonicalSubcategorySlug, getCanonicalSubcategoryName } from "@/lib/slugResolver";
import { PRODUCT_HIERARCHY } from "@/data/siteConfig";
import { getKitDescription } from "@/lib/catalogDefaults";

const toIso = (value: any) => value?.toISOString?.() || new Date().toISOString();

const mapCategory = (category: any): CategoryRecord => {
  const slug = getCanonicalCategorySlug(category.slug) || category.slug;
  const name = getCanonicalCategoryName(category.name) || category.name;
  return {
    id: String(category._id),
    name,
    slug,
    description: category.description,
    overview: category.overview || "",
    parentGroup: category.parentGroup,
    image: category.image,
    cloudinaryPublicId: category.cloudinaryPublicId,
    order: category.order || 0,
    active: category.active !== false,
    createdAt: toIso(category.createdAt),
  };
};

const mapSubcategory = (subcategory: any): SubcategoryRecord => {
  const slug = getCanonicalSubcategorySlug(subcategory.slug) || subcategory.slug;
  const name = getCanonicalSubcategoryName(subcategory.name) || subcategory.name;
  const category = getCanonicalCategorySlug(subcategory.category) || subcategory.category;
  return {
    id: String(subcategory._id),
    name,
    slug,
    categoryId: subcategory.categoryId ? String(subcategory.categoryId) : undefined,
    category,
    parentGroup: subcategory.parentGroup || "",
    description: subcategory.description || getKitDescription(slug) || getKitDescription(name),
    overview: subcategory.overview || "",
    image: subcategory.image || "",
    featuredImage: subcategory.featuredImage,
    cloudinaryPublicId: subcategory.cloudinaryPublicId,
    order: subcategory.order || 0,
    active: subcategory.active !== false,
    createdAt: toIso(subcategory.createdAt),
  };
};

export async function listAllCategories() {
  let categories: CategoryRecord[] = [];
  if (!process.env.MONGODB_URI) {
    categories = listRecords("categories").map((c: any) => mapCategory({ ...c, _id: c.id }));
  } else {
    await connectMongoDB();
    const raw = await CategoryModel.find({ isDeleted: { $ne: true } }).sort({ order: 1, name: 1 }).lean<any[]>();
    categories = raw.map(mapCategory);
  }

  const hierarchyCats: CategoryRecord[] = [];
  PRODUCT_HIERARCHY.forEach((group) => {
    group.categories.forEach((cat) => {
      hierarchyCats.push({
        id: `virtual_${cat.slug}`,
        name: cat.name,
        slug: cat.slug,
        active: true,
        createdAt: new Date().toISOString(),
      });
    });
  });

  const combined = [...categories, ...hierarchyCats];
  const seenSlugs = new Set<string>();
  return combined.filter((c) => {
    if (seenSlugs.has(c.slug)) return false;
    seenSlugs.add(c.slug);
    return true;
  });
}

export async function createCategory(input: Omit<CategoryRecord, "id" | "createdAt">) {
  if (!process.env.MONGODB_URI) return createRecord("categories", input);
  await connectMongoDB();
  const category = await CategoryModel.create(input);
  return mapCategory(category.toObject());
}

export async function updateCategory(id: string, patch: Partial<CategoryRecord>) {
  if (!process.env.MONGODB_URI) return updateRecord("categories", id, patch);
  await connectMongoDB();
  const category = await CategoryModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
  return category ? mapCategory(category) : null;
}

export async function deleteCategory(id: string, permanent: boolean = false, adminId?: string) {
  if (!process.env.MONGODB_URI) return deleteRecord("categories", id);
  await connectMongoDB();
  if (permanent) {
    const category = await CategoryModel.findById(id).lean<any>();
    if (category?.cloudinaryPublicId) {
      await destroyCloudinaryAssets([category.cloudinaryPublicId]);
    }
    const result = await CategoryModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } else {
    const result = await CategoryModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId,
      },
    });
    return !!result;
  }
}

export async function listAllSubcategories() {
  let subcategories: SubcategoryRecord[] = [];
  if (!process.env.MONGODB_URI) {
    subcategories = listRecords("subcategories").map((s: any) => mapSubcategory({ ...s, _id: s.id }));
  } else {
    await connectMongoDB();
    const raw = await SubcategoryModel.find({ isDeleted: { $ne: true } }).sort({ order: 1, name: 1 }).lean<any[]>();
    subcategories = raw.map(mapSubcategory);
  }

  const hierarchySubcats: SubcategoryRecord[] = [];
  PRODUCT_HIERARCHY.forEach((group) => {
    group.categories.forEach((cat) => {
      cat.subcategories.forEach((sub) => {
        hierarchySubcats.push({
          id: `virtual_${sub.slug}`,
          name: sub.name,
          slug: sub.slug,
          category: cat.slug,
          parentGroup: "",
          description: getKitDescription(sub.slug) || getKitDescription(sub.name),
          image: "",
          active: true,
          createdAt: new Date().toISOString(),
        });
      });
    });
  });

  const combined = [...subcategories, ...hierarchySubcats];
  const seenSlugs = new Set<string>();
  return combined.filter((s) => {
    if (seenSlugs.has(s.slug)) return false;
    seenSlugs.add(s.slug);
    return true;
  });
}

export async function createSubcategory(input: Omit<SubcategoryRecord, "id" | "createdAt">) {
  if (!process.env.MONGODB_URI) return createRecord("subcategories", input);
  await connectMongoDB();
  const subcategory = await SubcategoryModel.create(input);
  return mapSubcategory(subcategory.toObject());
}

export async function updateSubcategory(id: string, patch: Partial<SubcategoryRecord>) {
  if (!process.env.MONGODB_URI) return updateRecord("subcategories", id, patch);
  await connectMongoDB();
  const subcategory = await SubcategoryModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
  return subcategory ? mapSubcategory(subcategory) : null;
}

export async function deleteSubcategory(id: string, permanent: boolean = false, adminId?: string) {
  if (!process.env.MONGODB_URI) return deleteRecord("subcategories", id);
  await connectMongoDB();
  if (permanent) {
    const subcategory = await SubcategoryModel.findById(id).lean<any>();
    if (subcategory?.cloudinaryPublicId) {
      await destroyCloudinaryAssets([subcategory.cloudinaryPublicId]);
    }
    const result = await SubcategoryModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } else {
    const result = await SubcategoryModel.findByIdAndUpdate(id, {
      $set: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId,
      },
    });
    return !!result;
  }
}

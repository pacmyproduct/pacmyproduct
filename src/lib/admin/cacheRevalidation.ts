import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidatePathsAndTags() {
  try {
    // Revalidate paths
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/brands");
    revalidatePath("/corporate-kits");
    revalidatePath("/promotional-merchandise");
    revalidatePath("/budget");
    revalidatePath("/gifts-by-budget");
    revalidatePath("/87564/admin/products");
    revalidatePath("/admin/products");

    // Revalidate tags
    revalidateTag("products", "max");
    revalidateTag("catalog", "max");
    revalidateTag("categories", "max");
    revalidateTag("subcategories", "max");
    revalidateTag("brands", "max");
  } catch (err) {
    console.error("Failed to revalidate cache:", err);
  }
}

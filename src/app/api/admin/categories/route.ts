import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { createCategory, listAllCategories } from "@/services/admin/taxonomyService";
import { logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  return NextResponse.json({ success: true, data: await listAllCategories() });
}

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const data = await req.json();
    const category = await createCategory({
      name: data.name,
      slug: data.slug,
      description: data.description,
      overview: data.overview,
      parentGroup: data.parentGroup,
      image: data.image,
      cloudinaryPublicId: data.cloudinaryPublicId,
      active: data.active ?? true,
      order: Number(data.order) || 0,
    });

    if (category) {
      await logActivity({
        action: "CREATE_CATEGORY",
        entityType: "Category",
        entityId: category.id,
        entityName: category.name,
        newValue: category,
        req,
      });

      if (category.cloudinaryPublicId) {
        await logActivity({
          action: "IMAGE_UPLOADED",
          entityType: "Category",
          entityId: category.id,
          entityName: category.name,
          newValue: {
            cloudinaryPublicId: category.cloudinaryPublicId,
            image: category.image,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

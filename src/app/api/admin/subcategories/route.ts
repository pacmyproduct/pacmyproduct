import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { createSubcategory, listAllSubcategories } from "@/services/admin/taxonomyService";
import { logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  return NextResponse.json({ success: true, data: await listAllSubcategories() });
}

export async function POST(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const data = await req.json();
    const subcategory = await createSubcategory({
      name: data.name,
      slug: data.slug,
      category: data.category,
      description: data.description,
      overview: data.overview,
      parentGroup: data.parentGroup,
      image: data.image,
      cloudinaryPublicId: data.cloudinaryPublicId,
      active: data.active ?? true,
      order: Number(data.order) || 0,
    });

    if (subcategory) {
      await logActivity({
        action: "CREATE_SUBCATEGORY",
        entityType: "Subcategory",
        entityId: subcategory.id,
        entityName: subcategory.name,
        newValue: subcategory,
        req,
      });

      if (subcategory.cloudinaryPublicId) {
        await logActivity({
          action: "IMAGE_UPLOADED",
          entityType: "Subcategory",
          entityId: subcategory.id,
          entityName: subcategory.name,
          newValue: {
            cloudinaryPublicId: subcategory.cloudinaryPublicId,
            image: subcategory.image,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success: true, data: subcategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

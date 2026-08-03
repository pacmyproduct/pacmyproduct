import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { deleteProduct, updateProduct } from "@/services/admin/productService";
import { getCurrentAdmin, logActivity } from "@/lib/admin/activityLogger";
import { revalidatePathsAndTags } from "@/lib/admin/cacheRevalidation";
import { destroyCloudinaryAssets, publicIdsRemoved, uniquePublicIds } from "@/lib/admin/cloudinaryLifecycle";
import { ProductModel } from "@/models/cmsModels";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const data = await req.json();

    const oldProduct = await ProductModel.findById(id).lean<any>();
    if (!oldProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const nextPublicIds = uniquePublicIds([
      data.cloudinaryPublicId ?? oldProduct.cloudinaryPublicId,
      ...(data.galleryPublicIds || oldProduct.galleryPublicIds || []),
    ]);
    const removedPublicIds = publicIdsRemoved(
      [oldProduct.cloudinaryPublicId, ...(oldProduct.galleryPublicIds || [])],
      nextPublicIds
    );
    if (removedPublicIds.length) {
      await destroyCloudinaryAssets(removedPublicIds);
    }

    const updated = await updateProduct(id, {
      ...data,
      title: data.title ?? data.name,
      featuredImage: data.featuredImage,
      galleryImages: data.galleryImages,
      cloudinaryPublicId: data.cloudinaryPublicId,
      galleryPublicIds: data.galleryPublicIds,
      images: data.galleryImages,
      active: data.status ? data.status !== "HIDDEN" : data.active,
      applyOverviewToSubcategory: data.applyOverviewToSubcategory ?? data.applyToSubcategory,
      applyBrandingVisibilityToSubcategory: data.applyBrandingVisibilityToSubcategory,
    });

    if (updated) {
      await logActivity({
        action: "UPDATE_PRODUCT",
        entityType: "Product",
        entityId: id,
        entityName: updated.title,
        oldValue: oldProduct,
        newValue: updated,
        req,
      });

      if (removedPublicIds.length || nextPublicIds.length) {
        await logActivity({
          action: removedPublicIds.length ? "IMAGE_REPLACED" : "IMAGE_UPLOADED",
          entityType: "Product",
          entityId: id,
          entityName: updated.title,
          oldValue: {
            cloudinaryPublicId: oldProduct.cloudinaryPublicId,
            galleryPublicIds: oldProduct.galleryPublicIds || [],
            removedPublicIds,
          },
          newValue: {
            cloudinaryPublicId: updated.cloudinaryPublicId,
            galleryPublicIds: updated.galleryPublicIds || [],
            featuredImage: updated.featuredImage,
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return updated ? NextResponse.json({ success: true, data: updated }) : NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    const { id } = await params;
    const url = new URL(req.url);
    const permanent = url.searchParams.get("permanent") === "true";
    const admin = await getCurrentAdmin();

    if (permanent && admin?.role !== "SUPER_ADMIN") {
      return NextResponse.json({ success: false, message: "Forbidden: Only SUPER_ADMIN can permanently delete records" }, { status: 403 });
    }

    const product = await ProductModel.findById(id).lean<any>();
    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    const success = await deleteProduct(id, permanent, admin?.id);

    if (success) {
      await logActivity({
        action: permanent ? "PERMANENT_DELETE_PRODUCT" : "DELETE_PRODUCT",
        entityType: "Product",
        entityId: id,
        entityName: product.title || product.name,
        oldValue: product,
        req,
      });

      if (permanent) {
        await logActivity({
          action: "IMAGE_DELETED",
          entityType: "Product",
          entityId: id,
          entityName: product.title || product.name,
          oldValue: {
            cloudinaryPublicId: product.cloudinaryPublicId,
            galleryPublicIds: product.galleryPublicIds || [],
          },
          req,
        });
      }

      await revalidatePathsAndTags();
    }

    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

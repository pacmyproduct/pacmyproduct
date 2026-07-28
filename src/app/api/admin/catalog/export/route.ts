import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { connectMongoDB } from "@/lib/mongodb";
import { ProductModel, CategoryModel, SubcategoryModel, BrandModel, OrderModel, QuoteModel } from "@/models/cmsModels";
import { logActivity } from "@/lib/admin/activityLogger";
import * as XLSX from "xlsx";

const modelMap: Record<string, any> = {
  products: ProductModel,
  brands: BrandModel,
  categories: CategoryModel,
  subcategories: SubcategoryModel,
  orders: OrderModel,
  quotes: QuoteModel,
};

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);

    const entityType = searchParams.get("entityType") || "products"; // products, brands, categories, subcategories, orders, quotes
    const format = searchParams.get("format") || "csv"; // csv, xlsx
    const activeOnly = searchParams.get("activeOnly") === "true";
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const Model = modelMap[entityType];
    if (!Model) {
      return NextResponse.json({ success: false, message: `Invalid entity type: ${entityType}` }, { status: 400 });
    }

    const query: any = { isDeleted: { $ne: true } };

    // Apply active filters
    if (activeOnly) {
      if (entityType === "products") {
        query.status = "PUBLISHED";
      } else {
        query.active = true;
      }
    }

    // Apply category/brand filters
    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }

    // Apply date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const rawRecords = (await Model.find(query).sort({ createdAt: -1 }).lean()) as any[];

    // Format fields for export
    const rows = rawRecords.map((rec) => {
      const row: any = {
        ID: String(rec._id),
      };

      if (entityType === "products") {
        row["Title"] = rec.title || rec.name || "";
        row["Slug"] = rec.slug || "";
        row["Description"] = rec.description || "";
        row["Short Description"] = rec.shortDescription || "";
        row["Overview"] = rec.overview || "";
        row["Branding Capabilities"] = Array.isArray(rec.brandingCapabilities) ? rec.brandingCapabilities.join("; ") : "";
        row["Show Branding Capabilities"] = rec.showBrandingCapabilities !== false ? "Yes" : "No";
        row["Category"] = rec.category || "";
        row["Subcategory"] = rec.subcategory || "";
        row["Brand"] = rec.brand || "";
        row["MOQ"] = rec.moq || 0;
        row["Price"] = rec.price || 0;
        row["Status"] = rec.status || "";
        row["Featured"] = rec.featured ? "Yes" : "No";
        row["Display Name"] = rec.specifications instanceof Map 
          ? rec.specifications.get("displayName") 
          : rec.specifications?.displayName || "";
        row["Budget"] = rec.specifications instanceof Map 
          ? rec.specifications.get("budget") 
          : rec.specifications?.budget || "";
      } 
      else if (entityType === "brands") {
        row["Name"] = rec.name || "";
        row["Slug"] = rec.slug || "";
        row["Logo URL"] = rec.logo || "";
        row["Industry"] = rec.industry || "";
        row["Category"] = rec.category || "";
        row["Description"] = rec.description || "";
        row["Order"] = rec.order || 0;
        row["Active"] = rec.active ? "Yes" : "No";
      }
      else if (entityType === "categories") {
        row["Name"] = rec.name || "";
        row["Slug"] = rec.slug || "";
        row["Description"] = rec.description || "";
        row["Parent Group"] = rec.parentGroup || "";
        row["Image URL"] = rec.image || "";
        row["Order"] = rec.order || 0;
        row["Active"] = rec.active ? "Yes" : "No";
      }
      else if (entityType === "subcategories") {
        row["Name"] = rec.name || "";
        row["Slug"] = rec.slug || "";
        row["Parent Category Slug"] = rec.category || "";
        row["Parent Group"] = rec.parentGroup || "";
        row["Image URL"] = rec.image || "";
        row["Order"] = rec.order || 0;
        row["Active"] = rec.active ? "Yes" : "No";
      }
      else if (entityType === "orders") {
        row["Customer Name"] = rec.customerName || rec.customer || "";
        row["Email"] = rec.email || "";
        row["Phone"] = rec.phone || "";
        row["Company"] = rec.company || "";
        row["Products"] = Array.isArray(rec.products) ? rec.products.join(", ") : String(rec.products || "");
        row["Total Amount"] = rec.total ?? rec.amount ?? 0;
        row["Status"] = rec.status || "";
      }
      else if (entityType === "quotes") {
        row["Customer Name"] = rec.customerName || rec.name || "";
        row["Email"] = rec.email || "";
        row["Phone"] = rec.phone || "";
        row["Company"] = rec.company || "";
        row["City"] = rec.city || "";
        row["Product(s)"] = Array.isArray(rec.products) ? rec.products.join(", ") : String(rec.products || rec.product || "");
        row["Quantity"] = rec.quantity || "";
        row["Message"] = rec.message || "";
        row["Status"] = rec.status || "";
      }

      row["Created At"] = rec.createdAt ? new Date(rec.createdAt).toISOString() : "";
      return row;
    });

    // Log the export event
    await logActivity({
      action: `EXPORT_${entityType.toUpperCase()}`,
      entityType: entityType.slice(0, -1),
      entityName: `Catalog Export (${format.toUpperCase()})`,
      newValue: { count: rows.length, format },
      req,
    });

    if (format.toLowerCase() === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Export");
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

      return new Response(excelBuffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${entityType}_export_${Date.now()}.xlsx"`,
        },
      });
    } else {
      // CSV format
      const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
      const csvRows = [headers.join(",")];

      for (const row of rows) {
        const values = headers.map((header) => {
          const val = String(row[header] || "");
          // Escape quotes and commas
          const escaped = val.replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
      }

      const csvContent = csvRows.join("\n");
      return new Response(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${entityType}_export_${Date.now()}.csv"`,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

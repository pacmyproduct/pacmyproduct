"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDown, ArrowUp, ImagePlus, Pencil, Plus, Trash2, UploadCloud, X, Search, Filter, ArrowLeft, ArrowRight, Loader2, Download, Upload, GripVertical, Check, Eye } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import * as XLSX from "xlsx";
import { ImageUploader } from "./ImageUploader";
import { getCanonicalCategoryName, getCanonicalSubcategoryName, cleanProductTitle } from "@/lib/slugResolver";
import { getCategoryDefaultOverview, getCategoryDefaultBranding } from "@/lib/catalogDefaults";

interface ProductRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  overview?: string;
  brandingCapabilities?: string[];
  showBrandingCapabilities?: boolean;
  rawOverview?: string;
  rawBrandingCapabilities?: string[];
  category: string;
  subcategory: string;
  brand?: string;
  featuredImage?: string;
  galleryImages?: string[];
  cloudinaryPublicId?: string;
  galleryPublicIds?: string[];
  images: string[];
  moq: number;
  price?: number;
  featured: boolean;
  active: boolean;
  order?: number;
  budget?: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}

interface OptionRecord {
  name: string;
  slug: string;
}

const emptyProduct = {
  title: "",
  slug: "",
  description: "",
  shortDescription: "",
  overview: "",
  brandingCapabilities: [] as string[],
  showBrandingCapabilities: true,
  category: "",
  subcategory: "",
  brand: "",
  moq: 50,
  price: 0,
  status: "PUBLISHED",
  featured: false,
  featuredImage: "",
  galleryImages: [] as string[],
  cloudinaryPublicId: "",
  galleryPublicIds: [] as string[],
  budget: "",
  displayName: "",
};

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/bmp",
  "image/tiff",
  "image/svg+xml"
];
const maxImageSize = 10 * 1024 * 1024; // 10MB
const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function ProductManager() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [categories, setCategories] = useState<OptionRecord[]>([]);
  const [subcategories, setSubcategories] = useState<OptionRecord[]>([]);
  const [brands, setBrands] = useState<OptionRecord[]>([]);
  
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Advanced Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubcategory, setFilterSubcategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterActive, setFilterActive] = useState(""); // "", "true", "false"
  const [filterFeatured, setFilterFeatured] = useState(""); // "", "true", "false"
  const [sortBy, setSortBy] = useState("newest"); // name, newest, oldest, moq, price
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // CRUD States
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductRecord | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDisplayNameEdited, setIsDisplayNameEdited] = useState(false);

  // Reusable Media Uploader states
  const [featuredUploading, setFeaturedUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const isUploading = featuredUploading || galleryUploading;
  const [uploadedPublicIdsInSession, setUploadedPublicIdsInSession] = useState<string[]>([]);
  const [initialPublicIds, setInitialPublicIds] = useState<string[]>([]);
  
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // Import / Export Tool States
  const [importExportModalOpen, setImportExportModalOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<any[]>([]);
  const [importingType, setImportingType] = useState("products"); // products, brands, categories
  const [importSummary, setImportSummary] = useState<any | null>(null);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [importLoading, setImportLoading] = useState(false);

  // Export filters
  const [exportFormat, setExportFormat] = useState("csv"); // csv, xlsx
  const [exportActiveOnly, setExportActiveOnly] = useState(false);
  const [exportCategory, setExportCategory] = useState("");
  const [exportStartDate, setExportStartDate] = useState("");
  const [exportEndDate, setExportEndDate] = useState("");

  const featuredFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const importFileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [productRes, categoryRes, subcategoryRes, brandRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/catalog/categories"),
        fetch("/api/catalog/subcategories"),
        fetch("/api/catalog/brands"),
      ]);
      const [productData, categoryData, subcategoryData, brandData] = await Promise.all([
        productRes.json(),
        categoryRes.json(),
        subcategoryRes.json(),
        brandRes.json(),
      ]);

      // Sort products by order field if available, else date
      const fetchedProducts = productData.data ?? [];
      fetchedProducts.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

      setProducts(fetchedProducts);

      const backendCategories = categoryData.data ?? [];
      const runtimeCategories = [
        { name: "Pens", slug: "pens" },
        { name: "Caps", slug: "caps" },
        { name: "Table Top", slug: "table-top" },
        { name: "Diaries / Notebooks", slug: "diaries-notebooks" },
        { name: "Badges", slug: "badges" },
        { name: "Neck Rest / Back Rest", slug: "neck-rest-back-rest" },
        { name: "Electronics", slug: "electronics" },
        { name: "Household", slug: "household-utilities" },
        { name: "Clocks", slug: "clocks" },
        { name: "Grooming Kits", slug: "grooming-kits" },
        { name: "Executive Kits", slug: "executive-kits" },
      ];
      const mergedCategories = [...backendCategories];
      runtimeCategories.forEach((rc) => {
        if (!mergedCategories.some((c) => c.slug === rc.slug)) {
          mergedCategories.push(rc);
        }
      });
      setCategories(mergedCategories);

      let backendSubcategories = subcategoryData.data ?? [];
      backendSubcategories = backendSubcategories.map((sub: any) => {
        if (sub.slug === "dealer-kits" || sub.slug === "retailer-kits") {
          return { ...sub, name: "Dealer / Retailer Kit" };
        }
        return sub;
      });
      
      const runtimeSubcategories = [
        { name: "Pens", slug: "pens", category: "pens" },
        { name: "Caps", slug: "caps", category: "caps" },
        { name: "Table Top", slug: "table-top", category: "table-top" },
        { name: "Paper Weight", slug: "paper-weight", category: "table-top" },
        { name: "Diaries / Notebooks", slug: "diaries-notebooks", category: "diaries-notebooks" },
        { name: "Badges", slug: "badges-sub", category: "badges" },
        { name: "Neck Rest / Back Rest", slug: "neck-rest-back-rest-sub", category: "neck-rest-back-rest" },
        { name: "Wireless", slug: "wireless-charger", category: "electronics" },
        { name: "Decorative", slug: "decorative", category: "household-utilities" },
        { name: "Household", slug: "household-utilities", category: "household-utilities" },
        { name: "Wall Clock", slug: "wall-clock", category: "clocks" },
        { name: "Wrist Watch", slug: "wrist-watch", category: "clocks" },
        { name: "Male Grooming Kit", slug: "male-grooming-kit", category: "grooming-kits" },
        { name: "Female Grooming Kit", slug: "female-grooming-kit", category: "grooming-kits" },
        { name: "Executive Kit", slug: "executive-kits-sub", category: "executive-kits" },
      ];
      const mergedSubcategories = [...backendSubcategories];
      runtimeSubcategories.forEach((rs) => {
        if (!mergedSubcategories.some((s) => s.slug === rs.slug)) {
          mergedSubcategories.push(rs);
        }
      });
      setSubcategories(mergedSubcategories);
      setBrands(brandData.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyProduct);
    setIsDisplayNameEdited(false);
    setInitialPublicIds([]);
    setUploadedPublicIdsInSession([]);
    setUploadError("");
    setUploadSuccess("");
    setModalOpen(true);
  };

  const openEdit = (product: ProductRecord) => {
    setIsDisplayNameEdited(true);
    const images = product.galleryImages?.length ? product.galleryImages : product.images || [];
    const featuredImage = product.featuredImage || images[0] || "";
    const existingPids = [
      product.cloudinaryPublicId,
      ...(product.galleryPublicIds || [])
    ].filter(Boolean) as string[];
    
    setEditingId(product.id);
    setForm({
      title: product.title,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription || "",
      overview: product.rawOverview !== undefined ? product.rawOverview : (product.overview || ""),
      brandingCapabilities: product.rawBrandingCapabilities !== undefined ? product.rawBrandingCapabilities : (product.brandingCapabilities || []),
      showBrandingCapabilities: product.showBrandingCapabilities !== false,
      category: product.category,
      subcategory: product.subcategory,
      brand: product.brand || "",
      moq: product.moq,
      price: product.price || 0,
      status: product.active ? "PUBLISHED" : "HIDDEN",
      featured: product.featured,
      featuredImage,
      galleryImages: images.filter((image) => image !== featuredImage),
      cloudinaryPublicId: product.cloudinaryPublicId || "",
      galleryPublicIds: (product.galleryPublicIds || []).filter((pid: string) => pid && pid !== product.cloudinaryPublicId),
      // @ts-ignore
      budget: product.budget || "",
      // @ts-ignore
      displayName: product.displayName || "",
    });

    setInitialPublicIds(existingPids);
    setUploadedPublicIdsInSession([]);
    setUploadError("");
    setUploadSuccess("");
    setModalOpen(true);
  };

  const updateForm = (field: keyof typeof emptyProduct, value: any) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "title" && !editingId) next.slug = slugify(String(value));
      
      if ((field === "subcategory" || field === "category") && !editingId && !isDisplayNameEdited) {
        const targetSub = field === "subcategory" ? value : next.subcategory;
        const subName = subcategories.find((s) => s.slug === targetSub)?.name || "";
        if (subName) {
          next.displayName = subName;
        }
      }

      if (field === "displayName") {
        setIsDisplayNameEdited(true);
      }

      return next;
    });
  };

  const [newBrandingTag, setNewBrandingTag] = useState("");

  const handleAddBrandingTag = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!newBrandingTag.trim()) return;
    const tag = newBrandingTag.trim();
    if (!form.brandingCapabilities.includes(tag)) {
      setForm((prev) => ({
        ...prev,
        brandingCapabilities: [...prev.brandingCapabilities, tag],
      }));
    }
    setNewBrandingTag("");
  };

  const handleRemoveBrandingTag = (tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      brandingCapabilities: prev.brandingCapabilities.filter((t) => t !== tagToRemove),
    }));
  };

  const handleLoadCategoryDefaults = () => {
    const defaultOverview = getCategoryDefaultOverview(form.category, form.subcategory);
    const defaultBranding = getCategoryDefaultBranding(form.category, form.subcategory);
    setForm((prev) => ({
      ...prev,
      overview: defaultOverview,
      brandingCapabilities: [...defaultBranding],
    }));
  };



  const handleCancelOrClose = async () => {
    if (isUploading) return;
    
    if (uploadedPublicIdsInSession.length > 0) {
      try {
        const { deleteUnusedFiles } = require("@/lib/admin/uploadService");
        await deleteUnusedFiles(uploadedPublicIdsInSession);
      } catch (err) {
        console.error("Cleanup failed:", err);
      }
    }
    
    setUploadedPublicIdsInSession([]);
    setModalOpen(false);
  };

  const saveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isUploading) return;
    setSaving(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      let finalTitle = form.title;
      let finalSlug = form.slug;
      if (!editingId || !finalTitle) {
        const brandText = form.brand || "PacMyProduct";
        const catOrSub = form.subcategory || form.category || "General";
        const displayCatOrSub = catOrSub.replace(/-/g, ' ');
        const displayCatOrSubCap = displayCatOrSub.charAt(0).toUpperCase() + displayCatOrSub.slice(1);
        finalTitle = `${brandText} - ${displayCatOrSubCap} - ${String(Date.now()).slice(-4)}`;
        finalSlug = finalTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      const payload = {
        name: finalTitle,
        title: finalTitle,
        slug: finalSlug,
        description: form.description,
        shortDescription: form.shortDescription,
        overview: form.overview,
        brandingCapabilities: form.brandingCapabilities,
        showBrandingCapabilities: form.showBrandingCapabilities,
        category: form.category,
        subcategory: form.subcategory,
        brand: form.brand,
        moq: Number(form.moq),
        price: Number(form.price),
        status: form.status,
        featured: form.featured,
        featuredImage: form.featuredImage,
        galleryImages: form.galleryImages,
        cloudinaryPublicId: form.cloudinaryPublicId,
        galleryPublicIds: form.galleryPublicIds,
        // @ts-ignore
        budget: form.budget || "",
        // @ts-ignore
        displayName: form.displayName || "",
      };

      const res = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to save product record");
      }

      setUploadedPublicIdsInSession([]); // Clear session tracker so files aren't deleted
      setSaving(false);
      setModalOpen(false);
      await load();
    } catch (err: any) {
      setUploadError(err.message || "An error occurred while saving the product.");
      setSaving(false);
    }
  };

  const deleteProduct = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/products/${deleteTarget.id}`, { method: "DELETE" });
    setDeleteTarget(null);
    await load();
  };

  // 2. DRAG & DROP REORDER PERSISTENCE
  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(filteredProducts);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    // Save instant local frontend state
    const updatedProductsMap = new Map(reordered.map((item, index) => [item.id, index + 1]));
    const allUpdated = products.map((prod) => {
      if (updatedProductsMap.has(prod.id)) {
        return { ...prod, order: updatedProductsMap.get(prod.id) };
      }
      return prod;
    });
    allUpdated.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    setProducts(allUpdated);

    // Send ordering list to server
    const ids = reordered.map((p) => p.id);
    await fetch("/api/admin/catalog/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entityType: "Product", ids }),
    });
  };

  // 3. SPREADSHEET IMPORT & EXPORT HANDLERS
  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportSummary(null);
    setImportErrors([]);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json<any>(worksheet);
        setImportPreview(parsedData);
        setImportFile(file);
      } catch (err) {
        alert("Failed to parse file. Make sure it is a valid CSV or Excel document.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const submitImport = async () => {
    if (!importFile) return;
    setImportLoading(true);
    setImportSummary(null);
    setImportErrors([]);

    const body = new FormData();
    body.append("file", importFile);
    body.append("entityType", importingType);

    try {
      const res = await fetch("/api/admin/catalog/import", {
        method: "POST",
        body,
      });
      const result = await res.json();
      if (result.success) {
        setImportSummary(result.summary);
        setImportErrors(result.errors || []);
        if (result.summary.created > 0 || result.summary.updated > 0) {
          await load();
        }
      } else {
        setImportErrors([result.message || "Failed to process import file"]);
      }
    } catch (err) {
      setImportErrors(["Connection error while submitting spreadsheet data."]);
    } finally {
      setImportLoading(false);
    }
  };

  const submitExport = () => {
    const params = new URLSearchParams({
      entityType: "products",
      format: exportFormat,
      activeOnly: String(exportActiveOnly),
      category: exportCategory,
      startDate: exportStartDate,
      endDate: exportEndDate,
    });

    window.open(`/api/admin/catalog/export?${params.toString()}`);
  };

  // 4. FILTER, SEARCH, SORT, PAGINATION PROCESSOR
  const filteredProducts = products.filter((prod) => {
    const title = prod.title || "";
    const slug = prod.slug || "";
    const brand = prod.brand || "";

    const matchesSearch =
      !searchQuery ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !filterCategory || prod.category === filterCategory;
    const matchesSubcategory =
      !filterSubcategory ||
      prod.subcategory === filterSubcategory ||
      (filterSubcategory === "dealer-kits" && prod.subcategory === "retailer-kits") ||
      (filterSubcategory === "retailer-kits" && prod.subcategory === "dealer-kits");
    const matchesBrand = !filterBrand || prod.brand === filterBrand;
    const matchesActive =
      !filterActive ||
      (filterActive === "true" && prod.active) ||
      (filterActive === "false" && !prod.active);
    const matchesFeatured =
      !filterFeatured ||
      (filterFeatured === "true" && prod.featured) ||
      (filterFeatured === "false" && !prod.featured);

    return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesActive && matchesFeatured;
  });

  // Sorting
  filteredProducts.sort((a, b) => {
    if (sortBy === "name") return a.title.localeCompare(b.title);
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "moq") return a.moq - b.moq;
    if (sortBy === "price") return (a.price || 0) - (b.price || 0);
    // default/newest
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Pagination bounds
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, filterCategory, filterSubcategory, filterBrand, filterActive, filterFeatured, sortBy, limit]);

  if (!mounted) return null;

  return (
    <div className="space-y-5">
      
      {/* Action Header Button Controls */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-[#FFFDF8] p-4 rounded-xl border border-[#F5C2C2] shadow-sm">
        <div className="flex gap-2">
          <button onClick={() => setImportExportModalOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-4 py-2.5 text-xs font-black uppercase text-[#C62828] hover:bg-[#FAF9F6] shadow-sm">
            <Upload className="h-4 w-4" /> Import / Export Tools
          </button>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-[#D32F2F] px-4 py-2.5 text-xs font-black uppercase text-white hover:bg-[#C62828] shadow-md">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Filters & Search Panel */}
      <div className="rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-5 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6 text-left">
          
          {/* Search Box */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Search Catalogue</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#9A9387]" />
              <input
                type="text"
                placeholder="Search by Title, Slug, SKU, Brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Subcategory</label>
            <select
              value={filterSubcategory}
              onChange={(e) => setFilterSubcategory(e.target.value)}
              className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]"
            >
              <option value="">All Subcategories</option>
              {subcategories
                .filter((sub: any) => !filterCategory || sub.category === filterCategory)
                .filter((sub: any) => sub.slug !== "retailer-kits" || filterSubcategory === "retailer-kits")
                .map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Brand</label>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]"
            >
              <option value="">All Brands</option>
              {brands.map((b) => (
                <option key={b.slug} value={b.name}>{b.name}</option>
              ))}
            </select>
          </div>

          {/* Active status */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#6B6B63] mb-2">Status</label>
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]"
            >
              <option value="">All Statuses</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
          </div>

        </div>

        {/* Sorting and Page limits control */}
        <div className="flex flex-wrap justify-between items-center pt-3 border-t border-[#E9E1D5] gap-3 text-left">
          <div className="flex gap-4">
            
            {/* Sorting */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B63] mr-2">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-2.5 py-1.5 text-xs font-bold text-[#C62828] outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="moq">MOQ (Low to High)</option>
                <option value="price">Starting Price</option>
              </select>
            </div>

            {/* Limit Selector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B63] mr-2">Rows:</span>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-2.5 py-1.5 text-xs font-bold text-[#C62828] outline-none"
              >
                <option value={10}>10 rows</option>
                <option value={25}>25 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>

            {/* Featured filter */}
            <div>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-[#C62828] pt-1">
                <input
                  type="checkbox"
                  checked={filterFeatured === "true"}
                  onChange={(e) => setFilterFeatured(e.target.checked ? "true" : "")}
                  className="rounded border-[#CFC5B7]"
                />
                Featured Items Only
              </label>
            </div>

          </div>

          <span className="text-xs font-bold text-[#9A9387] uppercase tracking-widest">{totalItems} Products found</span>
        </div>
      </div>

      {/* Drag and Drop sorting context layout */}
      <div className="overflow-hidden rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] shadow-sm">
        <div className="overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="products-list">
              {(provided) => (
                <table className="w-full min-w-[1040px] border-collapse text-left text-sm" ref={provided.innerRef} {...provided.droppableProps}>
                  <thead className="bg-[#FAF9F6] text-xs uppercase tracking-wider text-[#6B6B63] border-b border-[#F5C2C2]">
                    <tr>
                      <th className="px-4 py-3 font-bold w-12 text-center">Move</th>
                      <th className="px-4 py-3 font-bold">Thumbnail</th>
                      <th className="px-4 py-3 font-bold">Category</th>
                      <th className="px-4 py-3 font-bold">Subcategory</th>
                      <th className="px-4 py-3 font-bold">Brand</th>
                      <th className="px-4 py-3 font-bold">MOQ</th>
                      <th className="px-4 py-3 font-bold">Featured</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                      <th className="px-4 py-3 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5C2C2]">
                    {loading ? (
                      <tr><td className="px-4 py-8 text-center text-[#6B6B63]" colSpan={9}><Loader2 className="h-5 w-5 animate-spin mx-auto text-[#D32F2F] mb-2" />Loading product catalogue database...</td></tr>
                    ) : paginatedProducts.length === 0 ? (
                      <tr><td className="px-4 py-8 text-center text-[#9A9387] font-bold" colSpan={9}>No matching products yet. Create or import spreadsheet rows above.</td></tr>
                    ) : (
                      paginatedProducts.map((product, idx) => (
                        <Draggable key={product.id} draggableId={product.id} index={idx}>
                          {(dragProvided) => (
                            <tr ref={dragProvided.innerRef} {...dragProvided.draggableProps} className="text-[#C62828] hover:bg-[#FAF9F6]/70 transition">
                              <td className="px-4 py-3 text-center" {...dragProvided.dragHandleProps}>
                                <GripVertical className="h-4 w-4 text-[#9A9387] hover:text-[#C62828] mx-auto cursor-grab" />
                              </td>
                              <td className="px-4 py-3">
                                {product.featuredImage ? (
                                  <img src={product.featuredImage} alt={cleanProductTitle(product.title)} className="h-11 w-11 rounded-lg object-cover border border-[#E5DED2]" />
                                ) : (
                                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F8F7F3] text-[#9A9387]"><ImagePlus className="h-4 w-4" /></div>
                                )}
                              </td>
                              <td className="px-4 py-3"><span className="rounded bg-[#F8F7F3] px-2 py-0.5 text-xs text-[#5F6752] font-semibold">{getCanonicalCategoryName(product.category)}</span></td>
                              <td className="px-4 py-3 text-[#6B6B63] font-medium">{getCanonicalSubcategoryName(product.subcategory)}</td>
                              <td className="px-4 py-3 font-semibold text-[#3F4734]">{product.brand || "PacMyProduct"}</td>
                              <td className="px-4 py-3 font-bold">{product.moq} Units</td>
                              <td className="px-4 py-3">
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${product.featured ? "bg-amber-100 text-amber-700" : "bg-gray-150 text-gray-400"}`}>
                                  {product.featured ? "Featured" : "No"}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${product.active ? "bg-[#FDECEC] text-[#D32F2F]" : "bg-[#F8F7F3] text-[#6B6B63]"}`}>
                                  {product.active ? "Active" : "Hidden"}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex gap-2">
                                  <button onClick={() => openEdit(product)} className="inline-flex items-center gap-1 rounded-md border border-[#F5C2C2] bg-[#FFFDF8] px-2 py-1 text-xs font-bold text-[#C62828] hover:bg-[#FAF9F6] shadow-sm">
                                    <Pencil className="h-3 w-3" /> Edit
                                  </button>
                                  <button onClick={() => setDeleteTarget(product)} className="inline-flex items-center gap-1 rounded-md border border-[#EAD7C8] bg-[#FFFDF8] px-2 py-1 text-xs font-bold text-[#8A4B22] hover:bg-[#F3E7D7] shadow-sm">
                                    <Trash2 className="h-3 w-3" /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Pagination navigation controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-[#F5C2C2] bg-[#FAF9F6] px-5 py-4">
            <span className="text-xs font-bold text-[#6B6B63] uppercase tracking-wider">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalItems)} of {totalItems} items
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-1.5 text-xs font-bold text-[#C62828] shadow-sm hover:bg-[#FAF9F6] disabled:opacity-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-1.5 text-xs font-bold text-[#C62828] shadow-sm hover:bg-[#FAF9F6] disabled:opacity-50"
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Import / Export Spreadsheet Modal */}
      {importExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#E9E1D5] pb-3">
              <h2 className="text-lg font-black uppercase tracking-wider text-[#2B2B2B]">Spreadsheet Catalogue Manager</h2>
              <button onClick={() => { setImportExportModalOpen(false); setImportFile(null); setImportPreview([]); setImportSummary(null); }} className="rounded-lg p-1.5 border border-[#F5C2C2] hover:bg-[#F8F7F3]"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 text-left">
              
              {/* Export Panel */}
              <div className="space-y-4 rounded-xl border border-[#F5C2C2] p-5 bg-[#FAF9F6]/70">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#3F4734] flex items-center gap-2">
                  <Download className="h-4.5 w-4.5 text-[#D32F2F]" /> Export Catalogue Data
                </h3>
                <p className="text-xs text-[#6B6B63]">Download active products in CSV or Excel file spreadsheet format.</p>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-[#C62828]">
                    File Format:
                    <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm">
                      <option value="csv">CSV (Comma Separated Values)</option>
                      <option value="xlsx">Excel File (.xlsx)</option>
                    </select>
                  </label>

                  <label className="block text-xs font-bold text-[#C62828]">
                    Category Filter:
                    <select value={exportCategory} onChange={(e) => setExportCategory(e.target.value)} className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm">
                      <option value="">All Categories</option>
                      {categories.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="block text-xs font-bold text-[#C62828]">
                      From Date:
                      <input type="date" value={exportStartDate} onChange={(e) => setExportStartDate(e.target.value)} className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-xs" />
                    </label>
                    <label className="block text-xs font-bold text-[#C62828]">
                      To Date:
                      <input type="date" value={exportEndDate} onChange={(e) => setExportEndDate(e.target.value)} className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-xs" />
                    </label>
                  </div>

                  <label className="inline-flex items-center gap-2 text-xs font-bold text-[#C62828] cursor-pointer pt-2">
                    <input type="checkbox" checked={exportActiveOnly} onChange={(e) => setExportActiveOnly(e.target.checked)} className="rounded" />
                    Active/Published items only
                  </label>
                </div>

                <button onClick={submitExport} className="w-full mt-4 bg-[#C62828] text-white rounded-lg px-4 py-2.5 text-xs font-black uppercase hover:bg-[#C62828]/85 transition">
                  Export Catalogue
                </button>
              </div>

              {/* Import Panel */}
              <div className="space-y-4 rounded-xl border border-[#F5C2C2] p-5 bg-[#FAF9F6]/70">
                <h3 className="text-sm font-black uppercase tracking-widest text-[#D32F2F] flex items-center gap-2">
                  <Upload className="h-4.5 w-4.5 text-[#D32F2F]" /> Bulk Import Spreadsheet
                </h3>
                <p className="text-xs text-[#6B6B63]">Upload CSV or XLSX templates to create or update catalogue records in bulk.</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#C62828]">1. Download Blank Templates:</span>
                    <select onChange={(e) => { if (e.target.value) window.open(`/api/admin/catalog/import?template=${e.target.value}`); }} className="rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-2 py-1 text-xs font-bold text-[#C62828]">
                      <option value="">Download Template...</option>
                      <option value="products">Products Template</option>
                      <option value="brands">Brands Template</option>
                      <option value="categories">Categories Template</option>
                      <option value="subcategories">Subcategories Template</option>
                    </select>
                  </div>

                  <label className="block text-xs font-bold text-[#C62828]">
                    2. Import Target Entity:
                    <select value={importingType} onChange={(e) => { setImportingType(e.target.value); setImportPreview([]); setImportFile(null); }} className="mt-1.5 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm">
                      <option value="products">Products</option>
                      <option value="brands">Brands</option>
                      <option value="categories">Categories</option>
                      <option value="subcategories">Subcategories</option>
                    </select>
                  </label>

                  <div className="border border-dashed border-[#CFC5B7] rounded-lg p-4 bg-[#FFFDF8] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#FAF9F6] transition relative">
                    <UploadCloud className="h-6 w-6 text-[#9A9387] mb-2" />
                    <span className="text-xs font-bold text-[#2B2B2B]">{importFile ? importFile.name : "Select Spreadsheet File"}</span>
                    <span className="text-[10px] text-[#9A9387] mt-1">Supports CSV, XLSX. Max 5MB.</span>
                    <input ref={importFileInputRef} type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleImportFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>

                {importFile && (
                  <button onClick={submitImport} disabled={importLoading} className="w-full mt-4 bg-[#D32F2F] text-white rounded-lg px-4 py-2.5 text-xs font-black uppercase hover:bg-[#C62828] transition disabled:opacity-50">
                    {importLoading ? "Uploading & Importing..." : "Confirm & Import into MongoDB"}
                  </button>
                )}
              </div>

            </div>

            {/* Import results summary */}
            {importSummary && (
              <div className="rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-5 text-left space-y-3 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2B2B] flex items-center gap-1.5"><Check className="h-4 w-4 text-[#D32F2F]" /> Import Summary</h4>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="rounded-lg bg-[#FDECEC] p-3"><span className="block text-lg font-black text-[#D32F2F]">{importSummary.created}</span><span className="text-[10px] uppercase font-bold text-[#6B6B63]">Created</span></div>
                  <div className="rounded-lg bg-[#FDECEC]/80 p-3"><span className="block text-lg font-black text-[#C62828]">{importSummary.updated}</span><span className="text-[10px] uppercase font-bold text-[#6B6B63]">Updated</span></div>
                  <div className="rounded-lg bg-[#F8F7F3] p-3"><span className="block text-lg font-black text-[#5F6752]">{importSummary.skipped}</span><span className="text-[10px] uppercase font-bold text-[#6B6B63]">Skipped</span></div>
                  <div className="rounded-lg bg-[#F3E7D7] p-3"><span className="block text-lg font-black text-[#8A4B22]">{importSummary.failed}</span><span className="text-[10px] uppercase font-bold text-[#6B6B63]">Failed</span></div>
                </div>

                {importErrors.length > 0 && (
                  <div className="rounded-lg bg-[#F3E7D7] border border-[#EAD7C8] p-3.5 space-y-1.5 text-xs text-[#8A4B22] font-semibold max-h-40 overflow-y-auto">
                    <div className="font-bold text-[#7F1D1D]">Validation Failures / Alerts:</div>
                    {importErrors.map((err, i) => <div key={i}>&bull; {err}</div>)}
                  </div>
                )}
              </div>
            )}

            {/* Spreadsheet row preview */}
            {importPreview.length > 0 && !importSummary && (
              <div className="rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-4 text-left shadow-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B63]">Previewing Spreadsheet Rows ({importPreview.length}):</span>
                <div className="max-h-56 overflow-auto border border-[#E5DED2] rounded-lg">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F6] font-bold border-b border-[#F5C2C2]">
                      <tr>
                        {Object.keys(importPreview[0] || {}).slice(0, 6).map((k) => <th key={k} className="px-3 py-2 border-r border-[#F5C2C2]">{k}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E1D5] text-[#5F6752] font-mono">
                      {importPreview.slice(0, 10).map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).slice(0, 6).map((v: any, j) => <td key={j} className="px-3 py-2 border-r border-[#E9E1D5] truncate max-w-[120px]">{String(v)}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {importPreview.length > 10 && <div className="text-center text-[10px] text-[#9A9387] font-bold p-2 bg-[#FAF9F6] border-t border-[#E5DED2]">And {importPreview.length - 10} more rows...</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Creation / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#E9E1D5] pb-3">
              <h2 className="text-xl font-black">{editingId ? "Edit Product Record" : "Add Product to Catalogue"}</h2>
              <button onClick={handleCancelOrClose} className="rounded-md p-1.5 hover:bg-[#F8F7F3]"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={saveProduct} className="grid gap-4 md:grid-cols-2 text-left">
              
              {/* Product title and slug are auto-generated internally in B2B catalogue mode */}

              <label className="block text-sm font-bold text-[#C62828]">
                Category
                <select required value={form.category} onChange={(e) => updateForm("category", e.target.value)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]">
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-[#C62828]">
                Subcategory
                <select required value={form.subcategory} onChange={(e) => updateForm("subcategory", e.target.value)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]">
                  <option value="">Select Subcategory</option>
                  {subcategories
                    .filter((sub: any) => !form.category || sub.category === form.category)
                    .filter((sub: any) => sub.slug !== "retailer-kits" || form.subcategory === "retailer-kits")
                    .map((s) => (
                      <option key={s.slug} value={s.slug}>{s.name}</option>
                    ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-[#C62828]">
                Brand Partner
                <select value={form.brand} onChange={(e) => updateForm("brand", e.target.value)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]">
                  <option value="">Select Brand (Optional)</option>
                  <option value="PacMyProduct">PacMyProduct (Own)</option>
                  {brands.map((b) => (
                    <option key={b.slug} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-[#C62828]">
                Display Name
                <input required type="text" value={(form as any).displayName || ""} onChange={(e) => updateForm("displayName", e.target.value)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-[#2B2B2B] text-sm outline-none focus:border-[#D32F2F]" placeholder="Customer Facing Product Name" />
              </label>

              <label className="block text-sm font-bold text-[#C62828]">
                Budget Range (Optional)
                <select value={(form as any).budget || ""} onChange={(e) => updateForm("budget", e.target.value)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]">
                  <option value="">Select Budget Range</option>
                  <option value="₹0–250">₹0–250</option>
                  <option value="₹250–500">₹250–500</option>
                  <option value="₹500–1000">₹500–1000</option>
                  <option value="₹1000–2500">₹1000–2500</option>
                  <option value="₹2500–5000">₹2500–5000</option>
                  <option value="₹5000+">₹5000+</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="block text-sm font-bold text-[#C62828]">
                  MOQ (Units)
                  <input required type="number" value={form.moq} onChange={(e) => updateForm("moq", Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]" />
                </label>
                <label className="block text-sm font-bold text-[#C62828]">
                  Base Price (₹)
                  <input required type="number" value={form.price} onChange={(e) => updateForm("price", Number(e.target.value) || 0)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]" />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-[#C62828]">
                  Description
                  <textarea value={form.description} onChange={(e) => updateForm("description", e.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F]" />
                </label>
              </div>

              {/* Dynamic Metadata & Branding Capabilities Section */}
              <div className="md:col-span-2 border-t border-b border-[#E9E1D5] py-4 my-2 space-y-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#D32F2F]">
                      Dynamic Product Overview & Branding Capabilities
                    </h3>
                    <p className="text-[11px] text-[#6B6B63]">
                      If left empty, system automatically resolves category defaults at runtime.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLoadCategoryDefaults}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-1.5 text-xs font-bold text-[#C62828] hover:bg-[#FAF9F6] shadow-sm transition"
                  >
                    Load Category Defaults
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#C62828] uppercase tracking-wider">
                    Product Overview (Custom Override)
                  </label>
                  <textarea
                    value={form.overview}
                    onChange={(e) => updateForm("overview", e.target.value)}
                    rows={4}
                    placeholder="Enter custom Overview (or leave blank to inherit category defaults). Supports paragraphs, bullet points (• or -), and line breaks."
                    className="w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-sm outline-none focus:border-[#D32F2F] leading-relaxed font-sans"
                  />
                </div>

                {/* Branding Capabilities Controls */}
                <div className="space-y-3 border-t border-[#E9E1D5] pt-3">
                  <div className="flex items-center justify-between">
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-[#C62828] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.showBrandingCapabilities !== false}
                        onChange={(e) => updateForm("showBrandingCapabilities", e.target.checked)}
                        className="rounded accent-[#D32F2F] h-4 w-4"
                      />
                      Show Branding Capabilities
                    </label>

                    {form.showBrandingCapabilities !== false && (
                      <button
                        type="button"
                        onClick={handleLoadCategoryDefaults}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-1 text-xs font-bold text-[#C62828] hover:bg-[#FAF9F6] shadow-sm transition"
                      >
                        Load Category Defaults
                      </button>
                    )}
                  </div>

                  {form.showBrandingCapabilities !== false ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newBrandingTag}
                          onChange={(e) => setNewBrandingTag(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddBrandingTag();
                            }
                          }}
                          placeholder="Type branding method (e.g. Screen Printing, Laser Engraving) & press Enter"
                          className="flex-1 rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2 text-xs outline-none focus:border-[#D32F2F]"
                        />
                        <button
                          type="button"
                          onClick={handleAddBrandingTag}
                          className="rounded-lg bg-[#C62828] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#D32F2F]"
                        >
                          Add Chip
                        </button>
                      </div>

                      {form.brandingCapabilities && form.brandingCapabilities.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {form.brandingCapabilities.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#F5C2C2] text-xs font-bold text-[#6B6B63]"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveBrandingTag(tag)}
                                className="hover:text-[#D32F2F] text-gray-400 p-0.5 rounded-full"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-[#6B6B63] bg-[#FAF9F6] p-3 rounded-lg border border-[#F5C2C2]/70 italic">
                      Branding Capabilities are disabled for this product.
                    </div>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 pt-6 text-sm font-bold text-[#C62828] cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => updateForm("featured", e.target.checked)} />
                Featured Item (Homepage Showcase)
              </label>

              <label className="block text-sm font-bold text-[#C62828]">
                Publish Status
                <select value={form.status} onChange={(e) => updateForm("status", e.target.value)} className="mt-2 w-full rounded-lg border border-[#F5C2C2] bg-[#FFFDF8] px-3 py-2.5 text-sm outline-none focus:border-[#D32F2F]">
                  <option value="PUBLISHED">Published</option>
                  <option value="HIDDEN">Hidden/Draft</option>
                </select>
              </label>

              {/* 5. Centralized Reusable Image Upload System */}
              <div className="md:col-span-2 border-t border-[#E9E1D5] pt-4 space-y-6">
                <ImageUploader
                  label="Featured Image"
                  value={form.featuredImage}
                  publicIds={form.cloudinaryPublicId}
                  multiple={false}
                  folder="pacmyproduct/products"
                  disabled={saving}
                  onUploadStart={() => setFeaturedUploading(true)}
                  onUploadEnd={() => setFeaturedUploading(false)}
                  onChange={(url, id) => {
                    setForm((prev) => ({
                      ...prev,
                      featuredImage: url as string,
                      cloudinaryPublicId: id as string,
                    }));
                    if (id) {
                      setUploadedPublicIdsInSession((prev) => {
                        const combined = new Set([...prev, id as string]);
                        return Array.from(combined);
                      });
                    }
                  }}
                />

                <ImageUploader
                  label="Gallery Images"
                  value={form.galleryImages}
                  publicIds={form.galleryPublicIds}
                  multiple={true}
                  folder="pacmyproduct/products"
                  disabled={saving}
                  onUploadStart={() => setGalleryUploading(true)}
                  onUploadEnd={() => setGalleryUploading(false)}
                  onChange={(urls, ids) => {
                    setForm((prev) => ({
                      ...prev,
                      galleryImages: urls as string[],
                      galleryPublicIds: ids as string[],
                    }));
                    // Accumulate any new public IDs uploaded in this session
                    const newIds = (ids as string[]).filter(
                      (id) => !initialPublicIds.includes(id)
                    );
                    setUploadedPublicIdsInSession((prev) => {
                      const combined = new Set([...prev, ...newIds]);
                      return Array.from(combined);
                    });
                  }}
                />
              </div>

              {/* Status errors & success displays */}
              {(uploadError || uploadSuccess) && (
                <div className={`md:col-span-2 rounded-lg px-3 py-2 text-xs font-bold ${uploadError ? "bg-[#F3E7D7] text-[#8A4B22]" : "bg-[#FDECEC] text-[#D32F2F]"}`}>
                  {uploadError || uploadSuccess}
                </div>
              )}

              {/* Footer action buttons */}
              <div className="md:col-span-2 flex justify-end gap-3 border-t border-[#E9E1D5] pt-4">
                <button type="button" onClick={handleCancelOrClose} className="rounded-lg border border-[#F5C2C2] px-4 py-2 text-sm font-bold text-[#C62828] hover:bg-[#FAF9F6]">Cancel</button>
                <button disabled={saving || isUploading} type="submit" className="rounded-lg bg-[#D32F2F] px-5 py-2 text-sm font-black text-white hover:bg-[#C62828] disabled:opacity-60 flex items-center gap-1.5 uppercase tracking-wide">
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    editingId ? "Save Product" : "Create Product"
                  )}
                </button>
              </div>


            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B2B2B]/45 p-4">
          <div className="w-full max-w-md rounded-xl border border-[#F5C2C2] bg-[#FFFDF8] p-6 text-[#2B2B2B] shadow-2xl text-left">
            <h2 className="text-lg font-black text-[#2B2B2B]">Archive catalogue item?</h2>
            <p className="mt-2 text-sm text-[#6B6B63]">
              Are you sure you want to delete <strong>{cleanProductTitle(deleteTarget.title)}</strong>? It will be moved to the Trash Bin and hidden from the store.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-lg border border-[#F5C2C2] px-4 py-2 text-sm font-bold text-[#C62828] hover:bg-[#FAF9F6]">Cancel</button>
              <button onClick={deleteProduct} className="rounded-lg bg-[#8A6A3B] px-4 py-2 text-sm font-black text-white hover:bg-[#6E5330]">Confirm Archive</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

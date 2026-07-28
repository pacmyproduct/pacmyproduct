import mongoose, { Schema } from "mongoose";

const timestamps = { timestamps: true };

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"], default: "VIEWER" },
    active: { type: Boolean, default: true },
    lastLogin: Date,
  },
  timestamps
);

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    parentGroup: { type: String, index: true },
    description: String,
    image: String,
    cloudinaryPublicId: String,
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: Date,
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  timestamps
);
CategorySchema.index({ isDeleted: 1, order: 1, name: 1 });
CategorySchema.index({ active: 1, isDeleted: 1, order: 1, name: 1 });
CategorySchema.index({ isDeleted: 1, deletedAt: -1 });

const SubcategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", index: true },
    category: { type: String, required: true, index: true },
    parentGroup: { type: String, index: true },
    description: String,
    image: String,
    featuredImage: String,
    cloudinaryPublicId: String,
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: Date,
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  timestamps
);
SubcategorySchema.index({ category: 1, isDeleted: 1, order: 1, name: 1 });
SubcategorySchema.index({ active: 1, isDeleted: 1, order: 1, name: 1 });
SubcategorySchema.index({ parentGroup: 1, isDeleted: 1, order: 1 });
SubcategorySchema.index({ isDeleted: 1, deletedAt: -1 });

const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: String,
    cloudinaryPublicId: String,
    industry: String,
    category: String,
    description: String,
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: Date,
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  timestamps
);
BrandSchema.index({ active: 1, isDeleted: 1, order: 1, name: 1 });
BrandSchema.index({ category: 1, isDeleted: 1, order: 1 });
BrandSchema.index({ industry: 1, isDeleted: 1, order: 1 });
BrandSchema.index({ isDeleted: 1, deletedAt: -1 });

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    title: String,
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    shortDescription: String,
    overview: { type: String, default: "" },
    brandingCapabilities: { type: [String], default: [] },
    showBrandingCapabilities: { type: Boolean, default: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", index: true },
    subCategoryId: { type: Schema.Types.ObjectId, ref: "Subcategory", index: true },
    brandId: { type: Schema.Types.ObjectId, ref: "Brand", index: true },
    category: { type: String, index: true },
    subcategory: { type: String, index: true },
    brand: String,
    featuredImage: String,
    galleryImages: [String],
    cloudinaryPublicId: String,
    galleryPublicIds: [String],
    images: [String],
    features: [String],
    specifications: { type: Map, of: String },
    tags: [String],
    moq: Number,
    price: Number,
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["DRAFT", "PUBLISHED", "HIDDEN"], default: "PUBLISHED", index: true },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: Date,
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    order: { type: Number, default: 0 },
  },
  timestamps
);
ProductSchema.index({ status: 1, isDeleted: 1, order: 1, createdAt: -1 });
ProductSchema.index({ category: 1, status: 1, isDeleted: 1, order: 1 });
ProductSchema.index({ subcategory: 1, status: 1, isDeleted: 1, order: 1 });
ProductSchema.index({ brand: 1, status: 1, isDeleted: 1, order: 1 });
ProductSchema.index({ featured: 1, status: 1, isDeleted: 1, createdAt: -1 });
ProductSchema.index({ isDeleted: 1, createdAt: -1 });
ProductSchema.index({ isDeleted: 1, deletedAt: -1 });
ProductSchema.index({ title: "text", name: "text", slug: "text", brand: "text", description: "text" });

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: String,
    company: String,
    customer: String,
    products: [String],
    amount: Number,
    total: Number,
    notes: String,
    status: { type: String, enum: ["NEW", "QUOTATION_SENT", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"], default: "NEW" },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: Date,
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  timestamps
);
OrderSchema.index({ status: 1, isDeleted: 1, createdAt: -1 });
OrderSchema.index({ isDeleted: 1, createdAt: -1 });
OrderSchema.index({ isDeleted: 1, deletedAt: -1 });

const QuoteSchema = new Schema(
  {
    customerName: { type: String, required: true },
    name: String,
    email: { type: String, required: true, index: true },
    phone: String,
    company: String,
    city: String,
    products: [String],
    product: String,
    quantity: String,
    message: String,
    status: { type: String, enum: ["NEW", "CONTACTED", "QUOTATION_SENT", "WON", "LOST"], default: "NEW" },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: Date,
    deletedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  timestamps
);
QuoteSchema.index({ status: 1, isDeleted: 1, createdAt: -1 });
QuoteSchema.index({ isDeleted: 1, createdAt: -1 });
QuoteSchema.index({ isDeleted: 1, deletedAt: -1 });

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: String,
    company: String,
    source: { type: String, index: true },
    subject: String,
    message: String,
    status: { type: String, enum: ["NEW", "READ", "REPLIED", "ARCHIVED"], default: "NEW" },
  },
  timestamps
);

const EmailLogSchema = new Schema(
  {
    type: { type: String, required: true, index: true },
    recipient: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ["QUEUED", "SENT", "FAILED", "MOCKED"], required: true },
    providerMessageId: String,
    provider: String,
    sentAt: Date,
    error: String,
  },
  timestamps
);

const ActivityLogSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Admin", index: true },
    userName: String,
    action: { type: String, required: true, index: true },
    entityType: { type: String, index: true },
    entityId: { type: String, index: true },
    entityName: String,
    oldValue: Schema.Types.Mixed,
    newValue: Schema.Types.Mixed,
    ipAddress: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ action: 1, createdAt: -1 });
ActivityLogSchema.index({ entityType: 1, createdAt: -1 });
ActivityLogSchema.index({ userName: 1, createdAt: -1 });

export const AdminModel = mongoose.models.Admin || mongoose.model("Admin", AdminSchema, "admins");
export const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema, "categories");
export const SubcategoryModel = mongoose.models.Subcategory || mongoose.model("Subcategory", SubcategorySchema, "subcategories");
export const BrandModel = mongoose.models.Brand || mongoose.model("Brand", BrandSchema, "brands");
export const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");
export const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema, "orders");
export const QuoteModel = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema, "quotes");
export const EnquiryModel = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema, "enquiries");
export const EmailLogModel = mongoose.models.EmailLog || mongoose.model("EmailLog", EmailLogSchema, "email_logs");
export const ActivityLogModel = mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema, "activity_logs");

const BudgetCollectionSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    value: { type: String, required: true },
    description: String,
    image: String,
    bannerImage: String,
    subtitle: String,
    buttonText: String,
    displayOrder: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true },
    publicId: String,
    bannerPublicId: String,
    images: Schema.Types.Mixed,
    collectionImages: Schema.Types.Mixed,
    products: Schema.Types.Mixed,
  },
  timestamps
);

export const BudgetCollectionModel = mongoose.models.BudgetCollection || mongoose.model("BudgetCollection", BudgetCollectionSchema, "budget_collections");


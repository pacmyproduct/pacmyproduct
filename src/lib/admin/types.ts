export const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const ORDER_STATUSES = [
  "NEW",
  "QUOTATION_SENT",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const QUOTE_STATUSES = ["NEW", "CONTACTED", "QUOTATION_SENT", "WON", "LOST"] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const ENQUIRY_STATUSES = ["NEW", "READ", "REPLIED", "ARCHIVED"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export type EmailStatus = "QUEUED" | "SENT" | "FAILED" | "MOCKED";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  active: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface ProductRecord {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  overview?: string;
  brandingCapabilities?: string[];
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
  features: string[];
  specifications: Record<string, string>;
  tags: string[];
  moq: number;
  price?: number;
  featured: boolean;
  active: boolean;
  status?: "DRAFT" | "PUBLISHED" | "HIDDEN";
  order?: number;
  budget?: string;
  displayName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryRecord {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentGroup?: string;
  image?: string;
  cloudinaryPublicId?: string;
  order?: number;
  active: boolean;
  createdAt: string;
}

export interface SubcategoryRecord {
  id: string;
  name: string;
  slug: string;
  categoryId?: string;
  category: string;
  parentGroup: string;
  description?: string;
  image: string;
  featuredImage?: string;
  cloudinaryPublicId?: string;
  order?: number;
  active: boolean;
  createdAt: string;
}

export interface BrandRecord {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  cloudinaryPublicId?: string;
  industry?: string;
  category?: string;
  description?: string;
  order?: number;
  active: boolean;
  createdAt: string;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  products: string[];
  total?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteRecord {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  company: string;
  city?: string;
  products: string[];
  quantity: string;
  message?: string;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface EmailLogRecord {
  id: string;
  type: string;
  recipient: string;
  subject: string;
  status: EmailStatus;
  providerMessageId?: string;
  error?: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  totalProducts: number;
  totalCategories: number;
  totalSubcategories: number;
  totalOrders: number;
  totalQuotes: number;
  totalEnquiries: number;
  totalBrands: number;
  dailyQuotes: Array<{ date: string; quotes: number }>;
  monthlyOrders: Array<{ month: string; orders: number }>;
  enquiriesByCategory: Array<{ category: string; enquiries: number }>;
  topCategories: Array<{ category: string; requests: number }>;
  topProducts: Array<{ product: string; requests: number }>;
}

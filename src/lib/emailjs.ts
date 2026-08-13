export interface EmailJSBasePayload {
  source: "Corporate Quote Popup" | "Contact Form" | "Product Quote";
  customer_name: string;
  company_name: string;
  customer_email: string;
  phone: string;
  product_name?: string;
  category?: string;
  subcategory?: string;
  quantity?: string;
  budget?: string;
  packaging?: string;
  delivery_address?: string;
  delivery_timeline?: string;
  requirements?: string;
}

export interface CorporateQuotePayload {
  customer_name: string;
  company_name: string;
  customer_email: string;
  phone: string;
  quantity: string;
  requirements?: string;
}

export interface ContactFormPayload {
  customer_name: string;
  company_name: string;
  customer_email: string;
  phone: string;
  requirements?: string;
}

export interface ProductQuotePayload {
  customer_name: string;
  company_name: string;
  customer_email: string;
  phone: string;
  product_name?: string;
  category?: string;
  subcategory?: string;
  quantity?: string;
  budget?: string;
  packaging?: string;
  delivery_address?: string;
  delivery_timeline?: string;
  requirements?: string;
}

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_pacmyproduct";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xxvcq1u";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY";

export async function sendUniversalEmailJS(payload: EmailJSBasePayload): Promise<{ success: boolean; message?: string }> {
  try {
    const templateParams = {
      source: payload.source || "",
      customer_name: payload.customer_name || "",
      company_name: payload.company_name || "",
      customer_email: payload.customer_email || "",
      phone: payload.phone || "",
      product_name: payload.product_name || "",
      category: payload.category || "",
      subcategory: payload.subcategory || "",
      quantity: payload.quantity || "",
      budget: payload.budget || "",
      packaging: payload.packaging || "",
      delivery_address: payload.delivery_address || "",
      delivery_timeline: payload.delivery_timeline || "",
      requirements: payload.requirements || "",
    };

    const requestBody = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: templateParams,
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      return { success: true };
    }

    const errorText = await response.text();
    console.error("[EmailJS Error]:", errorText);
    return { success: false, message: errorText || "Failed to send email via EmailJS" };
  } catch (error: any) {
    console.error("[EmailJS Exception]:", error);
    return { success: false, message: error?.message || "An unexpected error occurred sending email" };
  }
}

export async function sendCorporateQuoteEmail(data: CorporateQuotePayload) {
  return sendUniversalEmailJS({
    source: "Corporate Quote Popup",
    customer_name: data.customer_name,
    company_name: data.company_name,
    customer_email: data.customer_email,
    phone: data.phone,
    quantity: data.quantity,
    requirements: data.requirements || "",
  });
}

export async function sendContactEmail(data: ContactFormPayload) {
  return sendUniversalEmailJS({
    source: "Contact Form",
    customer_name: data.customer_name,
    company_name: data.company_name,
    customer_email: data.customer_email,
    phone: data.phone,
    requirements: data.requirements || "",
  });
}

export async function sendProductQuoteEmail(data: ProductQuotePayload) {
  return sendUniversalEmailJS({
    source: "Product Quote",
    customer_name: data.customer_name,
    company_name: data.company_name,
    customer_email: data.customer_email,
    phone: data.phone,
    product_name: data.product_name || "",
    category: data.category || "",
    subcategory: data.subcategory || "",
    quantity: data.quantity || "",
    budget: data.budget || "",
    packaging: data.packaging || "",
    delivery_address: data.delivery_address || "",
    delivery_timeline: data.delivery_timeline || "",
    requirements: data.requirements || "",
  });
}

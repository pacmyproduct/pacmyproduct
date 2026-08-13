import { NextResponse } from "next/server";
import { createEnquiry } from "@/services/admin/enquiryService";
import { createQuote } from "@/services/admin/quoteService";

interface ShortlistItem {
  title?: string;
  price?: string;
}

interface EnquiryPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  budget?: string;
  deliveryLocation?: string;
  deliveryAddress?: string;
  source?: string;
  message?: string;
  shortlist?: ShortlistItem[];
}

function getRequestedProducts(payload: EnquiryPayload) {
  if (Array.isArray(payload.shortlist) && payload.shortlist.length > 0) {
    return payload.shortlist.map((item) => item.title).filter((title): title is string => Boolean(title));
  }
  return ["Custom quote request"];
}

function isQuoteRequest(payload: EnquiryPayload) {
  if (payload.source === "contact-form" || payload.source === "Contact Form" || payload.message?.includes("Quick Contact Form Inquiry")) {
    return false;
  }

  return Boolean(payload.quantity || payload.budget || payload.deliveryLocation || payload.deliveryAddress || payload.shortlist?.length);
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as EnquiryPayload;
    const { name, company, email, phone, quantity, deliveryLocation, deliveryAddress, message, source } = payload;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const products = getRequestedProducts(payload);
    const fullMessage = [
      message,
      payload.budget ? `Budget: ${payload.budget}` : "",
      deliveryAddress ? `Delivery Address: ${deliveryAddress}` : deliveryLocation ? `Delivery Protocol: ${deliveryLocation}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (isQuoteRequest(payload)) {
      const quote = await createQuote({
        customerName: name,
        email,
        phone,
        company: company || "Not provided",
        products,
        quantity: quantity || "Not specified",
        message: fullMessage,
      });

      return NextResponse.json({ success: true, message: "Quote request received successfully", data: { quoteId: quote.id } });
    }

    const enquiry = await createEnquiry({
      name,
      email,
      phone,
      company,
      source: source || "Contact Form",
      message: fullMessage || message,
    });

    return NextResponse.json({ success: true, message: "Enquiry received successfully", data: { enquiryId: enquiry.id } });
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}

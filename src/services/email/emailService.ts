import { AdminEnquiryAlertEmail } from "@/components/emails/AdminEnquiryAlertEmail";
import { AdminQuoteAlertEmail } from "@/components/emails/AdminQuoteAlertEmail";
import { ContactReceivedEmail } from "@/components/emails/ContactReceivedEmail";
import { OrderReceivedEmail } from "@/components/emails/OrderReceivedEmail";
import { QuoteReceivedEmail } from "@/components/emails/QuoteReceivedEmail";
import { emailConfig, resend } from "@/lib/resend";
import { logEmail } from "./emailLogService";

interface EmailSendInput {
  type: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

async function sendEmail(input: EmailSendInput) {
  if (!emailConfig.enabled) {
    return logEmail({ type: input.type, recipient: input.to, subject: input.subject, status: "MOCKED" });
  }

  try {
    const result = await resend.emails.send({
      from: emailConfig.from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
    });

    const isSuccess = !result.error && Boolean(result.data?.id);

    if (result.error) {
      console.error(`[Resend Error] ${input.type} to ${input.to}: ${result.error.message}`);
    }

    return logEmail({
      type: input.type,
      recipient: input.to,
      subject: input.subject,
      status: isSuccess ? "SENT" : "FAILED",
      providerMessageId: result.data?.id,
      error: result.error?.message,
    });
  } catch (error) {
    console.error(`[Resend Exception] ${input.type} to ${input.to}:`, error);
    return logEmail({
      type: input.type,
      recipient: input.to,
      subject: input.subject,
      status: "FAILED",
      error: error instanceof Error ? error.message : "Unknown email error",
    });
  }
}

export async function sendQuoteWorkflow(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product?: string;
  quantity?: string;
  message?: string;
}) {
  const submittedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  await Promise.all([
    sendEmail({
      type: "QUOTE_CUSTOMER_CONFIRMATION",
      to: input.email,
      subject: "Thank You For Your Quote Request - PacMyProduct",
      html: QuoteReceivedEmail({ ...input, submittedDate }),
    }),
    sendEmail({
      type: "QUOTE_ADMIN_ALERT",
      to: emailConfig.adminEmail,
      subject: "New Quote Request Received",
      html: AdminQuoteAlertEmail(input),
      replyTo: input.email,
    }),
  ]);
}

export async function sendContactWorkflow(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  message?: string;
}) {
  await Promise.all([
    sendEmail({
      type: "CONTACT_CUSTOMER_CONFIRMATION",
      to: input.email,
      subject: "We Have Received Your Message",
      html: ContactReceivedEmail(input),
    }),
    sendEmail({
      type: "ENQUIRY_ADMIN_ALERT",
      to: emailConfig.adminEmail,
      subject: "New Enquiry Received",
      html: AdminEnquiryAlertEmail(input),
      replyTo: input.email,
    }),
  ]);
}

export async function sendOrderWorkflow(input: { name: string; email: string; orderId: string; products: string[]; status: string }) {
  await Promise.all([
    sendEmail({
      type: "ORDER_CUSTOMER_CONFIRMATION",
      to: input.email,
      subject: "Order Received - PacMyProduct",
      html: OrderReceivedEmail(input),
    }),
    sendEmail({
      type: "ORDER_ADMIN_ALERT",
      to: emailConfig.adminEmail,
      subject: "New Order Created",
      html: OrderReceivedEmail(input),
      replyTo: input.email,
    }),
  ]);
}

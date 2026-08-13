import { createRecord, listRecords } from "@/repositories/adminRepository";
import type { EmailLogRecord, EmailStatus } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { EmailLogModel } from "@/models/cmsModels";

const mapEmailLog = (log: any): EmailLogRecord => ({
  id: String(log._id),
  type: log.type,
  recipient: log.recipient,
  subject: log.subject,
  status: log.status,
  providerMessageId: log.providerMessageId,
  error: log.error,
  createdAt: log.createdAt?.toISOString?.() || new Date().toISOString(),
});

export async function logEmail(input: {
  type: string;
  recipient: string;
  subject: string;
  status: EmailStatus;
  providerMessageId?: string;
  error?: string;
}) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const log = await EmailLogModel.create({
      ...input,
      provider: "system",
      sentAt: input.status === "SENT" ? new Date() : undefined,
    });
    return mapEmailLog(log.toObject());
  }
  return createRecord("email_logs", {
    ...input,
  });
}

export async function listEmailLogs(): Promise<EmailLogRecord[]> {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const logs = await EmailLogModel.find({}).sort({ createdAt: -1 }).lean<any[]>();
    return logs.map(mapEmailLog);
  }
  return listRecords("email_logs");
}

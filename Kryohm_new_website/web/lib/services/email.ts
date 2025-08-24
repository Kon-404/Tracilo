import { Resend } from "resend";
import type { LeadSubmission } from "../types";

export interface SendEmailResult {
  ok: boolean;
  id?: string;
}

function formatLeadEmail(subject: string, lead: LeadSubmission): { subject: string; html: string; text: string } {
  const lines = [
    `Form Type: ${lead.formType}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Company: ${lead.company}`,
    lead.phone ? `Phone: ${lead.phone}` : undefined,
    `Product Interest: ${lead.productInterest}`,
    lead.industry ? `Industry: ${lead.industry}` : undefined,
    lead.companySize ? `Company Size: ${lead.companySize}` : undefined,
    lead.timeline ? `Timeline: ${lead.timeline}` : undefined,
    lead.projectScope ? `Project Scope: ${lead.projectScope}` : undefined,
    lead.budget ? `Budget: ${lead.budget}` : undefined,
    lead.message ? `Message: ${lead.message}` : undefined,
    `Created At: ${lead.createdAt}`,
    `ID: ${lead.id}`,
  ].filter(Boolean) as string[];

  const text = lines.join("\n");
  const html = `<pre>${lines.map((l) => String(l)).join("<br/>")}</pre>`;
  return { subject, html, text };
}

export async function sendLeadEmail(lead: LeadSubmission): Promise<SendEmailResult> {
  const apiKey = process.env.EMAIL_SERVICE_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;
  if (!apiKey) throw new Error("EMAIL_SERVICE_API_KEY not set");
  if (!from) throw new Error("EMAIL_FROM not set");
  if (!to) throw new Error("EMAIL_TO not set");

  const subject = `[Kryohm Lead] ${lead.formType.toUpperCase()} – ${lead.productInterest} – ${lead.name}`;
  const { html, text } = formatLeadEmail(subject, lead);

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({ from, to, subject, html, text });
  return { ok: true, id: (result as any)?.data?.id ?? undefined };
}



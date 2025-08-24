import type { LeadSubmission } from "../types";

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function submitLead(lead: LeadSubmission) {
  const path = `/api/${lead.formType}`;
  return apiPost<{ ok: true }>(path, lead);
}



import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/services/email";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const leadSchema = z.object({
  id: z.string().min(1),
  formType: z.enum(["contact", "demo", "pricing"]),
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  phone: z.string().optional(),
  productInterest: z.enum(["Sensors", "Prepaid Metering", "Shower Control", "Platform"]),
  message: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  timeline: z.string().optional(),
  createdAt: z.string(),
});

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  try {
    const json = await request.json();
    const lead = leadSchema.parse(json);

    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await sendLeadEmail(lead);
        return NextResponse.json({ ok: true, requestId });
      } catch (err) {
        if (attempt === maxAttempts) throw err;
        await delay(250 * attempt);
      }
    }
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: { code: "INVALID_PAYLOAD", message: "Invalid form data", details: error.flatten?.(), requestId } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: { code: "EMAIL_SEND_FAILED", message: "Unable to send at this time", requestId } },
      { status: 502 }
    );
  }
}



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
  projectScope: z.string().optional(),
  budget: z.string().optional(),
  createdAt: z.string(),
});

export async function POST(request: Request): Promise<NextResponse> {
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
    
    // If we reach here, all attempts failed
    return NextResponse.json(
      { error: { code: "EMAIL_SEND_FAILED", message: "Failed after all retry attempts", requestId } },
      { status: 500 }
    );
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'name' in error && error.name === "ZodError") {
      return NextResponse.json(
        { error: { code: "INVALID_PAYLOAD", message: "Invalid form data", details: 'flatten' in error && typeof error.flatten === 'function' ? error.flatten() : undefined, requestId } },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: { code: "EMAIL_SEND_FAILED", message: "Unable to send at this time", requestId } },
      { status: 502 }
    );
  }
}



"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitLead } from "@/lib/services/forms";
import type { LeadSubmission } from "@/lib/types";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  productInterest: z.enum(["Sensors", "Prepaid Metering", "Shower Control", "Platform"]),
  message: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    const payload: LeadSubmission = {
      id: crypto.randomUUID(),
      formType: 'contact',
      createdAt: new Date().toISOString(),
      ...values,
    } as LeadSubmission;
    await submitLead(payload);
    reset();
    alert("Thanks! We'll be in touch.");
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full border rounded-md p-2" {...register("name")} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message as string}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded-md p-2" {...register("email")} />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message as string}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Company</label>
            <input className="w-full border rounded-md p-2" {...register("company")} />
            {errors.company && <p className="text-red-600 text-sm">{errors.company.message as string}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input className="w-full border rounded-md p-2" {...register("phone")} />
          </div>
          <div>
            <label className="block text-sm mb-1">Product Interest</label>
            <select className="w-full border rounded-md p-2" {...register("productInterest")}> 
              <option value="Sensors">Sensors</option>
              <option value="Prepaid Metering">Prepaid Metering</option>
              <option value="Shower Control">Shower Control</option>
              <option value="Platform">Platform</option>
            </select>
            {errors.productInterest && <p className="text-red-600 text-sm">Required</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea className="w-full border rounded-md p-2" rows={4} {...register("message")} />
          {errors.message && <p className="text-red-600 text-sm">{errors.message.message as string}</p>}
        </div>
        <button disabled={isSubmitting} className="px-4 py-2 rounded-md bg-[--color-brand-primary_teal] text-white">
          {isSubmitting ? 'Sending…' : 'Send'}
        </button>
      </form>
    </main>
  );
}



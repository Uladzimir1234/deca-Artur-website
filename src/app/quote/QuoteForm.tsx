"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useState, FormEvent } from "react";
import pageData from "@/data/pages/quote.json";

function QuoteFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const configRaw = searchParams.get("config") || "";

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  /* Parse config string: "[window] Profile System: GEALAN-LINEAR | Glazing: Triple" */
  let productType = "";
  const configItems: { step: string; value: string }[] = [];

  if (configRaw) {
    const bracketMatch = configRaw.match(/^\[([^\]]+)\]\s*/);
    if (bracketMatch) {
      productType = bracketMatch[1];
      const rest = configRaw.slice(bracketMatch[0].length);
      rest.split(" | ").forEach((part) => {
        const [step, ...valueParts] = part.split(": ");
        if (step && valueParts.length) {
          configItems.push({ step: step.trim(), value: valueParts.join(": ").trim() });
        }
      });
    }
  }

  const hasConfig = configItems.length > 0;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("firstName") as string,
      lastName: data.get("lastName") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      projectType: data.get("projectType") as string,
      message: data.get("message") as string,
      configuration: hasConfig ? configItems.map((i) => `${i.step}: ${i.value}`).join(", ") : "",
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit");
      router.push("/thank-you");
    } catch {
      setError(pageData.quoteForm.errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  const d = pageData;
  /* ══════ Form ══════ */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Form */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{d.quoteForm.heading}</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">
          {d.quoteForm.subheading}
        </p>

        {/* ── Configuration summary card ── */}
        {hasConfig && (
          <div className="mb-8 bg-brand/[0.03] border-2 border-brand/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h2 className="font-semibold text-text-primary text-sm">
                Your {productType.replace("-", " ")} Configuration
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {configItems.map((item) => (
                <span
                  key={item.step}
                  className="inline-flex items-center gap-1.5 text-[12px] bg-white px-3 py-1.5 rounded-lg border border-border"
                >
                  <span className="text-text-muted font-medium">{item.step}:</span>
                  <span className="text-text-primary font-semibold">{item.value}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium text-text-primary block mb-1.5">{d.quoteForm.formFields.firstName.label}</label>
              <input id="firstName" name="firstName" required className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:border-blue-accent focus:outline-none" />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium text-text-primary block mb-1.5">{d.quoteForm.formFields.lastName.label}</label>
              <input id="lastName" name="lastName" required className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:border-blue-accent focus:outline-none" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-primary block mb-1.5">{d.quoteForm.formFields.email.label}</label>
            <input id="email" name="email" type="email" required className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:border-blue-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-text-primary block mb-1.5">{d.quoteForm.formFields.phone.label}</label>
            <input id="phone" name="phone" type="tel" required className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:border-blue-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="projectType" className="text-sm font-medium text-text-primary block mb-1.5">{d.quoteForm.formFields.projectType.label}</label>
            <select id="projectType" name="projectType" className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:border-blue-accent focus:outline-none bg-white">
              {d.quoteForm.formFields.projectType.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-text-primary block mb-1.5">{d.quoteForm.formFields.message.label}</label>
            <textarea
              id="message"
              name="message"
              rows={d.quoteForm.formFields.message.rows}
              className="w-full border border-border rounded-md px-4 py-2.5 text-sm focus:border-blue-accent focus:outline-none"
              placeholder={d.quoteForm.formFields.message.placeholder}
              defaultValue={hasConfig ? `Configuration: ${configItems.map((i) => `${i.step}: ${i.value}`).join(", ")}` : ""}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-accent hover:bg-blue-hover disabled:bg-blue-accent/50 text-white py-3.5 rounded-md font-semibold transition-colors"
          >
            {submitting ? "Sending..." : d.quoteForm.submitText}
          </button>
          <p className="text-xs text-text-muted text-center">{d.quoteForm.privacyNote}</p>
        </form>
      </div>

      {/* Sidebar info */}
      <div className="space-y-6">
        <div className="bg-warm-gray rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-text-primary text-lg mb-4">{d.contactDetails.heading}</h3>
          <div className="space-y-3 text-sm text-text-secondary">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>{d.contactDetails.address}</p>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${d.contactDetails.phone.replace(/\D/g, '').slice(0, -1)}`} className="hover:text-blue-accent transition-colors">{d.contactDetails.phone}</a>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${d.contactDetails.email}`} className="hover:text-blue-accent transition-colors">{d.contactDetails.email}</a>
            </div>
          </div>
        </div>

        <div className="bg-blue-light rounded-xl p-6 border border-blue-accent/10">
          <h3 className="font-semibold text-text-primary text-lg mb-4">{d.processSection.heading}</h3>
          <div className="space-y-4">
            {d.processSection.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-accent text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <p className="text-sm text-text-secondary">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-warm-gray rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-text-primary text-lg mb-4">{d.guarantees.heading}</h3>
          <div className="space-y-3">
            {d.guarantees.items.map((g) => (
              <div key={g} className="flex items-center gap-2.5">
                <svg className="w-5 h-5 text-blue-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-text-secondary">{g}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Suspense boundary required for useSearchParams */
export default function QuoteForm() {
  return (
    <Suspense fallback={<div className="min-h-[400px]" />}>
      <QuoteFormInner />
    </Suspense>
  );
}

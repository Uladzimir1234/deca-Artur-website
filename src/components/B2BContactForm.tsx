"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface B2BContactFormProps {
  title: string;
  subtitle: string;
  buttonText: string;
  segment: string; // contractors | architects | dealers | commercial
  projectTypes?: string[];
}

export default function B2BContactForm({
  title,
  subtitle,
  buttonText,
  segment,
  projectTypes = ["New Construction", "Renovation", "Multi-family", "Mixed-Use"],
}: B2BContactFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("contactName") as string,
      lastName: "",
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      projectType: `B2B-${segment}: ${data.get("projectType") as string}`,
      message: `Company: ${data.get("companyName")}\n${data.get("details")}`,
      configuration: "",
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer = (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer || [];
      (window as unknown as { dataLayer: Record<string, string>[] }).dataLayer.push({ event: 'form_submit_success', form_name: `b2b_${segment}_form` });
      router.push("/thank-you");
    } catch {
      setError("Something went wrong. Please call (413) 771-4457 or try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact-form" className="bg-brand text-white py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-white/60 text-lg mb-10">{subtitle}</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              { label: "Company Name", name: "companyName", type: "text" },
              { label: "Your Name", name: "contactName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "tel" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={`b2b-${field.name}`} className="text-xs text-white/50 block mb-1.5">{field.label} *</label>
                <input
                  id={`b2b-${field.name}`}
                  name={field.name}
                  type={field.type}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-blue-accent focus:outline-none"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label htmlFor="b2b-projectType" className="text-xs text-white/50 block mb-1.5">Project Type</label>
              <select
                id="b2b-projectType"
                name="projectType"
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white focus:border-blue-accent focus:outline-none"
              >
                {projectTypes.map((pt) => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="b2b-details" className="text-xs text-white/50 block mb-1.5">Project Details (approx. quantities, sizes, timeline)</label>
              <textarea
                id="b2b-details"
                name="details"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-blue-accent focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400/30 text-white rounded-lg px-4 py-3 text-sm mt-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-accent hover:bg-blue-hover disabled:bg-blue-accent/50 text-white px-8 py-3.5 rounded-md font-semibold mt-8 transition-colors"
          >
            {submitting ? "Sending..." : buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

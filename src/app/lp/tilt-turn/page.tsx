"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const PHONE = "(413) 771-4457";

export default function TiltTurnLP() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    projectType: "residential",
    windows: "1-5",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: "",
          email: formData.email,
          phone: formData.phone,
          projectType: `LP-tilt-turn: ${formData.projectType} (${formData.windows} windows)`,
          message: `ZIP: ${formData.zip}\n${formData.message}`,
          configuration: "",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      router.push("/thank-you");
    } catch {
      alert("Something went wrong. Please call (413) 771-4457.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-brand text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xl font-bold tracking-tight">DECA</span>
          <a href={`tel:${PHONE.replace(/[^\d+]/g, "")}`} className="text-sm font-medium hover:text-blue-300">
            {PHONE}
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand to-brand-light text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-600/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Made in Massachusetts
            </div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              European Tilt & Turn Windows
              <span className="text-accent"> at Factory-Direct Prices</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Premium European engineering, manufactured in Westfield, MA. Up to 72% energy savings
              with the best U-value in the industry (0.10 W/m²K).
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {["U-Value 0.10", "45-50 dB Noise Block", "140 mph Wind Rated", "15-Year Warranty"].map((badge) => (
                <span key={badge} className="bg-white/10 px-3 py-1.5 rounded text-sm font-medium">
                  ✓ {badge}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href="#quote-form"
                className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Get Free Quote
              </a>
              <a
                href={`tel:${PHONE.replace(/[^\d+]/g, "")}`}
                className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl aspect-[4/3] flex items-center justify-center border border-white/10">
            <span className="text-gray-400 text-sm">Window Product Image</span>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-warm-gray py-6 px-4 border-y border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { num: "500+", label: "Homes Fitted" },
            { num: "0.10", label: "Best U-Value in USA" },
            { num: "15 yr", label: "Full Warranty" },
            { num: "4.9★", label: "Customer Rating" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-brand">{s.num}</div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-brand mb-12">
            Why Homeowners Choose DECA Tilt & Turn
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Two Modes, One Window",
                desc: "Tilt for secure ventilation. Turn for full opening and easy cleaning. European hardware rated for 60,000+ cycles.",
              },
              {
                title: "Slash Energy Bills by 72%",
                desc: "Triple-glazed units with argon fill and warm-edge spacers deliver the lowest U-value of any window made in America.",
              },
              {
                title: "Block 95% of Outside Noise",
                desc: "Multi-chamber profiles plus laminated glass options reduce noise by 45-50 dB — perfect near airports and highways.",
              },
              {
                title: "Hurricane-Grade Durability",
                desc: "Steel-reinforced frames rated for 140 mph winds. Multi-point locking on every sash for maximum security.",
              },
              {
                title: "Factory-Direct, No Middleman",
                desc: "Made in our Westfield, MA facility and delivered directly to your door. No dealer markup means better value.",
              },
              {
                title: "15-Year Transferable Warranty",
                desc: "Full coverage on frames, glass, and hardware. Transferable to new owners — adds value to your home.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-warm-gray rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-brand mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-warm-gray py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-brand mb-8">
            DECA vs. Standard American Windows
          </h2>
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">DECA Tilt & Turn</th>
                  <th className="text-center py-3 px-4">Standard Double-Hung</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["U-Value", "0.10 W/m²K", "0.30+ W/m²K"],
                  ["Glazing", "Triple (standard)", "Double"],
                  ["Noise Reduction", "45-50 dB", "25-30 dB"],
                  ["Opening Modes", "Tilt + Turn + Locked", "Up/Down only"],
                  ["Air Seal", "Multi-point compression", "Friction fit"],
                  ["Wind Rating", "140 mph", "80-100 mph"],
                  ["Security", "Multi-point locking", "Single latch"],
                  ["Cleaning", "Inward opening", "Tilt-in (limited)"],
                  ["Lifespan", "30-50 years", "15-25 years"],
                ].map(([feat, deca, std], i) => (
                  <tr key={feat} className={i % 2 === 0 ? "bg-white" : "bg-warm-gray"}>
                    <td className="py-3 px-4 font-medium text-brand">{feat}</td>
                    <td className="py-3 px-4 text-center text-green-700 font-semibold">{deca}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{std}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl italic text-gray-700 mb-4">
            &ldquo;Our heating bill dropped 68% the first winter after installing DECA tilt & turn windows.
            The noise from Route 9 is practically gone. Best home improvement we&apos;ve ever made.&rdquo;
          </p>
          <p className="font-semibold text-brand">— Sarah M., Northampton, MA</p>
          <div className="flex justify-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className="text-yellow-500 text-lg">★</span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="bg-brand py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Get Your Free Quote in 24 Hours
          </h2>
          <p className="text-gray-400 text-center mb-8">
            No obligation. No pressure. Just expert advice from a local manufacturer.
          </p>

            <form onSubmit={handleSubmit} className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  aria-label="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-accent"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  aria-label="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-accent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  aria-label="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-accent"
                />
                <input
                  type="text"
                  placeholder="ZIP Code *"
                  aria-label="ZIP Code"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-accent"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent"
                >
                  <option value="residential" className="text-black">Residential</option>
                  <option value="commercial" className="text-black">Commercial</option>
                  <option value="new-construction" className="text-black">New Construction</option>
                  <option value="replacement" className="text-black">Window Replacement</option>
                </select>
                <select
                  value={formData.windows}
                  onChange={(e) => setFormData({ ...formData, windows: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-accent"
                >
                  <option value="1-5" className="text-black">1-5 Windows</option>
                  <option value="6-10" className="text-black">6-10 Windows</option>
                  <option value="11-20" className="text-black">11-20 Windows</option>
                  <option value="20+" className="text-black">20+ Windows</option>
                </select>
              </div>
              <textarea
                placeholder="Tell us about your project (optional)"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent hover:bg-accent-hover disabled:opacity-50 text-white py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {submitting ? "Sending..." : "Get My Free Quote →"}
              </button>
              <p className="text-center text-gray-500 text-xs mt-2">
                🔒 Your information is secure and will never be shared with third parties.
              </p>
            </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-gray-400 py-8 px-4 text-center text-sm">
        <p>© 2025 DECA Windows & Doors. Manufactured in Westfield, Massachusetts.</p>
        <p className="mt-1">109 Apremont Way, Westfield, MA 01085 · {PHONE}</p>
      </footer>
    </div>
  );
}

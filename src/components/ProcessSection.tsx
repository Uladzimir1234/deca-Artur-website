"use client";

const steps = [
  {
    number: "01",
    title: "Design",
    description:
      "Share your project details and our team creates custom specifications tailored to your home.",
    /* Heroicons: pencil-square */
    icon: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
  },
  {
    number: "02",
    title: "Manufacture",
    description:
      "Every product is built to order at our Westfield, MA factory using European engineering standards.",
    /* Heroicons: cog-6-tooth */
    icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28zM15 12a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    number: "03",
    title: "Install",
    description:
      "Professional installation by our certified crew, or detailed guides for your contractor.",
    /* Heroicons: wrench-screwdriver */
    icon: "M11.42 15.17l-5.658-5.659a1.875 1.875 0 112.652-2.652l3.006 3.006 5.174-5.174a3 3 0 014.243 0 3 3 0 010 4.242l-5.174 5.174 3.006 3.006a1.875 1.875 0 11-2.652 2.652l-5.658-5.658a2.123 2.123 0 01-.068-.073M11.42 15.17l2.496-2.495m-3.565 4.562L7.854 19.73a2.25 2.25 0 01-3.182-3.182l2.497-2.497m7.263-7.263l2.497-2.497a2.25 2.25 0 013.182 3.182l-2.497 2.497",
  },
  {
    number: "04",
    title: "Service",
    description:
      "15-year warranty with free lifetime technical support. We're always a call away.",
    /* Heroicons: shield-check */
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand/70 bg-white/60 px-3 py-1.5 rounded-full border border-brand/20">
            Our Process
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
            From Concept to Comfort in 4 Steps
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our streamlined process ensures your custom windows and doors are
            designed, built, and installed with precision and care.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center">
              {/* Number + Icon */}
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-brand"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={step.icon}
                    />
                  </svg>
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                {step.description}
              </p>

              {/* Arrow connector (desktop) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 z-20">
                  <svg
                    className="w-8 h-8 text-brand/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              )}

              {/* Arrow connector (mobile) */}
              {idx < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-6">
                  <svg
                    className="w-6 h-6 text-brand/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-6">
            Ready to start your project?
          </p>
          <a
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Schedule a Consultation
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

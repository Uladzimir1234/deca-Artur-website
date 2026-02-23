"use client";

import { Section, SectionTitle } from "@/components/ui";

interface MaterialCard {
  name: string;
  image: string;
  description: string;
  features: string[];
}

interface MaterialsSectionProps {
  title?: string;
  subtitle?: string;
  materials?: MaterialCard[];
}

const defaultMaterials: MaterialCard[] = [
  {
    name: "uPVC",
    image: "/upvc.png",
    description:
      "Industry-leading GEALAN uPVC profiles with steel reinforcement. Exceptional thermal insulation, zero maintenance, and 50+ year lifespan. The most popular choice for energy-efficient homes.",
    features: [
      "Best thermal insulation",
      "Zero maintenance required",
      "50+ year lifespan",
      "Most affordable option",
    ],
  },
  {
    name: "Aluminium",
    image: "/aluminum.png",
    description:
      "Slim aluminium profiles with thermal break technology. Maximum glass area, modern aesthetics, and exceptional structural strength for large openings.",
    features: [
      "Slim sightlines, max glass",
      "Superior structural strength",
      "Modern contemporary look",
      "Ideal for large openings",
    ],
  },
];

export default function MaterialsSection({
  title = "Available Materials",
  subtitle = "Choose the material that matches your style, performance needs, and budget.",
  materials = defaultMaterials,
}: MaterialsSectionProps) {
  return (
    <Section gray>
      <SectionTitle badge="Materials" title={title} subtitle={subtitle} />
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {materials.map((m) => (
          <div
            key={m.name}
            className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-blue-accent/20 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-end justify-center">
              <img
                src={m.image}
                alt={`${m.name} door profile by DECA Windows`}
                className="w-full object-contain object-bottom max-h-full px-4 pt-4 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Material badge */}
              <span className="absolute top-4 left-4 bg-brand text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md">
                {m.name}
              </span>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-blue-accent transition-colors">
                {m.name} Doors
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {m.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {m.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-primary">
                    <svg
                      className="w-4 h-4 text-blue-accent shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

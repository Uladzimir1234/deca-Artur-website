import type { Metadata } from "next";
import { ConfiguratorContent } from "./configurator-content";

export const metadata: Metadata = {
  title: "Window & Door Configurator | Design Your DECA Window",
  description:
    "Design your custom European window or door. Choose product type, size, material, glazing, colors, and hardware — see real-time preview and pricing.",
  alternates: { canonical: "/configurator" },
};

export default function ConfiguratorPage() {
  return <ConfiguratorContent />;
}

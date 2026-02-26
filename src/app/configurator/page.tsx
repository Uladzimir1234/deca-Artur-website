import type { Metadata } from "next";
import { ConfiguratorContent } from "./configurator-content";
import pageData from "@/data/pages/configurator.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: pageData.meta.canonical },
};

export default function ConfiguratorPage() {
  return <ConfiguratorContent />;
}

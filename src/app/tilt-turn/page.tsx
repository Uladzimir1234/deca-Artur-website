import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumb, Section, SectionTitle, CTABlock, ServiceIcons, StatCard } from "@/components/ui";
import { WindowConfigurator } from "@/components/ProductConfigurator";
import VideoTabs from "@/components/VideoTabs";
import ComponentTabs from "@/components/ComponentTabs";
import GalleryLightbox from "@/components/GalleryLightbox";
import AnimatedStats from "@/components/AnimatedStats";
import PerformanceBars from "@/components/PerformanceBars";
import EnergySavingsCard from "@/components/EnergySavingsCard";
import GlazingComparison from "@/components/GlazingComparison";
import StickyCTA from "@/components/StickyCTA";
import DeliveryMap from "@/components/DeliveryMap";
import CTAWithDocs from "@/components/CTAWithDocs";
import pageData from "@/data/pages/tilt-turn.json";

export const metadata: Metadata = {
  title: pageData.meta.title,
  description: pageData.meta.description,
  alternates: { canonical: "/tilt-turn" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": pageData.faqSchema.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": { "@type": "Answer", "text": item.answer },
  })),
};

/* All images served from public/assets/ */
const a = "/assets";

/* ─── Icon map for benefit cards ─── */
const benefitIcons: Record<string, React.ReactNode> = {
  flame: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
  speaker: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>,
  lock: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
  currency: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  sparkles: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
  rocket: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>,
};

/* ─── Stats icons ─── */
const statIcons = [
  <svg key="s1" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" /></svg>,
  <svg key="s2" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>,
  <svg key="s3" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
  <svg key="s4" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
];

/* ─── VideoTab icons ─── */
const videoTabIcons = [
  <svg key="v1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  <svg key="v2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
  <svg key="v3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
];

/* ─── Performance icons ─── */
const perfIcons = [
  <svg key="p1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
  <svg key="p2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>,
  <svg key="p3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
  <svg key="p4" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
];

/* ─── ComponentTabs icons ─── */
const compIcons = [
  <svg key="c1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>,
  <svg key="c2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>,
  <svg key="c3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
  <svg key="c4" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" /></svg>,
  <svg key="c5" className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>,
];

/* ─── Delivery zone icons ─── */
const deliveryIcons = [
  <svg key="d1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>,
  <svg key="d2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21M3.375 14.25h3.86c.26 0 .515-.086.72-.24l3.3-2.48a1.125 1.125 0 0 1 1.38.06l2.24 2a1.126 1.126 0 0 0 .75.29H21" /></svg>,
  <svg key="d3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m-3.414 1.082A9 9 0 0 1 3.75 12c0-1.18.227-2.306.641-3.34" /></svg>,
];

/* ─── Comfort card colors ─── */
const comfortColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  red: {
    bg: "bg-red-50", text: "text-red-500",
    icon: <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" /></svg>,
  },
  blue: {
    bg: "bg-blue-50", text: "text-blue-500",
    icon: <svg className="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>,
  },
  green: {
    bg: "bg-green-50", text: "text-green-600",
    icon: <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
  },
};

export default function TiltTurnPage() {
  const d = pageData;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="hero-fullscreen flex flex-col">
        <Breadcrumb items={[{ label: "Windows", href: "/windows" }, { label: "Tilt & Turn Windows" }]} />

        {/* ═══════ HERO — Title + VideoTabs ═══════ */}
        <section className="bg-white flex-1 flex flex-col">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col">
            <div className="flex-[2]" />
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand mb-3">{d.hero.badge}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-5">{d.hero.heading}</h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">{d.hero.subheading}</p>
          </div>

          <VideoTabs
            tabs={d.hero.videoTabs.map((tab, i) => ({
              icon: videoTabIcons[i],
              title: tab.title,
              description: tab.description,
              video: tab.video,
            }))}
          />
            <div className="flex-[3]" />
          </div>
        </section>
      </div>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="bg-brand text-white py-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <AnimatedStats
            stats={d.stats.map((s, i) => ({
              value: s.value,
              label: s.label,
              decimals: s.decimals,
              suffix: s.suffix,
              icon: statIcons[i],
            }))}
          />
        </div>
      </section>

      {/* ═══════ WHAT DOES TILT & TURN MEAN? ═══════ */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionTitle badge={d.educational.badge} title={d.educational.title} subtitle="" />
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>{d.educational.intro}</p>
              <div className="space-y-3">
                {d.educational.modes.map((mode, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3l7.5 7.5m-15 0v9.75A.75.75 0 0 0 5.25 21h4.5V15h4.5v6h4.5a.75.75 0 0 0 .75-.75V10.5" />}
                        {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />}
                        {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />}
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{mode.title}</p>
                      <p className="text-sm">{mode.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-muted">{d.educational.footnote}</p>
            </div>
          </div>
          <div className="bg-warm-gray rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
            <div className="text-center text-text-muted">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" /></svg>
              <p className="text-sm font-medium">{d.educational.imagePlaceholder}</p>
              <p className="text-xs mt-1">Photo placeholder — add product diagram showing all 3 handle positions</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ BENEFITS ═══════ */}
      <Section gray>
        <SectionTitle badge={d.benefits.badge} title={d.benefits.title} subtitle={d.benefits.subtitle} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.benefits.items.map((b) => (
            <div key={b.title} className="bg-white rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-4">
                {benefitIcons[b.icon] || benefitIcons.flame}
              </div>
              <h3 className="font-semibold text-text-primary mb-2">{b.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════ CONFIGURATOR ═══════ */}
      <WindowConfigurator />

      {/* ═══════ PROFILE TECHNOLOGY ═══════ */}
      <Section gray>
        <SectionTitle badge={d.profileTechnology.badge} title={d.profileTechnology.title} subtitle={d.profileTechnology.subtitle} />
        <ComponentTabs
          items={d.profileTechnology.items.map((item, i) => ({
            icon: compIcons[i],
            title: item.title,
            description: item.description,
            image: item.image,
            alt: item.alt,
          }))}
        />
      </Section>

      {/* ═══════ TECHNICAL SPECS TABLE ═══════ */}
      <Section>
        <SectionTitle badge={d.specs.badge} title={d.specs.title} subtitle={d.specs.subtitle} />
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-border overflow-hidden">
          {d.specs.rows.map(([label, value], i) => (
            <div key={label} className={`flex justify-between px-6 py-4 border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-warm-gray" : "bg-white"}`}>
              <span className="text-sm font-medium text-text-secondary">{label}</span>
              <span className="text-sm text-text-primary font-semibold text-right">{value}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════ GLAZING ═══════ */}
      <Section>
        <SectionTitle badge={d.glazing.badge} title={d.glazing.title} subtitle={d.glazing.subtitle} />
        <GlazingComparison />
      </Section>

      {/* ═══════ 50+ FRAME COLORS & FINISHES ═══════ */}
      <Section gray>
        <SectionTitle badge={d.colors.badge} title={d.colors.title} subtitle={d.colors.subtitle} />
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">Popular Solid & Wood-Grain Finishes</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
              {d.colors.swatches.map((c) => (
                <div key={c.name} className="text-center group">
                  <div
                    className={`w-full aspect-square rounded-lg mb-2 shadow-sm group-hover:scale-105 transition-transform ${c.border ? "border border-border" : ""}`}
                    style={{ backgroundColor: c.color }}
                  />
                  <p className="text-[10px] text-text-muted leading-tight">{c.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6 flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm mb-1">{d.colors.dualColorTitle}</p>
              <p className="text-sm text-text-secondary">{d.colors.dualColorText}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ WINDOW GRIDS & PATTERNS ═══════ */}
      <Section>
        <SectionTitle badge={d.grids.badge} title={d.grids.title} subtitle={d.grids.subtitle} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {d.grids.patterns.map((g) => (
            <div key={g.name} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow group">
              <div className="bg-warm-gray flex items-center justify-center p-4 h-32">
                <div className="w-16 h-20 border-2 border-text-muted/30 rounded-sm relative">
                  {g.name === "Colonial" && (
                    <>
                      <div className="absolute inset-0 border-r border-text-muted/30" style={{ left: "50%" }} />
                      <div className="absolute inset-0 border-b border-text-muted/30" style={{ top: "50%" }} />
                    </>
                  )}
                  {g.name === "Prairie" && <div className="absolute border border-text-muted/30 inset-2 rounded-sm" />}
                  {g.name === "Heritage" && (
                    <>
                      <div className="absolute inset-0 border-b border-text-muted/30" style={{ top: "33%" }} />
                      <div className="absolute border-r border-text-muted/30" style={{ left: "50%", top: 0, bottom: "67%" }} />
                    </>
                  )}
                  {g.name === "Victorian" && (
                    <>
                      <div className="absolute inset-0 border-b border-text-muted/30" style={{ top: "30%" }} />
                      <div className="absolute border-r border-text-muted/30" style={{ left: "33%", top: 0, bottom: "70%" }} />
                      <div className="absolute border-r border-text-muted/30" style={{ left: "66%", top: 0, bottom: "70%" }} />
                    </>
                  )}
                  {g.name === "Custom" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-6 h-6 text-text-muted/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-text-primary text-sm">{g.name}</h3>
                <p className="text-[11px] text-text-muted">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <h4 className="font-semibold text-text-primary text-sm mb-2">Grid Colors</h4>
            <p className="text-sm text-text-secondary mb-3">{d.grids.gridColorsText}</p>
            <div className="flex gap-2">
              {["#FFFFFF", "#B8860B", "#5C4033", "#1A1A1A", "#708090"].map((c) => (
                <div key={c} className={`w-6 h-6 rounded-full shadow-sm ${c === "#FFFFFF" ? "border border-border" : ""}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <h4 className="font-semibold text-text-primary text-sm mb-2">Grid Widths</h4>
            <p className="text-sm text-text-secondary mb-3">{d.grids.gridWidthsText}</p>
            <div className="flex items-end gap-4">
              <div className="text-center">
                <div className="w-3 h-12 bg-text-muted/20 rounded-sm mx-auto" />
                <p className="text-[10px] text-text-muted mt-1">3/4&quot;</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-12 bg-text-muted/20 rounded-sm mx-auto" />
                <p className="text-[10px] text-text-muted mt-1">1&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ HARDWARE & FITTINGS ═══════ */}
      <Section gray>
        <SectionTitle badge={d.hardware.badge} title={d.hardware.title} subtitle={d.hardware.subtitle} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Hinges */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" /></svg>
              Hinge Types
            </h3>
            <div className="space-y-4">
              {d.hardware.hinges.map((hinge) => (
                <div key={hinge.title} className="flex gap-4 p-4 bg-warm-gray rounded-lg">
                  <div className="w-16 h-16 bg-white rounded-lg border border-border flex items-center justify-center shrink-0">
                    <svg className="w-8 h-8 text-text-muted/40" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25Z" /></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary text-sm">{hinge.title}</p>
                    <p className="text-xs text-text-secondary">{hinge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Handles */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" /></svg>
              Handle Designs
            </h3>
            <p className="text-sm text-text-secondary mb-4">{d.hardware.handlesIntro}</p>
            <div className="grid grid-cols-2 gap-3">
              {d.hardware.handles.map((h) => (
                <div key={h.name} className="p-3 bg-warm-gray rounded-lg">
                  <p className="font-semibold text-text-primary text-xs">{h.name}</p>
                  <p className="text-[11px] text-text-muted mt-0.5">{h.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-text-muted mb-2">Available Handle Colors:</p>
              <div className="flex flex-wrap gap-2">
                {d.hardware.handleColors.map((c) => (
                  <span key={c} className="text-[10px] px-2 py-1 bg-warm-gray rounded-full text-text-secondary">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Partners */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div>
              <h3 className="font-semibold text-text-primary mb-1">{d.hardware.partnersTitle}</h3>
              <p className="text-sm text-text-secondary">{d.hardware.partnersText}</p>
            </div>
            <div className="flex gap-8 items-center">
              {d.hardware.partners.map((brand) => (
                <div key={brand} className="text-center">
                  <div className="w-14 h-14 bg-warm-gray rounded-lg flex items-center justify-center">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{brand}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════ COMFORT IN EVERY SEASON ═══════ */}
      <Section>
        <SectionTitle badge={d.comfort.badge} title={d.comfort.title} subtitle={d.comfort.subtitle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {d.comfort.cards.map((card) => {
            const clr = comfortColors[card.color] || comfortColors.red;
            return (
              <div key={card.title} className="bg-white rounded-xl border border-border p-6 text-center">
                <div className={`w-14 h-14 rounded-full ${clr.bg} flex items-center justify-center mx-auto mb-4`}>
                  {clr.icon}
                </div>
                <h3 className="font-bold text-text-primary text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{card.text}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ═══════ PERFORMANCE — DECA vs Traditional ═══════ */}
      <Section>
        <SectionTitle badge={d.performance.badge} title={d.performance.title} subtitle={d.performance.subtitle} />
        <PerformanceBars
          metrics={d.performance.metrics.map((m, i) => ({
            label: m.label,
            icon: perfIcons[i],
            deca: m.deca,
            decaLabel: m.decaLabel,
            traditional: m.traditional,
            traditionalLabel: m.traditionalLabel,
          }))}
        />
      </Section>

      {/* ═══════ ENERGY SAVINGS ═══════ */}
      <Section gray>
        <SectionTitle badge={d.energySavings.badge} title={d.energySavings.title} subtitle={d.energySavings.subtitle} />
        <EnergySavingsCard />
      </Section>

      {/* ═══════ GALLERY ═══════ */}
      <Section>
        <SectionTitle badge={d.gallery.badge} title={d.gallery.title} subtitle={d.gallery.subtitle} />
        <GalleryLightbox
          alt="DECA tilt & turn window installation"
          items={d.gallery.items.map((item) => ({ src: item.src, tall: item.tall }))}
        />
      </Section>

      {/* ═══════ REVIEWS — hidden until real testimonials ═══════ */}
      <section className="py-20 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16">
          <SectionTitle title={d.service.title} subtitle={d.service.subtitle} />
          <ServiceIcons />
        </div>
      </section>

      {/* ═══════ DELIVERY MAP ═══════ */}
      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-white/60 mb-3">{d.delivery.badge}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{d.delivery.title}</h2>
            <p className="text-white/70 leading-relaxed mb-6">{d.delivery.text}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {d.delivery.zones.map((item, i) => (
                <div key={item.value} className="bg-white/10 rounded-xl border border-white/15 p-4 flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white mb-2">
                    {deliveryIcons[i]}
                  </div>
                  <p className="text-xl font-extrabold text-white leading-tight">{item.value}</p>
                  <p className="text-[11px] text-white/50 mt-0.5 leading-snug">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <DeliveryMap />
        </div>
      </Section>

      {/* ═══════ WINDOW TYPES ═══════ */}
      <Section>
        <SectionTitle badge={d.styles.badge} title={d.styles.title} subtitle={d.styles.subtitle} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {d.styles.items.map((w) => (
            <div key={w.name} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all group">
              <div className="bg-warm-gray flex items-center justify-center p-4 h-52">
                <Image src={`${a}/images/${w.src}`} alt={`DECA ${w.name}`} width={400} height={300} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text-primary text-sm">{w.name}</h3>
                <p className="text-xs text-text-muted">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════ CTA ═══════ */}
      <CTAWithDocs title={d.cta.title} subtitle={d.cta.subtitle} btnText={d.cta.btnText} />

      {/* ═══════ FAQ ═══════ */}
      <Section gray>
        <SectionTitle badge={d.faq.badge} title={d.faq.title} />
        <div className="max-w-3xl mx-auto space-y-3">
          {d.faq.items.map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-xl border border-border">
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-text-primary font-medium">
                {q}
                <svg className="w-5 h-5 text-text-muted shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </summary>
              <div className="px-6 pb-5 text-text-secondary leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </Section>

      {/* ═══════ STICKY CTA ═══════ */}
      <StickyCTA />
    </>
  );
}

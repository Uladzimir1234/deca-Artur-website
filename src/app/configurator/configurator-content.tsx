"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui";

/* ═══════════════════════════════════════════════════════════
   CDN & ACCENT COLOR
   ═══════════════════════════════════════════════════════════ */
const CDN = "https://assets.brogawindows.com";
const ACCENT = "#e8873a";          // DECA orange
const ACCENT_HOVER = "#d47630";
const ACCENT_LIGHT = "#fef3ec";    // light orange bg

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */
interface Config {
  tagNumber: string;
  frameType: string;
  colorInside: string;
  colorOutside: string;
  glassPaneType: string;
  glassPane: string;
  spacerBar: string;
  glassType: string;
  grid: string;
  hinges: string;
  handleModel: string;
  handleColor: string;
}

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */
const FRAME_TYPES = [
  {
    id: "elegance",
    label: "Elegance",
    prefix: "el",
    warranty: 2,
    chambers: 3,
    soundProof: 6,
    energyEfficiency: 6,
    blowProtection: 6,
    description: "Classical approach to window and door design. Elegant profiles with proven reliability for residential applications.",
    basePrice: 656.77,
    profileImg: `${CDN}/nomenclature/profile-upvc/elegance_casement.webp`,
    warrantyBadge: `${CDN}/images/shared/warranty/label-2.svg`,
  },
  {
    id: "power",
    label: "Power",
    prefix: "pw",
    warranty: 5,
    chambers: 5,
    soundProof: 8,
    energyEfficiency: 8,
    blowProtection: 8,
    description: "Enhanced thermal and acoustic performance. 5-chamber profile system with superior insulation for demanding climates.",
    basePrice: 798.50,
    profileImg: `${CDN}/nomenclature/profile-upvc/power_casement.webp`,
    warrantyBadge: `${CDN}/images/shared/warranty/label-5.svg`,
  },
  {
    id: "premium",
    label: "Premium",
    prefix: "pr",
    warranty: 5,
    chambers: 6,
    soundProof: 10,
    energyEfficiency: 10,
    blowProtection: 10,
    description: "The ultimate in window technology. 6-chamber system delivers maximum energy efficiency and soundproofing.",
    basePrice: 945.20,
    profileImg: `${CDN}/nomenclature/profile-upvc/premium_casement.webp`,
    warrantyBadge: `${CDN}/images/shared/warranty/label-5.svg`,
  },
];

const COLORS: { id: string; label: string; hex: string; price: number; fileKey: string; isWood?: boolean }[] = [
  { id: "white", label: "White", hex: "#F5F5F0", price: 0, fileKey: "white" },
  { id: "black", label: "Black", hex: "#1A1A1A", price: 108.59, fileKey: "black" },
  { id: "antasit-grey", label: "Antasit Grey", hex: "#6B6B6B", price: 108.59, fileKey: "antasit_grey" },
  { id: "golden-oak", label: "Golden Oak", hex: "#B8860B", price: 108.59, fileKey: "golden_oak", isWood: true },
  { id: "vizon", label: "Vizon", hex: "#8B7355", price: 108.59, fileKey: "vizon", isWood: true },
  { id: "antique-oak", label: "Antique Oak", hex: "#5C4033", price: 108.59, fileKey: "antique_oak", isWood: true },
];

const GLASS_PANE_TYPES = [
  { id: "double", label: "Double Glass Pane", price: 0, isDefault: true },
  { id: "triple", label: "Triple Glass Pane", price: 40.70, isDefault: false },
];

const GLASS_PANES = [
  { id: "regular", label: "Regular", price: 0, isDefault: true, desc: "Standard glass pane" },
  { id: "tempered", label: "Tempered", price: 82.70, isDefault: false, desc: "7 times stronger than normal glass" },
];

const SPACER_BARS = [
  { id: "aluminum", label: "Aluminum", price: 0, isDefault: true, fileKey: "aluminum" },
  { id: "gray-warm", label: "Gray Warm", price: 10.11, isDefault: false, fileKey: "gray_warm" },
  { id: "black-warm", label: "Black Warm", price: 10.11, isDefault: false, fileKey: "black_warm" },
];

const GLASS_TYPES = [
  { id: "clear", label: "Clear", price: 0, isDefault: true },
  { id: "frosted", label: "Frosted", price: 118.15, isDefault: false },
];

const GRID_OPTIONS = [
  { id: "none", label: "None", price: 0, isDefault: true },
  { id: "5-8", label: '5/8" Grid', price: 95.00, isDefault: false },
];

const HINGE_OPTIONS = [
  { id: "standard", label: "Standard", price: 0, isDefault: true, desc: "Colonial or classic style" },
  { id: "concealed", label: "Concealed", price: 172.19, isDefault: false, desc: "Modern and minimalist look" },
];

const HANDLE_MODELS = [
  { id: "line-t", label: "Model Line-T", price: 0, isDefault: true, fileKey: "model_line_t" },
  { id: "line-rt", label: "Model Line-RT", price: 22.89, isDefault: false, fileKey: "model_line_rt" },
  { id: "dublin-t", label: "Model Dublin-T", price: 35.50, isDefault: false, fileKey: "model_dublin_t" },
];

const HANDLE_COLORS = [
  { id: "white", label: "White", hex: "#F5F5F0", price: 0, isDefault: true, fileKey: "white" },
  { id: "black", label: "Black", hex: "#1A1A1A", price: 15.00, isDefault: false, fileKey: "black" },
  { id: "silver", label: "Silver", hex: "#C0C0C0", price: 15.00, isDefault: false, fileKey: "silver" },
];

const STEP_LABELS = [
  "Tag Number",
  "Frame Type",
  "Frame Finish Inside",
  "Frame Finish Outside",
  "Glass Pane Type",
  "Glass Pane",
  "Glass Spacer Bar",
  "Glass Type",
  "Grid",
  "Hinges",
  "Handle Model",
  "Handle Color",
];

const DEFAULT_CONFIG: Config = {
  tagNumber: "",
  frameType: "elegance",
  colorInside: "white",
  colorOutside: "white",
  glassPaneType: "double",
  glassPane: "regular",
  spacerBar: "aluminum",
  glassType: "clear",
  grid: "none",
  hinges: "standard",
  handleModel: "line-t",
  handleColor: "white",
};

/* ═══════════════════════════════════════════════════════════
   PRICE CALCULATION
   ═══════════════════════════════════════════════════════════ */
function calcTotal(config: Config) {
  const frame = FRAME_TYPES.find((f) => f.id === config.frameType)!;
  const colorIn = COLORS.find((c) => c.id === config.colorInside)!;
  const colorOut = COLORS.find((c) => c.id === config.colorOutside)!;
  const glassPaneType = GLASS_PANE_TYPES.find((g) => g.id === config.glassPaneType)!;
  const glassPane = GLASS_PANES.find((g) => g.id === config.glassPane)!;
  const spacer = SPACER_BARS.find((s) => s.id === config.spacerBar)!;
  const glassType = GLASS_TYPES.find((g) => g.id === config.glassType)!;
  const grid = GRID_OPTIONS.find((g) => g.id === config.grid)!;
  const hinges = HINGE_OPTIONS.find((h) => h.id === config.hinges)!;
  const handle = HANDLE_MODELS.find((h) => h.id === config.handleModel)!;
  const handleColor = HANDLE_COLORS.find((c) => c.id === config.handleColor)!;

  const total =
    frame.basePrice +
    colorIn.price +
    colorOut.price +
    glassPaneType.price +
    glassPane.price +
    spacer.price +
    glassType.price +
    grid.price +
    hinges.price +
    handle.price +
    handleColor.price;

  return { total, discounted: +(total * 0.8).toFixed(2) };
}

/* ═══════════════════════════════════════════════════════════
   PERFORMANCE RATING BAR
   ═══════════════════════════════════════════════════════════ */
function RatingBar({ label, value, max = 10 }: { label: string; value: number; max?: number }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-28 text-gray-500 shrink-0">{label}</span>
      <div className="flex gap-0.5 flex-1">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-sm ${i >= value ? "bg-gray-200" : ""}`}
            style={i < value ? { backgroundColor: ACCENT } : undefined}
          />
        ))}
      </div>
      <span className="text-gray-600 font-medium w-8 text-right">{value}/{max}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CHECKBOX ICON
   ═══════════════════════════════════════════════════════════ */
function CheckIcon({ checked }: { checked: boolean }) {
  if (!checked) {
    return <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0" />;
  }
  return (
    <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center shrink-0">
      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WINDOW PREVIEW (Layered PNG compositing)
   ═══════════════════════════════════════════════════════════ */
function WindowPreview({ config, view }: { config: Config; view: "inside" | "outside" }) {
  const frame = FRAME_TYPES.find((f) => f.id === config.frameType)!;
  const colorKey = COLORS.find((c) => c.id === (view === "inside" ? config.colorInside : config.colorOutside))?.fileKey || "white";
  const spacerKey = SPACER_BARS.find((s) => s.id === config.spacerBar)?.fileKey || "aluminum";
  const handleModelKey = HANDLE_MODELS.find((h) => h.id === config.handleModel)?.fileKey || "model_line_t";
  const handleColorKey = HANDLE_COLORS.find((c) => c.id === config.handleColor)?.fileKey || "white";

  const base = `${CDN}/images/catalog/calculator/scw/${view}/r`;

  const layers = [
    { src: `${base}/background/background.png`, alt: "Background" },
    { src: `${base}/frame/${frame.prefix}_${colorKey}.png`, alt: "Frame" },
    { src: `${base}/glazing_option/${spacerKey}.png`, alt: "Spacer" },
    { src: `${base}/glass/glass.png`, alt: "Glass" },
    ...(view === "inside"
      ? [
          { src: `${base}/hinges/${colorKey}.png`, alt: "Hinges" },
          { src: `${base}/handle/${handleModelKey}/no_keyed/${handleColorKey}.png`, alt: "Handle" },
        ]
      : []),
  ];

  return (
    <div className="relative w-full" style={{ paddingBottom: "100%" }}>
      {layers.map((layer, i) => (
        <Image
          key={i}
          src={layer.src}
          alt={layer.alt}
          fill
          className="object-contain"
          sizes="300px"
          priority={i === 0}
          unoptimized
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR — "What is Included"
   ═══════════════════════════════════════════════════════════ */
function Sidebar({
  config,
  currentStep,
  total,
  discounted,
  quoteUrl,
}: {
  config: Config;
  currentStep: number;
  total: number;
  discounted: number;
  quoteUrl: string;
}) {
  const frame = FRAME_TYPES.find((f) => f.id === config.frameType)!;
  const colorIn = COLORS.find((c) => c.id === config.colorInside)!;
  const colorOut = COLORS.find((c) => c.id === config.colorOutside)!;
  const glassPaneType = GLASS_PANE_TYPES.find((g) => g.id === config.glassPaneType)!;
  const glassPane = GLASS_PANES.find((g) => g.id === config.glassPane)!;
  const spacer = SPACER_BARS.find((s) => s.id === config.spacerBar)!;
  const glassType = GLASS_TYPES.find((g) => g.id === config.glassType)!;
  const grid = GRID_OPTIONS.find((g) => g.id === config.grid)!;
  const hinges = HINGE_OPTIONS.find((h) => h.id === config.hinges)!;
  const handleModel = HANDLE_MODELS.find((h) => h.id === config.handleModel)!;
  const handleColor = HANDLE_COLORS.find((c) => c.id === config.handleColor)!;

  type SidebarRow = { label: string; value: string; price?: string; stepIndex: number };

  const rows: SidebarRow[] = [
    { label: "Window Width", value: '30" (762 mm)', stepIndex: -1 },
    { label: "Rough Opening Width (min)", value: '30 ¾" (781 mm)', stepIndex: -1 },
    { label: "Window Height", value: '54" (1372 mm)', stepIndex: -1 },
    { label: "Rough Opening Height (min)", value: '54 ¾" (1391 mm)', stepIndex: -1 },
    { label: "Window Type", value: "Single Casement", stepIndex: -1 },
    { label: "Window Opening", value: "RHI", stepIndex: -1 },
    { label: "Frame Material", value: "uPVC", stepIndex: -1 },
    { label: "Frame Type", value: frame.label, price: `$${frame.basePrice.toFixed(2)}`, stepIndex: 1 },
    { label: "Frame Finish Inside", value: colorIn.label, price: colorIn.price > 0 ? `+ $${colorIn.price.toFixed(2)}` : undefined, stepIndex: 2 },
    { label: "Frame Finish Outside", value: colorOut.label, price: colorOut.price > 0 ? `+ $${colorOut.price.toFixed(2)}` : undefined, stepIndex: 3 },
    { label: "Glass Pane Type", value: glassPaneType.label, price: glassPaneType.price > 0 ? `+ $${glassPaneType.price.toFixed(2)}` : undefined, stepIndex: 4 },
    { label: "Glass Pane", value: glassPane.label, price: glassPane.price > 0 ? `+ $${glassPane.price.toFixed(2)}` : undefined, stepIndex: 5 },
    { label: "Glass Spacer Bar", value: spacer.label, price: spacer.price > 0 ? `+ $${spacer.price.toFixed(2)}` : undefined, stepIndex: 6 },
    { label: "Glass Type", value: glassType.label, price: glassType.price > 0 ? `+ $${glassType.price.toFixed(2)}` : undefined, stepIndex: 7 },
    { label: "Grid", value: grid.label, price: grid.price > 0 ? `+ $${grid.price.toFixed(2)}` : undefined, stepIndex: 8 },
    { label: "Hinges", value: hinges.label, price: hinges.price > 0 ? `+ $${hinges.price.toFixed(2)}` : undefined, stepIndex: 9 },
    { label: "Handle", value: handleModel.label, price: handleModel.price > 0 ? `+ $${handleModel.price.toFixed(2)}` : undefined, stepIndex: 10 },
    { label: "Handle Color", value: handleColor.label, price: handleColor.price > 0 ? `+ $${handleColor.price.toFixed(2)}` : undefined, stepIndex: 11 },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="font-bold text-sm text-gray-900">What is Included:</h3>
      </div>

      {/* Spec rows */}
      <div className="max-h-[520px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
        {rows.map((row, i) => {
          const isActive = row.stepIndex === currentStep;
          return (
            <div
              key={i}
              className="px-4 py-2 border-b border-gray-100 border-l-4 transition-colors"
              style={
                isActive
                  ? { borderLeftColor: ACCENT, backgroundColor: ACCENT_LIGHT }
                  : { borderLeftColor: "transparent" }
              }
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-400 leading-tight">{row.label}</p>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{row.value}</p>
                </div>
                {row.price && (
                  <span className="text-xs font-semibold text-gray-600 shrink-0">{row.price}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-semibold text-gray-600">Total:</span>
          <div className="text-right">
            <span className="text-sm text-red-500 line-through mr-2">${total.toFixed(2)}</span>
            <span className="text-lg font-bold text-green-600">${discounted.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 italic text-right mt-0.5">
          20% OFF (discount for registered clients)
        </p>
      </div>

      {/* Comment */}
      <div className="px-4 py-3 border-t border-gray-200">
        <textarea
          placeholder="Comment"
          className="w-full text-xs border border-gray-200 rounded px-3 py-2 resize-none focus:outline-none"
          style={{ borderColor: undefined }}
          onFocus={(e) => (e.target.style.borderColor = ACCENT)}
          onBlur={(e) => (e.target.style.borderColor = "")}
          rows={2}
        />
      </div>

      {/* Quote button — links to quote page */}
      <div className="px-4 pb-4">
        <Link
          href={quoteUrl}
          className="block w-full text-center text-white font-bold text-sm py-2.5 rounded transition-colors"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SELECTED CARD STYLE (reusable)
   ═══════════════════════════════════════════════════════════ */
function selectedCardStyle(isSelected: boolean): React.CSSProperties {
  if (!isSelected) return {};
  return {
    borderColor: ACCENT,
    backgroundColor: ACCENT_LIGHT,
    boxShadow: `0 4px 6px -1px ${ACCENT}20`,
  };
}

/* ═══════════════════════════════════════════════════════════
   STEP 0 — Tag Number / Location
   ═══════════════════════════════════════════════════════════ */
function StepTagNumber({
  config,
  onChange,
  onSkip,
  onApply,
}: {
  config: Config;
  onChange: (v: Partial<Config>) => void;
  onSkip: () => void;
  onApply: () => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 text-center mb-6">
        Add Tag Number / Location:
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Optionally add a tag number or location name to help identify this window in your project.
      </p>
      <input
        type="text"
        value={config.tagNumber}
        onChange={(e) => onChange({ tagNumber: e.target.value })}
        placeholder="e.g., Kitchen Window 1, Master Bedroom..."
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none mb-6"
        onFocus={(e) => (e.target.style.borderColor = ACCENT)}
        onBlur={(e) => (e.target.style.borderColor = "")}
      />
      <div className="flex gap-3 justify-center">
        <button
          onClick={onSkip}
          className="px-8 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Skip
        </button>
        <button
          onClick={onApply}
          className="px-8 py-2.5 rounded-lg text-sm font-bold text-white transition-colors"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP 1 — Frame Type
   ═══════════════════════════════════════════════════════════ */
function StepFrameType({
  config,
  onChange,
}: {
  config: Config;
  onChange: (v: Partial<Config>) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 text-center mb-6">
        Select Window Frame Type:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FRAME_TYPES.map((frame) => {
          const isSelected = config.frameType === frame.id;
          return (
            <button
              key={frame.id}
              onClick={() => onChange({ frameType: frame.id })}
              className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                isSelected ? "shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              style={selectedCardStyle(isSelected)}
            >
              <div className="absolute top-3 left-3">
                <CheckIcon checked={isSelected} />
              </div>
              <div className="flex justify-end mb-2">
                <Image
                  src={frame.warrantyBadge}
                  alt={`${frame.warranty} year warranty`}
                  width={50}
                  height={50}
                  unoptimized
                />
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-1">{frame.label}</h3>
              {frame.basePrice > FRAME_TYPES[0].basePrice && (
                <p className="text-green-600 text-xs font-semibold mb-2">
                  + ${(frame.basePrice - FRAME_TYPES[0].basePrice).toFixed(2)}
                </p>
              )}
              {frame.id === "elegance" && (
                <p className="text-gray-400 text-xs font-semibold mb-2">Standard</p>
              )}
              <div className="relative w-full h-28 mb-3">
                <Image
                  src={frame.profileImg}
                  alt={`${frame.label} profile`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-xs text-gray-500 mb-3">{frame.chambers} chambers</p>
              <div className="space-y-1.5">
                <RatingBar label="Sound Proof" value={frame.soundProof} />
                <RatingBar label="Energy Efficiency" value={frame.energyEfficiency} />
                <RatingBar label="Blow Protection" value={frame.blowProtection} />
              </div>
              <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">{frame.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COLOR SELECTION STEP (reused for Inside & Outside)
   ═══════════════════════════════════════════════════════════ */
function StepColorSelect({
  title,
  selectedId,
  onSelect,
}: {
  title: string;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 text-center mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {COLORS.map((color) => {
          const isSelected = selectedId === color.id;
          return (
            <button
              key={color.id}
              onClick={() => onSelect(color.id)}
              className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                isSelected ? "shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              style={selectedCardStyle(isSelected)}
            >
              <div className="absolute top-3 left-3">
                <CheckIcon checked={isSelected} />
              </div>
              <div className="flex items-start justify-between mb-3 pl-7">
                <span className="font-semibold text-sm text-gray-900">{color.label}</span>
                {color.price > 0 ? (
                  <span className="text-green-600 text-xs font-semibold">+ ${color.price.toFixed(2)}</span>
                ) : (
                  <span className="text-gray-400 text-xs font-semibold">Standard</span>
                )}
              </div>
              <div
                className="w-full h-24 rounded-lg border border-gray-200"
                style={{
                  backgroundColor: color.hex,
                  backgroundImage: color.isWood
                    ? "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)"
                    : undefined,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GENERIC 2-OPTION STEP
   ═══════════════════════════════════════════════════════════ */
function StepTwoOptions({
  title,
  options,
  selectedId,
  onSelect,
  renderImage,
}: {
  title: string;
  options: { id: string; label: string; price: number; isDefault?: boolean; desc?: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  renderImage?: (id: string) => React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 text-center mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`relative p-5 rounded-lg border-2 text-left transition-all ${
                isSelected ? "shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              style={selectedCardStyle(isSelected)}
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckIcon checked={isSelected} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">{opt.label}</span>
                    {opt.price > 0 ? (
                      <span className="text-green-600 text-xs font-semibold">+ ${opt.price.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400 text-xs font-semibold">Standard</span>
                    )}
                  </div>
                  {opt.desc && <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>}
                </div>
              </div>
              {renderImage && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-50">
                  {renderImage(opt.id)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GENERIC 3-OPTION STEP
   ═══════════════════════════════════════════════════════════ */
function StepThreeOptions({
  title,
  options,
  selectedId,
  onSelect,
  renderImage,
}: {
  title: string;
  options: { id: string; label: string; price: number; isDefault?: boolean; desc?: string }[];
  selectedId: string;
  onSelect: (id: string) => void;
  renderImage?: (id: string) => React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 text-center mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                isSelected ? "shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              style={selectedCardStyle(isSelected)}
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckIcon checked={isSelected} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">{opt.label}</span>
                    {opt.price > 0 ? (
                      <span className="text-green-600 text-xs font-semibold">+ ${opt.price.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400 text-xs font-semibold">Standard</span>
                    )}
                  </div>
                  {opt.desc && <p className="text-xs text-gray-500 mt-1">{opt.desc}</p>}
                </div>
              </div>
              {renderImage && (
                <div className="relative w-full h-36 rounded-lg overflow-hidden bg-gray-50">
                  {renderImage(opt.id)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   GLASS PANE TYPE STEP — cross-section illustrations
   ═══════════════════════════════════════════════════════════ */
function GlassPaneTypeImage({ id }: { id: string }) {
  const panes = id === "triple" ? 3 : 2;
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex items-center gap-1">
        {Array.from({ length: panes }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="w-1 h-32 bg-blue-200 rounded-full border border-blue-300" />
            {i < panes - 1 && <div className="w-6 h-32 bg-blue-50/60 rounded" />}
          </React.Fragment>
        ))}
      </div>
      <div className="ml-4 text-xs text-gray-400">
        {id === "triple" ? "3 glass layers" : "2 glass layers"}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SPACER BAR STEP — cross-section illustrations
   ═══════════════════════════════════════════════════════════ */
function SpacerBarImage({ id }: { id: string }) {
  const barColor = id === "aluminum" ? "#C0C0C0" : id === "gray-warm" ? "#808080" : "#333333";
  return (
    <div className="flex items-center justify-center h-full">
      <svg width="120" height="80" viewBox="0 0 120 80">
        <rect x="10" y="5" width="3" height="70" rx="1" fill="#B8D4E8" />
        <rect x="107" y="5" width="3" height="70" rx="1" fill="#B8D4E8" />
        <rect x="25" y="25" width="70" height="30" rx="2" fill={barColor} opacity="0.8" />
        <rect x="30" y="30" width="60" height="20" rx="1" fill={barColor} />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HINGE STEP
   ═══════════════════════════════════════════════════════════ */
function HingeImage({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 p-4">
      <div className="text-center">
        <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect x="3" y="3" width="4" height="18" rx="1" strokeWidth="1.5" />
          <rect x="8" y="7" width="13" height="10" rx="1" strokeWidth="1.5" />
          {id === "standard" ? (
            <>
              <circle cx="5" cy="8" r="0.5" fill="currentColor" />
              <circle cx="5" cy="16" r="0.5" fill="currentColor" />
            </>
          ) : (
            <line x1="7" y1="10" x2="7" y2="14" strokeWidth="2" />
          )}
        </svg>
        <p className="text-[11px] text-gray-400 mt-2">
          {id === "standard" ? "Colonial or classic style" : "Modern and minimalist look"}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HANDLE MODEL STEP
   ═══════════════════════════════════════════════════════════ */
function HandleModelImage({ id }: { id: string }) {
  const shapes: Record<string, React.ReactNode> = {
    "line-t": (
      <svg className="w-16 h-32" viewBox="0 0 40 80">
        <rect x="17" y="30" width="6" height="40" rx="3" fill="#999" />
        <rect x="15" y="10" width="10" height="25" rx="2" fill="#AAA" />
      </svg>
    ),
    "line-rt": (
      <svg className="w-16 h-32" viewBox="0 0 40 80">
        <rect x="17" y="30" width="6" height="40" rx="3" fill="#999" />
        <rect x="12" y="8" width="16" height="28" rx="3" fill="#AAA" />
        <circle cx="20" cy="22" r="3" fill="#888" />
      </svg>
    ),
    "dublin-t": (
      <svg className="w-16 h-32" viewBox="0 0 40 80">
        <rect x="17" y="30" width="6" height="40" rx="3" fill="#999" />
        <rect x="10" y="5" width="20" height="30" rx="4" fill="#AAA" />
      </svg>
    ),
  };
  return (
    <div className="flex items-center justify-center h-full bg-gray-50">
      {shapes[id] || shapes["line-t"]}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HANDLE COLOR STEP
   ═══════════════════════════════════════════════════════════ */
function StepHandleColor({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-900 text-center mb-6">Select Handle Color:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HANDLE_COLORS.map((color) => {
          const isSelected = selectedId === color.id;
          return (
            <button
              key={color.id}
              onClick={() => onSelect(color.id)}
              className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                isSelected ? "shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              style={selectedCardStyle(isSelected)}
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckIcon checked={isSelected} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-gray-900">{color.label}</span>
                    {color.price > 0 ? (
                      <span className="text-green-600 text-xs font-semibold">+ ${color.price.toFixed(2)}</span>
                    ) : (
                      <span className="text-gray-400 text-xs font-semibold">Standard</span>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="w-full h-20 rounded-lg border border-gray-200"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN CONFIGURATOR
   ═══════════════════════════════════════════════════════════ */
export function ConfiguratorContent() {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [previewView, setPreviewView] = useState<"inside" | "outside">("inside");
  const centerRef = useRef<HTMLDivElement>(null);

  const update = useCallback((partial: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const { total, discounted } = useMemo(() => calcTotal(config), [config]);

  const totalSteps = STEP_LABELS.length;
  const progressPercent = ((step + 1) / totalSteps) * 100;

  // Scroll center column to top on step change
  useEffect(() => {
    centerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));
  const startAgain = () => {
    setStep(0);
    setConfig(DEFAULT_CONFIG);
  };
  const resetStep = () => {
    const key = [
      "tagNumber", "frameType", "colorInside", "colorOutside",
      "glassPaneType", "glassPane", "spacerBar", "glassType",
      "grid", "hinges", "handleModel", "handleColor",
    ][step] as keyof Config;
    if (key) update({ [key]: DEFAULT_CONFIG[key] });
  };

  /* Build config string for quote page */
  const quoteUrl = useMemo(() => {
    const frame = FRAME_TYPES.find((f) => f.id === config.frameType)!;
    const colorIn = COLORS.find((c) => c.id === config.colorInside)!;
    const colorOut = COLORS.find((c) => c.id === config.colorOutside)!;
    const glassPT = GLASS_PANE_TYPES.find((g) => g.id === config.glassPaneType)!;
    const glassP = GLASS_PANES.find((g) => g.id === config.glassPane)!;
    const spacer = SPACER_BARS.find((s) => s.id === config.spacerBar)!;
    const glassT = GLASS_TYPES.find((g) => g.id === config.glassType)!;
    const grid = GRID_OPTIONS.find((g) => g.id === config.grid)!;
    const hingesVal = HINGE_OPTIONS.find((h) => h.id === config.hinges)!;
    const handle = HANDLE_MODELS.find((h) => h.id === config.handleModel)!;
    const handleC = HANDLE_COLORS.find((c) => c.id === config.handleColor)!;

    const configString = `[tilt-turn] ` + [
      `Frame: ${frame.label}`,
      `Interior: ${colorIn.label}`,
      `Exterior: ${colorOut.label}`,
      `Glass: ${glassPT.label}`,
      `Pane: ${glassP.label}`,
      `Spacer: ${spacer.label}`,
      `Type: ${glassT.label}`,
      `Grid: ${grid.label}`,
      `Hinges: ${hingesVal.label}`,
      `Handle: ${handle.label}`,
      `Handle Color: ${handleC.label}`,
      `Estimate: $${(+(calcTotal(config).discounted)).toFixed(2)}`,
    ].join(" | ");

    return `/quote?config=${encodeURIComponent(configString)}`;
  }, [config]);

  /* ── Render current step content ── */
  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepTagNumber config={config} onChange={update} onSkip={goNext} onApply={goNext} />;
      case 1:
        return <StepFrameType config={config} onChange={update} />;
      case 2:
        return <StepColorSelect title="Select Frame Finish Inside:" selectedId={config.colorInside} onSelect={(id) => update({ colorInside: id })} />;
      case 3:
        return <StepColorSelect title="Select Frame Finish Outside:" selectedId={config.colorOutside} onSelect={(id) => update({ colorOutside: id })} />;
      case 4:
        return <StepTwoOptions title="Select Glass Pane Type:" options={GLASS_PANE_TYPES} selectedId={config.glassPaneType} onSelect={(id) => update({ glassPaneType: id })} renderImage={(id) => <GlassPaneTypeImage id={id} />} />;
      case 5:
        return <StepTwoOptions title="Select Glass Pane:" options={GLASS_PANES} selectedId={config.glassPane} onSelect={(id) => update({ glassPane: id })} />;
      case 6:
        return <StepThreeOptions title="Select Glass Spacer Bar:" options={SPACER_BARS} selectedId={config.spacerBar} onSelect={(id) => update({ spacerBar: id })} renderImage={(id) => <SpacerBarImage id={id} />} />;
      case 7:
        return <StepTwoOptions title="Select Glass Type:" options={GLASS_TYPES} selectedId={config.glassType} onSelect={(id) => update({ glassType: id })} />;
      case 8:
        return <StepTwoOptions title="Select Grid:" options={GRID_OPTIONS} selectedId={config.grid} onSelect={(id) => update({ grid: id })} />;
      case 9:
        return <StepTwoOptions title="Select Hinges Type:" options={HINGE_OPTIONS} selectedId={config.hinges} onSelect={(id) => update({ hinges: id })} renderImage={(id) => <HingeImage id={id} />} />;
      case 10:
        return <StepThreeOptions title="Select Handle Model:" options={HANDLE_MODELS} selectedId={config.handleModel} onSelect={(id) => update({ handleModel: id })} renderImage={(id) => <HandleModelImage id={id} />} />;
      case 11:
        return <StepHandleColor selectedId={config.handleColor} onSelect={(id) => update({ handleColor: id })} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Catalog", href: "/catalog" },
          { label: "Tilt and Turn uPVC Single Casement Window 30×54\"" },
        ]}
      />

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <h1 className="text-xl font-bold text-gray-900">
          Tilt and Turn uPVC Single Casement Window 30×54&quot;
        </h1>
      </div>

      {/* ═══ 3-Column Layout ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-6">

          {/* ── LEFT COLUMN: Window Preview ── */}
          <div className="lg:sticky lg:top-4 lg:self-start space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-2">
                <WindowPreview config={config} view={previewView} />
              </div>
            </div>

            {/* Inside / Outside toggle */}
            <div className="flex">
              {(["inside", "outside"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setPreviewView(view)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold border transition-colors ${
                    previewView !== view ? "bg-white border-gray-200 text-gray-600 hover:bg-gray-50" : "text-white"
                  }`}
                  style={{
                    borderRadius: view === "inside" ? "6px 0 0 6px" : "0 6px 6px 0",
                    ...(previewView === view ? { backgroundColor: ACCENT, borderColor: ACCENT } : {}),
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {view === "inside" ? "Inside" : "Outside"}
                </button>
              ))}
            </div>

            {/* Total price */}
            <div className="text-center">
              <span className="text-gray-500 text-sm">Total: </span>
              <span className="text-2xl font-bold text-green-600">${discounted.toFixed(2)}</span>
            </div>

            {/* Finish Assembly */}
            <Link
              href={quoteUrl}
              className="flex items-center justify-center gap-2 w-full py-3 border-2 rounded-lg text-sm font-semibold transition-colors"
              style={{ borderColor: ACCENT, color: ACCENT }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT_LIGHT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Finish Assembly
            </Link>
          </div>

          {/* ── CENTER COLUMN: Step Content ── */}
          <div className="min-w-0" ref={centerRef}>
            {/* Navigation bar */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={goPrev}
                disabled={step === 0}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  step === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <div className="flex items-center gap-4">
                <button onClick={startAgain} className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Start Again
                </button>
                <button onClick={resetStep} className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%`, backgroundColor: ACCENT }}
              />
            </div>

            {/* Step content */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              {renderStep()}
            </div>

            {/* Next button */}
            {step > 0 && step < totalSteps - 1 && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-6 py-2.5 text-white font-bold text-sm rounded-lg transition-colors"
                  style={{ backgroundColor: ACCENT }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
                >
                  Next Step
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {/* Final step CTA */}
            {step === totalSteps - 1 && (
              <div className="flex justify-center mt-6">
                <Link
                  href={quoteUrl}
                  className="flex items-center gap-2 px-8 py-3 text-white font-bold text-sm rounded-lg transition-colors shadow-md"
                  style={{ backgroundColor: ACCENT }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACCENT_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACCENT)}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Finish Assembly & Request Quote
                </Link>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN: Sidebar ── */}
          <div className="hidden lg:block lg:sticky lg:top-4 lg:self-start">
            <Sidebar
              config={config}
              currentStep={step}
              total={total}
              discounted={discounted}
              quoteUrl={quoteUrl}
            />
          </div>
        </div>
      </div>
    </>
  );
}

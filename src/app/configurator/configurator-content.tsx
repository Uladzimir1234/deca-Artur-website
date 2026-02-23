"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui";

/* ═══════════════════════════════════════════════════════════
   DATA / TYPES
   ═══════════════════════════════════════════════════════════ */

type ProductType = "tilt-turn" | "fixed" | "casement" | "entry-door" | "french-door" | "sliding-door";
type Material = "upvc" | "aluminum";
type Profile = "s9000" | "s8000";
type Glazing = "double" | "triple";
type GridPattern = "none" | "colonial" | "prairie" | "heritage";
type HandleStyle = "line" | "quadro" | "dublin";

interface Config {
  product: ProductType;
  width: number;
  height: number;
  material: Material;
  profile: Profile;
  glazing: Glazing;
  colorInside: string;
  colorOutside: string;
  handle: HandleStyle;
  grid: GridPattern;
}

const PRODUCTS: { id: ProductType; label: string; icon: string; base: number }[] = [
  { id: "tilt-turn", label: "Tilt & Turn", icon: "↗", base: 480 },
  { id: "fixed", label: "Fixed Window", icon: "□", base: 290 },
  { id: "casement", label: "Casement", icon: "⊞", base: 420 },
  { id: "entry-door", label: "Entry Door", icon: "🚪", base: 950 },
  { id: "french-door", label: "French Door", icon: "⊟", base: 1150 },
  { id: "sliding-door", label: "Sliding Door", icon: "⇔", base: 1350 },
];

const COLORS: { id: string; label: string; hex: string; textureUrl?: string; price: number }[] = [
  { id: "white", label: "White", hex: "#F5F5F0", price: 0 },
  { id: "anthracite", label: "Anthracite Gray", hex: "#3C3C3C", price: 45 },
  { id: "jet-black", label: "Jet Black", hex: "#1A1A1A", price: 45 },
  { id: "golden-oak", label: "Golden Oak", hex: "#B8860B", price: 65 },
  { id: "walnut", label: "Walnut", hex: "#5C4033", price: 65 },
  { id: "rosewood", label: "Rosewood", hex: "#65000B", price: 65 },
  { id: "basalt-gray", label: "Basalt Gray", hex: "#6B6B6B", price: 45 },
  { id: "cream", label: "Cream", hex: "#FFF8DC", price: 35 },
];

const HANDLES: { id: HandleStyle; label: string; price: number }[] = [
  { id: "line", label: "Line", price: 0 },
  { id: "quadro", label: "Quadro", price: 25 },
  { id: "dublin", label: "Dublin", price: 35 },
];

const GRIDS: { id: GridPattern; label: string; price: number }[] = [
  { id: "none", label: "No Grid", price: 0 },
  { id: "colonial", label: "Colonial", price: 85 },
  { id: "prairie", label: "Prairie", price: 85 },
  { id: "heritage", label: "Heritage", price: 95 },
];

const STEPS = ["Product", "Size", "Material", "Glazing", "Colors", "Extras", "Summary"];

const DEFAULT_CONFIG: Config = {
  product: "tilt-turn",
  width: 30,
  height: 48,
  material: "upvc",
  profile: "s9000",
  glazing: "double",
  colorInside: "white",
  colorOutside: "white",
  handle: "line",
  grid: "none",
};

/* ═══════════════════════════════════════════════════════════
   PRICE LOGIC
   ═══════════════════════════════════════════════════════════ */
function calcPrice(c: Config): number {
  const prod = PRODUCTS.find((p) => p.id === c.product)!;
  const sizeMult = (c.width * c.height) / (30 * 48);
  const matMult = c.material === "aluminum" ? 1.35 : 1.0;
  const profMult = c.profile === "s9000" ? 1.0 : 0.88;
  const glazMult = c.glazing === "triple" ? 1.25 : 1.0;
  const colorIn = COLORS.find((cl) => cl.id === c.colorInside)?.price || 0;
  const colorOut = COLORS.find((cl) => cl.id === c.colorOutside)?.price || 0;
  const handle = HANDLES.find((h) => h.id === c.handle)?.price || 0;
  const grid = GRIDS.find((g) => g.id === c.grid)?.price || 0;
  return Math.round(prod.base * sizeMult * matMult * profMult * glazMult + colorIn + colorOut + handle + grid);
}

/* ═══════════════════════════════════════════════════════════
   SVG PREVIEW
   ═══════════════════════════════════════════════════════════ */
function WindowPreview({ config, view }: { config: Config; view: "inside" | "outside" }) {
  const colorHex = view === "inside"
    ? (COLORS.find((c) => c.id === config.colorInside)?.hex || "#F5F5F0")
    : (COLORS.find((c) => c.id === config.colorOutside)?.hex || "#F5F5F0");

  const isLight = ["white", "cream"].includes(view === "inside" ? config.colorInside : config.colorOutside);
  const frameStroke = isLight ? "#D1D1D1" : "#222";

  const isDoor = ["entry-door", "french-door", "sliding-door"].includes(config.product);
  const isFrench = config.product === "french-door";
  const isSliding = config.product === "sliding-door";

  // Normalized preview dimensions (max 280px wide, maintain aspect ratio)
  const maxW = 280;
  const maxH = 360;
  const aspect = config.width / config.height;
  let w: number, h: number;
  if (aspect > maxW / maxH) {
    w = maxW;
    h = maxW / aspect;
  } else {
    h = maxH;
    w = maxH * aspect;
  }

  const pad = 12; // frame thickness
  const glassX = pad;
  const glassY = pad;
  const glassW = w - pad * 2;
  const glassH = h - pad * 2;

  // Grid lines
  const gridLines: React.ReactElement[] = [];
  if (config.grid === "colonial") {
    const cols = isFrench || isSliding ? 2 : 1;
    const rows = isDoor ? 3 : 2;
    const cellW = glassW / (cols + (isFrench || isSliding ? 2 : 1));
    const cellH = glassH / (rows + 1);
    for (let i = 1; i <= (isFrench || isSliding ? cols + 1 : cols); i++) {
      gridLines.push(<line key={`cv${i}`} x1={glassX + cellW * i} y1={glassY} x2={glassX + cellW * i} y2={glassY + glassH} stroke={colorHex} strokeWidth="2.5" />);
    }
    for (let i = 1; i <= rows; i++) {
      gridLines.push(<line key={`ch${i}`} x1={glassX} y1={glassY + cellH * i} x2={glassX + glassW} y2={glassY + cellH * i} stroke={colorHex} strokeWidth="2.5" />);
    }
  } else if (config.grid === "prairie") {
    const inset = glassW * 0.22;
    const insetV = glassH * 0.22;
    // Top horizontal
    gridLines.push(<line key="pt" x1={glassX} y1={glassY + insetV} x2={glassX + glassW} y2={glassY + insetV} stroke={colorHex} strokeWidth="2.5" />);
    // Bottom horizontal
    gridLines.push(<line key="pb" x1={glassX} y1={glassY + glassH - insetV} x2={glassX + glassW} y2={glassY + glassH - insetV} stroke={colorHex} strokeWidth="2.5" />);
    // Left vertical
    gridLines.push(<line key="pl" x1={glassX + inset} y1={glassY} x2={glassX + inset} y2={glassY + glassH} stroke={colorHex} strokeWidth="2.5" />);
    // Right vertical
    gridLines.push(<line key="pr" x1={glassX + glassW - inset} y1={glassY} x2={glassX + glassW - inset} y2={glassY + glassH} stroke={colorHex} strokeWidth="2.5" />);
  } else if (config.grid === "heritage") {
    const cx = glassX + glassW / 2;
    gridLines.push(<line key="hv" x1={cx} y1={glassY} x2={cx} y2={glassY + glassH} stroke={colorHex} strokeWidth="2.5" />);
    const cy = glassY + glassH * 0.4;
    gridLines.push(<line key="hh" x1={glassX} y1={cy} x2={glassX + glassW} y2={cy} stroke={colorHex} strokeWidth="2.5" />);
  }

  // Handle position
  const handleX = isFrench ? w / 2 : isSliding ? w * 0.55 : w - pad - 6;
  const handleY = h * 0.5;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] mx-auto drop-shadow-xl" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}>
      {/* Outer frame */}
      <rect x="0" y="0" width={w} height={h} rx="3" fill={colorHex} stroke={frameStroke} strokeWidth="1" />

      {/* Glass */}
      <defs>
        <linearGradient id="glass-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D6EAF8" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#AED6F1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#85C1E9" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="60%" stopColor="#B8E0F6" />
          <stop offset="100%" stopColor="#E8F4FD" />
        </linearGradient>
      </defs>

      {isFrench || isSliding ? (
        <>
          {/* Two glass panes */}
          <rect x={glassX} y={glassY} width={glassW / 2 - 2} height={glassH} rx="1" fill="url(#sky-grad)" />
          <rect x={glassX + glassW / 2 + 2} y={glassY} width={glassW / 2 - 2} height={glassH} rx="1" fill="url(#sky-grad)" />
          <rect x={glassX} y={glassY} width={glassW / 2 - 2} height={glassH} rx="1" fill="url(#glass-grad)" />
          <rect x={glassX + glassW / 2 + 2} y={glassY} width={glassW / 2 - 2} height={glassH} rx="1" fill="url(#glass-grad)" />
          {/* Center mullion */}
          <rect x={w / 2 - 3} y={glassY - 2} width={6} height={glassH + 4} fill={colorHex} stroke={frameStroke} strokeWidth="0.5" />
        </>
      ) : (
        <>
          <rect x={glassX} y={glassY} width={glassW} height={glassH} rx="1" fill="url(#sky-grad)" />
          <rect x={glassX} y={glassY} width={glassW} height={glassH} rx="1" fill="url(#glass-grad)" />
        </>
      )}

      {/* Grid lines */}
      {gridLines}

      {/* Tilt indicator for tilt-turn */}
      {config.product === "tilt-turn" && (
        <g opacity="0.25">
          <line x1={glassX + 4} y1={glassY + glassH - 4} x2={glassX + glassW / 2} y2={glassY + 8} stroke="#333" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={glassX + glassW - 4} y1={glassY + glassH - 4} x2={glassX + glassW / 2} y2={glassY + 8} stroke="#333" strokeWidth="1" strokeDasharray="4 3" />
        </g>
      )}

      {/* Handle */}
      {!["fixed"].includes(config.product) && (
        <g>
          <rect x={handleX - 2} y={handleY - 12} width={4} height={24} rx="2" fill={isLight ? "#AAA" : "#CCC"} />
          <circle cx={handleX} cy={handleY} r="3" fill={isLight ? "#999" : "#DDD"} />
        </g>
      )}

      {/* Inner frame shadow */}
      <rect x={glassX} y={glassY} width={glassW} height={glassH} rx="1" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   STEP COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function StepProduct({ config, onChange }: { config: Config; onChange: (c: Partial<Config>) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Choose Your Product</h2>
      <p className="text-sm text-text-secondary mb-6">Select the type of window or door you want to configure.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange({ product: p.id })}
            className={`group relative p-5 rounded-xl border-2 text-left transition-all duration-200 ${
              config.product === p.id
                ? "border-brand bg-brand/5 shadow-md shadow-brand/10"
                : "border-border bg-white hover:border-brand/40 hover:shadow-sm"
            }`}
          >
            <span className="text-2xl block mb-2">{p.icon}</span>
            <span className={`text-sm font-semibold block ${config.product === p.id ? "text-brand" : "text-text-primary"}`}>
              {p.label}
            </span>
            <span className="text-xs text-text-muted mt-1 block">from ${p.base}</span>
            {config.product === p.id && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepSize({ config, onChange }: { config: Config; onChange: (c: Partial<Config>) => void }) {
  const isDoor = ["entry-door", "french-door", "sliding-door"].includes(config.product);
  const presets = isDoor
    ? [
        { w: 36, h: 80, label: '36"×80"' },
        { w: 48, h: 80, label: '48"×80"' },
        { w: 60, h: 80, label: '60"×80"' },
        { w: 72, h: 80, label: '72"×80"' },
      ]
    : [
        { w: 24, h: 36, label: '24"×36"' },
        { w: 30, h: 48, label: '30"×48"' },
        { w: 36, h: 60, label: '36"×60"' },
        { w: 48, h: 48, label: '48"×48"' },
      ];

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Set Dimensions</h2>
      <p className="text-sm text-text-secondary mb-6">Choose a preset or enter custom dimensions.</p>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 mb-8">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => onChange({ width: p.w, height: p.h })}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              config.width === p.w && config.height === p.h
                ? "border-brand bg-brand/5 text-brand"
                : "border-border text-text-secondary hover:border-brand/40"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Width */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-text-primary">Width</label>
          <span className="text-lg font-bold text-brand">{config.width}&quot;</span>
        </div>
        <input
          type="range"
          min={isDoor ? 24 : 12}
          max={isDoor ? 96 : 72}
          value={config.width}
          onChange={(e) => onChange({ width: +e.target.value })}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-brand"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>{isDoor ? 24 : 12}&quot;</span>
          <span>{isDoor ? 96 : 72}&quot;</span>
        </div>
      </div>

      {/* Height */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-text-primary">Height</label>
          <span className="text-lg font-bold text-brand">{config.height}&quot;</span>
        </div>
        <input
          type="range"
          min={isDoor ? 60 : 12}
          max={isDoor ? 96 : 72}
          value={config.height}
          onChange={(e) => onChange({ height: +e.target.value })}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-brand"
        />
        <div className="flex justify-between text-xs text-text-muted mt-1">
          <span>{isDoor ? 60 : 12}&quot;</span>
          <span>{isDoor ? 96 : 72}&quot;</span>
        </div>
      </div>
    </div>
  );
}

function StepMaterial({ config, onChange }: { config: Config; onChange: (c: Partial<Config>) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Frame Material & Profile</h2>
      <p className="text-sm text-text-secondary mb-6">GEALAN profiles are premium German-engineered systems.</p>

      {/* Material */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { id: "upvc" as Material, label: "uPVC", sub: "GEALAN Profile", desc: "6-chamber design, superior insulation, 15-year warranty", mult: "1.0×" },
          { id: "aluminum" as Material, label: "Aluminum", sub: "Thermal Break", desc: "Slim profiles, structural strength, modern aesthetics", mult: "1.35×" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => onChange({ material: m.id })}
            className={`p-5 rounded-xl border-2 text-left transition-all ${
              config.material === m.id
                ? "border-brand bg-brand/5 shadow-md shadow-brand/10"
                : "border-border hover:border-brand/40"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`font-bold ${config.material === m.id ? "text-brand" : "text-text-primary"}`}>{m.label}</span>
              {config.material === m.id && (
                <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
              )}
            </div>
            <span className="text-xs text-blue-accent font-semibold block mb-1">{m.sub}</span>
            <span className="text-xs text-text-muted block">{m.desc}</span>
          </button>
        ))}
      </div>

      {/* Profile (uPVC only) */}
      {config.material === "upvc" && (
        <>
          <h3 className="text-sm font-semibold text-text-primary mb-3">GEALAN Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "s9000" as Profile, label: "S9000", chambers: 6, desc: "Premium: best thermal & sound insulation", uvalue: "0.14", price: "Included" },
              { id: "s8000" as Profile, label: "S8000", chambers: 5, desc: "Standard: excellent performance", uvalue: "0.19", price: "-12%" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onChange({ profile: p.id })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  config.profile === p.id
                    ? "border-brand bg-brand/5"
                    : "border-border hover:border-brand/40"
                }`}
              >
                <span className={`font-bold text-lg block mb-1 ${config.profile === p.id ? "text-brand" : "text-text-primary"}`}>{p.label}</span>
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: p.chambers }).map((_, i) => (
                    <div key={i} className="w-3 h-6 rounded-sm bg-brand/20 border border-brand/30" />
                  ))}
                </div>
                <span className="text-xs text-text-muted block">{p.desc}</span>
                <span className="text-xs font-semibold text-blue-accent mt-1 block">U-value: {p.uvalue} • {p.price}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StepGlazing({ config, onChange }: { config: Config; onChange: (c: Partial<Config>) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Glazing Type</h2>
      <p className="text-sm text-text-secondary mb-6">Choose your glass pane configuration for optimal energy efficiency.</p>
      <div className="grid grid-cols-2 gap-6">
        {[
          {
            id: "double" as Glazing,
            label: "Double Pane",
            desc: "Two glass layers with argon fill. Standard energy efficiency. Ideal for moderate climates.",
            specs: ["U-value: 0.28", "Sound: 32 dB", "Standard"],
            price: "Included",
          },
          {
            id: "triple" as Glazing,
            label: "Triple Pane",
            desc: "Three glass layers with krypton fill. Maximum insulation and soundproofing for demanding environments.",
            specs: ["U-value: 0.14", "Sound: 45 dB", "+25%"],
            price: "+25%",
          },
        ].map((g) => (
          <button
            key={g.id}
            onClick={() => onChange({ glazing: g.id })}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              config.glazing === g.id
                ? "border-brand bg-brand/5 shadow-md shadow-brand/10"
                : "border-border hover:border-brand/40"
            }`}
          >
            {/* Glazing illustration */}
            <div className="flex items-center justify-center mb-4">
              <div className="flex gap-1">
                {Array.from({ length: g.id === "triple" ? 3 : 2 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-16 bg-blue-200/60 rounded-full border border-blue-300/40" />
                ))}
              </div>
            </div>
            <span className={`font-bold text-lg block mb-2 ${config.glazing === g.id ? "text-brand" : "text-text-primary"}`}>
              {g.label}
            </span>
            <span className="text-xs text-text-muted block mb-3 leading-relaxed">{g.desc}</span>
            <div className="flex flex-wrap gap-1.5">
              {g.specs.map((s) => (
                <span key={s} className="text-[10px] font-semibold bg-brand/10 text-brand px-2 py-0.5 rounded">
                  {s}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepColors({ config, onChange }: { config: Config; onChange: (c: Partial<Config>) => void }) {
  const [biColor, setBiColor] = useState(config.colorInside !== config.colorOutside);

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Frame Color</h2>
      <p className="text-sm text-text-secondary mb-4">Choose your interior and exterior frame colors.</p>

      {/* Bi-color toggle */}
      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <button
          onClick={() => {
            const next = !biColor;
            setBiColor(next);
            if (!next) onChange({ colorOutside: config.colorInside });
          }}
          className={`relative w-10 h-6 rounded-full transition-colors ${biColor ? "bg-brand" : "bg-gray-300"}`}
        >
          <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform shadow ${biColor ? "translate-x-4" : ""}`} />
        </button>
        <span className="text-sm text-text-secondary">Different interior/exterior colors</span>
      </label>

      {/* Interior */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">{biColor ? "Interior Color" : "Frame Color"}</h3>
        <div className="grid grid-cols-4 gap-3">
          {COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onChange({ colorInside: c.id, ...(!biColor ? { colorOutside: c.id } : {}) });
              }}
              className={`group p-2 rounded-lg border-2 transition-all ${
                config.colorInside === c.id ? "border-brand shadow-md" : "border-border hover:border-brand/40"
              }`}
            >
              <div className="w-full aspect-square rounded-md mb-1.5 border border-gray-200" style={{ backgroundColor: c.hex }} />
              <span className="text-[10px] font-medium text-text-primary block truncate">{c.label}</span>
              {c.price > 0 && <span className="text-[9px] text-green-600 font-semibold">+${c.price}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Exterior (if bi-color) */}
      {biColor && (
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Exterior Color</h3>
          <div className="grid grid-cols-4 gap-3">
            {COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => onChange({ colorOutside: c.id })}
                className={`group p-2 rounded-lg border-2 transition-all ${
                  config.colorOutside === c.id ? "border-brand shadow-md" : "border-border hover:border-brand/40"
                }`}
              >
                <div className="w-full aspect-square rounded-md mb-1.5 border border-gray-200" style={{ backgroundColor: c.hex }} />
                <span className="text-[10px] font-medium text-text-primary block truncate">{c.label}</span>
                {c.price > 0 && <span className="text-[9px] text-green-600 font-semibold">+${c.price}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StepExtras({ config, onChange }: { config: Config; onChange: (c: Partial<Config>) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Hardware & Extras</h2>
      <p className="text-sm text-text-secondary mb-6">Choose handle style and decorative grid pattern.</p>

      {/* Handle */}
      <h3 className="text-sm font-semibold text-text-primary mb-3">Handle Style</h3>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {HANDLES.map((h) => (
          <button
            key={h.id}
            onClick={() => onChange({ handle: h.id })}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              config.handle === h.id ? "border-brand bg-brand/5" : "border-border hover:border-brand/40"
            }`}
          >
            {/* Simple handle illustration */}
            <div className="flex justify-center mb-2">
              <div className="w-2 h-10 bg-gray-400 rounded-full relative">
                <div className={`absolute -top-1 left-1/2 -translate-x-1/2 bg-gray-500 rounded ${
                  h.id === "line" ? "w-1.5 h-5 -top-3" : h.id === "quadro" ? "w-3 h-4 -top-2.5 rounded-sm" : "w-2.5 h-6 -top-4"
                }`} />
              </div>
            </div>
            <span className={`text-sm font-semibold block ${config.handle === h.id ? "text-brand" : "text-text-primary"}`}>{h.label}</span>
            {h.price > 0 && <span className="text-xs text-green-600 font-semibold">+${h.price}</span>}
            {h.price === 0 && <span className="text-xs text-text-muted">Included</span>}
          </button>
        ))}
      </div>

      {/* Grid */}
      <h3 className="text-sm font-semibold text-text-primary mb-3">Grid Pattern</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {GRIDS.map((g) => (
          <button
            key={g.id}
            onClick={() => onChange({ grid: g.id })}
            className={`p-4 rounded-xl border-2 text-center transition-all ${
              config.grid === g.id ? "border-brand bg-brand/5" : "border-border hover:border-brand/40"
            }`}
          >
            {/* Grid pattern preview */}
            <div className="w-12 h-16 mx-auto mb-2 border-2 border-gray-300 rounded relative overflow-hidden bg-blue-50/30">
              {g.id === "colonial" && (
                <>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-gray-300" />
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-gray-300" />
                </>
              )}
              {g.id === "prairie" && (
                <>
                  <div className="absolute top-[20%] left-0 right-0 h-px bg-gray-300" />
                  <div className="absolute bottom-[20%] left-0 right-0 h-px bg-gray-300" />
                  <div className="absolute left-[22%] top-0 bottom-0 w-px bg-gray-300" />
                  <div className="absolute right-[22%] top-0 bottom-0 w-px bg-gray-300" />
                </>
              )}
              {g.id === "heritage" && (
                <>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300" />
                  <div className="absolute top-[40%] left-0 right-0 h-px bg-gray-300" />
                </>
              )}
            </div>
            <span className={`text-xs font-semibold block ${config.grid === g.id ? "text-brand" : "text-text-primary"}`}>{g.label}</span>
            {g.price > 0 && <span className="text-[10px] text-green-600 font-semibold">+${g.price}</span>}
            {g.price === 0 && <span className="text-[10px] text-text-muted">Free</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepSummary({ config, price }: { config: Config; price: number }) {
  const product = PRODUCTS.find((p) => p.id === config.product)!;
  const colorIn = COLORS.find((c) => c.id === config.colorInside)!;
  const colorOut = COLORS.find((c) => c.id === config.colorOutside)!;
  const handle = HANDLES.find((h) => h.id === config.handle)!;
  const grid = GRIDS.find((g) => g.id === config.grid)!;

  const materialLabel = config.material === "upvc" ? `uPVC — GEALAN ${config.profile.toUpperCase()}` : "Aluminum — Thermal Break";
  const glazingLabel = config.glazing === "triple" ? "Triple Pane" : "Double Pane";

  const rows = [
    ["Product", product.label],
    ["Dimensions", `${config.width}" × ${config.height}"`],
    ["Material", materialLabel],
    ["Glazing", glazingLabel],
    ["Interior Color", colorIn.label],
    ["Exterior Color", colorOut.label],
    ["Handle", handle.label],
    ["Grid", grid.label],
  ];

  // Build config string for quote page: [product] Key: Value | Key: Value
  const configString = `[${config.product}] ` + [
    `Size: ${config.width}"×${config.height}"`,
    `Material: ${materialLabel}`,
    `Glazing: ${glazingLabel}`,
    `Interior: ${colorIn.label}`,
    `Exterior: ${colorOut.label}`,
    `Handle: ${handle.label}`,
    `Grid: ${grid.label}`,
    `Estimate: $${price.toLocaleString()}`,
  ].join(" | ");

  const quoteUrl = `/quote?config=${encodeURIComponent(configString)}`;

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Your Configuration</h2>
      <p className="text-sm text-text-secondary mb-6">Review your selections and request a detailed quote.</p>

      <div className="bg-warm-gray rounded-xl p-6 mb-6">
        <div className="space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">{label}</span>
              <span className="text-sm font-semibold text-text-primary">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-semibold text-text-secondary">Estimated Price</span>
            <div className="text-right">
              <span className="text-3xl font-bold text-brand">${price.toLocaleString()}</span>
              <span className="block text-xs text-text-muted mt-1">Starting from • Final price may vary</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
        <p className="text-xs text-orange-800 leading-relaxed">
          <strong>Note:</strong> This is an estimate based on standard configurations. Final pricing includes installation requirements, site conditions, and any custom specifications. Our team will provide an exact quote within 24 hours.
        </p>
      </div>

      <Link
        href={quoteUrl}
        className="group relative overflow-hidden w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all duration-500 hover:shadow-lg hover:shadow-[#e8873a]/30"
        style={{ background: "linear-gradient(135deg, #d94e1a 0%, #f47b2b 40%, #e8873a 100%)" }}
      >
        <span className="relative z-10">Request Detailed Quote</span>
        <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      <p className="text-center text-xs text-text-muted mt-3">
        Or call us at <a href="tel:+14137714457" className="text-brand font-semibold">(413) 771-4457</a>
      </p>
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

  const update = useCallback((partial: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  const price = useMemo(() => calcPrice(config), [config]);

  const canNext = step < STEPS.length - 1;
  const canPrev = step > 0;

  const stepContent = [
    <StepProduct key={0} config={config} onChange={update} />,
    <StepSize key={1} config={config} onChange={update} />,
    <StepMaterial key={2} config={config} onChange={update} />,
    <StepGlazing key={3} config={config} onChange={update} />,
    <StepColors key={4} config={config} onChange={update} />,
    <StepExtras key={5} config={config} onChange={update} />,
    <StepSummary key={6} config={config} price={price} />,
  ];

  return (
    <>
      <Breadcrumb items={[{ label: "Configurator" }]} />

      {/* Header */}
      <section className="bg-gradient-to-b from-brand to-brand/95 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Design Your Window</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">
            Configure every detail and get an instant estimate. Our team will follow up with a detailed quote.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            {STEPS.map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  i === step
                    ? "bg-brand text-white"
                    : i < step
                    ? "bg-brand/10 text-brand cursor-pointer hover:bg-brand/20"
                    : "bg-gray-100 text-text-muted"
                }`}
              >
                {i < step ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[9px]">{i + 1}</span>
                )}
                <span className="hidden sm:inline">{s}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-warm-gray min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid lg:grid-cols-[340px_1fr] gap-8">
            {/* Left: Preview */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Live Preview</span>
                  <div className="flex bg-gray-100 rounded-lg p-0.5">
                    <button
                      onClick={() => setPreviewView("inside")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        previewView === "inside" ? "bg-brand text-white shadow" : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      Inside
                    </button>
                    <button
                      onClick={() => setPreviewView("outside")}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                        previewView === "outside" ? "bg-brand text-white shadow" : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      Outside
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center py-6 min-h-[300px] bg-gradient-to-b from-sky-50 to-gray-50 rounded-xl">
                  <WindowPreview config={config} view={previewView} />
                </div>

                {/* Size label */}
                <div className="text-center mt-3">
                  <span className="text-xs text-text-muted">{config.width}&quot; × {config.height}&quot;</span>
                </div>

                {/* Price */}
                <div className="mt-4 pt-4 border-t border-border flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-text-muted uppercase">Estimate</span>
                  <span className="text-2xl font-bold text-brand">${price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Right: Step content */}
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              {stepContent[step]}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={() => setStep((s) => s - 1)}
                  disabled={!canPrev}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    canPrev ? "text-text-primary hover:bg-gray-100" : "text-text-muted/30 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                {canNext && (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-brand text-white hover:bg-brand-dark transition-all shadow-md shadow-brand/20"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

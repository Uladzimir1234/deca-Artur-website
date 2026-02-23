"use client";
import { useState } from "react";
import Link from "next/link";
import { articles } from "@/data/articles";

const filters = ["All", "Buying Guides", "Comparisons", "Energy Efficiency", "Costs & ROI"];

export default function BlogContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? articles : articles.filter((a) => a.category === activeFilter);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === f ? "bg-blue-accent text-white" : "bg-warm-gray text-text-secondary hover:bg-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
            <div className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all">
              <div className="h-44 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <span className="inline-block text-xs font-semibold text-blue-accent bg-blue-light px-2.5 py-1 rounded mb-2">{article.category}</span>
                <h3 className="font-semibold text-text-primary text-sm leading-tight mb-3 group-hover:text-blue-accent transition-colors">{article.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>By {article.author}</span>
                  <span>{article.readTime} read</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <p>No articles found in this category yet.</p>
        </div>
      )}
    </>
  );
}

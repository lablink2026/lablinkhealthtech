'use client';

import React from 'react';
import Image from 'next/image';

export function HeroVisual() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] mx-auto select-none">
      {/* Soft ambient violet/lilac radial glow */}
      <div className="absolute inset-0 m-auto w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[var(--accent)] opacity-20 blur-3xl pointer-events-none -z-10" />

      {/* Top-Right Floating Accreditation Badge (Responsive & Sleek) */}
      <div className="absolute -top-3 right-0 sm:-top-5 sm:-right-4 z-20 rounded-xl sm:rounded-2xl bg-[var(--bg-raised)]/95 backdrop-blur-md border border-[var(--border)] px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 shadow-xl flex items-center gap-2 sm:gap-2.5 hero-badge-pop">
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="text-left">
          <div className="text-[10px] sm:text-[11px] font-bold text-[var(--text)]">MLSCN Licensed</div>
          <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)]">Verified Lab Network</div>
        </div>
      </div>

      {/* Main Hero Photograph Container */}
      {/* Note: This hero image can be replaced anytime at /public/images/hero-lab.webp */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl hero-image-animate bg-[var(--surface)]">
        <Image
          src="/images/hero-lab.webp"
          alt="Nigerian medical laboratory scientist examining a specimen in a modern diagnostic lab"
          width={896}
          height={1200}
          priority
          className="w-full h-full object-cover object-center"
        />
        {/* Soft subtle gradient vignette along edges */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl sm:rounded-3xl pointer-events-none" />
      </div>

      {/* Single Floating Report Card (Overlapping bottom-left corner with zero horizontal overflow) */}
      <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 z-20 w-[210px] sm:w-[260px] rounded-xl sm:rounded-2xl bg-[var(--bg-raised)] border border-[var(--border)] p-3 sm:p-4 shadow-2xl space-y-2.5 hero-report-card-animate">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
          <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--text-muted)] tracking-tight">
            Sample report
          </span>
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-[var(--text-muted)] font-medium">
            {/* QR icon */}
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 20h3v1h-3zM20 14h1v3h-1z" fill="currentColor" />
            </svg>
            <span>Scan to verify</span>
          </div>
        </div>

        {/* Test & Value */}
        <div className="space-y-0.5 sm:space-y-1">
          <div className="text-[11px] sm:text-xs font-semibold text-[var(--text)]">
            Fasting blood sugar
          </div>
          <div className="text-base sm:text-lg font-bold text-[var(--text)]">
            92 mg/dL
          </div>

          {/* Small progress indicator with brand accent */}
          <div className="w-full bg-[var(--surface)] h-1 sm:h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[var(--accent)] h-full w-[45%] rounded-full" />
          </div>

          {/* Readable reference range */}
          <div className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-medium pt-0.5">
            Reference: <span className="font-semibold text-[var(--text)]">70–99 mg/dL</span>
          </div>
        </div>

        {/* Approval status banner */}
        <div className="pt-0.5">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-[9px] sm:text-[10px] font-medium hero-badge-pop w-full">
            <svg className="w-3 h-3 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="truncate">Approved by licensed scientist</span>
          </div>
        </div>
      </div>
    </div>
  );
}

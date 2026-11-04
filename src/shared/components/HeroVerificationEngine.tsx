'use client';

import React from 'react';

export function HeroVerificationEngine() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[500px] h-[460px] sm:h-[500px] lg:h-[520px] mx-auto flex items-center justify-center select-none">
      {/* Soft ambient green radial glow behind the shield */}
      <div className="absolute inset-0 m-auto w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-[var(--accent)] opacity-20 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Central Thin Gold Orbit Ring */}
      <div className="absolute inset-0 m-auto w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full border border-[var(--gold)] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 m-auto w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-[var(--border)] opacity-20 pointer-events-none" />

      {/* Central Translucent Glass Shield with Droplet */}
      <div className="relative z-10 w-36 sm:w-44 h-40 sm:h-48 rounded-[28px] sm:rounded-[32px] glass-strong flex flex-col items-center justify-center border border-[var(--border)] shadow-2xl p-4 text-center shimmer-sheen">
        {/* Diagnostic Droplet within Shield */}
        <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-2xl glass flex items-center justify-center border border-[var(--border)] mb-2 sm:mb-3">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 sm:w-8 h-6 sm:h-8 text-[var(--accent)]"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="var(--glass-strong)" />
            <circle cx="12" cy="14" r="3" stroke="var(--gold)" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="text-[11px] sm:text-[12px] font-bold text-[var(--text)] tracking-tight">Lablink shield</div>
        <div className="data-tag text-[8px] sm:text-[9px] text-[var(--gold)] mt-0.5">Ed25519 root</div>
        <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--glass)] border border-[var(--border)] text-[8px] sm:text-[9px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
          <span>Verified node</span>
        </div>
      </div>

      {/* Floating Result Card 1 (Top Left) */}
      <div className="absolute top-2 sm:top-4 left-0 sm:-left-4 z-20 w-[150px] sm:w-[190px] rounded-[18px] sm:rounded-[20px] glass p-2.5 sm:p-3.5 border border-[var(--border)] shadow-lg animate-float-slow card-hover-lift">
        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Biomarker</span>
          <span className="data-tag text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
        </div>
        <div className="text-[11px] sm:text-xs font-bold text-[var(--text)] truncate">Fasting blood sugar</div>
        <div className="text-xs sm:text-sm font-semibold text-[var(--accent)] mt-0.5 font-mono">92 mg/dL</div>
        {/* Progress bar */}
        <div className="w-full bg-[var(--border)] h-1 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[45%]" />
        </div>
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>Normal</span>
          <span className="text-[var(--gold)] font-mono text-[8px] sm:text-[9px]">★ Verified</span>
        </div>
      </div>

      {/* Floating Result Card 2 (Top Right) */}
      <div className="absolute top-6 sm:top-10 right-0 sm:-right-4 z-20 w-[150px] sm:w-[190px] rounded-[18px] sm:rounded-[20px] glass p-2.5 sm:p-3.5 border border-[var(--border)] shadow-lg animate-float-delayed card-hover-lift">
        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Hematology</span>
          <span className="data-tag text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
        </div>
        <div className="text-[11px] sm:text-xs font-bold text-[var(--text)] truncate">Full blood count</div>
        <div className="text-xs sm:text-sm font-semibold text-[var(--text)] mt-0.5 font-mono">Hb 14.2 g/dL</div>
        <div className="w-full bg-[var(--border)] h-1 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[65%]" />
        </div>
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>Reference</span>
          <span className="text-[var(--gold)] font-mono text-[8px] sm:text-[9px]">★ Verified</span>
        </div>
      </div>

      {/* Floating Result Card 3 (Bottom Left) */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 sm:-left-6 z-20 w-[150px] sm:w-[195px] rounded-[18px] sm:rounded-[20px] glass p-2.5 sm:p-3.5 border border-[var(--border)] shadow-lg animate-float-delayed card-hover-lift">
        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Metabolic</span>
          <span className="data-tag text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
        </div>
        <div className="text-[11px] sm:text-xs font-bold text-[var(--text)] truncate">Lipid profile</div>
        <div className="text-xs sm:text-sm font-semibold text-[var(--text)] mt-0.5 font-mono">175 mg/dL</div>
        <div className="w-full bg-[var(--border)] h-1 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[55%]" />
        </div>
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>Optimal</span>
          <span className="text-[var(--gold)] font-mono text-[8px] sm:text-[9px]">★ Verified</span>
        </div>
      </div>

      {/* Floating Result Card 4 (Bottom Right) */}
      <div className="absolute bottom-8 sm:bottom-10 right-0 sm:-right-4 z-20 w-[150px] sm:w-[190px] rounded-[18px] sm:rounded-[20px] glass p-2.5 sm:p-3.5 border border-[var(--border)] shadow-lg animate-float-slow card-hover-lift">
        <div className="flex items-center justify-between mb-1 sm:mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Microscopy</span>
          <span className="data-tag text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
        </div>
        <div className="text-[11px] sm:text-xs font-bold text-[var(--text)] truncate">Malaria parasite</div>
        <div className="text-xs sm:text-sm font-semibold text-[var(--accent)] mt-0.5 font-mono">Not seen (Negative)</div>
        <div className="w-full bg-[var(--border)] h-1 rounded-full mt-1.5 sm:mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[100%]" />
        </div>
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>Negative</span>
          <span className="text-[var(--gold)] font-mono text-[8px] sm:text-[9px]">★ Verified</span>
        </div>
      </div>

      {/* Toast-style chip: "Just verified · 2s ago" */}
      <div className="absolute -top-2 sm:top-0 right-1/4 z-30 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full glass-strong border border-[var(--border)] shadow-xl flex items-center gap-1.5 sm:gap-2 animate-pulse">
        <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[var(--accent)]"></span>
        <span className="text-[10px] sm:text-[11px] font-medium text-[var(--text)]">Just verified · 2s ago</span>
        <span className="data-tag text-[7px] sm:text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
      </div>

      {/* Gold Seal Pill: "Signed by licensed approver" */}
      <div className="absolute -bottom-3 sm:-bottom-2 left-1/4 z-30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-strong border border-[var(--gold)] shadow-xl flex items-center gap-1.5 sm:gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[var(--gold)]"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--gold)" fillOpacity="0.2" />
        </svg>
        <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--gold)] whitespace-nowrap">Signed by licensed approver</span>
      </div>
    </div>
  );
}

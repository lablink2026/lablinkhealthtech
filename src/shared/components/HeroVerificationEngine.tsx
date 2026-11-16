'use client';

import React from 'react';

export function HeroVerificationEngine() {
  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[480px] lg:max-w-[520px] h-[480px] sm:h-[520px] lg:h-[540px] mx-auto flex items-center justify-center select-none">
      {/* Soft ambient emerald radial aura */}
      <div className="absolute inset-0 m-auto w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[var(--accent)] opacity-20 blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Thin Gold Orbit Rings */}
      <div className="absolute inset-0 m-auto w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full border border-[var(--gold)] opacity-25 pointer-events-none" />
      <div className="absolute inset-0 m-auto w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full border border-[var(--border)] opacity-30 pointer-events-none" />

      {/* Central Translucent Glass Diagnostic Console */}
      <div className="relative z-10 w-44 sm:w-52 h-48 sm:h-56 rounded-3xl glass-strong flex flex-col items-center justify-center border border-[var(--border)] shadow-2xl p-4 text-center shimmer-sheen">
        {/* Diagnostic Emblem */}
        <div className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-2xl bg-gradient-to-br from-[var(--surface)] to-[var(--bg-raised)] flex items-center justify-center border border-[var(--border)] mb-2 sm:mb-3 shadow-inner">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 sm:w-8 h-7 sm:h-8 text-[var(--accent)]"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="var(--glass-strong)" />
            <circle cx="12" cy="14" r="3" stroke="var(--gold)" strokeWidth="1.6" />
          </svg>
        </div>

        <div className="text-xs sm:text-[13px] font-bold text-[var(--text)] tracking-tight">
          Tamper-Evident Seal
        </div>
        <div className="data-tag text-[9px] text-[var(--gold)] mt-0.5">
          Verified Authentic Report
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[9px] font-mono text-[var(--text-muted)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>MLSCN Licensed Lab</span>
        </div>
      </div>

      {/* Floating Telemetry Card 1 (Top Left) */}
      <div className="absolute top-2 sm:top-4 left-0 sm:-left-6 z-20 w-[160px] sm:w-[200px] rounded-2xl glass p-3 sm:p-4 border border-[var(--border)] shadow-xl animate-float-slow card-hover-lift">
        <div className="flex items-center justify-between mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Biomarker</span>
          <span className="data-tag text-[8px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-[var(--accent)] font-semibold">
            Optimal
          </span>
        </div>
        <div className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">Fasting blood sugar</div>
        <div className="text-sm sm:text-base font-bold text-[var(--accent)] mt-0.5 font-mono">92 mg/dL</div>
        <div className="w-full bg-[var(--border)] h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[45%]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>70–99 mg/dL</span>
          <span className="text-[var(--gold)] font-mono text-[9px] font-semibold">★ Verified</span>
        </div>
      </div>

      {/* Floating Telemetry Card 2 (Top Right) */}
      <div className="absolute top-6 sm:top-8 right-0 sm:-right-6 z-20 w-[160px] sm:w-[200px] rounded-2xl glass p-3 sm:p-4 border border-[var(--border)] shadow-xl animate-float-delayed card-hover-lift">
        <div className="flex items-center justify-between mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Hematology</span>
          <span className="data-tag text-[8px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-[var(--accent)] font-semibold">
            Normal
          </span>
        </div>
        <div className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">Full blood count</div>
        <div className="text-sm sm:text-base font-bold text-[var(--text)] mt-0.5 font-mono">Hb 14.2 g/dL</div>
        <div className="w-full bg-[var(--border)] h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[65%]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>13.0–17.0 g/dL</span>
          <span className="text-[var(--gold)] font-mono text-[9px] font-semibold">★ Verified</span>
        </div>
      </div>

      {/* Floating Telemetry Card 3 (Bottom Left) */}
      <div className="absolute bottom-10 sm:bottom-14 left-0 sm:-left-8 z-20 w-[160px] sm:w-[205px] rounded-2xl glass p-3 sm:p-4 border border-[var(--border)] shadow-xl animate-float-delayed card-hover-lift">
        <div className="flex items-center justify-between mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Lipid Panel</span>
          <span className="data-tag text-[8px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-[var(--accent)] font-semibold">
            Desirable
          </span>
        </div>
        <div className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">Total cholesterol</div>
        <div className="text-sm sm:text-base font-bold text-[var(--text)] mt-0.5 font-mono">175 mg/dL</div>
        <div className="w-full bg-[var(--border)] h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[55%]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>&lt; 200 mg/dL</span>
          <span className="text-[var(--gold)] font-mono text-[9px] font-semibold">★ Verified</span>
        </div>
      </div>

      {/* Floating Telemetry Card 4 (Bottom Right) */}
      <div className="absolute bottom-6 sm:bottom-8 right-0 sm:-right-6 z-20 w-[160px] sm:w-[200px] rounded-2xl glass p-3 sm:p-4 border border-[var(--border)] shadow-xl animate-float-slow card-hover-lift">
        <div className="flex items-center justify-between mb-1.5">
          <span className="data-tag text-[8px] sm:text-[9px] text-[var(--text-muted)]">Parasitology</span>
          <span className="data-tag text-[8px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-[var(--accent)] font-semibold">
            Negative
          </span>
        </div>
        <div className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">Malaria parasite</div>
        <div className="text-sm sm:text-base font-bold text-[var(--accent)] mt-0.5 font-mono">Not seen (Nil)</div>
        <div className="w-full bg-[var(--border)] h-1.5 rounded-full mt-2 overflow-hidden">
          <div className="bg-[var(--accent)] h-full w-[100%]" />
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-[var(--text-muted)]">
          <span>Microscopy thick film</span>
          <span className="text-[var(--gold)] font-mono text-[9px] font-semibold">★ Verified</span>
        </div>
      </div>

      {/* Real-time Toast Chip */}
      <div className="absolute -top-3 sm:-top-1 right-1/4 z-30 px-3.5 py-1.5 rounded-full glass-strong border border-[var(--border)] shadow-xl flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
        </span>
        <span className="text-[11px] font-medium text-[var(--text)]">Result sealed & issued · 2s ago</span>
      </div>

      {/* Gold Seal Pill */}
      <div className="absolute -bottom-3 sm:-bottom-2 left-1/4 z-30 px-4 py-2 rounded-full glass-strong border border-[var(--gold)] shadow-xl flex items-center gap-2">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3.5 h-3.5 text-[var(--gold)]"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="var(--gold)" fillOpacity="0.2" />
        </svg>
        <span className="text-[11px] font-semibold text-[var(--gold)] whitespace-nowrap">
          Signed by MLSCN licensed approver
        </span>
      </div>
    </div>
  );
}

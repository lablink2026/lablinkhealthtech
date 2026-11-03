'use client';

import React from 'react';
import Link from 'next/link';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Bespoke Lablink Diagnostic Hex Shield */}
      <div className="relative w-10 h-10 rounded-2xl glass flex items-center justify-center p-2 border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-[var(--accent)] transition-transform duration-300 group-hover:scale-105"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Diagnostic droplet within circular seal */}
          <circle cx="12" cy="12" r="9" stroke="var(--border)" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="4.5" stroke="var(--accent)" strokeWidth="1.6" />
          <path d="M12 7.5v1.5M12 15v1.5M7.5 12h1.5M15 12h1.5" stroke="var(--gold)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center font-bold tracking-tight text-lg text-[var(--text)] leading-none">
          <span>Lablink</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] ml-1"></span>
        </div>
        <span className="data-tag text-[9px] text-[var(--text-muted)] mt-1">
          Diagnostics platform
        </span>
      </div>
    </Link>
  );
}

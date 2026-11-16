'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-1.5 sm:gap-2 group select-none transition-transform duration-200 active:scale-95 ${className}`}
      aria-label="Lablinks - Medical Laboratory Testing Network"
    >
      {/* Sleek, scaled-down logo mark (Concept 2 Infinity Loop) */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Light theme mark */}
        <Image
          src="/images/logo-mark.png"
          alt="Lablinks Mark"
          width={48}
          height={22}
          className="h-5 sm:h-5.5 md:h-6 w-auto object-contain transition-transform duration-200 group-hover:scale-105 dark:hidden"
          priority
        />
        {/* Dark theme luminous mark */}
        <Image
          src="/images/logo-mark-dark.png"
          alt="Lablinks Mark"
          width={48}
          height={22}
          className="h-5 sm:h-5.5 md:h-6 w-auto object-contain transition-transform duration-200 group-hover:scale-105 hidden dark:block"
          priority
        />
      </div>

      {/* Brand Typography: crisp native vector font, pixel-perfect on both themes */}
      <div className="flex items-center tracking-[-0.03em] font-extrabold text-[17px] sm:text-lg md:text-xl leading-none">
        <span className="text-[var(--text)] transition-colors">
          Lab
        </span>
        <span className="text-[var(--accent)] transition-colors">
          links
        </span>
      </div>
    </Link>
  );
}

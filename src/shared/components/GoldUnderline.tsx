import React from 'react';

interface GoldUnderlineProps {
  className?: string;
  width?: string | number;
}

export function GoldUnderline({ className = '', width = '100%' }: GoldUnderlineProps) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`block text-[var(--gold)] ${className}`}
      style={{ width }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 13C45 6.5 120 4.5 237 11.5M18 16C75 11 165 9.5 228 14"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
    </svg>
  );
}

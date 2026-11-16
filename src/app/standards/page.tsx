import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Our Standards — Lablinks',
  description: 'Clinical laboratory licensing and quality standards on Lablinks.'
};

export default function StandardsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-8">
      <div className="space-y-3">
        <span className="eyebrow-label text-[var(--accent)]">Quality & Governance</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
          Our Standards
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Clinical integrity and facility qualification guidelines
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4 text-sm text-[var(--text-muted)] leading-relaxed shadow-sm">
        <div className="p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--text)] text-xs font-medium">
          Notice: This standard operating framework is being compiled to reflect our complete MLSCN regulatory alignment.
        </div>
        <p>
          Every diagnostic laboratory participating on Lablinks must maintain valid registration with the Medical Laboratory Science Council of Nigeria (MLSCN).
        </p>
        <p>
          Key clinical principles enforced across all partner centres:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs text-[var(--text-muted)] pl-2">
          <li>Verification of active facility licence and premises compliance.</li>
          <li>Testing supervised and signed by registered medical laboratory scientists.</li>
          <li>Barcoded specimen tracking from sample collection to analysis.</li>
          <li>Cold-chain temperature control for on-demand home sample collection.</li>
          <li>Tamper-evident QR verification on every digital report issued.</li>
        </ul>
      </div>

      <div>
        <Link
          href="/"
          className="btn-secondary-pill px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
        >
          <span>←</span>
          <span>Back to homepage</span>
        </Link>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Lablinks',
  description: 'Lablinks terms of service for patients and partner laboratories.'
};

export default function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-8">
      <div className="space-y-3">
        <span className="eyebrow-label text-[var(--accent)]">Legal & Transparency</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Last updated: November 2026
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4 text-sm text-[var(--text-muted)] leading-relaxed shadow-sm">
        <div className="p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--text)] text-xs font-medium">
          Notice: This terms of service agreement is currently being prepared and finalized for platform onboarding.
        </div>
        <p>
          Lablinks connects patients with independently licensed medical laboratories across Nigeria. Lablinks facilitates discovery, transparent pricing, appointment booking, and digital report delivery.
        </p>
        <p>
          Medical diagnostic analyses, specimen processing, and clinical interpretations are executed solely by registered medical laboratory scientists at each respective partner facility.
        </p>
        <p>
          If you have questions regarding platform terms, please write to us at{' '}
          <a href="mailto:support@lablinks.com" className="text-[var(--accent)] font-semibold hover:underline">
            support@lablinks.com
          </a>.
        </p>
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

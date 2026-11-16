import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — Lablinks',
  description: 'Lablinks privacy guidelines and patient data protection standards.'
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-8">
      <div className="space-y-3">
        <span className="eyebrow-label text-[var(--accent)]">Legal & Transparency</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Last updated: November 2026
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4 text-sm text-[var(--text-muted)] leading-relaxed shadow-sm">
        <div className="p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--text)] text-xs font-medium">
          Notice: This official policy document is currently being prepared and finalized for regulatory publication.
        </div>
        <p>
          Lablinks is committed to safeguarding patient confidentiality and diagnostic record privacy. We operate in accordance with the Nigeria Data Protection Act (NDPA) and strict medical records privacy principles.
        </p>
        <p>
          Diagnostic health reports are shared strictly between the patient and the specific licensed laboratory conducting the test. Personal identifiers are never sold or shared with unauthorized third parties.
        </p>
        <p>
          For specific privacy inquiries, please contact our data compliance desk at{' '}
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

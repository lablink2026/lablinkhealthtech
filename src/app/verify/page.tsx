'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GeneralVerificationPage() {
  const router = useRouter();
  const [tokenInput, setTokenInput] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tokenInput.trim();
    if (cleaned) {
      router.push(`/verify/${encodeURIComponent(cleaned)}`);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-[var(--border)]">
            <svg
              className="w-3.5 h-3.5 text-[var(--accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="eyebrow-label text-[10px] text-[var(--accent)]">
              Authenticity Verification
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight">
            Verify a diagnostic report
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
            Enter the verification code or token printed below the QR seal on your Lablinks diagnostic report.
          </p>
        </div>

        <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl border border-[var(--border)] card-hover-lift">
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-[var(--text)]">
                Report verification token
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="e.g. tok_fbs_948210"
                required
                className="w-full px-4 py-3.5 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm font-mono border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary-pill py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 text-white cursor-pointer"
            >
              <span>Verify report authenticity</span>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="p-4 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] text-left text-xs space-y-2 text-[var(--text-muted)]">
            <div className="font-semibold text-[var(--text)] flex items-center gap-1.5">
              <span className="text-[var(--accent)]">ℹ</span>
              <span>How report verification works</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every authentic Lablinks diagnostic report features a unique digital seal and QR code. Scanning the QR code with your phone camera or entering the code above confirms that the document was issued by a registered medical laboratory scientist and has not been altered.
            </p>
          </div>

          <div className="pt-2 border-t border-[var(--border)] flex justify-between items-center text-xs">
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text)] transition">
              ← Return to homepage
            </Link>
            <Link href="/login" className="text-[var(--accent)] font-semibold hover:underline">
              Patient login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

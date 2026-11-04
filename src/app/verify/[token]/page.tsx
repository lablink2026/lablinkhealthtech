'use client';

import React from 'react';
import Link from 'next/link';
import { AccentHeading } from '../../../shared/components/AccentHeading';

export default function ResultVerificationPage({
  params
}: {
  params: { token: string };
}) {
  const token = params.token;
  const isValid = !token.includes('invalid');
  const isSuperseded = token.includes('superseded');

  return (
    <div className="min-h-screen pt-28 sm:pt-40 pb-24 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        {/* Main Verification Glass Card */}
        <div className="rounded-[28px] glass p-6 sm:p-10 shadow-2xl space-y-6 text-center border border-[var(--border)] card-hover-lift shimmer-sheen">
          {isValid && !isSuperseded ? (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full glass border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mx-auto shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="eyebrow-label text-[var(--accent)]">Cryptographic audit proof</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                  Authentic diagnostic result
                </h1>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-[var(--gold)] text-[var(--gold)] text-xs font-semibold">
                <span>★</span>
                <span>Verified by Ed25519 platform root key</span>
              </div>
            </div>
          ) : isSuperseded ? (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full glass border border-[var(--attention)] text-[var(--attention)] flex items-center justify-center mx-auto shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <div>
                <span className="eyebrow-label text-[var(--attention)]">Amended document</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                  Result version superseded
                </h1>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass border border-[var(--attention)] text-[var(--attention)] text-xs font-semibold">
                <span>Amended by issuing licensed laboratory scientist</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full glass border border-[var(--critical)] text-[var(--critical)] flex items-center justify-center mx-auto shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <div>
                <span className="eyebrow-label text-[var(--critical)]">Integrity check failed</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                  Invalid or revoked result
                </h1>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass border border-[var(--critical)] text-[var(--critical)] text-xs font-semibold">
                <span>Signature mismatch or revoked token</span>
              </div>
            </div>
          )}

          {/* Opaque Raised Facility Proof Card */}
          <div className="p-5 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] text-left text-xs space-y-2.5 font-mono shadow-inner">
            <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
              <span className="eyebrow-label text-[10px] text-[var(--text-muted)]">Issuing facility proof</span>
              <span className="data-tag text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Laboratory:</span>
              <span className="font-bold text-[var(--text)]">Synlab Diagnostics VI</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Clinical facility reg:</span>
              <span className="text-[var(--accent)] font-bold">MLSCN/LAB/2019/0421</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Verifying scientist:</span>
              <span className="text-[var(--text)]">Dr. B. Balogun (FMLSCN/2012/0481)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Issued timestamp:</span>
              <span className="text-[var(--text)]">20 Oct 2026 14:15:00 WAT</span>
            </div>
          </div>

          {/* Opaque Raised Pseudonymized Data Mask */}
          <div className="p-5 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] text-left text-xs space-y-2.5 font-mono shadow-inner">
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-muted)]">Patient (Pseudonymized):</span>
              <span className="font-bold text-[var(--text)]">O. A. (Male, 42 yrs)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-muted)]">Analyzed test:</span>
              <span className="font-bold text-[var(--text)]">Fasting blood sugar (FBS)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--text-muted)]">Result value:</span>
              <span className="font-bold text-[var(--accent)]">92 mg/dL (Normal range 70-99)</span>
            </div>
          </div>

          {/* Return Home Button */}
          <div className="pt-2">
            <Link
              href="/"
              className="btn-secondary-pill px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>←</span>
              <span>Back to Lablink home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

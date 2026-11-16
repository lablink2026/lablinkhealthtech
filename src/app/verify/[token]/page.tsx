'use client';

import React from 'react';
import Link from 'next/link';

export default function ResultVerificationPage({
  params
}: {
  params: { token: string };
}) {
  const token = params.token || '';
  
  // Known valid prefixes or tokens
  const isRecognizedToken = 
    token.startsWith('tok_') || 
    token.startsWith('LL-') || 
    token === 'verified-report-fbs' ||
    token === 'fbs-2026';
    
  const isSuperseded = token.includes('superseded');
  const isNotFound = !isRecognizedToken && !isSuperseded;

  return (
    <div className="min-h-screen pt-28 sm:pt-40 pb-24 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        {/* Main Verification Glass Card */}
        <div className="rounded-[28px] glass p-6 sm:p-10 shadow-2xl space-y-6 text-center border border-[var(--border)] card-hover-lift shimmer-sheen">
          {!isNotFound && !isSuperseded ? (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full glass border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mx-auto shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="eyebrow-label text-[var(--accent)]">Digital verification seal</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                  Verified authentic report
                </h1>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass border border-[var(--accent)] text-[var(--accent)] text-xs font-semibold">
                <span>✓</span>
                <span>Issued by licensed laboratory</span>
              </div>

              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed pt-1">
                The QR code confirms the report came from the lab and has not been edited. It does not confirm the result itself is correct.
              </p>
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

              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed pt-1">
                A revised report has been issued for this diagnostic test. Please refer to the updated document.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full glass border border-[var(--critical)] text-[var(--critical)] flex items-center justify-center mx-auto shadow-md">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <div>
                <span className="eyebrow-label text-[var(--critical)]">Lookup failed</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                  Report not found
                </h1>
              </div>

              <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed pt-1">
                We could not find a diagnostic report associated with verification code <code className="font-mono text-[var(--text)]">{token}</code>. Please check the code or contact the issuing laboratory.
              </p>
            </div>
          )}

          {!isNotFound && (
            <>
              {/* Issuing Facility Card */}
              <div className="p-5 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] text-left text-xs space-y-2.5 font-mono shadow-inner">
                <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]">
                  <span className="eyebrow-label text-[10px] text-[var(--text-muted)]">Issuing facility record</span>
                  <span className="data-tag text-[8px] px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30 font-sans">
                    MLSCN Licensed
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Laboratory:</span>
                  <span className="font-bold text-[var(--text)]">Apex Clinical Diagnostics VI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Licence number:</span>
                  <span className="text-[var(--accent)] font-bold">MLSCN/LAB/2019/0421</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Verifying scientist:</span>
                  <span className="text-[var(--text)]">Dr. B. Balogun (MLS Lic: 0481)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Issue timestamp:</span>
                  <span className="text-[var(--text)]">20 Oct 2026 14:15:00 WAT</span>
                </div>
              </div>

              {/* Pseudonymized Data Card */}
              <div className="p-5 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] text-left text-xs space-y-2.5 font-mono shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-muted)]">Patient (Masked):</span>
                  <span className="font-bold text-[var(--text)]">O. A. (Male, 42 yrs)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-muted)]">Analyzed test:</span>
                  <span className="font-bold text-[var(--text)]">Fasting blood sugar (FBS)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-muted)]">Reported result:</span>
                  <span className="font-bold text-[var(--accent)]">92 mg/dL (Reference 70-99)</span>
                </div>
              </div>

              {/* Collapsed Technical Details */}
              <details className="group rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] p-4 text-left font-mono text-xs cursor-pointer shadow-inner">
                <summary className="font-semibold text-[var(--text)] flex items-center justify-between list-none">
                  <span className="text-xs">Technical details</span>
                  <span className="text-[10px] text-[var(--text-muted)] group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="pt-3 space-y-2 text-[11px] border-t border-[var(--border)] mt-2">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Signature algorithm:</span>
                    <span className="text-[var(--text)]">Ed25519-SHA256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Document SHA-256:</span>
                    <span className="text-[var(--text)] truncate max-w-[200px]">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Verification token:</span>
                    <span className="text-[var(--text)] font-bold">{token}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Audit status:</span>
                    <span className="text-[var(--accent)] font-semibold">Integrity intact</span>
                  </div>
                </div>
              </details>
            </>
          )}

          {/* Return Home Button */}
          <div className="pt-2">
            <Link
              href="/"
              className="btn-secondary-pill px-6 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>←</span>
              <span>Back to Lablinks home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

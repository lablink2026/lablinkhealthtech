'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] text-[13px] pt-16 pb-12 transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
        {/* Newsletter Block at the top */}
        <div className="rounded-[24px] glass p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg">
            <span className="eyebrow-label text-[var(--accent)]">Diagnostic intelligence</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
              Stay informed on Nigerian laboratory standards
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Periodic updates on MLSCN compliance updates, new diagnostic facilities, and testing advisories.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
            {subscribed ? (
              <div className="px-5 py-3 rounded-full glass border border-[var(--accent)] text-[var(--accent)] text-xs font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Subscribed to updates</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="px-5 py-3 rounded-full bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text)] placeholder-[var(--text-muted)] text-xs sm:text-sm focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none min-w-[260px]"
                />
                <button
                  type="submit"
                  className="btn-primary-pill px-6 py-3 text-xs sm:text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* Brand statement & 3 link columns: Product, Company, Connect */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed max-w-sm pt-2">
              Next-generation clinical diagnostic infrastructure connecting Nigerian patients with accredited laboratories through verified pricing, home sample collection, and cryptographically signed health proof.
            </p>
            <div className="eyebrow-label text-[10px] text-[var(--gold)]">
              MLSCN compliant · NDPA 2023 certified
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <h4 className="eyebrow-label text-[var(--text)]">Product</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/search" className="hover:text-[var(--text)] transition-colors">
                  Find and compare labs
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-[var(--text)] transition-colors">
                  Booking and collection
                </Link>
              </li>
              <li>
                <Link href="/patient/dashboard" className="hover:text-[var(--text)] transition-colors">
                  Biomarker trends
                </Link>
              </li>
              <li>
                <Link href="/verify/demo-token-12345" className="hover:text-[var(--text)] transition-colors">
                  Verified results
                </Link>
              </li>
              <li>
                <Link href="/#test-finder" className="hover:text-[var(--text)] transition-colors">
                  Lablink AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="eyebrow-label text-[var(--text)]">Company</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/#how-it-works" className="hover:text-[var(--text)] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-[var(--text)] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/lab/synlab-vi/dashboard" className="hover:text-[var(--text)] transition-colors">
                  For laboratories
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[var(--text)] transition-colors">
                  Regulatory console
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-[var(--text)] transition-colors">
                  Frequently asked questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-3">
            <h4 className="eyebrow-label text-[var(--text)]">Connect</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a href="mailto:support@lablink.ng" className="hover:text-[var(--text)] transition-colors">
                  support@lablink.ng
                </a>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Victoria Island, Lagos</span>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Garki Area 11, Abuja</span>
              </li>
              <li>
                <span className="data-tag text-[10px] text-[var(--accent)]">Platform online</span>
              </li>
            </ul>

            {/* Social media icons (IG, LinkedIn, Twitter, Email) */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="btn-icon-glass w-9 h-9 rounded-xl hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn-icon-glass w-9 h-9 rounded-xl hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="btn-icon-glass w-9 h-9 rounded-xl hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="mailto:support@lablink.ng"
                aria-label="Email"
                className="btn-icon-glass w-9 h-9 rounded-xl hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: Privacy, Terms & copyright */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <div>© {new Date().getFullYear()} Lablink Technologies Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/#privacy" className="hover:text-[var(--text)] transition-colors">
              Privacy policy
            </Link>
            <Link href="/#terms" className="hover:text-[var(--text)] transition-colors">
              Terms of service
            </Link>
            <Link href="/#clinical" className="hover:text-[var(--text)] transition-colors">
              Clinical standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

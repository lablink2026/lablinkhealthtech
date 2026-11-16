'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] text-[13px] pt-16 pb-12 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-14">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Logo />
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed max-w-sm pt-2">
              Lablinks makes it easier to find licensed labs across Nigeria, know your test prices upfront, and get your samples collected and results delivered safely.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-raised)] border border-[var(--border)] text-[11px] text-[var(--text)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Licensed Laboratories Across Nigeria</span>
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-3">
            <h4 className="eyebrow-label text-[var(--text)]">Platform</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/search" className="hover:text-[var(--text)] transition-colors">
                  Find a lab
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-[var(--text)] transition-colors">
                  Book a home visit
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-[var(--text)] transition-colors">
                  Verify a report
                </Link>
              </li>
              <li>
                <Link href="/#test-finder" className="hover:text-[var(--text)] transition-colors">
                  Find a test
                </Link>
              </li>
              <li>
                <Link href="/patient/dashboard" className="hover:text-[var(--text)] transition-colors">
                  My health records
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="eyebrow-label text-[var(--text)]">Solutions</h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link href="/patient/dashboard" className="hover:text-[var(--text)] transition-colors">
                  For patients &amp; families
                </Link>
              </li>
              <li>
                <Link href="/lab/apply" className="hover:text-[var(--text)] transition-colors">
                  For labs
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[var(--text)] transition-colors">
                  Our labs
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[var(--text)] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/standards" className="hover:text-[var(--text)] transition-colors text-[var(--accent)] font-medium inline-flex items-center gap-1">
                  <span>Read our quality standards</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-[var(--text)] transition-colors">
                  FAQs &amp; support
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-3">
            <h4 className="eyebrow-label text-[var(--text)]">Contact &amp; Hubs</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="mailto:support@lablinks.com" className="hover:text-[var(--text)] transition-colors font-medium text-[var(--text)]">
                  support@lablinks.com
                </a>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Victoria Island, Lagos</span>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Garki Area 11, Abuja</span>
              </li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span>Everything is running smoothly.</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: Privacy, Terms & Standards */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)] text-center sm:text-left">
          <div>© {new Date().getFullYear()} Lablinks. All rights reserved.</div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text)] transition-colors">
              Terms
            </Link>
            <Link href="/standards" className="hover:text-[var(--text)] transition-colors">
              Read our quality standards
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-2 sm:top-5 left-0 right-0 z-50 px-2 sm:px-6">
      <div className="max-w-[1240px] mx-auto h-[64px] sm:h-[74px] rounded-2xl glass px-3 sm:px-6 flex items-center justify-between transition-all shadow-lg border border-[var(--border)]">
        {/* Left: Brand Logo */}
        <Logo />

        {/* Centre Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] text-[var(--text-muted)] font-medium">
          <Link
            href="/search"
            className="hover:text-[var(--text)] transition-colors py-1"
          >
            Find a lab
          </Link>
          <Link
            href="/#catalog"
            className="hover:text-[var(--text)] transition-colors py-1"
          >
            Test prices
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-[var(--text)] transition-colors py-1"
          >
            How it works
          </Link>
          <Link
            href="/#faqs"
            className="hover:text-[var(--text)] transition-colors py-1"
          >
            FAQs
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/lab/apply"
            className="hidden lg:inline-flex text-[13px] font-semibold text-[var(--text-muted)] hover:text-[var(--text)] py-2 transition-colors"
          >
            For labs
          </Link>

          <Link
            href="/login"
            className="hidden sm:inline-flex text-[13px] font-semibold text-[var(--text-muted)] hover:text-[var(--text)] px-2 py-2 transition-colors"
          >
            Sign in
          </Link>

          {/* Primary pill button: Book a test (visible on desktop and mobile) */}
          <Link
            href="/book"
            className="btn-primary-pill px-3 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-[13px] font-bold inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer text-white shadow-sm flex-shrink-0"
          >
            <span>Book a test</span>
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <ThemeToggle />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden btn-icon-glass cursor-pointer flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5 text-[var(--text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 rounded-2xl bg-[var(--bg-raised)] border border-[var(--border)] shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="space-y-1">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--text)] rounded-xl hover:bg-[var(--surface)]"
            >
              Find a lab
            </Link>
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--text)] rounded-xl hover:bg-[var(--surface)]"
            >
              Test prices
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--text)] rounded-xl hover:bg-[var(--surface)]"
            >
              How it works
            </Link>
            <Link
              href="/#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--text)] rounded-xl hover:bg-[var(--surface)]"
            >
              FAQs
            </Link>
            <Link
              href="/lab/apply"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--text)] rounded-xl hover:bg-[var(--surface)]"
            >
              For labs
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2.5 text-sm font-semibold text-[var(--text)] rounded-xl hover:bg-[var(--surface)] border-t border-[var(--border)] mt-2 pt-2"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

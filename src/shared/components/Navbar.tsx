'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';

export function Navbar() {
  const [productOpen, setProductOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const productRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productRef.current && !productRef.current.contains(event.target as Node)) {
        setProductOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto h-[74px] rounded-[24px] glass px-5 sm:px-6 flex items-center justify-between transition-all">
        {/* Left: Lablink Logo */}
        <Logo />

        {/* Center-Right Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px] text-[var(--text-muted)] font-medium">
          {/* Product Dropdown */}
          <div className="relative" ref={productRef}>
            <button
              onClick={() => {
                setProductOpen(!productOpen);
                setSolutionsOpen(false);
              }}
              className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors py-2 focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
              aria-expanded={productOpen}
            >
              <span>Product</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {productOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 rounded-[20px] glass-strong p-3 space-y-1 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150">
                <Link
                  href="/search"
                  onClick={() => setProductOpen(false)}
                  className="block p-2.5 rounded-xl hover:bg-[var(--glass-strong)] transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text)]">Find and compare labs</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Browse accredited pricing & turnarounds</div>
                </Link>
                <Link
                  href="/book"
                  onClick={() => setProductOpen(false)}
                  className="block p-2.5 rounded-xl hover:bg-[var(--glass-strong)] transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text)]">Booking and home collection</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Cold-chain mobile phlebotomist visits</div>
                </Link>
                <Link
                  href="/verify/demo-token-12345"
                  onClick={() => setProductOpen(false)}
                  className="block p-2.5 rounded-xl hover:bg-[var(--glass-strong)] transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text)]">Verified results</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Ed25519 tamper-proof QR verification</div>
                </Link>
                <Link
                  href="/#test-finder"
                  onClick={() => setProductOpen(false)}
                  className="block p-2.5 rounded-xl hover:bg-[var(--glass-strong)] transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text)]">Lablink AI</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Assistive, non-diagnostic guidance</div>
                </Link>
                <Link
                  href="/lab/synlab-vi/dashboard"
                  onClick={() => setProductOpen(false)}
                  className="block p-2.5 rounded-xl hover:bg-[var(--glass-strong)] transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text)]">Lab dashboard</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Operating telemetry & batch sign-off</div>
                </Link>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              onClick={() => {
                setSolutionsOpen(!solutionsOpen);
                setProductOpen(false);
              }}
              className="flex items-center gap-1.5 hover:text-[var(--text)] transition-colors py-2 focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
              aria-expanded={solutionsOpen}
            >
              <span>Solutions</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {solutionsOpen && (
              <div className="absolute top-full left-0 mt-3 w-72 rounded-[20px] glass-strong p-3 space-y-1 shadow-2xl border border-[var(--border)] animate-in fade-in zoom-in-95 duration-150">
                <Link
                  href="/patient/dashboard"
                  onClick={() => setSolutionsOpen(false)}
                  className="block p-2.5 rounded-xl hover:bg-[var(--glass-strong)] transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text)]">For patients</div>
                  <div className="text-[11px] text-[var(--text-muted)]">Repeat biomarker tracking & records</div>
                </Link>
                <Link
                  href="/lab/synlab-vi/dashboard"
                  onClick={() => setSolutionsOpen(false)}
                  className="block p-2.5 rounded-xl hover:bg-[var(--glass-strong)] transition-colors"
                >
                  <div className="text-[13px] font-semibold text-[var(--text)]">For laboratories</div>
                  <div className="text-[11px] text-[var(--text-muted)]">MLSCN compliance & billing software</div>
                </Link>
                <div className="block p-2.5 rounded-xl opacity-75">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[var(--text)]">For healthcare providers</span>
                    <span className="data-tag text-[9px] text-[var(--gold)]">Early access</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">Clinical referral APIs & batch dispatch</div>
                </div>
              </div>
            )}
          </div>

          <Link href="/#how-it-works" className="hover:text-[var(--text)] transition-colors">
            How it works
          </Link>
          <Link href="/#pricing" className="hover:text-[var(--text)] transition-colors">
            Pricing
          </Link>
          <Link href="/#faqs" className="hover:text-[var(--text)] transition-colors">
            FAQ
          </Link>
          <Link href="/login" className="hover:text-[var(--text)] transition-colors">
            Log in
          </Link>
        </nav>

        {/* Right Actions: Find a lab button & Theme Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="btn-primary-pill px-5 py-2.5 text-[13px] hidden sm:inline-flex items-center gap-1.5"
          >
            <span>Find a lab</span>
            <svg
              className="w-4 h-4"
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
            className="lg:hidden btn-icon-glass"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-5 h-5 text-[var(--text)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.75"
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

      {/* Mobile Glass Sheet Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-[1200px] mx-auto rounded-[24px] glass-strong p-6 border border-[var(--border)] shadow-2xl space-y-4">
          <div className="space-y-2 text-sm font-medium">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              Find and compare labs
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              Booking and home collection
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              How it works
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              Pricing
            </Link>
            <Link
              href="/#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              FAQ
            </Link>
            <Link
              href="/patient/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              For patients
            </Link>
            <Link
              href="/lab/synlab-vi/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              For laboratories
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[var(--text)] hover:text-[var(--accent)]"
            >
              Log in
            </Link>
          </div>
          <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary-pill text-center py-3 text-sm"
            >
              Find a lab
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

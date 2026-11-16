'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AccentHeading } from '../../shared/components/AccentHeading';

export default function LoginPage() {
  const router = useRouter();
  const [roleTab, setRoleTab] = useState<'patient' | 'lab'>('patient');

  // Patient inputs
  const [patientIdentifier, setPatientIdentifier] = useState('');
  const [patientOtp, setPatientOtp] = useState('');

  // Lab inputs
  const [labEmail, setLabEmail] = useState('');
  const [labPassword, setLabPassword] = useState('');

  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/patient/dashboard');
  };

  const handleLabLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/lab/apex-vi/dashboard');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-[480px] space-y-6">
        {/* Header with AccentHeading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-[var(--border)]">
            <svg
              className="w-3.5 h-3.5 text-[var(--accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="eyebrow-label text-[10px] text-[var(--accent)]">
              Secure authentication
            </span>
          </div>

          <AccentHeading
            plainText="Sign in to"
            accentText="Lablinks."
            size="section"
            tag="h1"
            align="center"
          />

          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-sm mx-auto">
            Choose your portal: patient health account or diagnostic laboratory operating console.
          </p>
        </div>

        {/* Role Switcher Pill Tabs */}
        <div className="p-1 rounded-full glass border border-[var(--border)] grid grid-cols-2 text-xs font-semibold">
          <button
            onClick={() => setRoleTab('patient')}
            className={`py-2.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer ${
              roleTab === 'patient'
                ? 'bg-[var(--accent)] text-white font-bold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Patient portal</span>
          </button>

          <button
            onClick={() => setRoleTab('lab')}
            className={`py-2.5 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer ${
              roleTab === 'lab'
                ? 'bg-[var(--accent)] text-white font-bold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Laboratory console</span>
          </button>
        </div>

        {/* Centered Glass Card */}
        <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-2xl border border-[var(--border)] card-hover-lift">
          {roleTab === 'patient' ? (
            <form onSubmit={handlePatientLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">
                  Nigerian phone number
                </label>
                <input
                  type="tel"
                  value={patientIdentifier}
                  onChange={(e) => setPatientIdentifier(e.target.value)}
                  placeholder="+234 803 000 0000"
                  required
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text)]">
                    One-time verification code (OTP)
                  </label>
                  <span className="text-[11px] text-[var(--accent)] font-medium cursor-pointer hover:underline">
                    Resend code
                  </span>
                </div>
                <input
                  type="text"
                  value={patientOtp}
                  onChange={(e) => setPatientOtp(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm tracking-widest font-mono text-center border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary-pill py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Access patient portal</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          ) : (
            <form onSubmit={handleLabLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">
                  Work email address
                </label>
                <input
                  type="email"
                  value={labEmail}
                  onChange={(e) => setLabEmail(e.target.value)}
                  placeholder="admin@laboratory.ng"
                  required
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[var(--text)]">
                    Password
                  </label>
                  <span className="text-[11px] text-[var(--accent)] font-medium cursor-pointer hover:underline">
                    Reset password
                  </span>
                </div>
                <input
                  type="password"
                  value={labPassword}
                  onChange={(e) => setLabPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary-pill py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                <span>Launch lab console</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-[var(--border)] flex justify-between items-center text-xs">
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text)] transition">
              ← Return to homepage
            </Link>
            <span className="text-[var(--text-muted)]">
              Need help? <a href="mailto:support@lablinks.com" className="text-[var(--accent)] hover:underline">Support</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

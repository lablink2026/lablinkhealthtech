'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LabApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    facilityName: '',
    licenseNumber: '',
    directorName: '',
    email: '',
    phone: '',
    state: 'Lagos',
    address: '',
    homePhlebotomy: true,
    specialties: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-[860px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-10">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--accent)] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>Accredited Partner Onboarding</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text)] tracking-tight">
          Bring your laboratory to Lablinks.
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
          Join Nigeria&apos;s network of verified diagnostic laboratories. Expand your patient reach, automate sample accessioning, and issue tamper-proof verifiable digital reports.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xl text-center space-y-5 animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center mx-auto text-3xl">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-[var(--text)]">Application Received</h2>
          <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
            Thank you for registering <strong className="text-[var(--text)]">{formData.facilityName || 'your facility'}</strong>. Our Clinical Compliance Team will verify your MLSCN credentials and reach out within 24 business hours to complete your digital onboarding.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/"
              className="btn-primary-pill px-6 py-2.5 text-xs font-bold text-white inline-flex items-center gap-2"
            >
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-sm space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[var(--text)] border-b border-[var(--border)] pb-3">
                Laboratory Information
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">Facility Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Diagnostics Centre"
                  value={formData.facilityName}
                  onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text)]">MLSCN Licence Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="MLSCN/LAB/20XX/XXXX"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text)]">State / Territory *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none"
                  >
                    <option value="Lagos">Lagos State</option>
                    <option value="Abuja">Federal Capital Territory (Abuja)</option>
                    <option value="Rivers">Rivers State</option>
                    <option value="Oyo">Oyo State</option>
                    <option value="Other">Other States (Upcoming)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">Physical Laboratory Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street address, LGA, City"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">Scientist / Director in Charge *</label>
                <input
                  type="text"
                  required
                  placeholder="Full name & credentials (e.g. MLS, AIMLS, FMCPath)"
                  value={formData.directorName}
                  onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text)]">Official Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@labname.ng"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[var(--text)]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 80X XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.homePhlebotomy}
                    onChange={(e) => setFormData({ ...formData, homePhlebotomy: e.target.checked })}
                    className="w-4 h-4 rounded text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <span className="text-xs text-[var(--text)] font-medium">
                    Our facility offers mobile phlebotomists for home sample collection
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border)]">
              <button
                type="submit"
                className="btn-primary-pill w-full py-3.5 text-xs sm:text-sm font-bold text-white shadow-md cursor-pointer"
              >
                Submit Laboratory Application
              </button>
              <p className="text-[11px] text-[var(--text-muted)] text-center pt-2">
                By applying, you confirm that your laboratory holds an active MLSCN premise licence.
              </p>
            </div>
          </form>

          {/* Sidebar Benefits */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] space-y-4">
              <h3 className="font-bold text-sm text-[var(--text)]">
                Why partner with Lablinks?
              </h3>
              <ul className="space-y-3 text-xs text-[var(--text-muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Zero monthly platform fees</strong> — list your test menu and pay only on completed patient bookings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Automated barcode generation</strong> for clean specimen accessioning and error-free tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Two-tier result sign-off</strong> to protect diagnostic integrity before reports are released.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent)] font-bold">✓</span>
                  <span><strong>Instant Paystack reconciliation</strong> into your designated corporate Nigerian bank account.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--text-muted)] space-y-2">
              <div className="font-bold text-[var(--text)]">Questions before applying?</div>
              <p>Contact our Laboratory Relations team at:</p>
              <a href="mailto:partners@lablinks.com" className="text-[var(--accent)] font-bold hover:underline block">
                partners@lablinks.com
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

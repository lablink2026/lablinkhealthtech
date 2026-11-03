'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../../shared/components/AccentHeading';

export default function BookingPage() {
  const [collectionType, setCollectionType] = useState<'walk_in' | 'home_collection'>('home_collection');
  const [selectedLab, setSelectedLab] = useState('synlab-vi');
  const [scheduledDate, setScheduledDate] = useState('2026-11-04');
  const [scheduledSlot, setScheduledSlot] = useState('08:00 - 09:00 AM');
  const [patientChoice, setPatientChoice] = useState('self');
  const [address, setAddress] = useState('14 Admiralty Way, Lekki Phase 1, Lagos');
  const [paymentOption, setPaymentOption] = useState<'paystack' | 'pay_at_lab'>('paystack');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const testFeeKobo = 220000; // ₦2,200
  const homeFeeKobo = collectionType === 'home_collection' ? 400000 : 0; // ₦4,000
  const totalKobo = testFeeKobo + homeFeeKobo;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const reference = 'LL-202611-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setConfirmedBooking({
      reference,
      labName: selectedLab === 'synlab-vi' ? 'Synlab Diagnostics VI' : 'Medex Diagnostic Centre Yaba',
      collectionType,
      scheduledDate,
      scheduledSlot,
      patientName: patientChoice === 'self' ? 'Olumide Adeyemi' : 'Ayomide Adeyemi (Child)',
      totalNgn: '₦' + (totalKobo / 100).toLocaleString(),
      paymentStatus: paymentOption === 'paystack' ? 'Paid online via Paystack' : 'Pay at laboratory reception'
    });
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-36 pb-24 space-y-6">
        <div className="rounded-[28px] glass p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full glass border border-[var(--accent)] text-[var(--accent)] text-2xl font-black flex items-center justify-center mx-auto shadow-sm">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-1">
            <span className="eyebrow-label text-[var(--accent)]">Order locked</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              Booking confirmed
            </h1>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Reference: <span className="font-bold text-[var(--accent)]">{confirmedBooking.reference}</span>
              <span className="ml-2 data-tag text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
            </p>
          </div>

          {/* Opaque Raised Confirmation Slip */}
          <div className="p-6 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] text-left text-xs space-y-3 font-mono">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Diagnostic facility:</span>
              <span className="font-bold text-[var(--text)]">{confirmedBooking.labName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Patient:</span>
              <span className="font-bold text-[var(--text)]">{confirmedBooking.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Collection mode:</span>
              <span className="text-[var(--accent)] font-bold capitalize">
                {confirmedBooking.collectionType.replace('_', ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Schedule slot:</span>
              <span className="text-[var(--text)]">{confirmedBooking.scheduledDate} ({confirmedBooking.scheduledSlot})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Billing status:</span>
              <span className="font-bold text-[var(--gold)]">{confirmedBooking.paymentStatus}</span>
            </div>
            <div className="pt-2 border-t border-[var(--border)] flex justify-between text-sm">
              <span className="text-[var(--text-muted)] font-sans font-semibold">Total settled:</span>
              <span className="font-bold text-[var(--text)]">{confirmedBooking.totalNgn}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/patient/dashboard"
              className="flex-1 btn-primary-pill text-center py-3 text-xs font-bold"
            >
              View in patient dashboard
            </Link>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="flex-1 btn-secondary-pill py-3 text-xs font-semibold"
            >
              Book another test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-10">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="eyebrow-label text-[var(--accent)]">Appointment scheduling</span>
        <AccentHeading
          plainText="Schedule your"
          accentText="laboratory test."
          size="section"
          tag="h1"
          align="center"
        />
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Select your collection preference: walk in to the diagnostic centre or dispatch a certified phlebotomist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (8 Cols) */}
        <form onSubmit={handleBooking} className="lg:col-span-7 space-y-6">
          {/* Collection Mode Tabs */}
          <div className="p-1 rounded-full glass border border-[var(--border)] grid grid-cols-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setCollectionType('home_collection')}
              className={`py-3 rounded-full transition-all flex items-center justify-center gap-2 ${
                collectionType === 'home_collection'
                  ? 'bg-[var(--accent)] text-[#0A0F0D] font-bold shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home collection (+₦4,000)</span>
            </button>

            <button
              type="button"
              onClick={() => setCollectionType('walk_in')}
              className={`py-3 rounded-full transition-all flex items-center justify-center gap-2 ${
                collectionType === 'walk_in'
                  ? 'bg-[var(--accent)] text-[#0A0F0D] font-bold shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Walk-in visit</span>
            </button>
          </div>

          <div className="rounded-[24px] glass p-6 sm:p-8 space-y-5">
            {/* Facility Choice */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text)]">Select accredited facility</label>
              <select
                value={selectedLab}
                onChange={(e) => setSelectedLab(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none font-medium"
              >
                <option value="synlab-vi">Synlab Diagnostics VI (Victoria Island, Lagos)</option>
                <option value="medex-yaba">Medex Diagnostic Centre Yaba (Herbert Macaulay, Lagos)</option>
                <option value="carepoint-ikeja">CarePoint Diagnostics (Allen Avenue, Ikeja)</option>
                <option value="fcd-garki">Federal Capital Diagnostics (Area 11, Garki, Abuja)</option>
              </select>
            </div>

            {/* Test Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text)]">Diagnostic test</label>
              <div className="p-3.5 rounded-xl bg-[var(--bg-raised)] border border-[var(--border)] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[var(--text)]">Fasting blood sugar (FBS)</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">Fluoride plasma · 8-12h overnight fast</div>
                </div>
                <div className="font-serif italic text-base text-[var(--text)]">₦2,200</div>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">Appointment date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">Time slot</label>
                <select
                  value={scheduledSlot}
                  onChange={(e) => setScheduledSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none font-medium"
                >
                  <option value="07:30 - 08:30 AM">07:30 - 08:30 AM (Fasting window)</option>
                  <option value="08:30 - 09:30 AM">08:30 - 09:30 AM</option>
                  <option value="09:30 - 10:30 AM">09:30 - 10:30 AM</option>
                  <option value="11:00 - 12:00 PM">11:00 - 12:00 PM</option>
                </select>
              </div>
            </div>

            {/* Patient Choice */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text)]">Who is this test for?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPatientChoice('self')}
                  className={`p-3 rounded-xl border text-left text-xs transition ${
                    patientChoice === 'self'
                      ? 'bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)]'
                      : 'glass border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <div className="font-bold">Self (Olumide Adeyemi)</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">42 yrs · Lekki, Lagos</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPatientChoice('child')}
                  className={`p-3 rounded-xl border text-left text-xs transition ${
                    patientChoice === 'child'
                      ? 'bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)]'
                      : 'glass border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <div className="font-bold">Dependent (Ayomide)</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">Child dependent</div>
                </button>
              </div>
            </div>

            {/* Address if home collection */}
            {collectionType === 'home_collection' && (
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-[var(--text)]">Sample collection address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, apartment, landmarks"
                  required
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                />
              </div>
            )}

            {/* Payment Method */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-[var(--text)]">Payment method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentOption('paystack')}
                  className={`p-3.5 rounded-xl border text-left text-xs flex items-center justify-between ${
                    paymentOption === 'paystack'
                      ? 'bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)]'
                      : 'glass border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <div>
                    <div className="font-bold">Paystack (Instant)</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Cards, USSD, bank transfer</div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]"></span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentOption('pay_at_lab')}
                  className={`p-3.5 rounded-xl border text-left text-xs flex items-center justify-between ${
                    paymentOption === 'pay_at_lab'
                      ? 'bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)]'
                      : 'glass border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  <div>
                    <div className="font-bold">Pay at reception</div>
                    <div className="text-[11px] text-[var(--text-muted)]">Cash or POS on arrival</div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full border border-[var(--border)]"></span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary-pill py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-4"
            >
              <span>Confirm and reserve appointment</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right Summary Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-[24px] glass p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1">
              <span className="eyebrow-label text-[var(--accent)]">Order summary</span>
              <h2 className="text-xl font-bold text-[var(--text)]">Transparent fee breakdown</h2>
            </div>

            <div className="p-4 rounded-[16px] bg-[var(--bg-raised)] border border-[var(--border)] space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Fasting blood sugar (FBS)</span>
                <span className="font-bold text-[var(--text)]">₦2,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Home phlebotomist visit</span>
                <span className="font-bold text-[var(--text)]">
                  {collectionType === 'home_collection' ? '₦4,000' : '₦0 (Walk-in)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Cold-chain specimen kit</span>
                <span className="text-[var(--accent)] font-semibold">Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Ed25519 digital QR seal</span>
                <span className="text-[var(--gold)] font-semibold">Included</span>
              </div>
              <div className="pt-3 border-t border-[var(--border)] flex justify-between items-baseline font-sans">
                <span className="text-sm font-bold text-[var(--text)]">Total amount</span>
                <span className="text-3xl font-serif italic text-[var(--text)]">
                  ₦{(totalKobo / 100).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Cold chain & assurance badges */}
            <div className="space-y-2.5 text-xs text-[var(--text-muted)] pt-1">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Temperature-controlled ice-pack cold-chain kit</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>On-site barcoding for 100% chain-of-custody</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--gold)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Encrypted medical records under NDPA standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

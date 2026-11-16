'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../../shared/components/AccentHeading';

export default function BookingPage() {
  const [collectionType, setCollectionType] = useState<'walk_in' | 'home_collection'>('walk_in');
  const [selectedLab, setSelectedLab] = useState('apex-vi');
  const [scheduledDate, setScheduledDate] = useState('2026-11-15');
  const [scheduledSlot, setScheduledSlot] = useState('08:00 - 09:00 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [address, setAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState<'paystack' | 'pay_at_lab'>('paystack');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const testFeeKobo = 220000; // ₦2,200
  const homeFeeKobo = 400000; // ₦4,000
  const activeFeeKobo = collectionType === 'home_collection' ? testFeeKobo + homeFeeKobo : testFeeKobo;

  const labsMap: Record<string, string> = {
    'apex-vi': 'Apex Clinical Diagnostics VI',
    'metro-yaba': 'Metro Diagnostic Centre Yaba',
    'echo-ikeja': 'Echo Health Diagnostics Ikeja',
    'fcd-garki': 'Federal Capital Diagnostics Garki'
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const reference = 'LL-202611-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setConfirmedBooking({
      reference,
      labName: labsMap[selectedLab] || 'Apex Clinical Diagnostics VI',
      collectionType,
      scheduledDate,
      scheduledSlot,
      patientName: patientName.trim() || 'Guest Patient',
      patientPhone: patientPhone.trim() || 'Not specified',
      totalNgn: '₦' + (activeFeeKobo / 100).toLocaleString(),
      paymentStatus: paymentOption === 'paystack' ? 'Paid online via Paystack' : 'Pay at laboratory reception'
    });
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-xl mx-auto px-4 pt-32 sm:pt-40 pb-24 space-y-6">
        <div className="rounded-[28px] glass p-6 sm:p-10 shadow-2xl text-center space-y-6 border border-[var(--border)] card-hover-lift shimmer-sheen">
          <div className="w-16 h-16 rounded-full glass border border-[var(--accent)] text-[var(--accent)] text-2xl font-black flex items-center justify-center mx-auto shadow-md">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-1">
            <span className="eyebrow-label text-[var(--accent)]">Order confirmed</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text)]">
              Appointment reserved
            </h1>
            <p className="text-xs font-mono text-[var(--text-muted)]">
              Reference: <span className="font-bold text-[var(--accent)]">{confirmedBooking.reference}</span>
            </p>
          </div>

          {/* Confirmation Slip */}
          <div className="p-5 sm:p-6 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] text-left text-xs space-y-3 font-mono shadow-inner">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Diagnostic facility:</span>
              <span className="font-bold text-[var(--text)]">{confirmedBooking.labName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Patient name:</span>
              <span className="font-bold text-[var(--text)]">{confirmedBooking.patientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Contact phone:</span>
              <span className="text-[var(--text)]">{confirmedBooking.patientPhone}</span>
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
              <span className="text-[var(--text-muted)]">Billing method:</span>
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
              Go to patient dashboard
            </Link>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="flex-1 btn-secondary-pill py-3 text-xs font-semibold cursor-pointer"
            >
              Book another test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-24 space-y-10">
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
          Choose a verified facility and select walk-in or doorstep phlebotomy dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 Cols) */}
        <form onSubmit={handleBooking} className="lg:col-span-7 space-y-6">
          {/* Collection Mode Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCollectionType('walk_in')}
              className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                collectionType === 'walk_in'
                  ? 'bg-[var(--bg-raised)] border-[var(--accent)] shadow-md'
                  : 'glass border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Walk-in visit
                </span>
                <span className={`w-3 h-3 rounded-full border ${collectionType === 'walk_in' ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--border)]'}`} />
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">Visit the laboratory reception during scheduled fasting window</div>
              <div className="pt-2 text-sm font-serif italic font-bold text-[var(--text)]">₦2,200</div>
            </button>

            <button
              type="button"
              onClick={() => setCollectionType('home_collection')}
              className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                collectionType === 'home_collection'
                  ? 'bg-[var(--bg-raised)] border-[var(--accent)] shadow-md'
                  : 'glass border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/50'
              }`}
            >
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home collection (+₦4,000)
                </span>
                <span className={`w-3 h-3 rounded-full border ${collectionType === 'home_collection' ? 'bg-[var(--accent)] border-[var(--accent)]' : 'border-[var(--border)]'}`} />
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">Phlebotomist from chosen lab dispatched with cold-chain sample kit</div>
              <div className="pt-2 text-sm font-serif italic font-bold text-[var(--text)]">₦6,200</div>
            </button>
          </div>

          <div className="rounded-[28px] glass p-6 sm:p-8 space-y-5 border border-[var(--border)] card-hover-lift shadow-xl">
            {/* Facility Choice */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text)]">Select licensed facility</label>
              <select
                value={selectedLab}
                onChange={(e) => setSelectedLab(e.target.value)}
                className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none font-medium cursor-pointer"
              >
                <option value="apex-vi">Apex Clinical Diagnostics VI (Victoria Island, Lagos)</option>
                <option value="metro-yaba">Metro Diagnostic Centre Yaba (Herbert Macaulay, Lagos)</option>
                <option value="echo-ikeja">Echo Health Diagnostics Ikeja (Allen Avenue, Ikeja)</option>
                <option value="fcd-garki">Federal Capital Diagnostics Garki (Area 11, Garki, Abuja)</option>
              </select>
            </div>

            {/* Test Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text)]">Diagnostic test</label>
              <div className="p-3.5 rounded-2xl bg-[var(--bg-raised)] border border-[var(--border)] flex items-center justify-between shadow-inner">
                <div>
                  <div className="font-bold text-xs text-[var(--text)]">Fasting blood sugar (FBS)</div>
                  <div className="text-[11px] text-[var(--text-muted)] font-mono">Fluoride plasma · 8-12h overnight fast</div>
                </div>
                <div className="font-serif italic text-base text-[var(--text)] font-semibold">₦2,200</div>
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
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none cursor-pointer"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text)]">Time slot</label>
                <select
                  value={scheduledSlot}
                  onChange={(e) => setScheduledSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none font-medium cursor-pointer"
                >
                  <option value="07:30 - 08:30 AM">07:30 - 08:30 AM (Fasting window)</option>
                  <option value="08:30 - 09:30 AM">08:30 - 09:30 AM</option>
                  <option value="09:30 - 10:30 AM">09:30 - 10:30 AM</option>
                  <option value="11:00 - 12:00 PM">11:00 - 12:00 PM</option>
                </select>
              </div>
            </div>

            {/* Patient Information Inputs */}
            <div className="space-y-3 pt-1">
              <label className="text-xs font-semibold text-[var(--text)]">Patient information</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Full legal name"
                    required
                    className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Mobile phone (+234...)"
                    required
                    className="w-full px-4 py-3 rounded-full bg-[var(--bg-raised)] text-[var(--text)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address if home collection */}
            {collectionType === 'home_collection' && (
              <div className="space-y-1.5 pt-1 animate-in fade-in duration-150">
                <label className="text-xs font-semibold text-[var(--text)]">Sample collection address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street address, building, landmarks"
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
                  className={`p-3.5 rounded-2xl border text-left text-xs flex items-center justify-between cursor-pointer transition ${
                    paymentOption === 'paystack'
                      ? 'bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)] shadow-sm'
                      : 'glass border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/50'
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
                  className={`p-3.5 rounded-2xl border text-left text-xs flex items-center justify-between cursor-pointer transition ${
                    paymentOption === 'pay_at_lab'
                      ? 'bg-[var(--bg-raised)] border-[var(--accent)] text-[var(--text)] shadow-sm'
                      : 'glass border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]/50'
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
              className="w-full btn-primary-pill py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 mt-4 cursor-pointer"
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
          <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl border border-[var(--border)] card-hover-lift">
            <div className="space-y-1">
              <span className="eyebrow-label text-[var(--accent)]">Fee comparison</span>
              <h2 className="text-xl font-bold text-[var(--text)]">Side-by-side pricing</h2>
            </div>

            {/* Side-by-side Total Box */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[var(--bg-raised)] border border-[var(--border)]">
              <div className={`p-3 rounded-xl border text-center transition ${collectionType === 'walk_in' ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-transparent'}`}>
                <div className="text-[11px] text-[var(--text-muted)] font-semibold">Walk-in visit</div>
                <div className="text-lg font-serif italic font-bold text-[var(--text)] pt-1">₦2,200</div>
                <div className="text-[10px] text-[var(--accent)] mt-0.5">Test fee only</div>
              </div>
              <div className={`p-3 rounded-xl border text-center transition ${collectionType === 'home_collection' ? 'border-[var(--accent)] bg-[var(--accent)]/10' : 'border-transparent'}`}>
                <div className="text-[11px] text-[var(--text-muted)] font-semibold">Home visit</div>
                <div className="text-lg font-serif italic font-bold text-[var(--text)] pt-1">₦6,200</div>
                <div className="text-[10px] text-[var(--accent)] mt-0.5">Test + Phlebotomy</div>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] space-y-3 font-mono text-xs shadow-inner">
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
                <span className="text-[var(--text-muted)]">Tamper-evident QR seal</span>
                <span className="text-[var(--gold)] font-semibold">Included</span>
              </div>
              <div className="pt-3 border-t border-[var(--border)] flex justify-between items-baseline font-sans">
                <span className="text-sm font-bold text-[var(--text)]">Selected total</span>
                <span className="text-3xl font-serif italic text-[var(--text)]">
                  ₦{(activeFeeKobo / 100).toLocaleString()}
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
                <span>Barcoded sample tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>Phlebotomists from your chosen licensed laboratory</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--gold)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>See the full price before you pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

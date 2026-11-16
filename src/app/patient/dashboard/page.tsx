'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../../../shared/components/AccentHeading';

export default function PatientDashboardPage() {
  const [activeTab, setActiveTab] = useState<'trends' | 'results' | 'bookings'>('trends');
  const [explainingResult, setExplainingResult] = useState<any>(null);

  const glucoseTrends = [
    { date: '10 May 2026', value: 118, flag: 'abnormal', lab: 'Apex Clinical VI' },
    { date: '15 Aug 2026', value: 104, flag: 'abnormal', lab: 'Apex Clinical VI' },
    { date: '20 Oct 2026', value: 92,  flag: 'normal',   lab: 'Apex Clinical VI' }
  ];

  const handleExplainResult = (testName: string, value: string, range: string) => {
    setExplainingResult({
      testName,
      value,
      range,
      explanation:
        'Your fasting blood sugar of 92 mg/dL is within the expected normal reference range (70 - 99 mg/dL) for a healthy adult. This indicates your body is maintaining blood glucose levels effectively following an overnight fast.',
      nextSteps:
        'Continue balanced nutrition, regular hydration, and physical activity. Please discuss this report with your attending doctor during your next wellness review.',
      disclaimer:
        'Disclaimer: This plain-language summary is informational only and does not constitute a clinical diagnosis or treatment prescription. Always consult a qualified physician.'
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-24 space-y-8">
      {/* Patient Profile Card (Outer Glass) */}
      <div className="rounded-[28px] glass p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-[var(--border)] card-hover-lift">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl glass border border-[var(--border)] text-[var(--accent)] font-mono font-bold text-xl flex items-center justify-center shadow-sm flex-shrink-0">
            OA
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Olumide Adeyemi</h1>
              <span className="data-tag text-[9px] px-2.5 py-0.5 rounded-full glass border border-[var(--accent)] text-[var(--accent)] font-sans">
                Verified Patient
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Male · 42 yrs · Lekki Phase 1, Lagos · Genotype: <strong className="text-[var(--text)]">AA</strong> · Blood group: <strong className="text-[var(--text)]">O+</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/book"
            className="btn-primary-pill px-5 py-2.5 text-xs font-bold"
          >
            Book diagnostic test
          </Link>
          <div className="text-xs text-[var(--text-muted)] rounded-full glass px-4 py-2 border border-[var(--border)] font-mono">
            Dependent: <strong className="text-[var(--text)]">Ayomide (Child)</strong>
          </div>
        </div>
      </div>

      {/* Tabs - Mobile scrollable */}
      <div className="flex gap-4 sm:gap-6 border-b border-[var(--border)] text-xs font-mono tracking-wider font-semibold overflow-x-auto whitespace-nowrap pb-0.5">
        <button
          onClick={() => setActiveTab('trends')}
          className={`pb-3 px-1 transition border-b-2 uppercase cursor-pointer ${
            activeTab === 'trends'
              ? 'border-[var(--accent)] text-[var(--accent)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Biomarker trend chart
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-1 transition border-b-2 uppercase cursor-pointer ${
            activeTab === 'results'
              ? 'border-[var(--accent)] text-[var(--accent)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Verified lab reports (3)
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-1 transition border-b-2 uppercase cursor-pointer ${
            activeTab === 'bookings'
              ? 'border-[var(--accent)] text-[var(--accent)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Active bookings (1)
        </button>
      </div>

      {/* Tab 1: Biomarker Trend Chart */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl border border-[var(--border)] card-hover-lift">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="eyebrow-label text-[var(--accent)]">Historical tracking</span>
                <AccentHeading
                  plainText="Fasting blood sugar"
                  accentText="timeline."
                  size="card"
                  tag="h2"
                />
              </div>
              <span className="data-tag text-xs px-3 py-1.5 rounded-full glass border border-[var(--accent)] text-[var(--accent)] self-start sm:self-auto font-sans">
                Current: 92 mg/dL (Normal)
              </span>
            </div>

            {/* Visual Bar Chart Container */}
            <div className="bg-[var(--bg-raised)] rounded-[22px] p-6 sm:p-8 border border-[var(--border)] space-y-6 shadow-inner">
              <div className="h-52 flex items-end justify-between gap-4 sm:gap-6 pt-8 px-2 sm:px-16 border-b border-[var(--border)] relative overflow-hidden">
                {/* Reference line */}
                <div className="absolute left-0 right-0 bottom-14 border-t border-dashed border-[var(--accent)]/40 pointer-events-none">
                  <span className="absolute right-2 -top-4 data-tag text-[9px] text-[var(--accent)] bg-[var(--bg-raised)] px-2 py-0.5 rounded border border-[var(--accent)]/30">
                    Threshold: 99 mg/dL
                  </span>
                </div>

                {glucoseTrends.map((point, idx) => {
                  const heightPercent = Math.min(100, Math.max(25, (point.value / 140) * 100));
                  const isNormal = point.flag === 'normal';
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 max-w-[120px] group">
                      <span
                        className={`text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full transition-transform duration-200 group-hover:-translate-y-0.5 ${
                          isNormal
                            ? 'bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30'
                            : 'bg-amber-500/15 text-[var(--attention)] border border-[var(--attention)]/30'
                        }`}
                      >
                        {point.value} mg/dL
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full max-w-[44px] rounded-t-xl transition-all duration-500 ease-out group-hover:brightness-110 ${
                          isNormal
                            ? 'bg-gradient-to-t from-[var(--accent-deep)] to-[var(--accent)] shadow-md shadow-[var(--accent-glow)]'
                            : 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-md'
                        }`}
                      />
                      <span className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] text-center">
                        {point.date}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] font-mono pt-1 gap-2">
                <div>
                  Reference interval: <strong className="text-[var(--text)]">70 - 99 mg/dL</strong>
                </div>
                <div className="text-[var(--accent)] font-bold">
                  Trend: Baseline optimal (-22%)
                </div>
              </div>
            </div>

            {/* Plain Language Explainer Callout */}
            <div className="p-5 rounded-[22px] bg-[var(--bg-raised)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 text-xs">
                <div className="font-bold text-[var(--text)]">Longitudinal observation</div>
                <p className="text-[var(--text-muted)]">
                  Values have resolved from pre-diabetic elevation into normal fasting physiology over 6 months.
                </p>
              </div>
              <button
                onClick={() => handleExplainResult('Fasting blood sugar', '92 mg/dL', '70 - 99 mg/dL')}
                className="btn-primary-pill px-5 py-2.5 text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                Explain in plain language →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Signed Results */}
      {activeTab === 'results' && (
        <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl border border-[var(--border)] card-hover-lift">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border)] gap-2">
            <div>
              <span className="eyebrow-label text-[var(--accent)]">Official records</span>
              <h2 className="text-xl font-bold text-[var(--text)]">Verified laboratory reports</h2>
            </div>
            <span className="data-tag text-xs text-[var(--gold)] font-mono">
              ★ Cryptographic QR seal verified authentic
            </span>
          </div>

          {/* Table Container with Horizontal Scroll on Mobile */}
          <div className="overflow-x-auto rounded-[20px] border border-[var(--border)] bg-[var(--bg-raised)] shadow-inner">
            <table className="w-full text-xs text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-mono text-[11px] uppercase">
                  <th className="py-3.5 px-4 font-semibold">Test name</th>
                  <th className="py-3.5 px-4 font-semibold">Facility</th>
                  <th className="py-3.5 px-4 font-semibold">Issued</th>
                  <th className="py-3.5 px-4 font-semibold">Approver</th>
                  <th className="py-3.5 px-4 font-semibold">Verification</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text)]">
                {[
                  {
                    test: 'Fasting blood sugar (FBS)',
                    lab: 'Apex Clinical VI',
                    date: '20 Oct 2026',
                    approver: 'Dr. B. Balogun (MLS Lic: 0481)',
                    token: 'tok_fbs_948210',
                    value: '92 mg/dL'
                  },
                  {
                    test: 'Full blood count (FBC)',
                    lab: 'Apex Clinical VI',
                    date: '15 Aug 2026',
                    approver: 'Dr. B. Balogun (MLS Lic: 0481)',
                    token: 'tok_fbc_482910',
                    value: 'Hb 14.8 g/dL'
                  },
                  {
                    test: 'Lipid profile',
                    lab: 'Metro Diagnostic Centre Yaba',
                    date: '10 May 2026',
                    approver: 'Dr. C. Adeleke (MLS Lic: 0892)',
                    token: 'tok_lipid_582910',
                    value: 'Chol 182 mg/dL'
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-[var(--glass)] transition-colors">
                    <td className="py-4 px-4 font-bold text-[var(--text)]">{row.test}</td>
                    <td className="py-4 px-4 text-[var(--text-muted)]">{row.lab}</td>
                    <td className="py-4 px-4 font-mono text-[var(--text-muted)]">{row.date}</td>
                    <td className="py-4 px-4 text-[var(--text-muted)]">{row.approver}</td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/verify/${row.token}`}
                        className="font-mono text-xs font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                      >
                        <span className="text-[var(--gold)]">★</span>
                        <span>QR seal</span>
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleExplainResult(row.test, row.value, '70 - 99 mg/dL')}
                        className="btn-secondary-pill px-3 py-1 text-xs cursor-pointer"
                      >
                        Explain
                      </button>
                      <Link
                        href={`/verify/${row.token}`}
                        className="btn-primary-pill px-3.5 py-1 text-xs inline-block"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Active Bookings */}
      {activeTab === 'bookings' && (
        <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl border border-[var(--border)] card-hover-lift">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--border)] gap-2">
            <div>
              <span className="eyebrow-label text-[var(--accent)]">Appointment logistics</span>
              <h2 className="text-xl font-bold text-[var(--text)]">Active booking status</h2>
            </div>
            <span className="data-tag text-xs font-mono font-bold text-[var(--accent)] px-3 py-1 rounded-full glass border border-[var(--accent)]">
              Ref: LL-202611-B892
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3 p-6 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] shadow-inner">
              <div className="font-bold text-[var(--text)] text-sm">Appointment details</div>
              <div><strong className="text-[var(--text-muted)]">Facility:</strong> Apex Clinical Diagnostics VI</div>
              <div><strong className="text-[var(--text-muted)]">Collection mode:</strong> Home visit (Lekki Phase 1)</div>
              <div><strong className="text-[var(--text-muted)]">Scheduled:</strong> 15 Nov 2026 · 08:00 - 09:00 AM</div>
              <div><strong className="text-[var(--text-muted)]">Phlebotomist:</strong> Blessing Ibrahim (+2348020000004)</div>
              <div><strong className="text-[var(--text-muted)]">Total settled:</strong> ₦6,200 (Paid via Paystack)</div>
            </div>

            <div className="space-y-3 p-6 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] shadow-inner">
              <div className="font-bold text-[var(--text)] text-sm">Preparation guidelines</div>
              <ul className="list-disc list-inside space-y-1.5 text-[var(--text-muted)]">
                <li>Strict 10-hour overnight fast for fasting blood sugar test.</li>
                <li>Water is permitted. Avoid beverages, juice, coffee, or tea.</li>
                <li>Phlebotomist will verify your barcoded sample kit on arrival.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Plain Language Explainer Modal */}
      {explainingResult && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="glass-strong rounded-[28px] max-w-lg w-full p-6 sm:p-8 space-y-5 border border-[var(--border)] shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span className="data-tag text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-sans">
                  Plain language
                </span>
                <h3 className="font-bold text-[var(--text)] text-base">{explainingResult.testName}</h3>
              </div>
              <button
                onClick={() => setExplainingResult(null)}
                className="btn-icon-glass text-xs cursor-pointer"
                aria-label="Close explainer"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-[16px] bg-[var(--bg-raised)] border border-[var(--border)] text-xs flex justify-between font-mono shadow-inner">
              <span>Value: <strong className="text-[var(--accent)]">{explainingResult.value}</strong></span>
              <span>Interval: <strong className="text-[var(--text-muted)]">{explainingResult.range}</strong></span>
            </div>

            <div className="space-y-3 text-xs text-[var(--text)] leading-relaxed">
              <div>
                <h4 className="font-bold text-[var(--text)] mb-1">What this test measures and what your value means:</h4>
                <p className="text-[var(--text-muted)]">{explainingResult.explanation}</p>
              </div>
              <div>
                <h4 className="font-bold text-[var(--text)] mb-1">Suggested next steps:</h4>
                <p className="text-[var(--text-muted)]">{explainingResult.nextSteps}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl glass border border-[var(--gold)]/30 text-[11px] text-[var(--gold)] font-mono leading-relaxed">
              {explainingResult.disclaimer}
            </div>

            <button
              onClick={() => setExplainingResult(null)}
              className="w-full btn-secondary-pill py-3 text-xs font-bold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

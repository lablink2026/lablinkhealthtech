'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../../../../shared/components/AccentHeading';

export default function LabDashboardPage({
  params
}: {
  params: { slug: string };
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'bookings' | 'results'>('overview');
  const [resultSigned, setResultSigned] = useState(false);
  const [paramGlucose, setParamGlucose] = useState('92');
  const [anomalyWarning, setAnomalyWarning] = useState<string | null>(null);

  const handleGlucoseChange = (val: string) => {
    setParamGlucose(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 300) {
      setAnomalyWarning('Critical alert: Glucose value > 300 mg/dL is acutely elevated. Verify instrument calibration.');
    } else if (!isNaN(num) && num < 40) {
      setAnomalyWarning('Critical alert: Severe hypoglycemia (< 40 mg/dL). Immediate clinician notification warranted.');
    } else {
      setAnomalyWarning(null);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-8">
      {/* Lab Header (Glass) */}
      <div className="rounded-[28px] glass p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl glass border border-[var(--border)] text-[var(--accent)] font-mono font-bold text-xl flex items-center justify-center shadow-sm">
            SYN
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Synlab Diagnostics VI</h1>
              <span className="data-tag text-[9px] px-2.5 py-0.5 rounded-full glass border border-[var(--accent)] text-[var(--accent)]">
                MLSCN verified lab
              </span>
              <span className="data-tag text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Demo
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Plot 10, Adeola Odeku, Victoria Island · Lic: <strong className="text-[var(--text)]">MLSCN/LAB/2019/0421</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-right">
          <div>
            <div className="font-bold text-[var(--text)] text-xs">Dr. Folake Adeleke</div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">Laboratory administrator</div>
          </div>
          <div className="w-10 h-10 rounded-xl glass border border-[var(--border)] flex items-center justify-center font-mono font-bold text-[var(--accent)] text-xs">
            FA
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-6 border-b border-[var(--border)] text-xs font-mono tracking-wider font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-1 transition border-b-2 uppercase ${
            activeTab === 'overview'
              ? 'border-[var(--accent)] text-[var(--accent)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Operational telemetry
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 px-1 transition border-b-2 uppercase ${
            activeTab === 'catalog'
              ? 'border-[var(--accent)] text-[var(--accent)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Test catalog (40)
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-1 transition border-b-2 uppercase ${
            activeTab === 'bookings'
              ? 'border-[var(--accent)] text-[var(--accent)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Phlebotomy dispatch
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`pb-3 px-1 transition border-b-2 uppercase ${
            activeTab === 'results'
              ? 'border-[var(--accent)] text-[var(--accent)] font-bold'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Sign-off console
        </button>
      </div>

      {/* Tab 1: Operational Telemetry (Glass KPI cards with big numerals) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-[24px] glass p-6 space-y-2">
              <span className="eyebrow-label text-[10px] text-[var(--text-muted)]">Today&apos;s bookings</span>
              <div className="text-3xl sm:text-4xl font-serif italic text-[var(--text)] font-normal">28 tests</div>
              <div className="text-[var(--accent)] text-xs font-mono">↑ +14% velocity</div>
            </div>

            <div className="rounded-[24px] glass p-6 space-y-2">
              <span className="eyebrow-label text-[10px] text-[var(--text-muted)]">Gross volume (MTD)</span>
              <div className="text-3xl sm:text-4xl font-serif italic text-[var(--accent)] font-normal">₦1,420,000</div>
              <div className="text-[var(--text-muted)] text-xs font-mono">Reconciled via Paystack</div>
            </div>

            <div className="rounded-[24px] glass p-6 space-y-2">
              <span className="eyebrow-label text-[10px] text-[var(--text-muted)]">Average turnaround</span>
              <div className="text-3xl sm:text-4xl font-serif italic text-[var(--text)] font-normal">2.4 hours</div>
              <div className="text-[var(--accent)] text-xs font-mono">Target &lt; 4.0h met</div>
            </div>

            <div className="rounded-[24px] glass p-6 space-y-2">
              <span className="eyebrow-label text-[10px] text-[var(--text-muted)]">Home phlebotomy</span>
              <div className="text-3xl sm:text-4xl font-serif italic text-[var(--gold)] font-normal">46%</div>
              <div className="text-[var(--text-muted)] text-xs font-mono">13 visits dispatched</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Test Catalog (Opaque Table) */}
      {activeTab === 'catalog' && (
        <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <div className="space-y-1">
              <span className="eyebrow-label text-[var(--accent)]">Statutory test menu</span>
              <h2 className="text-xl font-bold text-[var(--text)]">Active diagnostic test catalog</h2>
            </div>
            <span className="data-tag text-xs font-mono text-[var(--accent)]">
              40 Nigerian tests active
            </span>
          </div>

          <div className="overflow-x-auto rounded-[20px] border border-[var(--border)] bg-[var(--bg-raised)]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-mono text-[11px] uppercase">
                  <th className="py-3.5 px-4 font-semibold">Code</th>
                  <th className="py-3.5 px-4 font-semibold">Test name</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Price</th>
                  <th className="py-3.5 px-4 font-semibold">Turnaround</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] text-[var(--text)] font-mono">
                {[
                  { code: 'FBS', name: 'Fasting blood sugar (FBS)', cat: 'Chemistry', price: '₦2,200', tat: '2h' },
                  { code: 'FBC', name: 'Full blood count (FBC)', cat: 'Hematology', price: '₦4,500', tat: '4h' },
                  { code: 'MP_MIC', name: 'Malaria parasite (Microscopy)', cat: 'Parasitology', price: '₦2,500', tat: '3h' },
                  { code: 'WIDAL', name: 'Widal agglutination (Typhoid)', cat: 'Serology', price: '₦3,000', tat: '4h' },
                  { code: 'LIPID', name: 'Lipid profile', cat: 'Chemistry', price: '₦8,000', tat: '6h' }
                ].map((t) => (
                  <tr key={t.code} className="hover:bg-[var(--glass)] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[var(--accent)]">{t.code}</td>
                    <td className="py-3.5 px-4 font-sans font-semibold text-[var(--text)]">{t.name}</td>
                    <td className="py-3.5 px-4 text-[var(--text-muted)]">{t.cat}</td>
                    <td className="py-3.5 px-4 font-bold text-[var(--text)]">{t.price}</td>
                    <td className="py-3.5 px-4 text-[var(--text-muted)]">{t.tat}</td>
                    <td className="py-3.5 px-4">
                      <span className="data-tag text-[9px] px-2 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Phlebotomy Dispatch */}
      {activeTab === 'bookings' && (
        <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-2">
            <div className="space-y-1">
              <span className="eyebrow-label text-[var(--accent)]">Specimen chain of custody</span>
              <h2 className="text-xl font-bold text-[var(--text)]">Phlebotomy chain and barcode management</h2>
            </div>
            <button
              onClick={() => alert('Printing specimen barcode: LL-SMP-948210')}
              className="btn-primary-pill px-5 py-2 text-xs font-bold whitespace-nowrap self-start sm:self-auto"
            >
              Print specimen barcode
            </button>
          </div>

          <div className="p-5 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
            <div className="space-y-1">
              <div className="font-bold text-[var(--accent)] flex items-center gap-2">
                <span>LL-SMP-948210 (Olumide Adeyemi)</span>
                <span className="data-tag text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
              </div>
              <div className="text-[var(--text-muted)]">14 Admiralty Way, Lekki · Fasting blood sugar</div>
            </div>
            <span className="data-tag px-3 py-1 rounded-full bg-amber-500/15 text-[var(--attention)] border border-[var(--attention)]/30">
              Collector dispatched: Blessing Ibrahim
            </span>
          </div>
        </div>
      )}

      {/* Tab 4: Results Workflow (Opaque Form & Anomaly Check) */}
      {activeTab === 'results' && (
        <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border)] gap-2">
            <div className="space-y-1">
              <span className="eyebrow-label text-[var(--accent)]">Licensed laboratory scientist console</span>
              <h2 className="text-xl font-bold text-[var(--text)]">Scientist entry and approver sign-off</h2>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                Cryptographic Ed25519 digital signature generation and verification token publishing
              </p>
            </div>
            <div className="text-left sm:text-right text-xs font-mono">
              <div className="font-bold text-[var(--accent)]">Dr. Babatunde Balogun</div>
              <div className="text-[var(--text-muted)]">MLSCN/FMLS/2012/0481</div>
            </div>
          </div>

          <div className="p-6 rounded-[20px] bg-[var(--bg-raised)] border border-[var(--border)] space-y-5 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="data-tag text-[10px] text-[var(--text-muted)]">Parameter</label>
                <div className="p-3 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] font-semibold">
                  Fasting glucose
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="data-tag text-[10px] text-[var(--text-muted)]">Observed value (mg/dL)</label>
                <input
                  type="number"
                  value={paramGlucose}
                  onChange={(e) => handleGlucoseChange(e.target.value)}
                  className="w-full p-3 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] font-bold text-sm focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="data-tag text-[10px] text-[var(--text-muted)]">Reference interval</label>
                <div className="p-3 rounded-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  70.0 - 99.0 mg/dL
                </div>
              </div>
            </div>

            {anomalyWarning && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-[var(--critical)] text-[var(--critical)] flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{anomalyWarning}</span>
              </div>
            )}

            <button
              onClick={() => setResultSigned(true)}
              className="w-full btn-primary-pill py-3.5 text-xs font-bold flex items-center justify-center gap-2"
            >
              {resultSigned ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Signed and cryptographically hashed</span>
                </>
              ) : (
                <>
                  <span>Apply Ed25519 digital signature and publish</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../../shared/components/AccentHeading';

export default function SearchPage() {
  const [selectedState, setSelectedState] = useState('Lagos');
  const [selectedLga, setSelectedLga] = useState('All');
  const [homeOnly, setHomeOnly] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const searchResults = [
    {
      labId: 'synlab-vi',
      labName: 'Synlab Diagnostics VI',
      lga: 'Eti-Osa',
      state: 'Lagos',
      testCode: 'FBS',
      testName: 'Fasting blood sugar (FBS)',
      sampleType: 'Fluoride oxalate plasma',
      priceNgn: '₦2,200',
      tatHours: 2,
      homeCollection: true,
      homeFeeNgn: '₦4,000',
      preparation: '8 to 12 hours overnight fasting. Water permitted.',
      license: 'MLSCN/LAB/2019/0421'
    },
    {
      labId: 'medex-yaba',
      labName: 'Medex Diagnostic Centre Yaba',
      lga: 'Lagos Mainland',
      state: 'Lagos',
      testCode: 'FBS',
      testName: 'Fasting blood sugar (FBS)',
      sampleType: 'Fluoride oxalate plasma',
      priceNgn: '₦1,900',
      tatHours: 2,
      homeCollection: true,
      homeFeeNgn: '₦3,000',
      preparation: '8 to 12 hours overnight fasting.',
      license: 'MLSCN/LAB/2021/0892'
    },
    {
      labId: 'carepoint-ikeja',
      labName: 'CarePoint Diagnostics Ikeja',
      lga: 'Ikeja',
      state: 'Lagos',
      testCode: 'FBS',
      testName: 'Fasting blood sugar (FBS)',
      sampleType: 'Fluoride oxalate plasma',
      priceNgn: '₦2,000',
      tatHours: 3,
      homeCollection: true,
      homeFeeNgn: '₦3,500',
      preparation: 'Strict fasting required.',
      license: 'MLSCN/LAB/2020/0654'
    },
    {
      labId: 'fcd-garki',
      labName: 'Federal Capital Diagnostics Garki',
      lga: 'Abuja Municipal',
      state: 'Abuja (FCT)',
      testCode: 'FBS',
      testName: 'Fasting blood sugar (FBS)',
      sampleType: 'Fluoride oxalate plasma',
      priceNgn: '₦2,000',
      tatHours: 2,
      homeCollection: true,
      homeFeeNgn: '₦5,000',
      preparation: 'Overnight fasting.',
      license: 'MLSCN/LAB/2018/0312'
    }
  ];

  const filteredResults = searchResults.filter((item) => {
    if (selectedState !== 'All' && item.state !== selectedState) return false;
    if (selectedLga !== 'All' && item.lga !== selectedLga) return false;
    if (homeOnly && !item.homeCollection) return false;
    return true;
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-8">
      {/* Header & Filter Controls Island */}
      <div className="rounded-[24px] glass p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <span className="eyebrow-label text-[var(--accent)]">Diagnostic search matrix</span>
          <AccentHeading
            plainText="Find and compare"
            accentText="accredited labs."
            size="section"
            tag="h1"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Transparent pricing, certified turnaround times, and verified home phlebotomy dispatch.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-4 py-2.5 text-xs font-semibold rounded-full bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <option value="All">All regions</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja (FCT)">Abuja (FCT)</option>
          </select>

          <select
            value={selectedLga}
            onChange={(e) => setSelectedLga(e.target.value)}
            className="px-4 py-2.5 text-xs font-semibold rounded-full bg-[var(--bg-raised)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <option value="All">All districts</option>
            <option value="Eti-Osa">Eti-Osa (VI/Lekki)</option>
            <option value="Lagos Mainland">Lagos Mainland (Yaba)</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Abuja Municipal">Abuja Municipal (Garki)</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[var(--text)] bg-[var(--bg-raised)] px-4 py-2.5 rounded-full border border-[var(--border)]">
            <input
              type="checkbox"
              checked={homeOnly}
              onChange={(e) => setHomeOnly(e.target.checked)}
              className="accent-[var(--accent)] rounded"
            />
            <span>Home collection only</span>
          </label>

          <button
            onClick={() => setCompareModalOpen(true)}
            className="btn-primary-pill px-5 py-2.5 text-xs font-bold whitespace-nowrap"
          >
            Compare side-by-side (3)
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResults.map((item) => (
          <div
            key={item.labId}
            className="rounded-[24px] glass p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-lg hover:border-[var(--border)] transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-[var(--text)]">{item.labName}</h3>
                  <span className="data-tag text-[9px] px-2 py-0.5 rounded-full glass border border-[var(--accent)] text-[var(--accent)]">
                    Accredited
                  </span>
                  <span className="data-tag text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Demo
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {item.lga}, {item.state} · Lic: {item.license}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-serif italic text-[var(--text)] font-normal">{item.priceNgn}</div>
                <div className="data-tag text-[9px] text-[var(--text-muted)]">Test fee (VAT incl)</div>
              </div>
            </div>

            {/* Opaque Raised Details Surface */}
            <div className="p-4 rounded-[16px] bg-[var(--bg-raised)] border border-[var(--border)] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Test ordered:</span>
                <span className="font-semibold text-[var(--text)]">{item.testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Turnaround time:</span>
                <span className="font-mono font-bold text-[var(--accent)]">{item.tatHours} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Home phlebotomy:</span>
                <span className="font-semibold text-[var(--text)]">
                  {item.homeCollection ? `Available (${item.homeFeeNgn})` : 'Walk-in only'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Preparation:</span>
                <span className="text-[var(--text)] text-right max-w-xs">{item.preparation}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Link
                href={`/book?lab=${item.labId}&collection=walk_in`}
                className="flex-1 py-2.5 rounded-full btn-secondary-pill text-center text-xs font-bold"
              >
                Walk-in slot
              </Link>
              <Link
                href={`/book?lab=${item.labId}&collection=home_collection`}
                className="flex-1 py-2.5 rounded-full btn-primary-pill text-center text-xs font-bold"
              >
                Book home visit
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-[24px] glass-strong p-6 sm:p-8 border border-[var(--border)] shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="eyebrow-label text-[var(--accent)]">Direct comparison</span>
                <h2 className="text-xl font-bold text-[var(--text)]">Laboratory comparison matrix</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Side-by-side metric comparison for fasting blood sugar across accredited facilities
                </p>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="btn-icon-glass text-xs"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto rounded-[16px] border border-[var(--border)] bg-[var(--bg-raised)]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                    <th className="py-3 px-4 font-semibold">Metric</th>
                    <th className="py-3 px-4 font-bold text-[var(--text)]">Synlab VI</th>
                    <th className="py-3 px-4 font-bold text-[var(--text)]">Medex Yaba</th>
                    <th className="py-3 px-4 font-bold text-[var(--text)]">CarePoint Ikeja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] font-mono text-[11px]">
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)]">Test fee</td>
                    <td className="py-3 px-4 font-bold text-[var(--text)]">₦2,200</td>
                    <td className="py-3 px-4 font-bold text-[var(--accent)]">₦1,900 (Lowest)</td>
                    <td className="py-3 px-4 font-bold text-[var(--text)]">₦2,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)]">Turnaround</td>
                    <td className="py-3 px-4 text-[var(--accent)] font-bold">2 hours (Fastest)</td>
                    <td className="py-3 px-4 text-[var(--accent)] font-bold">2 hours</td>
                    <td className="py-3 px-4 text-[var(--text-muted)]">3 hours</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)]">Home phlebotomy fee</td>
                    <td className="py-3 px-4 text-[var(--text)]">₦4,000</td>
                    <td className="py-3 px-4 font-bold text-[var(--accent)]">₦3,000</td>
                    <td className="py-3 px-4 text-[var(--text)]">₦3,500</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)]">Total for home visit</td>
                    <td className="py-3 px-4 font-bold text-[var(--text)]">₦6,200</td>
                    <td className="py-3 px-4 font-bold text-[var(--accent)]">₦4,900</td>
                    <td className="py-3 px-4 font-bold text-[var(--text)]">₦5,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCompareModalOpen(false)}
                className="btn-primary-pill px-6 py-2.5 text-xs font-bold"
              >
                Close comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

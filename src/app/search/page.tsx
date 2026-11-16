'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../../shared/components/AccentHeading';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedLga, setSelectedLga] = useState('All');
  const [homeOnly, setHomeOnly] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const searchResults = [
    {
      labId: 'apex-vi',
      labName: 'Apex Clinical Diagnostics VI',
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
      license: 'MLSCN/LAB/2019/0421',
      badge: 'Verified lab'
    },
    {
      labId: 'metro-yaba',
      labName: 'Metro Diagnostic Centre Yaba',
      lga: 'Lagos Mainland',
      state: 'Lagos',
      testCode: 'FBS',
      testName: 'Fasting blood sugar (FBS)',
      sampleType: 'Fluoride oxalate plasma',
      priceNgn: '₦1,900',
      tatHours: 2,
      homeCollection: true,
      homeFeeNgn: '₦3,000',
      preparation: '8 to 12 hours overnight fasting. Water permitted.',
      license: 'MLSCN/LAB/2021/0892',
      badge: 'Verified lab'
    },
    {
      labId: 'echo-ikeja',
      labName: 'Echo Health Diagnostics Ikeja',
      lga: 'Ikeja',
      state: 'Lagos',
      testCode: 'FBS',
      testName: 'Fasting blood sugar (FBS)',
      sampleType: 'Fluoride oxalate plasma',
      priceNgn: '₦2,000',
      tatHours: 3,
      homeCollection: true,
      homeFeeNgn: '₦3,500',
      preparation: 'Strict 10-hour fasting required.',
      license: 'MLSCN/LAB/2020/0654',
      badge: 'Verified lab'
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
      preparation: 'Overnight fasting. Water permitted.',
      license: 'MLSCN/LAB/2018/0312',
      badge: 'Verified lab'
    }
  ];

  const filteredResults = searchResults.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.testName.toLowerCase().includes(q) ||
        item.labName.toLowerCase().includes(q) ||
        item.testCode.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedState !== 'All' && item.state !== selectedState) return false;
    if (selectedLga !== 'All' && item.lga !== selectedLga) return false;
    if (homeOnly && !item.homeCollection) return false;
    return true;
  });

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-28 sm:pt-40 pb-24 space-y-8">
      {/* Header & Filter Controls Island */}
      <div className="rounded-3xl bg-[var(--card)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm border border-[var(--border)]">
        <div className="space-y-1">
          <span className="eyebrow-label text-[var(--accent)]">Find a Lab</span>
          <AccentHeading
            plainText="Find and compare"
            accentText="licensed laboratories."
            size="section"
            tag="h1"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Transparent pricing, audited MLSCN turnaround times, and verified cold-chain phlebotomy.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test or lab..."
            className="px-4 py-2 text-xs font-medium rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--accent)] w-full sm:w-44"
          />

          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedLga('All');
            }}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--accent)] cursor-pointer"
          >
            <option value="All">All regions</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja (FCT)">Abuja (FCT)</option>
          </select>

          <select
            value={selectedLga}
            onChange={(e) => setSelectedLga(e.target.value)}
            className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-semibold rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-[var(--accent)] cursor-pointer"
          >
            <option value="All">All districts</option>
            <option value="Eti-Osa">Eti-Osa (VI/Lekki)</option>
            <option value="Lagos Mainland">Lagos Mainland (Yaba)</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Abuja Municipal">Abuja Municipal (Garki)</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[var(--text)] bg-[var(--surface)] px-4 py-2.5 rounded-full border border-[var(--border)] select-none">
            <input
              type="checkbox"
              checked={homeOnly}
              onChange={(e) => setHomeOnly(e.target.checked)}
              className="accent-[var(--accent)] rounded cursor-pointer"
            />
            <span>Home collection only</span>
          </label>

          <button
            onClick={() => setCompareModalOpen(true)}
            className="w-full sm:w-auto btn-primary-pill px-5 py-2.5 text-xs font-bold whitespace-nowrap cursor-pointer text-center text-white"
          >
            Compare side-by-side ({filteredResults.length})
          </button>
        </div>
      </div>

      {/* Results Grid */}
      {filteredResults.length === 0 ? (
        <div className="rounded-3xl bg-[var(--card)] p-12 text-center border border-[var(--border)] space-y-3">
          <p className="text-sm sm:text-base font-medium text-[var(--text)]">
            We&apos;re not in your area yet. We&apos;re starting with Lagos and Abuja and adding more locations soon.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Try searching for Lagos or Abuja, or reset your search filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResults.map((item) => (
          <div
            key={item.labId}
            className="rounded-2xl bg-[var(--card)] p-6 sm:p-7 flex flex-col justify-between space-y-5 shadow-sm border border-[var(--border)] card-hover-lift group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-base sm:text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                    {item.labName}
                  </h2>
                  <span className="data-tag text-[9px] px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 font-semibold">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] font-mono">
                  {item.lga}, {item.state} · Lic: {item.license}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-serif italic text-[var(--text)] font-semibold">{item.priceNgn}</div>
                <div className="data-tag text-[9px] text-[var(--text-muted)]">Test fee (VAT incl)</div>
              </div>
            </div>

            {/* Details Surface */}
            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs space-y-2">
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

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <Link
                href={`/book?lab=${item.labId}&collection=walk_in`}
                className="flex-1 py-2.5 rounded-full btn-secondary-pill text-center text-xs font-bold"
              >
                Walk-in slot
              </Link>
              <Link
                href={`/book?lab=${item.labId}&collection=home_collection`}
                className="flex-1 py-2.5 rounded-full btn-primary-pill text-center text-xs font-bold text-white"
              >
                Book home visit
              </Link>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Comparison Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl bg-[var(--card)] p-6 sm:p-8 border border-[var(--border)] shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="eyebrow-label text-[var(--accent)]">Direct Comparison</span>
                <h2 className="text-xl font-bold text-[var(--text)]">Side-by-side comparison</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Side-by-side metric comparison for fasting blood sugar across accredited facilities
                </p>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xs cursor-pointer hover:border-[var(--accent)]"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface)]">
              <table className="w-full text-left text-xs border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--text-muted)]">
                    <th className="py-3 px-4 font-semibold">Metric</th>
                    {filteredResults.slice(0, 3).map((item) => (
                      <th key={item.labId} className="py-3 px-4 font-bold text-[var(--text)]">
                        {item.labName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] font-mono text-[11px]">
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)] font-sans">Test fee</td>
                    {filteredResults.slice(0, 3).map((item) => (
                      <td key={item.labId} className="py-3 px-4 font-bold text-[var(--text)]">
                        {item.priceNgn}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)] font-sans">Turnaround</td>
                    {filteredResults.slice(0, 3).map((item) => (
                      <td key={item.labId} className="py-3 px-4 text-[var(--accent)] font-bold">
                        {item.tatHours} hours
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)] font-sans">Home phlebotomy fee</td>
                    {filteredResults.slice(0, 3).map((item) => (
                      <td key={item.labId} className="py-3 px-4 text-[var(--text)]">
                        {item.homeFeeNgn}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[var(--text-muted)] font-sans">Licence Status</td>
                    {filteredResults.slice(0, 3).map((item) => (
                      <td key={item.labId} className="py-3 px-4 text-[var(--accent)] font-semibold font-sans">
                        {item.badge}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setCompareModalOpen(false)}
                className="btn-primary-pill px-6 py-2.5 text-xs font-bold cursor-pointer text-white"
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

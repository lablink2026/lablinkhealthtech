'use client';

import React, { useState } from 'react';
import { AccentHeading } from '../../shared/components/AccentHeading';

export default function PlatformAdminPage() {
  const [labs, setLabs] = useState([
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Apex Clinical Care Surulere',
      slug: 'apex-surulere',
      mlscnNumber: 'MLSCN/LAB/2026/PENDING',
      address: '56 Bode Thomas Street, Surulere, Lagos',
      status: 'pending',
      submittedAt: '2026-11-01'
    },
    {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Apex Clinical Diagnostics VI',
      slug: 'apex-vi',
      mlscnNumber: 'MLSCN/LAB/2019/0421',
      address: 'Plot 10, Adeola Odeku, Victoria Island, Lagos',
      status: 'verified',
      submittedAt: '2019-04-12'
    }
  ]);

  const approveLab = (id: string) => {
    setLabs(
      labs.map((l) =>
        l.id === id ? { ...l, status: 'verified', mlscnNumber: 'MLSCN/LAB/2026/0994' } : l
      )
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-24 space-y-8">
      {/* Admin Header (Glass) */}
      <div className="rounded-[28px] glass p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-[var(--border)] card-hover-lift">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="data-tag text-[9px] px-2.5 py-0.5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-sans">
              Lab verification
            </span>
          </div>
          <AccentHeading
            plainText="Facility licence"
            accentText="verification."
            size="card"
            tag="h1"
          />
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Verifying licensed diagnostic facilities across Nigeria
          </p>
        </div>

        <div className="text-xs text-[var(--text-muted)] rounded-full glass px-4 py-2 border border-[var(--border)] font-mono">
          Admin: <strong className="text-[var(--text)]">Chinedu Okeke</strong> (admin@lablinks.com)
        </div>
      </div>

      {/* Lab Verification Queue */}
      <div className="rounded-[28px] glass p-6 sm:p-8 space-y-6 shadow-xl border border-[var(--border)] card-hover-lift">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <div className="space-y-1">
            <span className="eyebrow-label text-[var(--accent)]">Verification queue</span>
            <h2 className="text-xl font-bold text-[var(--text)]">Onboarding verification queue</h2>
          </div>
          <span className="data-tag text-xs font-mono text-[var(--text-muted)]">
            Licence status check
          </span>
        </div>

        <div className="overflow-x-auto rounded-[20px] border border-[var(--border)] bg-[var(--bg-raised)] shadow-inner">
          <table className="w-full text-left text-xs border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-mono text-[11px] uppercase">
                <th className="py-3.5 px-4 font-semibold">Facility</th>
                <th className="py-3.5 px-4 font-semibold">Location</th>
                <th className="py-3.5 px-4 font-semibold">Licence reg</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--text)] font-mono">
              {labs.map((lab) => (
                <tr key={lab.id} className="hover:bg-[var(--glass)] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[var(--text)] font-sans">{lab.name}</td>
                  <td className="py-3.5 px-4 text-[var(--text-muted)]">{lab.address}</td>
                  <td className="py-3.5 px-4 text-[var(--accent)]">{lab.mlscnNumber}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`data-tag text-[9px] px-2.5 py-0.5 rounded-full border capitalize ${
                        lab.status === 'verified'
                          ? 'bg-[var(--accent)]/15 text-[var(--accent)] border-[var(--accent)]/30'
                          : 'bg-amber-500/15 text-[var(--attention)] border-[var(--attention)]/30'
                      }`}
                    >
                      {lab.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {lab.status === 'pending' ? (
                      <button
                        onClick={() => approveLab(lab.id)}
                        className="btn-primary-pill px-4 py-1.5 text-xs font-bold cursor-pointer"
                      >
                        Mark licence verified
                      </button>
                    ) : (
                      <span className="text-[var(--text-muted)] font-semibold">Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

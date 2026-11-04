'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../shared/components/AccentHeading';
import { HeroVerificationEngine } from '../shared/components/HeroVerificationEngine';

const CLINICAL_SEARCH_PROMPTS = [
  'Annual screening for 45-year-old with family history of diabetes...',
  'Severe fever, chills and joint pain after visiting Lekki...',
  'Pre-marital screening: Genotype, blood group and hepatitis...',
  'Executive cardiac and lipid profile checkup in Victoria Island...',
  'Fasting glucose and HbA1c 3-month sugar monitoring...',
  'Routine full blood count, PCV and malaria parasite test...'
];

export default function HomePage() {
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Moving keyboard typewriter effect for AI Search placeholder
  const [placeholderText, setPlaceholderText] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // If input is focused or user has entered text, pause typewriter animation
    if (isInputFocused || aiQuery.length > 0) return;

    const currentPrompt = CLINICAL_SEARCH_PROMPTS[promptIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentPrompt.length) {
        timer = setTimeout(() => {
          setPlaceholderText(currentPrompt.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 40); // natural keyboard stroke cadence
      } else {
        // Full prompt completed, linger for reading
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setPlaceholderText(currentPrompt.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 18); // swift backspace delete
      } else {
        // Finished deleting, transition to next prompt
        setIsDeleting(false);
        setPromptIndex((prev) => (prev + 1) % CLINICAL_SEARCH_PROMPTS.length);
        timer = setTimeout(() => {}, 350);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, promptIndex, isInputFocused, aiQuery]);

  const handleAiSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResult(null);

    setTimeout(() => {
      const lower = aiQuery.toLowerCase();
      if (
        lower.includes('chest pain') ||
        lower.includes('difficulty breathing') ||
        lower.includes('bleeding') ||
        lower.includes('unconscious')
      ) {
        setAiResult({
          isEmergency: true,
          message:
            'Emergency alert: The symptoms described require immediate clinical emergency attention. Please proceed immediately to the nearest hospital emergency department.'
        });
      } else {
        setAiResult({
          isEmergency: false,
          summary:
            'Based on your inquiry, standard metabolic, cardiovascular, and hematologic screenings are recommended:',
          recommendedTests: [
            {
              code: 'FBS',
              name: 'Fasting blood sugar',
              reason: 'Assesses blood glucose regulation after an overnight fast.'
            },
            {
              code: 'HBA1C',
              name: 'Glycated hemoglobin (HbA1c)',
              reason: 'Measures 3-month average glucose control.'
            },
            {
              code: 'LIPID',
              name: 'Lipid profile',
              reason: 'Screens for cholesterol balance and cardiovascular risk.'
            }
          ],
          disclaimer:
            'Disclaimer: Informational and scheduling assistance only. Does not constitute a clinical diagnosis or treatment prescription. Always consult a qualified medical practitioner.'
        });
      }
      setAiLoading(false);
    }, 450);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does home sample collection work?',
      a: 'When you select home collection, a certified phlebotomist from your chosen accredited laboratory is dispatched to your residence or workplace at your scheduled time slot. They carry a temperature-controlled cold-chain specimen kit and barcode your samples on-site, maintaining documented chain-of-custody tracking.'
    },
    {
      q: 'How do I know if a laboratory is genuine and accredited?',
      a: 'Every diagnostic facility on Lablink must possess active statutory clinical accreditation from the Medical Laboratory Science Council of Nigeria (MLSCN). We display each facility’s official registration license, physical premises address, and verifying scientist credentials transparently on their profile.'
    },
    {
      q: 'How do doctors, embassies, or employers verify the digital QR code?',
      a: 'Every diagnostic report generated through Lablink includes an unforgeable QR code. Scanning the code opens the public verification portal, where the Ed25519 digital signature and SHA-256 hash are checked in real-time against our root authority, confirming the report is genuine and unaltered without disclosing private clinical details.'
    },
    {
      q: 'Which payment options are supported on Lablink?',
      a: 'You can pay securely online using debit cards, USSD, or direct bank transfer via Paystack with instant receipt issuance. For walk-in visits, accredited laboratories also offer the option to pay at the laboratory reception upon arrival.'
    },
    {
      q: 'How does Lablink safeguard medical data privacy?',
      a: 'Lablink complies strictly with statutory clinical data protection standards and the Nigeria Data Protection Act 2023. Our multi-tenant architecture uses PostgreSQL Row-Level Security (RLS) to keep medical records strictly isolated. On public QR verification pages, patient identifying information is automatically pseudonymized (e.g., "O. A.") to prevent unauthorized disclosure.'
    }
  ];

  const accreditedLabs = [
    {
      id: 'synlab-vi',
      name: 'Synlab Diagnostics VI',
      area: 'Victoria Island, Lagos',
      license: 'MLSCN/LAB/2019/0421',
      homeFee: '₦4,000',
      turnaround: '2-4 hours'
    },
    {
      id: 'medex-yaba',
      name: 'Medex Diagnostic Yaba',
      area: 'Herbert Macaulay, Yaba',
      license: 'MLSCN/LAB/2021/0892',
      homeFee: '₦3,000',
      turnaround: '2-3 hours'
    },
    {
      id: 'carepoint-ikeja',
      name: 'CarePoint Diagnostics',
      area: 'Allen Avenue, Ikeja',
      license: 'MLSCN/LAB/2020/0654',
      homeFee: '₦3,500',
      turnaround: '3-5 hours'
    },
    {
      id: 'fcd-garki',
      name: 'Federal Capital Diagnostics',
      area: 'Area 11, Garki, Abuja',
      license: 'MLSCN/LAB/2018/0312',
      homeFee: '₦5,000',
      turnaround: '2-4 hours'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-32 pt-28 sm:pt-40">
      {/* 1. Hero Section */}
      <section className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-[var(--border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
              <span className="eyebrow-label text-[10px] sm:text-[11px] text-[var(--accent)]">
                Digital healthcare infrastructure
              </span>
            </div>

            {/* Headline with accent and gold underline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-[-0.04em] text-[var(--text)] leading-[1.05] sm:leading-[1.0]">
                Find Labs. Book Tests.
              </h1>
              <div className="relative inline-block">
                <span className="font-serif italic font-normal text-3xl sm:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-deep)] leading-[1.05] sm:leading-[1.0]">
                  Trust the result.
                </span>
                <span className="absolute -bottom-2 left-0 right-0 w-full pointer-events-none">
                  <svg
                    viewBox="0 0 240 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-3.5 text-[var(--gold)]"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 13C45 6.5 120 4.5 237 11.5M18 16C75 11 165 9.5 228 14"
                      stroke="currentColor"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
              Connect directly with accredited medical laboratories across Nigeria. Compare transparent test prices, dispatch certified mobile phlebotomists, and receive cryptographically signed health proof.
            </p>

            {/* Hero Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/search"
                className="btn-primary-pill px-7 py-3.5 text-sm sm:text-base inline-flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Find a lab</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/lab/synlab-vi/dashboard"
                className="btn-secondary-pill px-6 py-3.5 text-sm sm:text-base inline-flex items-center justify-center cursor-pointer"
              >
                I run a laboratory
              </Link>
            </div>

            {/* Quiet trust row in sentence case */}
            <div className="pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)] flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span>Licensed labs only</span>
              <span className="text-[var(--border)]">·</span>
              <span>Transparent prices</span>
              <span className="text-[var(--border)]">·</span>
              <span>Home collection</span>
              <span className="text-[var(--border)]">·</span>
              <span>Verified results</span>
            </div>
          </div>

          {/* Right Column: Lablink Bespoke Artwork */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <HeroVerificationEngine />
          </div>
        </div>
      </section>

      {/* 2. Assistive AI Smart Test Finder with Moving Keyboard Placeholder */}
      <section id="test-finder" className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="rounded-[28px] glass p-6 sm:p-10 space-y-6 shadow-xl card-hover-lift border border-[var(--border)] relative overflow-hidden">
          {/* Ambient glow accent behind search card */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--accent)] opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="eyebrow-label text-[var(--accent)]">Assistive search</span>
              <AccentHeading
                plainText="Smart test finder."
                accentText="Plain language."
                size="card"
                tag="h2"
              />
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Describe your wellness goals or symptoms in everyday words for recommended screenings.
              </p>
            </div>

            <div className="self-start sm:self-center">
              <span className="data-tag text-[10px] px-3 py-1 rounded-full glass border border-[var(--border)] text-[var(--accent)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                <span>Non-diagnostic protocol</span>
              </span>
            </div>
          </div>

          {/* Search Form with Animated Keyboard Typewriter Placeholder */}
          <form onSubmit={handleAiSearch} className="relative z-10 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={aiQuery}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder={placeholderText ? `${placeholderText} |` : 'Search symptoms, health goals, or test names...'}
                className="w-full pl-5 pr-10 py-3.5 rounded-full bg-[var(--bg-raised)] text-[var(--text)] placeholder-[var(--text-muted)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none transition-all shadow-inner"
              />
              {aiQuery && (
                <button
                  type="button"
                  onClick={() => setAiQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-full"
                  aria-label="Clear query"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={aiLoading}
              className="btn-primary-pill px-7 py-3.5 text-xs sm:text-sm whitespace-nowrap disabled:opacity-50 inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              {aiLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-[#0A0F0D]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Suggest tests</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Interactive Prompt Chips */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[var(--text-muted)] text-[11px] font-mono">Quick suggest:</span>
            {[
              { label: 'Diabetes & FBS', query: 'Annual screening for 45-year-old with family history of diabetes' },
              { label: 'Pre-marital panel', query: 'Pre-marital screening: Genotype, blood group and hepatitis' },
              { label: 'Fever & Malaria', query: 'Severe fever, chills and joint pain after visiting Lekki' },
              { label: 'Cardiac checkup', query: 'Executive cardiac and lipid profile checkup in Victoria Island' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => {
                  setAiQuery(chip.query);
                }}
                className="px-3 py-1 rounded-full glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--glass-strong)] transition-all text-[11px] font-medium cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* AI Result Container */}
          {aiResult && (
            <div className="relative z-10 p-6 rounded-[22px] bg-[var(--bg-raised)] border border-[var(--border)] space-y-4 shadow-lg animate-in fade-in duration-200">
              {aiResult.isEmergency ? (
                <div className="p-4 rounded-xl bg-red-500/10 border border-[var(--critical)] text-[var(--critical)] space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Emergency alert</span>
                  </div>
                  <p className="text-xs leading-relaxed">{aiResult.message}</p>
                </div>
              ) : (
                <>
                  <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed font-medium">
                    {aiResult.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {aiResult.recommendedTests.map((t: any) => (
                      <div
                        key={t.code}
                        className="p-4 rounded-[18px] glass border border-[var(--border)] flex flex-col justify-between space-y-3 card-hover-lift"
                      >
                        <div>
                          <div className="font-bold text-[var(--text)] text-xs">{t.name}</div>
                          <div className="text-[11px] text-[var(--text-muted)] leading-normal mt-1">
                            {t.reason}
                          </div>
                        </div>
                        <Link
                          href={`/search?q=${encodeURIComponent(t.name)}`}
                          className="text-xs text-[var(--accent)] font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <span>Compare labs</span>
                          <span>→</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="p-3.5 rounded-xl glass border border-[var(--gold)]/30 text-[11px] text-[var(--gold)]">
                    {aiResult.disclaimer}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 3. Find Labs Section */}
      <section id="find-labs" className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="eyebrow-label text-[var(--accent)]">Network accreditation</span>
            <AccentHeading
              plainText="Accredited diagnostic centres."
              accentText="Verified daily."
              size="section"
              tag="h2"
            />
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              All listed facilities hold active statutory registration and certified clinical approvals.
            </p>
          </div>
          <Link
            href="/search"
            className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
          >
            <span>View all facilities</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accreditedLabs.map((lab) => (
            <div
              key={lab.id}
              className="rounded-[24px] glass p-6 flex flex-col justify-between space-y-5 shadow-lg border border-[var(--border)] card-hover-lift shimmer-sheen group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="data-tag text-[9px] px-2.5 py-0.5 rounded-full glass border border-[var(--accent)] text-[var(--accent)]">
                    Accredited
                  </span>
                  <span className="data-tag text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Demo
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[var(--text)] text-base group-hover:text-[var(--accent)] transition-colors">
                    {lab.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{lab.area}</p>
                </div>

                <div className="text-xs space-y-1 font-mono text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                  <div>
                    Reg: <span className="text-[var(--text)]">{lab.license}</span>
                  </div>
                  <div>
                    Home visit: <span className="text-[var(--accent)] font-semibold">{lab.homeFee}</span>
                  </div>
                  <div>
                    Speed: <span className="text-[var(--text)]">{lab.turnaround}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href={`/search?lab=${lab.id}`}
                  className="flex-1 py-2 text-center text-xs font-semibold btn-secondary-pill"
                >
                  Catalog
                </Link>
                <Link
                  href={`/book?lab=${lab.id}`}
                  className="flex-1 py-2 text-center text-xs font-bold btn-primary-pill"
                >
                  Book slot
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How It Works Section (Numbered 01 to 03) */}
      <section id="how-it-works" className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10 scroll-mt-28">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="eyebrow-label text-[var(--accent)]">Certified workflow</span>
          <AccentHeading
            plainText="How it works."
            accentText="Three clear steps."
            size="section"
            tag="h2"
            align="center"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            From search to verified laboratory proof with zero ambiguity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-[24px] glass p-8 space-y-4 border border-[var(--border)] card-hover-lift shimmer-sheen group">
            <div className="data-tag text-3xl font-serif italic text-[var(--accent)] font-normal transition-transform duration-300 group-hover:scale-110 origin-left">
              01
            </div>
            <h3 className="font-bold text-lg text-[var(--text)]">Find labs and compare</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Browse 40+ routine and specialized laboratory tests across accredited centres. Compare transparent test prices in Nigerian Naira with zero hidden fees.
            </p>
          </div>

          <div className="rounded-[24px] glass p-8 space-y-4 border border-[var(--border)] card-hover-lift shimmer-sheen group">
            <div className="data-tag text-3xl font-serif italic text-[var(--accent)] font-normal transition-transform duration-300 group-hover:scale-110 origin-left">
              02
            </div>
            <h3 className="font-bold text-lg text-[var(--text)]">Walk in or home phlebotomy</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Book a walk-in appointment or request an on-demand phlebotomist to collect your sample at home with cold-chain storage and full barcoded custody tracking.
            </p>
          </div>

          <div className="rounded-[24px] glass p-8 space-y-4 border border-[var(--border)] card-hover-lift shimmer-sheen group">
            <div className="data-tag text-3xl font-serif italic text-[var(--gold)] font-normal transition-transform duration-300 group-hover:scale-110 origin-left">
              03
            </div>
            <h3 className="font-bold text-lg text-[var(--text)]">Receive verified results</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Receive your results directly in your portal. Reports are digitally signed with Ed25519 cryptography and feature a scannable QR code for instant authenticity verification.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section id="pricing" className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="eyebrow-label text-[var(--accent)]">Transparent laboratory pricing</span>
            <AccentHeading
              plainText="Clear pricing."
              accentText="Zero counter surprises."
              size="section"
              tag="h2"
            />
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Representative pricing across high-demand routine diagnostic panels in Lagos and Abuja.
            </p>
          </div>
          <Link
            href="/search"
            className="btn-secondary-pill px-5 py-2.5 text-xs font-semibold self-start sm:self-end"
          >
            Explore all 40 tests
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Fasting blood sugar', code: 'FBS', price: '₦1,900 - ₦2,200', turnaround: '2 hours', sample: 'Fluoride plasma' },
            { name: 'Full blood count', code: 'FBC', price: '₦3,500 - ₦4,500', turnaround: '3 hours', sample: 'EDTA whole blood' },
            { name: 'Lipid profile', code: 'LIPID', price: '₦6,500 - ₦8,000', turnaround: '4 hours', sample: 'Serum' },
            { name: 'Glycated hemoglobin', code: 'HBA1C', price: '₦7,000 - ₦9,500', turnaround: '4 hours', sample: 'EDTA whole blood' }
          ].map((item) => (
            <div
              key={item.code}
              className="rounded-[24px] glass p-6 space-y-4 flex flex-col justify-between border border-[var(--border)] card-hover-lift shimmer-sheen group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="data-tag text-[10px] text-[var(--accent)]">{item.code}</span>
                  <span className="data-tag text-[8px] px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Demo</span>
                </div>
                <h3 className="font-bold text-[var(--text)] text-base group-hover:text-[var(--accent)] transition-colors">
                  {item.name}
                </h3>
                <div className="text-2xl font-serif italic text-[var(--text)]">{item.price}</div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)] font-mono space-y-1">
                <div>Sample: <span className="text-[var(--text)]">{item.sample}</span></div>
                <div>Turnaround: <span className="text-[var(--accent)] font-semibold">{item.turnaround}</span></div>
              </div>

              <Link
                href={`/search?q=${encodeURIComponent(item.name)}`}
                className="btn-primary-pill text-center py-2.5 text-xs font-semibold"
              >
                Find labs
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQs Section */}
      <section id="faqs" className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-8 scroll-mt-28">
        <div className="text-center space-y-2">
          <span className="eyebrow-label text-[var(--accent)]">Common questions</span>
          <AccentHeading
            plainText="Frequently asked questions."
            accentText="All the details."
            size="section"
            tag="h2"
            align="center"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Everything you need to know about testing, home collection, and result authenticity.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-[22px] glass overflow-hidden border border-[var(--border)] card-hover-lift transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[var(--text)] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className={`w-7 h-7 rounded-full glass border border-[var(--border)] flex items-center justify-center text-xs text-[var(--accent)] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--gold)]' : ''}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Closing Call-To-Action Band */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[32px] glass p-8 sm:p-16 text-center space-y-6 overflow-hidden card-hover-lift border border-[var(--border)]">
          {/* Radial green glow behind CTA */}
          <div className="absolute inset-0 m-auto w-96 h-96 rounded-full bg-[var(--accent)] opacity-20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="eyebrow-label text-[var(--accent)]">Get started</span>
            <AccentHeading
              plainText="Ready for accurate diagnostic care?"
              accentText="Book your test today."
              size="section"
              tag="h2"
              align="center"
            />
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
              Compare accredited laboratories in your neighborhood, schedule an on-demand phlebotomist, and receive cryptographically verified reports.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-4">
              <Link
                href="/search"
                className="btn-primary-pill px-8 py-3.5 text-sm sm:text-base inline-flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Find a lab</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/lab/synlab-vi/dashboard"
                className="btn-secondary-pill px-7 py-3.5 text-sm sm:text-base inline-flex items-center justify-center cursor-pointer"
              >
                Register your lab
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AccentHeading } from '../shared/components/AccentHeading';
import { HeroVisual } from '../shared/components/HeroVisual';

const CLINICAL_SEARCH_PROMPTS = [
  'Annual checkup for someone with family history of high blood sugar...',
  'High fever, chills, body weakness and headache...',
  'Pre-marital health check: Genotype, blood group and hepatitis...',
  'Comprehensive heart and cholesterol checkup in Victoria Island...',
  'Fasting glucose and HbA1c 3-month sugar monitoring...',
  'Routine full blood count, PCV and malaria parasite test...'
];

const SPECIALIZED_DEPARTMENTS = [
  {
    id: 'all',
    name: 'All Departments',
    icon: '🏥',
    description: 'Explore all routine and specialized clinical pathology investigations across accredited laboratories.',
    count: '40+ Tests'
  },
  {
    id: 'chemistry',
    name: 'Clinical Chemistry',
    icon: '🧪',
    description: 'Enzyme, metabolite, and electrolyte assays to monitor organ function, metabolic rate, and sugar levels.',
    count: '16 Tests'
  },
  {
    id: 'hematology',
    name: 'Hematology & Blood',
    icon: '🩸',
    description: 'Complete cellular analysis of red cells, platelets, white blood cells, haemoglobin, and hemoglobin genotype.',
    count: '8 Tests'
  },
  {
    id: 'parasitology',
    name: 'Parasitology & Tropical',
    icon: '🔬',
    description: 'Gold-standard Giemsa microscopic screening for Plasmodium falciparum malaria and tropical blood parasites.',
    count: '4 Tests'
  },
  {
    id: 'serology',
    name: 'Serology & Immunology',
    icon: '🛡️',
    description: 'Antigen-antibody detection for infectious pathogens, hepatitis viral markers, and systemic immune checks.',
    count: '6 Tests'
  },
  {
    id: 'hormonal',
    name: 'Hormonal & Endocrine',
    icon: '⚡',
    description: 'Endocrine profiling including thyroid hormones (TSH, Free T4), fertility markers, and prostate health (PSA).',
    count: '6 Tests'
  },
  {
    id: 'wellness',
    name: 'Wellness & Prevention',
    icon: '🩺',
    description: 'Comprehensive health audits, pre-marital genotype checks, cardiovascular risks, and executive wellness.',
    count: '8 Tests'
  }
];

const TEST_CATALOG_SAMPLES = [
  {
    code: 'FBS',
    name: 'Fasting Blood Sugar',
    category: 'Clinical Chemistry',
    price: '₦2,200',
    turnaround: '2 hours',
    sample: 'Fluoride plasma',
    fasting: '8-10 hours overnight fasting',
    vialColor: 'Grey top (Fluoride oxalate)'
  },
  {
    code: 'FBC',
    name: 'Full Blood Count (FBC + PCV)',
    category: 'Hematology & Blood',
    price: '₦4,500',
    turnaround: '3 hours',
    sample: 'EDTA whole blood',
    fasting: 'No dietary restrictions',
    vialColor: 'Lavender top (K2-EDTA)'
  },
  {
    code: 'LIPID',
    name: 'Lipid Profile (Cholesterol Panel)',
    category: 'Clinical Chemistry',
    price: '₦8,000',
    turnaround: '4 hours',
    sample: 'Serum',
    fasting: '10-12 hours overnight fasting',
    vialColor: 'Gold top (SST gel separator)'
  },
  {
    code: 'HBA1C',
    name: 'Glycated Hemoglobin (HbA1c)',
    category: 'Clinical Chemistry',
    price: '₦8,500',
    turnaround: '4 hours',
    sample: 'EDTA whole blood',
    fasting: 'No fasting required',
    vialColor: 'Lavender top (K2-EDTA)'
  },
  {
    code: 'MP_MIC',
    name: 'Malaria Parasite (Microscopy)',
    category: 'Parasitology & Tropical',
    price: '₦2,500',
    turnaround: '2 hours',
    sample: 'EDTA whole blood',
    fasting: 'No fasting required',
    vialColor: 'Lavender top (Thick/thin blood film)'
  },
  {
    code: 'WIDAL',
    name: 'Widal Agglutination (Typhoid)',
    category: 'Serology & Immunology',
    price: '₦3,000',
    turnaround: '3 hours',
    sample: 'Serum',
    fasting: 'No fasting required',
    vialColor: 'Red or Gold top'
  },
  {
    code: 'LFT',
    name: 'Liver Function Test (LFT)',
    category: 'Clinical Chemistry',
    price: '₦9,500',
    turnaround: '5 hours',
    sample: 'Serum',
    fasting: 'Overnight fasting recommended',
    vialColor: 'Gold top (SST gel separator)'
  },
  {
    code: 'E_U_CR',
    name: 'Electrolytes, Urea & Creatinine (Kidney)',
    category: 'Clinical Chemistry',
    price: '₦10,500',
    turnaround: '4 hours',
    sample: 'Serum',
    fasting: 'Adequate hydration advised',
    vialColor: 'Gold top (SST gel separator)'
  }
];

const FEATURED_LABS = [
  {
    id: 'apex-vi',
    name: 'Apex Clinical Diagnostics VI',
    area: 'Victoria Island, Lagos',
    address: 'Plot 10, Adeola Odeku Street',
    license: 'MLSCN/LAB/2019/0421',
    homeFee: '₦4,000',
    turnaround: '2-4 hours',
    status: 'Verified lab',
    rating: '4.9 ★',
    reviews: '180+ reviews',
    hours: 'Mon - Sat: 7:30 AM - 6:30 PM',
    highlight: 'Accredited Chemistry & Phlebotomy Hub'
  },
  {
    id: 'metro-yaba',
    name: 'Metro Diagnostic Centre Yaba',
    area: 'Herbert Macaulay, Yaba, Lagos',
    address: '34 Herbert Macaulay Way',
    license: 'MLSCN/LAB/2021/0892',
    homeFee: '₦3,000',
    turnaround: '2-3 hours',
    status: 'Verified lab',
    rating: '4.8 ★',
    reviews: '145+ reviews',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    highlight: 'Fast Turnaround Hematology & Serology'
  },
  {
    id: 'echo-ikeja',
    name: 'Echo Health Diagnostics Ikeja',
    area: 'Allen Avenue, Ikeja, Lagos',
    address: '12 Allen Avenue',
    license: 'MLSCN/LAB/2020/0654',
    homeFee: '₦3,500',
    turnaround: '3-5 hours',
    status: 'Verified lab',
    rating: '4.9 ★',
    reviews: '210+ reviews',
    hours: 'Mon - Sun: 7:00 AM - 7:00 PM',
    highlight: '24/7 Processing & Home Phlebotomy Dispatch'
  },
  {
    id: 'fcd-garki',
    name: 'Federal Capital Diagnostics Garki',
    area: 'Area 11, Garki, Abuja',
    address: 'Off Tafawa Balewa Way',
    license: 'MLSCN/LAB/2018/0312',
    homeFee: '₦5,000',
    turnaround: '2-4 hours',
    status: 'Verified lab',
    rating: '4.9 ★',
    reviews: '160+ reviews',
    hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
    highlight: 'Executive Wellness & Federal Capital Hub'
  }
];

export default function HomePage() {
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState('All');

  // Animated keyboard typewriter effect for search bar
  const [placeholderText, setPlaceholderText] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isInputFocused || aiQuery.length > 0) return;

    const currentPrompt = CLINICAL_SEARCH_PROMPTS[promptIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentPrompt.length) {
        timer = setTimeout(() => {
          setPlaceholderText(currentPrompt.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 40);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setPlaceholderText(currentPrompt.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 20);
      } else {
        setIsDeleting(false);
        setPromptIndex((prev) => (prev + 1) % CLINICAL_SEARCH_PROMPTS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, promptIndex, isInputFocused, aiQuery]);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiQuery })
      });
      const data = await res.json();
      setAiResult(data);
    } catch {
      setAiResult({
        summary: 'Suggested tests matching your query: Fasting Blood Sugar, Full Blood Count (FBC), and Lipid Profile.',
        recommendedTests: [
          { code: 'FBS', name: 'Fasting Blood Sugar', reason: 'Evaluates baseline blood sugar levels and metabolic health.' },
          { code: 'FBC', name: 'Full Blood Count', reason: 'General screening for infection, immune response, and anemia.' },
          { code: 'LIPID', name: 'Lipid Profile', reason: 'Assesses cardiovascular risk, triglycerides, and cholesterol.' }
        ],
        disclaimer: 'This informational suggestion tool does not provide clinical diagnoses. Always consult your qualified healthcare practitioner.'
      });
    } finally {
      setAiLoading(false);
    }
  };

  const filteredCatalogTests = selectedCatalogCategory === 'All'
    ? TEST_CATALOG_SAMPLES
    : TEST_CATALOG_SAMPLES.filter((t) => t.category.toLowerCase().includes(selectedCatalogCategory.toLowerCase()));

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does home sample collection work?',
      a: 'When you book a home visit, a licensed phlebotomist from your chosen laboratory arrives at your residence or office at your scheduled appointment time. They collect your sample using sterile vacuum tubes, label your specimen with a barcode right before your eyes, and transport it securely in a temperature-controlled cold-chain box.'
    },
    {
      q: 'How are medical laboratories accredited on Lablinks?',
      a: 'Every diagnostic center on Lablinks undergoes comprehensive licensing audits. We independently verify active MLSCN (Medical Laboratory Science Council of Nigeria) facility registration, inspect physical premise compliance, and verify that test sign-offs are conducted exclusively by registered Medical Laboratory Scientists.'
    },
    {
      q: 'How do physicians, clinics, and embassies verify my results?',
      a: 'Every laboratory report generated through Lablinks carries a unique cryptographic tamper-proof verification seal and scannable QR code. Anyone reviewing your document can scan the QR code with any standard smartphone camera to verify the authentic report directly from the issuing laboratory.'
    },
    {
      q: 'Are the test prices on Lablinks guaranteed?',
      a: 'Yes. Upfront pricing transparency is our core promise. The price listed on Lablinks for each test is the exact price you pay—with zero unexpected administrative charges or hidden sampling fees.'
    },
    {
      q: 'Which payment methods can I use?',
      a: 'You can pay securely online via Paystack using debit cards (Visa, Mastercard, Verve), direct Nigerian bank transfer, or USSD. If you are visiting a laboratory in person, you can also select "Pay at Reception" to settle via POS or cash upon arrival.'
    },
    {
      q: 'How is patient medical privacy protected?',
      a: 'We strictly comply with the Nigeria Data Protection Act (NDPA) and international medical privacy standards. All diagnostic health records are encrypted at rest and in transit. Your records are accessible solely to you and the specific accredited laboratory performing your testing.'
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-20 space-y-14 sm:space-y-20 lg:space-y-28 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Hero Narrative */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              <span className="eyebrow-label text-[10px] sm:text-[11px] text-[var(--text)] font-semibold">
                Digital healthcare infrastructure
              </span>
            </div>

            {/* Headline: Prominent, Responsive & Bold */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.04em] text-[var(--text)] leading-[1.1]">
                Find Labs.
                <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#A872BD] to-[var(--accent-deep)]">
                  Book Tests.
                </span>
                <br />
                Get your results.
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed font-normal">
              Connect directly with accredited medical laboratories, compare test prices, book appointments and manage your results all in one place.
            </p>

            {/* Dual Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/search"
                className="btn-primary-pill px-7 py-3.5 text-sm sm:text-base inline-flex items-center justify-center gap-2 text-white shadow-lg cursor-pointer"
              >
                <span>Find a lab near you</span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/lab/apply"
                className="btn-secondary-pill px-6 py-3.5 text-sm sm:text-base inline-flex items-center justify-center cursor-pointer"
              >
                Join as a lab
              </Link>
            </div>

            {/* Trust Line & Social Proof Cluster (Responsive layout) */}
            <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[var(--text-muted)] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-medium">
                <span className="inline-flex items-center gap-1.5 text-[var(--text)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  MLSCN-licensed labs
                </span>
                <span className="text-[var(--border)]">·</span>
                <span>Clear prices</span>
                <span className="text-[var(--border)]">·</span>
                <span>Tracked samples</span>
                <span className="text-[var(--border)]">·</span>
                <span>Verifiable reports</span>
              </div>

              {/* Patient Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-muted)] self-start sm:self-auto flex-shrink-0">
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-1 ring-white bg-[#8E5FA1] text-[8px] sm:text-[9px] font-bold text-white flex items-center justify-center">OA</div>
                  <div className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-1 ring-white bg-[#512C7A] text-[8px] sm:text-[9px] font-bold text-white flex items-center justify-center">CE</div>
                  <div className="inline-block h-4 w-4 sm:h-5 sm:w-5 rounded-full ring-1 ring-white bg-[#A872BD] text-[8px] sm:text-[9px] font-bold text-white flex items-center justify-center">FO</div>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--text)]">
                  Trusted by 4,000+ patients
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Photo & Floating Report Card */}
          <div className="lg:col-span-5 flex justify-center w-full pt-4 lg:pt-0">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Showcase */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-[var(--surface)] p-5 sm:p-8 border border-[var(--border)] shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 sm:gap-6 text-center">
            <div className="space-y-0.5 sm:space-y-1 pr-2 sm:pr-4 border-r border-[var(--border)]">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] font-serif italic">24+</div>
              <div className="text-[11px] sm:text-xs font-semibold text-[var(--text)]">Accredited partner labs</div>
              <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)]">Lagos &amp; Abuja</div>
            </div>
            <div className="space-y-0.5 sm:space-y-1 lg:border-r border-[var(--border)] pl-2 sm:pl-0 pr-0 sm:pr-4">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--accent)] font-serif italic">40+</div>
              <div className="text-[11px] sm:text-xs font-semibold text-[var(--text)]">Tests available</div>
              <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)]">Transparent pricing</div>
            </div>
            <div className="space-y-0.5 sm:space-y-1 pr-2 sm:pr-4 border-r border-[var(--border)] pt-3 lg:pt-0 border-t lg:border-t-0">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text)] font-serif italic">&lt; 3.2 hrs</div>
              <div className="text-[11px] sm:text-xs font-semibold text-[var(--text)]">Average report time</div>
              <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)]">Same-day turnaround</div>
            </div>
            <div className="space-y-0.5 sm:space-y-1 pl-2 sm:pl-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[var(--border)]">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--gold)] font-serif italic">100%</div>
              <div className="text-[11px] sm:text-xs font-semibold text-[var(--text)]">Samples barcoded</div>
              <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)]">Tracked chain of custody</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Diagnostic Departments Section (Compact & Responsive) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <span className="eyebrow-label text-[var(--accent)] text-[10px] sm:text-[11px]">Diagnostic Departments</span>
          <AccentHeading
            plainText="Our Specialized"
            accentText="Diagnostic Areas."
            size="section"
            tag="h2"
            align="center"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Explore accredited laboratory disciplines for routine wellness, disease screening, and monitoring.
          </p>
        </div>

        {/* Compact, Sleek Department Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {SPECIALIZED_DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              type="button"
              onClick={() => setSelectedDepartment(dept.id)}
              className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedDepartment === dept.id
                  ? 'bg-[var(--accent)] text-white shadow-sm ring-1 ring-[var(--accent)]'
                  : 'bg-[var(--card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)]/50'
              }`}
            >
              <span className="text-xs sm:text-sm">{dept.icon}</span>
              <span>{dept.name}</span>
            </button>
          ))}
        </div>

        {/* Compact, Sleek Department Cards Grid (Balanced 6-Card 2x3 Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
          {SPECIALIZED_DEPARTMENTS.filter(d => d.id !== 'all').map((dept) => (
            <div
              key={dept.id}
              className={`p-4 sm:p-5 rounded-2xl bg-[var(--card)] border transition-all card-hover-lift flex flex-col justify-between space-y-3 shadow-sm ${
                selectedDepartment === dept.id || selectedDepartment === 'all'
                  ? 'border-[var(--accent)]/40 ring-1 ring-[var(--accent)]/15 shadow-sm'
                  : 'border-[var(--border)] opacity-60 hover:opacity-100'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-base sm:text-lg">
                    {dept.icon}
                  </div>
                  <span className="data-tag text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--accent)] font-semibold font-mono">
                    {dept.count}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text)]">
                    {dept.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mt-1">
                    {dept.description}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--border)] flex items-center justify-between text-[11px]">
                <span className="text-[var(--text-muted)] font-medium">Licensed MLSCN scientists</span>
                <Link
                  href={`/search?dept=${dept.id}`}
                  className="font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore panels</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 4. Dual Deep-Purple Feature Spotlights */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Spotlight Card 1: Specialized Reference Diagnostics */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#4A154B] to-[#2B093D] p-6 sm:p-8 text-white shadow-xl border border-white/10 flex flex-col justify-between space-y-4 sm:space-y-6 relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/90 border border-white/15">
                <span>Accredited Diagnostics</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Specialized Reference Laboratories
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Access specialized molecular assays, hormonal panels, fertility investigations, and histology from vetted tier-1 laboratories across Lagos and Abuja with clear upfront pricing.
              </p>
            </div>
            <div className="pt-3 border-t border-white/15 relative z-10">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-white/80 group"
              >
                <span>Explore specialized panels</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Spotlight Card 2: Comprehensive Cold-Chain Phlebotomy */}
          <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#512C7A] to-[#361358] p-6 sm:p-8 text-white shadow-xl border border-white/10 flex flex-col justify-between space-y-4 sm:space-y-6 relative overflow-hidden">
            <div className="space-y-3 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/90 border border-white/15">
                <span>At-Home Convenience</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Comprehensive Home Phlebotomy
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Qualified medical phlebotomists dispatched to your home or office. Samples are safely collected in vacuum tubes, barcoded on-site, and stored in chilled cold-boxes for guaranteed sample viability.
              </p>
            </div>
            <div className="pt-3 border-t border-white/15 relative z-10">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-white/80 group"
              >
                <span>Book a home sample pickup</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Lablinks Section */}
      <section id="infrastructure" className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10 scroll-mt-28">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="eyebrow-label text-[var(--accent)]">Why Lablinks</span>
          <AccentHeading
            plainText="Getting tested"
            accentText="should be easier."
            size="section"
            tag="h2"
            align="center"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Finding a lab, knowing what a test costs, and getting your results shouldn&apos;t be complicated. We&apos;re bringing it all together in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2.5 card-hover-lift shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-base text-[var(--text)]">More labs, less searching</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Find licensed labs across Nigeria, compare their prices, and choose one that works for you.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2.5 card-hover-lift shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-base text-[var(--text)]">Samples collected with care</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Need a home visit? A trained phlebotomist collects your sample, labels it with a barcode, and keeps it properly stored on the way to the lab.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2.5 card-hover-lift shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-base text-[var(--text)]">Know your report is genuine</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Every report comes with a QR code you can scan to check that it&apos;s genuine and tamper-proof.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-2.5 card-hover-lift shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-bold text-base text-[var(--text)]">Keep your results in one place</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Your previous results stay accessible, making it easier to follow changes and share them with your doctor.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Clinical Test Finder */}
      <section id="test-finder" className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-[var(--card)] p-6 sm:p-10 space-y-6 shadow-md border border-[var(--border)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="eyebrow-label text-[var(--accent)]">Test Finder</span>
              <AccentHeading
                plainText="Not sure what test"
                accentText="to take?"
                size="card"
                tag="h2"
              />
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Tell us what you&apos;re concerned about or what you&apos;d like to check. We&apos;ll help you find tests worth discussing with your healthcare provider.
              </p>
            </div>
            <div className="self-start sm:self-center">
              <span className="data-tag text-[10px] px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--accent)] flex items-center gap-1.5 font-sans font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                <span>Not a diagnosis</span>
              </span>
            </div>
          </div>

          {/* Search Form with Typewriter Placeholder */}
          <form onSubmit={handleAiSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={aiQuery}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder={placeholderText ? `${placeholderText} |` : 'Search symptoms, health checks, or panel names...'}
                className="w-full pl-5 pr-10 py-3.5 rounded-full bg-[var(--surface)] text-[var(--text)] placeholder-[var(--text-muted)] text-xs sm:text-sm border border-[var(--border)] focus:border-[var(--accent)] outline-none transition-all"
              />
              {aiQuery && (
                <button
                  type="button"
                  onClick={() => setAiQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-full cursor-pointer"
                  aria-label="Clear query"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={aiLoading}
              className="btn-primary-pill px-7 py-3.5 text-xs sm:text-sm whitespace-nowrap disabled:opacity-50 inline-flex items-center justify-center gap-2 text-white cursor-pointer font-bold"
            >
              {aiLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Help me find a test</span>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Quick Picks */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[var(--text-muted)] text-[11px] font-medium">Quick picks:</span>
            {[
              { label: 'Diabetes', query: 'Annual checkup for someone with family history of high blood sugar' },
              { label: 'Pre-marital tests', query: 'Pre-marital health check: Genotype, blood group and hepatitis' },
              { label: 'Fever & malaria', query: 'High fever, chills, body weakness and headache' },
              { label: 'Heart health', query: 'Comprehensive heart and cholesterol checkup in Victoria Island' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => setAiQuery(chip.query)}
                className="px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all text-[11px] font-medium cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Suggestion Results */}
          {aiResult && (
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-sm animate-in fade-in duration-200">
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
                        className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between space-y-3"
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
                  <div className="p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[11px] text-[var(--text-muted)] leading-relaxed">
                    {aiResult.disclaimer}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 8. Featured Accredited Labs Section */}
      <section id="find-labs" className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="eyebrow-label text-[var(--accent)]">Partner Labs</span>
            <AccentHeading
              plainText="Find a lab"
              accentText="near you."
              size="section"
              tag="h2"
            />
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Browse licensed laboratories, check their services, and see how much your tests cost before you book.
            </p>
          </div>
          <Link
            href="/search"
            className="text-xs sm:text-sm font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
          >
            <span>Browse all 24 labs →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {FEATURED_LABS.map((lab) => (
            <div
              key={lab.id}
              className="rounded-2xl bg-[var(--card)] p-5 flex flex-col justify-between space-y-4 shadow-sm border border-[var(--border)] card-hover-lift"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="data-tag text-[9px] px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 font-semibold font-sans">
                    {lab.status}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium">
                    Results in {lab.turnaround}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[var(--text)] text-base">
                    {lab.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{lab.area}</p>
                </div>

                <div className="text-[11px] text-[var(--text-muted)] font-medium">
                  {lab.highlight}
                </div>

                <div className="text-xs space-y-1 text-[11px] text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                  <div>
                    MLSCN licence: <span className="text-[var(--text)] font-semibold">{lab.license}</span>
                  </div>
                  <div>
                    Home visit: <span className="text-[var(--accent)] font-semibold">{lab.homeFee}</span>
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] opacity-80 pt-1">
                    {lab.hours}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  href={`/search?lab=${lab.id}`}
                  className="flex-1 py-2 text-center text-xs font-semibold btn-secondary-pill"
                >
                  See tests
                </Link>
                <Link
                  href={`/book?lab=${lab.id}`}
                  className="flex-1 py-2 text-center text-xs font-bold btn-primary-pill text-white"
                >
                  Book visit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Test Catalog & Pricing Section */}
      <section id="catalog" className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-8 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="eyebrow-label text-[var(--accent)]">Tests &amp; Pricing</span>
            <AccentHeading
              plainText="Know the price"
              accentText="before you go."
              size="section"
              tag="h2"
            />
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Check test prices across our partner labs and choose what fits your budget.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Chemistry', 'Hematology', 'Parasitology', 'Serology'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCatalogCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCatalogCategory === cat
                    ? 'bg-[var(--accent)] text-white shadow-sm'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredCatalogTests.map((item) => (
            <div
              key={item.code}
              className="rounded-2xl bg-[var(--card)] p-5 space-y-3.5 flex flex-col justify-between border border-[var(--border)] card-hover-lift shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[var(--accent)]">{item.code}</span>
                  <span className="text-[11px] text-[var(--text-muted)]">{item.category}</span>
                </div>
                <h3 className="font-bold text-[var(--text)] text-base">
                  {item.name}
                </h3>
                <div className="text-2xl font-serif italic text-[var(--text)] font-semibold">{item.price}</div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)] space-y-1">
                <div>Sample type: <span className="text-[var(--text)] font-medium">{item.sample}</span></div>
                <div>Instructions: <span className="text-[var(--text)] font-medium">{item.fasting}</span></div>
                <div>Results in: <span className="text-[var(--accent)] font-semibold">{item.turnaround}</span></div>
              </div>

              <Link
                href={`/book?test=${item.code}`}
                className="btn-primary-pill text-center py-2.5 text-xs font-bold text-white"
              >
                Book this test
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10. How It Works Section */}
      <section id="how-it-works" className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10 scroll-mt-28">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="eyebrow-label text-[var(--accent)]">How It Works</span>
          <AccentHeading
            plainText="Getting tested,"
            accentText="made simple."
            size="section"
            tag="h2"
            align="center"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Here&apos;s what happens from booking your test to receiving your results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-2xl bg-[var(--card)] p-6 sm:p-7 space-y-3.5 border border-[var(--border)] card-hover-lift shadow-sm">
            <div className="text-3xl font-serif italic text-[var(--accent)] font-normal">
              01
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[var(--text)]">Find your test and lab</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Browse available tests, compare lab prices, and book without worrying about unexpected charges.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--card)] p-6 sm:p-7 space-y-3.5 border border-[var(--border)] card-hover-lift shadow-sm">
            <div className="text-3xl font-serif italic text-[var(--accent)] font-normal">
              02
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[var(--text)]">Visit the lab or book a home collection</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Choose a time to visit your lab, or have a phlebotomist collect your sample at home. Your sample is labelled and handled carefully on its way to the lab.
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--card)] p-6 sm:p-7 space-y-3.5 border border-[var(--border)] card-hover-lift shadow-sm">
            <div className="text-3xl font-serif italic text-[var(--gold)] font-normal">
              03
            </div>
            <h3 className="font-bold text-base sm:text-lg text-[var(--text)]">Get your results online</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Your report is available securely online. It includes a QR code that lets doctors, employers, or embassies check that it&apos;s genuine.
            </p>
          </div>
        </div>
      </section>

      {/* 11. For Laboratories (B2B) Section */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[var(--surface)] to-[var(--bg-raised)] p-6 sm:p-10 border border-[var(--border)] shadow-md space-y-6 sm:space-y-8">
          <div className="max-w-2xl space-y-2.5 text-left">
            <span className="eyebrow-label text-[var(--accent)]">For Laboratories</span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text)] tracking-tight">
              Spend less time managing your lab.
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Keep track of orders, samples, results, and payments without juggling different systems. Lablinks helps your team manage the day-to-day work in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-1">
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-1.5">
              <div className="text-sm font-bold text-[var(--text)]">Automatic sample labels</div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Sample labels are ready as soon as a patient checks in or a home collection is assigned.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-1.5">
              <div className="text-sm font-bold text-[var(--text)]">A second check for every result</div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                One scientist enters the results. Another reviews and approves them before they&apos;re released.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-1.5">
              <div className="text-sm font-bold text-[var(--text)]">Payments you can keep track of</div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Card, bank transfer, and USSD payments are recorded and reconciled with your bank account.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/lab/apply"
              className="btn-primary-pill px-6 sm:px-7 py-3 text-xs sm:text-sm font-bold inline-flex items-center gap-2 text-white"
            >
              <span>Bring your lab to Lablinks →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FAQs Section (Strictly tagged "FAQs" as requested) */}
      <section id="faqs" className="max-w-[920px] mx-auto px-4 sm:px-6 space-y-8 scroll-mt-28">
        <div className="text-center space-y-2">
          <span className="eyebrow-label text-[var(--accent)]">FAQs</span>
          <AccentHeading
            plainText="Frequently Asked"
            accentText="Questions."
            size="section"
            tag="h2"
            align="center"
          />
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Here&apos;s what to know before booking a test or collecting your results.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[var(--card)] overflow-hidden border border-[var(--border)] card-hover-lift transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[var(--text)] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className={`w-7 h-7 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-xs text-[var(--accent)] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[var(--gold)]' : ''}`}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. Final Call to Action (Strictly matches requested copy and buttons) */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[var(--card)] p-6 sm:p-14 text-center space-y-5 overflow-hidden border border-[var(--border)] shadow-xl">
          <div className="absolute inset-0 m-auto w-80 h-80 rounded-full bg-[var(--accent)] opacity-15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-3.5">
            <span className="eyebrow-label text-[var(--accent)]">Get Started</span>
            <AccentHeading
              plainText="Ready for accurate diagnostic care?"
              accentText="Book your test today."
              size="section"
              tag="h2"
              align="center"
            />
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-lg mx-auto">
              Compare accredited laboratories in your neighborhood, book tests and get results online
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3 w-full sm:w-auto">
              <Link
                href="/search"
                className="btn-primary-pill px-7 py-3.5 text-sm sm:text-base inline-flex items-center justify-center gap-2 text-white cursor-pointer"
              >
                <span>Find a lab near you</span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/lab/apply"
                className="btn-secondary-pill px-6 py-3.5 text-sm sm:text-base inline-flex items-center justify-center cursor-pointer"
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

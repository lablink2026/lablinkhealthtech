export interface StarterTestDefinition {
  code: string;
  name: string;
  category: string;
  sampleType: string;
  priceKobo: number;
  turnaroundHours: number;
  preparationNotes: string;
  referenceRanges: {
    parameterName: string;
    lowValue?: number;
    highValue?: number;
    unit?: string;
    sex?: 'all' | 'male' | 'female';
    textReference?: string;
  }[];
}

export const STARTER_CATALOG_40_TESTS: StarterTestDefinition[] = [
  {
    code: 'FBC',
    name: 'Full Blood Count (FBC / CBC)',
    category: 'Hematology',
    sampleType: 'EDTA Whole Blood',
    priceKobo: 450000, // ₦4,500
    turnaroundHours: 4,
    preparationNotes: 'No special preparation needed. Maintain hydration.',
    referenceRanges: [
      { parameterName: 'Hemoglobin', lowValue: 12.0, highValue: 16.5, unit: 'g/dL', sex: 'all' },
      { parameterName: 'White Blood Cell Count', lowValue: 4.0, highValue: 11.0, unit: 'x10^9/L', sex: 'all' },
      { parameterName: 'Platelets', lowValue: 150, highValue: 450, unit: 'x10^9/L', sex: 'all' },
      { parameterName: 'Packed Cell Volume (PCV)', lowValue: 36.0, highValue: 50.0, unit: '%', sex: 'all' }
    ]
  },
  {
    code: 'MP_MIC',
    name: 'Malaria Parasite (Microscopy / Giemsa)',
    category: 'Parasitology',
    sampleType: 'EDTA Whole Blood (Thick & Thin film)',
    priceKobo: 250000, // ₦2,500
    turnaroundHours: 3,
    preparationNotes: 'Collect before starting antimalarial therapy if possible.',
    referenceRanges: [
      { parameterName: 'Trophozoites seen', textReference: 'No malaria parasites seen (Negative)' }
    ]
  },
  {
    code: 'WIDAL',
    name: 'Widal Agglutination Test (Typhoid)',
    category: 'Serology',
    sampleType: 'Plain Serum',
    priceKobo: 300000, // ₦3,000
    turnaroundHours: 4,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'Salmonella typhi O titer', textReference: '< 1:80 (Negative)' },
      { parameterName: 'Salmonella typhi H titer', textReference: '< 1:80 (Negative)' }
    ]
  },
  {
    code: 'FBS',
    name: 'Fasting Blood Sugar (FBS)',
    category: 'Clinical Chemistry',
    sampleType: 'Fluoride Oxalate Plasma',
    priceKobo: 200000, // ₦2,000
    turnaroundHours: 2,
    preparationNotes: 'Strict 8 to 12 hours overnight fast. Water permitted.',
    referenceRanges: [
      { parameterName: 'Glucose', lowValue: 70.0, highValue: 99.0, unit: 'mg/dL', sex: 'all' }
    ]
  },
  {
    code: 'RBS',
    name: 'Random Blood Sugar (RBS)',
    category: 'Clinical Chemistry',
    sampleType: 'Fluoride Oxalate Plasma',
    priceKobo: 180000, // ₦1,800
    turnaroundHours: 2,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'Random Glucose', lowValue: 70.0, highValue: 140.0, unit: 'mg/dL', sex: 'all' }
    ]
  },
  {
    code: 'HBA1C',
    name: 'Glycated Hemoglobin (HbA1c)',
    category: 'Clinical Chemistry',
    sampleType: 'EDTA Whole Blood',
    priceKobo: 850000, // ₦8,500
    turnaroundHours: 6,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'HbA1c', lowValue: 4.0, highValue: 5.6, unit: '%', sex: 'all', textReference: '<5.7% Normal, 5.7-6.4% Prediabetes, >=6.5% Diabetes' }
    ]
  },
  {
    code: 'LIPID',
    name: 'Lipid Profile',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 800000, // ₦8,000
    turnaroundHours: 6,
    preparationNotes: 'Strict 10 to 12 hours overnight fast. Avoid fatty meals the evening before.',
    referenceRanges: [
      { parameterName: 'Total Cholesterol', lowValue: 120.0, highValue: 200.0, unit: 'mg/dL' },
      { parameterName: 'Triglycerides', lowValue: 40.0, highValue: 150.0, unit: 'mg/dL' },
      { parameterName: 'HDL Cholesterol', lowValue: 40.0, highValue: 60.0, unit: 'mg/dL' },
      { parameterName: 'LDL Cholesterol', lowValue: 0.0, highValue: 100.0, unit: 'mg/dL' }
    ]
  },
  {
    code: 'LFT',
    name: 'Liver Function Test (LFT Panel)',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 950000, // ₦9,500
    turnaroundHours: 6,
    preparationNotes: 'Overnight fasting recommended (8 hours).',
    referenceRanges: [
      { parameterName: 'Total Bilirubin', lowValue: 0.2, highValue: 1.2, unit: 'mg/dL' },
      { parameterName: 'Direct Bilirubin', lowValue: 0.0, highValue: 0.3, unit: 'mg/dL' },
      { parameterName: 'AST (SGOT)', lowValue: 10.0, highValue: 40.0, unit: 'U/L' },
      { parameterName: 'ALT (SGPT)', lowValue: 7.0, highValue: 56.0, unit: 'U/L' },
      { parameterName: 'Alkaline Phosphatase (ALP)', lowValue: 44.0, highValue: 147.0, unit: 'U/L' },
      { parameterName: 'Total Protein', lowValue: 6.0, highValue: 8.3, unit: 'g/dL' },
      { parameterName: 'Albumin', lowValue: 3.5, highValue: 5.0, unit: 'g/dL' }
    ]
  },
  {
    code: 'KFT',
    name: 'Kidney Function Test (KFT / EUCr)',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 950000, // ₦9,500
    turnaroundHours: 6,
    preparationNotes: 'Maintain normal hydration before testing.',
    referenceRanges: [
      { parameterName: 'Sodium (Na+)', lowValue: 135.0, highValue: 145.0, unit: 'mmol/L' },
      { parameterName: 'Potassium (K+)', lowValue: 3.5, highValue: 5.1, unit: 'mmol/L' },
      { parameterName: 'Chloride (Cl-)', lowValue: 98.0, highValue: 107.0, unit: 'mmol/L' },
      { parameterName: 'Bicarbonate (HCO3-)', lowValue: 22.0, highValue: 29.0, unit: 'mmol/L' },
      { parameterName: 'Urea', lowValue: 15.0, highValue: 45.0, unit: 'mg/dL' },
      { parameterName: 'Creatinine', lowValue: 0.6, highValue: 1.2, unit: 'mg/dL' }
    ]
  },
  {
    code: 'URINALYSIS',
    name: 'Urinalysis (10-Parameter + Microscopy)',
    category: 'Microbiology',
    sampleType: 'Clean Catch Midstream Urine',
    priceKobo: 250000, // ₦2,500
    turnaroundHours: 2,
    preparationNotes: 'First morning midstream clean catch is preferred.',
    referenceRanges: [
      { parameterName: 'Protein', textReference: 'Negative' },
      { parameterName: 'Glucose', textReference: 'Negative' },
      { parameterName: 'Nitrite', textReference: 'Negative' },
      { parameterName: 'Leukocyte Esterase', textReference: 'Negative' },
      { parameterName: 'pH', lowValue: 5.0, highValue: 8.0, unit: 'pH' }
    ]
  },
  {
    code: 'STOOL_ANALYSIS',
    name: 'Stool Analysis (Microscopy & Occult Blood)',
    category: 'Parasitology',
    sampleType: 'Fresh Stool Specimen',
    priceKobo: 300000,
    turnaroundHours: 4,
    preparationNotes: 'Avoid red meat, turnips, and horseradish 3 days before test if FOBT is included.',
    referenceRanges: [
      { parameterName: 'Ova and Parasites', textReference: 'None seen' },
      { parameterName: 'Fecal Occult Blood', textReference: 'Negative' }
    ]
  },
  {
    code: 'HBSAG',
    name: 'Hepatitis B Surface Antigen (HBsAg)',
    category: 'Serology / Virology',
    sampleType: 'Plain Serum',
    priceKobo: 350000,
    turnaroundHours: 3,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'HBsAg', textReference: 'Non-Reactive (Negative)' }
    ]
  },
  {
    code: 'HCV',
    name: 'Hepatitis C Virus Antibody (Anti-HCV)',
    category: 'Serology / Virology',
    sampleType: 'Plain Serum',
    priceKobo: 350000,
    turnaroundHours: 3,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'Anti-HCV', textReference: 'Non-Reactive (Negative)' }
    ]
  },
  {
    code: 'HIV_SCR',
    name: 'HIV 1 & 2 Rapid Screening',
    category: 'Serology / Virology',
    sampleType: 'EDTA Whole Blood / Serum',
    priceKobo: 300000,
    turnaroundHours: 2,
    preparationNotes: 'Pre-test counseling provided.',
    referenceRanges: [
      { parameterName: 'HIV 1/2 Antibodies', textReference: 'Non-Reactive (Negative)' }
    ]
  },
  {
    code: 'VDRL',
    name: 'Syphilis Screening (VDRL / RPR)',
    category: 'Serology',
    sampleType: 'Plain Serum',
    priceKobo: 250000,
    turnaroundHours: 3,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'VDRL / RPR', textReference: 'Non-Reactive' }
    ]
  },
  {
    code: 'BLOOD_GROUP',
    name: 'Blood Group & Rhesus Factor',
    category: 'Hematology',
    sampleType: 'EDTA Whole Blood',
    priceKobo: 200000,
    turnaroundHours: 2,
    preparationNotes: 'None.',
    referenceRanges: [
      { parameterName: 'ABO Group', textReference: 'A, B, AB, or O' },
      { parameterName: 'Rhesus Factor', textReference: 'Positive or Negative' }
    ]
  },
  {
    code: 'GENOTYPE',
    name: 'Hemoglobin Genotype (Electrophoresis)',
    category: 'Hematology',
    sampleType: 'EDTA Whole Blood',
    priceKobo: 350000,
    turnaroundHours: 5,
    preparationNotes: 'None.',
    referenceRanges: [
      { parameterName: 'Hemoglobin Pattern', textReference: 'AA (Normal Adult Hb)' }
    ]
  },
  {
    code: 'PSA',
    name: 'Total Prostate Specific Antigen (PSA)',
    category: 'Tumor Markers',
    sampleType: 'Plain Serum',
    priceKobo: 900000,
    turnaroundHours: 8,
    preparationNotes: 'Avoid sexual activity, cycling, or rectal examination 48 hours before testing.',
    referenceRanges: [
      { parameterName: 'Total PSA', lowValue: 0.0, highValue: 4.0, unit: 'ng/mL', sex: 'male' }
    ]
  },
  {
    code: 'THYROID_PANEL',
    name: 'Thyroid Function Panel (TSH, FT3, FT4)',
    category: 'Endocrinology',
    sampleType: 'Plain Serum',
    priceKobo: 1400000, // ₦14,000
    turnaroundHours: 12,
    preparationNotes: 'Collect in the morning. Withhold biotin supplements for 48 hours.',
    referenceRanges: [
      { parameterName: 'TSH', lowValue: 0.4, highValue: 4.0, unit: 'uIU/mL' },
      { parameterName: 'Free T3', lowValue: 2.3, highValue: 4.2, unit: 'pg/mL' },
      { parameterName: 'Free T4', lowValue: 0.8, highValue: 1.8, unit: 'ng/dL' }
    ]
  },
  {
    code: 'URIC_ACID',
    name: 'Serum Uric Acid',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 400000,
    turnaroundHours: 4,
    preparationNotes: 'Overnight fasting recommended (8 hours).',
    referenceRanges: [
      { parameterName: 'Uric Acid', lowValue: 3.5, highValue: 7.2, unit: 'mg/dL' }
    ]
  },
  {
    code: 'CALCIUM',
    name: 'Serum Calcium (Total)',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 450000,
    turnaroundHours: 4,
    preparationNotes: 'Avoid venous stasis during venipuncture.',
    referenceRanges: [
      { parameterName: 'Calcium', lowValue: 8.5, highValue: 10.5, unit: 'mg/dL' }
    ]
  },
  {
    code: 'ESR',
    name: 'Erythrocyte Sedimentation Rate (ESR)',
    category: 'Hematology',
    sampleType: 'Sodium Citrate Whole Blood',
    priceKobo: 250000,
    turnaroundHours: 3,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'ESR', lowValue: 0, highValue: 20, unit: 'mm/hr' }
    ]
  },
  {
    code: 'HS_CRP',
    name: 'High-Sensitivity C-Reactive Protein (hs-CRP)',
    category: 'Clinical Chemistry / Immunology',
    sampleType: 'Plain Serum',
    priceKobo: 800000,
    turnaroundHours: 6,
    preparationNotes: 'Patient should be free of acute infection/inflammation for cardiovascular risk assessment.',
    referenceRanges: [
      { parameterName: 'hs-CRP', lowValue: 0.0, highValue: 3.0, unit: 'mg/L' }
    ]
  },
  {
    code: 'HCG_SERUM',
    name: 'Beta-hCG (Quantitative Serum Pregnancy)',
    category: 'Endocrinology',
    sampleType: 'Plain Serum',
    priceKobo: 600000,
    turnaroundHours: 4,
    preparationNotes: 'None.',
    referenceRanges: [
      { parameterName: 'Beta-hCG', lowValue: 0.0, highValue: 5.0, unit: 'mIU/mL', textReference: '<5 mIU/mL Negative, >25 mIU/mL Positive' }
    ]
  },
  {
    code: 'PT_INR',
    name: 'Prothrombin Time & INR (PT/INR)',
    category: 'Hematology / Coagulation',
    sampleType: 'Citrated Plasma (Blue top)',
    priceKobo: 500000,
    turnaroundHours: 4,
    preparationNotes: 'Record current anticoagulant medications.',
    referenceRanges: [
      { parameterName: 'Prothrombin Time', lowValue: 11.0, highValue: 14.0, unit: 'seconds' },
      { parameterName: 'INR', lowValue: 0.8, highValue: 1.2, unit: 'ratio' }
    ]
  },
  {
    code: 'SEMEN_ANALYSIS',
    name: 'Semen Analysis',
    category: 'Reproductive Biology',
    sampleType: 'Fresh Semen Specimen',
    priceKobo: 850000,
    turnaroundHours: 4,
    preparationNotes: 'Strict 2 to 5 days of sexual abstinence before sample collection.',
    referenceRanges: [
      { parameterName: 'Sperm Concentration', lowValue: 15.0, highValue: 200.0, unit: 'x10^6/mL' },
      { parameterName: 'Total Motility (PR + NP)', lowValue: 40.0, highValue: 100.0, unit: '%' }
    ]
  },
  {
    code: 'HVS_MCS',
    name: 'High Vaginal Swab (HVS Microscopy & Culture)',
    category: 'Microbiology',
    sampleType: 'Endocervical / Vaginal Swab',
    priceKobo: 700000,
    turnaroundHours: 48,
    preparationNotes: 'Avoid douching and vaginal creams 48 hours prior.',
    referenceRanges: [
      { parameterName: 'Wet mount', textReference: 'No clue cells, yeast cells, or Trichomonas vaginalis' }
    ]
  },
  {
    code: 'URETHRAL_MCS',
    name: 'Urethral Swab (Microscopy & Culture)',
    category: 'Microbiology',
    sampleType: 'Urethral Exudate / Swab',
    priceKobo: 700000,
    turnaroundHours: 48,
    preparationNotes: 'Do not urinate for at least 2 hours before sample collection.',
    referenceRanges: [
      { parameterName: 'Gram stain', textReference: 'No intracellular Gram-negative diplococci' }
    ]
  },
  {
    code: 'SPUTUM_AFB',
    name: 'Sputum AFB (Tuberculosis Screening)',
    category: 'Microbiology',
    sampleType: 'Early Morning Deep Cough Sputum',
    priceKobo: 400000,
    turnaroundHours: 6,
    preparationNotes: 'Early morning deep bronchial cough sputum, not saliva.',
    referenceRanges: [
      { parameterName: 'Acid Fast Bacilli', textReference: 'No AFB seen (Negative)' }
    ]
  },
  {
    code: 'HPYLORI_AG',
    name: 'Helicobacter pylori Stool Antigen',
    category: 'Gastroenterology',
    sampleType: 'Fresh Stool Specimen',
    priceKobo: 650000,
    turnaroundHours: 4,
    preparationNotes: 'Avoid antibiotics and PPIs for 2 weeks prior.',
    referenceRanges: [
      { parameterName: 'H. pylori Antigen', textReference: 'Negative' }
    ]
  },
  {
    code: 'CHLAMYDIA_AB',
    name: 'Chlamydia Trachomatis Antibodies (IgG/IgM)',
    category: 'Serology',
    sampleType: 'Plain Serum',
    priceKobo: 600000,
    turnaroundHours: 6,
    preparationNotes: 'None.',
    referenceRanges: [
      { parameterName: 'Chlamydia IgG', textReference: 'Negative' }
    ]
  },
  {
    code: 'FERRITIN',
    name: 'Serum Ferritin (Iron Stores)',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 900000,
    turnaroundHours: 8,
    preparationNotes: 'Morning draw preferred.',
    referenceRanges: [
      { parameterName: 'Ferritin', lowValue: 30.0, highValue: 400.0, unit: 'ng/mL' }
    ]
  },
  {
    code: 'VITAMIN_D',
    name: '25-Hydroxy Vitamin D',
    category: 'Endocrinology',
    sampleType: 'Plain Serum',
    priceKobo: 1600000, // ₦16,000
    turnaroundHours: 24,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: '25-OH Vitamin D', lowValue: 30.0, highValue: 100.0, unit: 'ng/mL', textReference: '>=30 ng/mL Sufficient' }
    ]
  },
  {
    code: 'VITAMIN_B12',
    name: 'Vitamin B12 (Cyanocobalamin)',
    category: 'Endocrinology',
    sampleType: 'Plain Serum',
    priceKobo: 1500000,
    turnaroundHours: 24,
    preparationNotes: 'Fasting 8 hours recommended.',
    referenceRanges: [
      { parameterName: 'Vitamin B12', lowValue: 200.0, highValue: 900.0, unit: 'pg/mL' }
    ]
  },
  {
    code: 'AFP',
    name: 'Alpha-Fetoprotein (AFP Marker)',
    category: 'Tumor Markers',
    sampleType: 'Plain Serum',
    priceKobo: 950000,
    turnaroundHours: 12,
    preparationNotes: 'Fasting not required.',
    referenceRanges: [
      { parameterName: 'AFP', lowValue: 0.0, highValue: 8.5, unit: 'ng/mL' }
    ]
  },
  {
    code: 'CA125',
    name: 'Cancer Antigen 125 (CA-125)',
    category: 'Tumor Markers',
    sampleType: 'Plain Serum',
    priceKobo: 1200000,
    turnaroundHours: 12,
    preparationNotes: 'Avoid testing during menstruation.',
    referenceRanges: [
      { parameterName: 'CA-125', lowValue: 0.0, highValue: 35.0, unit: 'U/mL' }
    ]
  },
  {
    code: 'CEA',
    name: 'Carcinoembryonic Antigen (CEA)',
    category: 'Tumor Markers',
    sampleType: 'Plain Serum',
    priceKobo: 1100000,
    turnaroundHours: 12,
    preparationNotes: 'Record smoking history.',
    referenceRanges: [
      { parameterName: 'CEA', lowValue: 0.0, highValue: 3.0, unit: 'ng/mL', textReference: '<3 ng/mL (Non-smokers), <5 ng/mL (Smokers)' }
    ]
  },
  {
    code: 'ELECTROLYTES',
    name: 'Serum Electrolytes (Na+, K+, Cl-, HCO3-)',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 650000,
    turnaroundHours: 4,
    preparationNotes: 'Avoid hemolysis during sample handling.',
    referenceRanges: [
      { parameterName: 'Sodium (Na+)', lowValue: 135.0, highValue: 145.0, unit: 'mmol/L' },
      { parameterName: 'Potassium (K+)', lowValue: 3.5, highValue: 5.0, unit: 'mmol/L' },
      { parameterName: 'Chloride (Cl-)', lowValue: 98.0, highValue: 107.0, unit: 'mmol/L' },
      { parameterName: 'Bicarbonate (HCO3-)', lowValue: 22.0, highValue: 29.0, unit: 'mmol/L' }
    ]
  },
  {
    code: 'AMYLASE',
    name: 'Serum Amylase',
    category: 'Clinical Chemistry',
    sampleType: 'Plain Serum',
    priceKobo: 550000,
    turnaroundHours: 4,
    preparationNotes: 'Avoid alcohol 24 hours prior.',
    referenceRanges: [
      { parameterName: 'Amylase', lowValue: 28.0, highValue: 100.0, unit: 'U/L' }
    ]
  },
  {
    code: 'URINE_PREG_RAPID',
    name: 'Urine Pregnancy Test (Rapid)',
    category: 'Point of Care',
    sampleType: 'Random / First Morning Urine',
    priceKobo: 120000, // ₦1,200
    turnaroundHours: 1,
    preparationNotes: 'First morning urine provides highest hCG concentration.',
    referenceRanges: [
      { parameterName: 'Rapid hCG', textReference: 'Negative (<25 mIU/mL)' }
    ]
  }
];

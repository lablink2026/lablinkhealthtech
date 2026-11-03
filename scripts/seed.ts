import { getDb, DBClient } from '../src/db/client';
import { STARTER_CATALOG_40_TESTS } from '../src/modules/catalog/starter-catalog';
import { hashPassword } from '../src/modules/auth/service';

export async function runSeed(customDb?: DBClient) {
  const db = customDb || await getDb();
  console.log('Seeding Lablink database with authentic Nigerian data...');

  const defaultPasswordHash = hashPassword('Lablink2026!');

  // 1. Seed Platform Admin
  await db.query(
    `INSERT INTO users (id, email, phone, full_name, password_hash, role)
     VALUES ('00000000-0000-0000-0000-000000000001', 'admin@lablink.ng', '+2348010000001', 'Chinedu Okeke', '${defaultPasswordHash}', 'platform_admin')
     ON CONFLICT (email) DO NOTHING`
  );

  // 2. Seed Labs
  // Lab 1: Victoria Island, Lagos (Verified)
  const lab1Id = '11111111-1111-1111-1111-111111111111';
  await db.query(
    `INSERT INTO labs (id, name, slug, mlscn_number, cac_number, verification_status, address, state, lga, phone, email, brand_primary_color, brand_secondary_color, home_collection_enabled, home_collection_fee_kobo)
     VALUES ('${lab1Id}', 'Synlab Diagnostics VI', 'synlab-vi', 'MLSCN/LAB/2019/0421', 'RC-1049281', 'verified', 'Plot 10, Adeola Odeku Street, Victoria Island', 'Lagos', 'Eti-Osa', '+23412345001', 'contact@synlabvi.ng', '#0F766E', '#042F2E', true, 400000)
     ON CONFLICT (slug) DO NOTHING`
  );

  // Lab 2: Yaba, Lagos (Verified)
  const lab2Id = '22222222-2222-2222-2222-222222222222';
  await db.query(
    `INSERT INTO labs (id, name, slug, mlscn_number, cac_number, verification_status, address, state, lga, phone, email, brand_primary_color, brand_secondary_color, home_collection_enabled, home_collection_fee_kobo)
     VALUES ('${lab2Id}', 'Medex Diagnostic Centre Yaba', 'medex-yaba', 'MLSCN/LAB/2021/0892', 'RC-1482910', 'verified', '34 Herbert Macaulay Way, Alagomeji, Yaba', 'Lagos', 'Lagos Mainland', '+23412345002', 'hello@medexyaba.ng', '#2563EB', '#1E3A8A', true, 300000)
     ON CONFLICT (slug) DO NOTHING`
  );

  // Lab 3: Ikeja, Lagos (Verified)
  const lab3Id = '33333333-3333-3333-3333-333333333333';
  await db.query(
    `INSERT INTO labs (id, name, slug, mlscn_number, cac_number, verification_status, address, state, lga, phone, email, brand_primary_color, brand_secondary_color, home_collection_enabled, home_collection_fee_kobo)
     VALUES ('${lab3Id}', 'CarePoint Medical Diagnostics Ikeja', 'carepoint-ikeja', 'MLSCN/LAB/2020/0654', 'RC-1294812', 'verified', '12 Allen Avenue, Ikeja', 'Lagos', 'Ikeja', '+23412345003', 'info@carepointikeja.ng', '#D97706', '#78350F', true, 350000)
     ON CONFLICT (slug) DO NOTHING`
  );

  // Lab 4: Garki, Abuja (Verified)
  const lab4Id = '44444444-4444-4444-4444-444444444444';
  await db.query(
    `INSERT INTO labs (id, name, slug, mlscn_number, cac_number, verification_status, address, state, lga, phone, email, brand_primary_color, brand_secondary_color, home_collection_enabled, home_collection_fee_kobo)
     VALUES ('${lab4Id}', 'Federal Capital Diagnostics Garki', 'fcd-garki', 'MLSCN/LAB/2018/0312', 'RC-983719', 'verified', 'Area 11, Off Tafawa Balewa Way, Garki', 'Abuja (FCT)', 'Abuja Municipal', '+23490987001', 'desk@fcdgarki.ng', '#059669', '#064E3B', true, 500000)
     ON CONFLICT (slug) DO NOTHING`
  );

  // Lab 5: Pending Verification Lab (Surulere)
  const lab5Id = '55555555-5555-5555-5555-555555555555';
  await db.query(
    `INSERT INTO labs (id, name, slug, mlscn_number, cac_number, verification_status, address, state, lga, phone, email, brand_primary_color, brand_secondary_color, home_collection_enabled, home_collection_fee_kobo)
     VALUES ('${lab5Id}', 'Apex Clinical Care Surulere', 'apex-surulere', 'MLSCN/LAB/2026/PENDING', 'RC-1928374', 'pending', '56 Bode Thomas Street, Surulere', 'Lagos', 'Surulere', '+23412345005', 'support@apexsurulere.ng', '#7C3AED', '#4C1D95', false, 0)
     ON CONFLICT (slug) DO NOTHING`
  );

  // 3. Seed Lab Staff for Lab 1 (Synlab VI)
  const staff1 = '10000000-0000-0000-0000-000000000001';
  const staff2 = '10000000-0000-0000-0000-000000000002';
  const staff3 = '10000000-0000-0000-0000-000000000003';
  const staff4 = '10000000-0000-0000-0000-000000000004';

  await db.query(
    `INSERT INTO users (id, email, phone, full_name, password_hash, role)
     VALUES 
      ('${staff1}', 'admin@synlabvi.ng', '+2348020000001', 'Dr. Folake Adeleke', '${defaultPasswordHash}', 'lab_admin'),
      ('${staff2}', 'scientist@synlabvi.ng', '+2348020000002', 'Emeka Nwosu, MLS', '${defaultPasswordHash}', 'lab_staff'),
      ('${staff3}', 'approver@synlabvi.ng', '+2348020000003', 'Dr. Babatunde Balogun, FMLSCN', '${defaultPasswordHash}', 'lab_staff'),
      ('${staff4}', 'collector@synlabvi.ng', '+2348020000004', 'Blessing Ibrahim', '${defaultPasswordHash}', 'lab_staff')
     ON CONFLICT (email) DO NOTHING`
  );

  await db.query(
    `INSERT INTO memberships (user_id, lab_id, sub_role, license_number)
     VALUES 
      ('${staff1}', '${lab1Id}', 'receptionist', NULL),
      ('${staff2}', '${lab1Id}', 'scientist', 'MLSCN/MLS/2017/1293'),
      ('${staff3}', '${lab1Id}', 'approver', 'MLSCN/FMLS/2012/0481'),
      ('${staff4}', '${lab1Id}', 'phlebotomist', NULL)
     ON CONFLICT (user_id, lab_id) DO NOTHING`
  );

  // 4. Seed Patients
  const patient1User = '20000000-0000-0000-0000-000000000001';
  const patient2User = '20000000-0000-0000-0000-000000000002';
  const patient1Id = '30000000-0000-0000-0000-000000000001';
  const patient2Id = '30000000-0000-0000-0000-000000000002';

  await db.query(
    `INSERT INTO users (id, email, phone, full_name, password_hash, role)
     VALUES 
      ('${patient1User}', 'olumide.adeyemi@example.com', '+2348030000001', 'Olumide Adeyemi', '${defaultPasswordHash}', 'patient'),
      ('${patient2User}', 'amaka.eze@example.com', '+2348030000002', 'Amaka Eze', '${defaultPasswordHash}', 'patient')
     ON CONFLICT (email) DO NOTHING`
  );

  await db.query(
    `INSERT INTO patients (id, user_id, date_of_birth, sex, blood_group, genotype, address, state, lga)
     VALUES 
      ('${patient1Id}', '${patient1User}', '1984-06-15', 'male', 'O+', 'AA', '14 Admiralty Way, Lekki Phase 1', 'Lagos', 'Eti-Osa'),
      ('${patient2Id}', '${patient2User}', '1992-11-20', 'female', 'A+', 'AS', '8 Montgomery Road, Yaba', 'Lagos', 'Lagos Mainland')
     ON CONFLICT (user_id) DO NOTHING`
  );

  // 5. Seed Test Catalog for Lab 1 (Synlab VI) and Lab 2 (Medex Yaba)
  for (const labId of [lab1Id, lab2Id, lab3Id, lab4Id]) {
    // Add price variance for comparison
    const priceMultiplier = labId === lab1Id ? 1.1 : labId === lab2Id ? 0.95 : 1.0;
    
    for (const test of STARTER_CATALOG_40_TESTS) {
      const price = Math.round(test.priceKobo * priceMultiplier);
      const testRes = await db.query(
        `INSERT INTO tests (lab_id, code, name, category, sample_type, price_kobo, turnaround_hours, preparation_notes, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
         ON CONFLICT (lab_id, code) DO UPDATE SET price_kobo = EXCLUDED.price_kobo
         RETURNING id`,
        [labId, test.code, test.name, test.category, test.sampleType, price, test.turnaroundHours, test.preparationNotes]
      );

      const testId = testRes.rows[0]?.id;
      if (testId && test.referenceRanges) {
        for (const r of test.referenceRanges) {
          await db.query(
            `INSERT INTO reference_ranges (lab_id, test_id, parameter_name, low_value, high_value, unit, sex, text_reference)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [labId, testId, r.parameterName, r.lowValue ?? null, r.highValue ?? null, r.unit ?? null, r.sex ?? 'all', r.textReference ?? null]
          );
        }
      }
    }
  }

  // 6. Seed Repeat Test Records for Patient 1 (Olumide Adeyemi) for Health Trend Charts
  // Fetch FBS test for Lab 1
  const fbsRes = await db.query(
    `SELECT id FROM tests WHERE lab_id = $1 AND code = 'FBS'`,
    [lab1Id]
  );
  const fbsTestId = fbsRes.rows[0]?.id;

  if (fbsTestId) {
    // Three historical glucose bookings: 6 months ago, 3 months ago, 1 month ago
    const trendDates = [
      { date: '2026-05-10', glucose: 118, ref: 'LL-202605-FBS1', flag: 'abnormal' },
      { date: '2026-08-15', glucose: 104, ref: 'LL-202608-FBS2', flag: 'abnormal' },
      { date: '2026-10-20', glucose: 92,  ref: 'LL-202610-FBS3', flag: 'normal' }
    ];

    for (const [idx, item] of trendDates.entries()) {
      const bookingRes = await db.query(
        `INSERT INTO bookings (lab_id, reference, patient_id, collection_type, status, scheduled_date, scheduled_slot, subtotal_kobo, total_kobo)
         VALUES ($1, $2, $3, 'walk_in', 'results_ready', $4, '09:00 - 10:00', 220000, 220000)
         ON CONFLICT (reference) DO NOTHING
         RETURNING id`,
        [lab1Id, item.ref, patient1Id, item.date]
      );
      const bId = bookingRes.rows[0]?.id;
      if (bId) {
        const resultRes = await db.query(
          `INSERT INTO results (lab_id, booking_id, patient_id, test_id, scientist_id, approver_id, approver_name, approver_license_number, status, version_number, signed_at)
           VALUES ($1, $2, $3, $4, $5, $6, 'Dr. Babatunde Balogun, FMLSCN', 'MLSCN/FMLS/2012/0481', 'approved', 1, $7)
           RETURNING id`,
          [lab1Id, bId, patient1Id, fbsTestId, staff2, staff3, item.date + 'T14:30:00Z']
        );
        const rId = resultRes.rows[0]?.id;
        if (rId) {
          await db.query(
            `INSERT INTO result_values (lab_id, result_id, parameter_name, value, numeric_value, unit, flag, reference_range_text)
             VALUES ($1, $2, 'Fasting Glucose', $3, $4, 'mg/dL', $5, '70 - 99 mg/dL')`,
            [lab1Id, rId, item.glucose.toString(), item.glucose, item.flag]
          );
          await db.query(
            `INSERT INTO verification_tokens (lab_id, result_id, token, status)
             VALUES ($1, $2, 'verify-tok-hist-fbs-${idx + 1}', 'valid')`,
            [lab1Id, rId]
          );
        }
      }
    }
  }

  console.log('Seeding completed successfully!');
  console.log('Summary of Seeded Data:');
  console.log('- 1 Platform Admin (admin@lablink.ng)');
  console.log('- 4 Verified Labs (Synlab VI, Medex Yaba, CarePoint Ikeja, FCD Garki Abuja)');
  console.log('- 1 Pending Lab (Apex Surulere awaiting MLSCN verification)');
  console.log('- 4 Staff Members with MLSCN credentials for Synlab VI');
  console.log('- 2 Patients (Olumide Adeyemi in Lekki, Amaka Eze in Yaba)');
  console.log('- 40 Nigerian Starter Tests seeded across active labs');
  console.log('- 3 Historical Repeat Fasting Glucose Results for Patient 1 trend charts');
}

if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  runSeed().catch((err) => {
    console.error('Seed script error:', err);
    process.exit(1);
  });
}

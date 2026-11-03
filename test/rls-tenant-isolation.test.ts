import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createIsolatedDb, DBClient } from '../src/db/client';
import { withTenantContext } from '../src/db/rls';
import { runSeed } from '../scripts/seed';

describe('PostgreSQL Row-Level Security (RLS) & Multi-Tenant Isolation', () => {
  let db: DBClient;
  const LAB_1_ID = '11111111-1111-1111-1111-111111111111'; // Synlab VI
  const LAB_2_ID = '22222222-2222-2222-2222-222222222222'; // Medex Yaba

  beforeAll(async () => {
    db = await createIsolatedDb();
    await runSeed(db);
  });

  afterAll(async () => {
    if (db) await db.close();
  });

  it('Lab A (Synlab VI) can query its own tests and bookings', async () => {
    await withTenantContext(db, { labId: LAB_1_ID }, async (scopedDb) => {
      const testsRes = await scopedDb.query(
        'SELECT * FROM tests'
      );
      expect(testsRes.rows.length).toBeGreaterThan(0);
      for (const row of testsRes.rows) {
        expect(row.lab_id).toBe(LAB_1_ID);
      }
    });
  });

  it('PROVES CROSS-TENANT READ ISOLATION: Lab A context NEVER sees Lab B (Medex Yaba) records', async () => {
    await withTenantContext(db, { labId: LAB_1_ID }, async (scopedDb) => {
      // Direct query explicitly filtering by LAB_2_ID must return 0 rows under RLS
      const crossTenantQuery = await scopedDb.query(
        'SELECT * FROM tests WHERE lab_id = $1',
        [LAB_2_ID]
      );
      expect(crossTenantQuery.rows.length).toBe(0);

      // Bookings query must return 0 rows for Lab B
      const crossBookingsQuery = await scopedDb.query(
        'SELECT * FROM bookings WHERE lab_id = $1',
        [LAB_2_ID]
      );
      expect(crossBookingsQuery.rows.length).toBe(0);
    });
  });

  it('PROVES WRITE ISOLATION: Lab A context cannot insert rows belonging to Lab B', async () => {
    await withTenantContext(db, { labId: LAB_1_ID }, async (scopedDb) => {
      let failed = false;
      try {
        await scopedDb.query(
          `INSERT INTO tests (lab_id, code, name, category, sample_type, price_kobo, turnaround_hours)
           VALUES ($1, 'UNAUTHORIZED', 'Intruder Test', 'General', 'Blood', 100000, 1)`,
          [LAB_2_ID]
        );
      } catch (err: any) {
        failed = true;
        expect(err.message.toLowerCase()).toContain('row-level security');
      }
      expect(failed).toBe(true);
    });
  });

  it('Platform Admin can query across all tenants', async () => {
    await withTenantContext(db, { isPlatformAdmin: true }, async (adminDb) => {
      const allTests = await adminDb.query('SELECT DISTINCT lab_id FROM tests');
      expect(allTests.rows.length).toBeGreaterThan(1);
    });
  });
});

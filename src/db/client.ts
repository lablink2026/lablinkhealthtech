import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';
import fs from 'fs';
import path from 'path';

export interface DBClient {
  query<T = any>(sql: string, params?: any[]): Promise<{ rows: T[]; rowCount: number }>;
  exec(sql: string): Promise<void>;
  close(): Promise<void>;
}

class PGliteAdapter implements DBClient {
  private pglite: PGlite;

  constructor(pglite: PGlite) {
    this.pglite = pglite;
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<{ rows: T[]; rowCount: number }> {
    const res = await this.pglite.query(sql, params);
    return {
      rows: res.rows as T[],
      rowCount: res.rows.length
    };
  }

  async exec(sql: string): Promise<void> {
    await this.pglite.exec(sql);
  }

  async close(): Promise<void> {
    await this.pglite.close();
  }
}

class NodePgAdapter implements DBClient {
  private pool: pg.Pool;

  constructor(connectionString: string) {
    this.pool = new pg.Pool({ connectionString });
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<{ rows: T[]; rowCount: number }> {
    const res = await this.pool.query(sql, params);
    return {
      rows: res.rows as T[],
      rowCount: res.rowCount ?? res.rows.length
    };
  }

  async exec(sql: string): Promise<void> {
    await this.pool.query(sql);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

let globalClient: DBClient | null = null;

async function initSchema(client: DBClient): Promise<void> {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.exec(schemaSql);
  }

  // Ensure application non-superuser role exists for RLS enforcement
  await client.exec(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'lablink_app') THEN
        CREATE ROLE lablink_app NOSUPERUSER NOBYPASSRLS;
        GRANT USAGE ON SCHEMA public TO lablink_app;
        GRANT ALL ON ALL TABLES IN SCHEMA public TO lablink_app;
        GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO lablink_app;
      END IF;
    END $$;
  `);
}

export async function getDb(): Promise<DBClient> {
  if (globalClient) {
    return globalClient;
  }

  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl && dbUrl.trim() !== '') {
    const pgAdapter = new NodePgAdapter(dbUrl);
    globalClient = pgAdapter;
    return globalClient;
  }

  const pgliteInstance = new PGlite();
  const adapter = new PGliteAdapter(pgliteInstance);
  await initSchema(adapter);

  globalClient = adapter;
  return globalClient;
}

export async function createIsolatedDb(): Promise<DBClient> {
  const pgliteInstance = new PGlite();
  const adapter = new PGliteAdapter(pgliteInstance);
  await initSchema(adapter);
  return adapter;
}

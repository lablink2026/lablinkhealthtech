import { DBClient } from './client';

export interface TenantContextOptions {
  labId?: string;
  isPlatformAdmin?: boolean;
}

/**
 * Executes a database operation within a tenant-scoped session.
 * Enforces PostgreSQL Row-Level Security (RLS) by switching to a non-superuser role (lablink_app)
 * and setting app.current_lab_id.
 */
export async function withTenantContext<T>(
  db: DBClient,
  options: TenantContextOptions,
  operation: (scopedDb: DBClient) => Promise<T>
): Promise<T> {
  const labId = options.labId ?? '';
  const isAdmin = options.isPlatformAdmin ? 'true' : 'false';

  if (options.isPlatformAdmin) {
    await db.exec("RESET ROLE");
    await db.exec(`SET app.is_platform_admin = 'true'`);
  } else {
    await db.exec("SET ROLE lablink_app");
    await db.exec(`SET app.current_lab_id = '${labId}'`);
    await db.exec(`SET app.is_platform_admin = 'false'`);
  }

  try {
    return await operation(db);
  } finally {
    // Reset to base session state
    await db.exec("RESET ROLE");
    await db.exec(`SET app.current_lab_id = ''`);
    await db.exec(`SET app.is_platform_admin = 'false'`);
  }
}

export type UserRole = 'patient' | 'lab_admin' | 'lab_staff' | 'platform_admin';
export type LabSubRole = 'receptionist' | 'phlebotomist' | 'scientist' | 'approver';

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  fullName: string;
  role: UserRole;
  labId?: string | null;
  subRole?: LabSubRole | null;
  licenseNumber?: string | null;
}

export interface SessionTokenPayload {
  userId: string;
  role: UserRole;
  labId?: string | null;
  subRole?: LabSubRole | null;
  iat: number;
  exp: number;
}

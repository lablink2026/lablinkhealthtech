-- Lablink Core PostgreSQL Schema with Row-Level Security (RLS)

-- Extension for UUID generation
-- Native gen_random_uuid() is built-in in PostgreSQL 13+

-- 1. Labs (Tenant Entity)
CREATE TABLE IF NOT EXISTS labs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    mlscn_number VARCHAR(100) NOT NULL,
    cac_number VARCHAR(100),
    verification_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'suspended')),
    address TEXT NOT NULL,
    state VARCHAR(100) NOT NULL,
    lga VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    logo_url TEXT,
    brand_primary_color VARCHAR(20) DEFAULT '#0F766E',
    brand_secondary_color VARCHAR(20) DEFAULT '#042F2E',
    home_collection_enabled BOOLEAN DEFAULT true,
    home_collection_fee_kobo INTEGER DEFAULT 350000, -- NGN 3,500.00
    opening_hours JSONB DEFAULT '{"mon_fri": "08:00 - 18:00", "sat": "09:00 - 15:00", "sun": "Closed"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users (Platform-level entity)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    password_hash TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'lab_admin', 'lab_staff', 'platform_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Memberships (User <-> Lab Association with Sub-role)
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    sub_role VARCHAR(50) NOT NULL CHECK (sub_role IN ('receptionist', 'phlebotomist', 'scientist', 'approver')),
    is_active BOOLEAN DEFAULT true,
    license_number VARCHAR(100), -- MLSCN license number for scientists/approvers
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, lab_id)
);

-- 4. Patients (Platform-level profile)
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE NOT NULL,
    sex VARCHAR(20) NOT NULL CHECK (sex IN ('male', 'female', 'other')),
    blood_group VARCHAR(10),
    genotype VARCHAR(10),
    address TEXT,
    state VARCHAR(100),
    lga VARCHAR(100),
    emergency_contact JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Dependents (Managed by primary patient)
CREATE TABLE IF NOT EXISTS dependents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    primary_patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(50) NOT NULL CHECK (relationship IN ('child', 'parent', 'spouse', 'other')),
    date_of_birth DATE NOT NULL,
    sex VARCHAR(20) NOT NULL CHECK (sex IN ('male', 'female', 'other')),
    blood_group VARCHAR(10),
    genotype VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tests (Tenant Owned)
CREATE TABLE IF NOT EXISTS tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    sample_type VARCHAR(100) NOT NULL,
    price_kobo INTEGER NOT NULL, -- Integer kobo
    turnaround_hours INTEGER NOT NULL,
    preparation_notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(lab_id, code)
);

-- 7. Reference Ranges (Tenant Owned)
CREATE TABLE IF NOT EXISTS reference_ranges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    parameter_name VARCHAR(150) NOT NULL,
    low_value NUMERIC(10, 2),
    high_value NUMERIC(10, 2),
    unit VARCHAR(50),
    sex VARCHAR(20) DEFAULT 'all' CHECK (sex IN ('all', 'male', 'female')),
    age_min_months INTEGER DEFAULT 0,
    age_max_months INTEGER DEFAULT 1440,
    text_reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Test Packages (Tenant Owned)
CREATE TABLE IF NOT EXISTS test_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_kobo INTEGER NOT NULL,
    turnaround_hours INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Package Tests (Tenant Owned)
CREATE TABLE IF NOT EXISTS package_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    package_id UUID NOT NULL REFERENCES test_packages(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
    UNIQUE(package_id, test_id)
);

-- 10. Bookings (Tenant Owned)
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    reference VARCHAR(50) UNIQUE NOT NULL,
    patient_id UUID NOT NULL REFERENCES patients(id),
    dependent_id UUID REFERENCES dependents(id),
    collection_type VARCHAR(50) NOT NULL CHECK (collection_type IN ('walk_in', 'home_collection')),
    status VARCHAR(50) NOT NULL DEFAULT 'booked' CHECK (status IN ('booked', 'confirmed', 'collector_assigned', 'sample_collected', 'processing', 'results_ready', 'cancelled')),
    scheduled_date DATE NOT NULL,
    scheduled_slot VARCHAR(50) NOT NULL,
    collection_address TEXT,
    collection_lga VARCHAR(100),
    home_collection_fee_kobo INTEGER DEFAULT 0,
    subtotal_kobo INTEGER NOT NULL,
    total_kobo INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Booking Items (Tenant Owned)
CREATE TABLE IF NOT EXISTS booking_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    test_id UUID REFERENCES tests(id),
    package_id UUID REFERENCES test_packages(id),
    price_kobo INTEGER NOT NULL
);

-- 12. Collection Visits (Tenant Owned)
CREATE TABLE IF NOT EXISTS collection_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    phlebotomist_id UUID REFERENCES users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'en_route', 'arrived', 'collected', 'failed')),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Samples (Tenant Owned)
CREATE TABLE IF NOT EXISTS samples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sample_barcode VARCHAR(100) UNIQUE NOT NULL,
    sample_type VARCHAR(100) NOT NULL,
    collected_at TIMESTAMP WITH TIME ZONE,
    phlebotomist_id UUID REFERENCES users(id),
    current_stage VARCHAR(50) NOT NULL DEFAULT 'collected' CHECK (current_stage IN ('collected', 'received_at_lab', 'processing', 'stored', 'disposed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Sample Events / Chain of Custody (Tenant Owned)
CREATE TABLE IF NOT EXISTS sample_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    sample_id UUID NOT NULL REFERENCES samples(id) ON DELETE CASCADE,
    stage VARCHAR(50) NOT NULL,
    actor_id UUID REFERENCES users(id),
    actor_name VARCHAR(255) NOT NULL,
    notes TEXT,
    event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Payments (Tenant Owned)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id),
    provider VARCHAR(50) NOT NULL CHECK (provider IN ('paystack', 'mock', 'cash_pos')),
    transaction_reference VARCHAR(150) UNIQUE NOT NULL,
    amount_kobo INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'NGN',
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'successful', 'failed', 'refunded')),
    metadata JSONB,
    idempotency_key VARCHAR(150) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Results (Tenant Owned)
CREATE TABLE IF NOT EXISTS results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id),
    test_id UUID NOT NULL REFERENCES tests(id),
    scientist_id UUID REFERENCES users(id),
    approver_id UUID REFERENCES users(id),
    approver_name VARCHAR(255),
    approver_license_number VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'reviewed', 'approved', 'amended')),
    version_number INTEGER NOT NULL DEFAULT 1,
    clinical_notes TEXT,
    pdf_url TEXT,
    pdf_sha256_hash VARCHAR(64),
    signed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. Result Values (Tenant Owned)
CREATE TABLE IF NOT EXISTS result_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    result_id UUID NOT NULL REFERENCES results(id) ON DELETE CASCADE,
    parameter_name VARCHAR(150) NOT NULL,
    value VARCHAR(100) NOT NULL,
    numeric_value NUMERIC(10, 2),
    unit VARCHAR(50),
    flag VARCHAR(20) DEFAULT 'normal' CHECK (flag IN ('normal', 'abnormal', 'critical')),
    reference_range_text VARCHAR(150),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Result Signatures (Tenant Owned)
CREATE TABLE IF NOT EXISTS result_signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    result_id UUID NOT NULL REFERENCES results(id) ON DELETE CASCADE,
    key_id VARCHAR(100) NOT NULL,
    algorithm VARCHAR(50) NOT NULL DEFAULT 'Ed25519',
    signature_hex TEXT NOT NULL,
    pdf_hash_hex VARCHAR(64) NOT NULL,
    signed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 19. Verification Tokens (Tenant Owned)
CREATE TABLE IF NOT EXISTS verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID NOT NULL REFERENCES labs(id) ON DELETE CASCADE,
    result_id UUID NOT NULL REFERENCES results(id) ON DELETE CASCADE,
    token VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'superseded', 'revoked')),
    superseded_by_token VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 20. Consents (Platform Level)
CREATE TABLE IF NOT EXISTS consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    consent_type VARCHAR(100) NOT NULL,
    granted BOOLEAN NOT NULL DEFAULT true,
    ip_address VARCHAR(50),
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 21. Audit Logs (Tenant & Platform Level)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES users(id),
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 22. AI Interactions (Platform & Tenant Level)
CREATE TABLE IF NOT EXISTS ai_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    lab_id UUID REFERENCES labs(id),
    feature VARCHAR(100) NOT NULL,
    prompt_hash VARCHAR(64) NOT NULL,
    input_category VARCHAR(100) NOT NULL,
    output_summary TEXT NOT NULL,
    model VARCHAR(100) NOT NULL,
    latency_ms INTEGER,
    red_flag_triggered BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

--------------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------

-- Helper macro/function for tenant check
CREATE OR REPLACE FUNCTION current_lab_id() RETURNS UUID AS $$
BEGIN
    RETURN NULLIF(current_setting('app.current_lab_id', true), '')::UUID;
EXCEPTION
    WHEN OTHERS THEN RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION is_platform_admin() RETURNS BOOLEAN AS $$
BEGIN
    RETURN COALESCE(current_setting('app.is_platform_admin', true) = 'true', false);
EXCEPTION
    WHEN OTHERS THEN RETURN false;
END;
$$ LANGUAGE plpgsql STABLE;

-- Macro to enable and force RLS on tenant tables
DO $$
DECLARE
    tbl text;
    tables text[] := ARRAY[
        'tests', 'reference_ranges', 'test_packages', 'package_tests',
        'bookings', 'booking_items', 'collection_visits', 'samples',
        'sample_events', 'payments', 'results', 'result_values',
        'result_signatures', 'verification_tokens'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
        EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', tbl);
        
        -- Drop existing policy if any
        EXECUTE format('DROP POLICY IF EXISTS tenant_isolation_policy ON %I', tbl);
        
        -- Create strict tenant isolation policy
        EXECUTE format(
            'CREATE POLICY tenant_isolation_policy ON %I FOR ALL USING (lab_id = current_lab_id() OR is_platform_admin()) WITH CHECK (lab_id = current_lab_id() OR is_platform_admin())',
            tbl
        );
    END LOOP;
END $$;

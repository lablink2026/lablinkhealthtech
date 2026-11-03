# Lablink - Multi-Tenant Medical Laboratory SaaS for Nigeria

Lablink connects Nigerian patients with MLSCN-accredited medical laboratories and equips labs with a branded operating dashboard.

## Highlights
- **PostgreSQL Multi-Tenancy with Row-Level Security (RLS)**: Cryptographically verified and tested tenant isolation.
- **Paystack & Cash/POS Integration**: Prices stored in integer kobo (NGN), idempotent webhook processing, mock provider for offline development.
- **Digitally Signed, QR-Verified Results**: Ed25519 cryptographic signatures with public QR verification at `/verify/[token]` preserving patient privacy.
- **Assistive, Non-Diagnostic AI**: Result explainers, smart test finder, natural-language search with emergency red-flag handling and strict non-diagnostic guardrails.
- **Nigerian Context**: MLSCN licensing, 40 starter Nigerian tests, Lagos/Abuja LGAs, Africa/Lagos timezone, mobile-first responsive design.

## Quick Start

### 1. Install & Setup
```bash
npm install
```

### 2. Run Tests
```bash
npm test
```
Runs the Vitest test suite proving:
- PostgreSQL Row-Level Security tenant isolation (Lab A cannot read Lab B's data).
- Ed25519 cryptographic signing and verification.
- Paystack webhook idempotency.

### 3. Seed Database
```bash
npm run seed
```
Seeds:
- 3 Lagos labs (Victoria Island, Yaba, Ikeja)
- 1 Abuja lab (Garki)
- 1 Pending verification lab
- 40 Nigerian starter tests with reference ranges
- 2 Patients with historical repeat test records for trend charts

### 4. Run Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`.

### 5. Run AI Safety Evaluation Benchmark
```bash
npm run eval:ai
```
Evaluates 20+ scenarios ensuring non-diagnostic guardrails and emergency red-flag handling.

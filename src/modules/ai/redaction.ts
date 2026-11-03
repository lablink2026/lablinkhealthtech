/**
 * Strips direct Personal Identifiers (Nigerian phone numbers, email addresses, street names)
 * before sending text to external LLM providers to ensure NDPA 2023 compliance.
 */
export function redactDirectIdentifiers(text: string): string {
  let cleaned = text;

  // 1. Redact Email addresses first
  cleaned = cleaned.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL REDACTED]');

  // 2. Redact Nigerian phone numbers (+234..., 080..., 070..., 090..., 081...)
  cleaned = cleaned.replace(/(\+?234|0)[789][01]\d{8}/g, '[PHONE REDACTED]');

  // 3. Redact street addresses with bounded boundary
  cleaned = cleaned.replace(/\b(plot\s+\d+[^,\n\r]+?(?=\s+to\s+|\s+for\s+|,|\.|$))/gi, '[ADDRESS REDACTED]');
  cleaned = cleaned.replace(/\b(\d+\s+[a-zA-Z\s]+(street|close|crescent|avenue|way|road|boulevard))/gi, '[ADDRESS REDACTED]');

  return cleaned;
}

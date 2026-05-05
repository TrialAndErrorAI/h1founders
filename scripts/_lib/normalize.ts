/**
 * Normalization primitives for backfill scripts.
 *
 * Note: `scripts/import-whatsapp-csv.ts` and `scripts/generate-verified-phones.ts`
 * use a DIFFERENT normalizer that strips the `+` (digits-only Firestore lookup
 * key). Don't unify — they target different storage shapes. These functions
 * produce E.164 strings for D1.
 */

export function normalizePhoneE164(raw: unknown): string | null {
  if (typeof raw !== 'string' || !raw.trim()) return null
  const digits = raw.replace(/[^\d]/g, '')
  if (!digits) return null
  if (raw.trim().startsWith('+')) return '+' + digits
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return '+' + digits
}

export function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== 'string' || !raw.trim()) return null
  const e = raw.trim().toLowerCase()
  return e.includes('@') ? e : null
}

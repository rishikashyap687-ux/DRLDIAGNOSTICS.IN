/**
 * Submits a form to Netlify Forms. Every form name used here must also be
 * registered in public/__forms.html with the same field names.
 *
 * Rejects on HTTP failure, network failure, or when the static registration
 * page comes back unprocessed (local Vite preview), so callers never show a
 * false success.
 */
export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, string>,
): Promise<void> {
  const body = new URLSearchParams({ 'form-name': formName, ...fields })
  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error('Submission failed')
  if (/\bdata-netlify\s*=/i.test(await response.text())) {
    throw new Error('Form handling is unavailable')
  }
}

export function formDataToFields(form: HTMLFormElement): Record<string, string> {
  const fields: Record<string, string> = {}
  new FormData(form).forEach((value, key) => {
    fields[key] = String(value).trim()
  })
  return fields
}

/** Human-friendly reference like DRL-251015-7KQ4. Not guessable, not sequential. */
export function bookingReference(prefix = 'DRL'): string {
  const d = new Date()
  const date = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()]
    .map((n) => String(n).padStart(2, '0'))
    .join('')
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  const bytes = crypto.getRandomValues(new Uint8Array(5))
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
  return `${prefix}-${date}-${code}`
}

export const indianMobile = /^[6-9]\d{9}$/
export const pinCode = /^[1-9]\d{5}$/

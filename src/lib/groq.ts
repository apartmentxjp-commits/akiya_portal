export async function translateToEnglish(
  jaText: string,
  context: string = 'Japanese traditional property listing'
): Promise<string> {
  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: jaText, context }),
  })
  if (!res.ok) return jaText
  const data = await res.json()
  return data.translated || jaText
}

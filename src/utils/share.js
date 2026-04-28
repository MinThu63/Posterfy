// Encode event data into URL params for sharing (stateless)
const SHARE_FIELDS = [
  'title', 'subtitle', 'date', 'time', 'venue', 'address',
  'organizer', 'description', 'ticketInfo', 'contactInfo',
  'bgColor1', 'bgColor2', 'textColor', 'accentColor', 'fontFamily', 'qrUrl',
  'bgPattern',
]

export function encodeShareURL(eventData, template) {
  const params = new URLSearchParams()
  params.set('t', template)
  for (const key of SHARE_FIELDS) {
    if (eventData[key]) {
      params.set(key, eventData[key])
    }
  }
  return `${window.location.origin}${window.location.pathname}?${params.toString()}`
}

export function decodeShareURL() {
  const params = new URLSearchParams(window.location.search)
  if (!params.has('t')) return null
  const data = {}
  for (const key of SHARE_FIELDS) {
    if (params.has(key)) data[key] = params.get(key)
  }
  return { eventData: data, template: params.get('t') }
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    return true
  }
}

const STORAGE_KEY = 'posterfy_draft'
const TEMPLATES_KEY = 'posterfy_custom_templates'

export function saveDraft(eventData, template, eventType) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ eventData, template, eventType, savedAt: Date.now() }))
  } catch { /* quota exceeded, ignore */ }
}

export function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearDraft() {
  localStorage.removeItem(STORAGE_KEY)
}

export function saveCustomTemplates(templates) {
  try {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates))
  } catch { /* ignore */ }
}

export function loadCustomTemplates() {
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

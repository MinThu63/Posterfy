import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import EventForm from './components/EventForm'
import PosterPreview from './components/PosterPreview'
import TemplateSelector from './components/TemplateSelector'
import ExportBar from './components/ExportBar'
import PaletteSelector from './components/PaletteSelector'
import PatternSelector from './components/PatternSelector'
import StickerPanel from './components/StickerPanel'
import SocialSizeSelector from './components/SocialSizeSelector'
import ContrastWarnings from './components/ContrastWarnings'
import ShareBar from './components/ShareBar'
import UserGuide from './components/UserGuide'
import { createHistory, pushState, undo, redo, canUndo, canRedo } from './utils/history'
import { saveDraft, loadDraft } from './utils/storage'
import { decodeShareURL } from './utils/share'
import { getEventType } from './data/eventTypes'

const baseDefaults = {
  title: 'Summer Music Festival',
  subtitle: 'A Night of Rhythm & Soul',
  date: '2026-07-15',
  time: '19:00',
  venue: 'Central Park Amphitheater',
  address: '123 Park Avenue, New York',
  organizer: 'EventMakers Inc.',
  description: 'Join us for an unforgettable evening of live music, food, and fun!',
  ticketInfo: 'Free Entry',
  contactInfo: 'hello@eventmakers.com',
  bgColor1: '#1a1a2e',
  bgColor2: '#e94560',
  textColor: '#ffffff',
  accentColor: '#ffd700',
  fontFamily: 'Inter',
  backgroundImage: null,
  logoImage: null,
  qrUrl: '',
  bgPattern: 'none',
  stickers: [],
  textShadow: false,
  textOutline: false,
  textGradient: false,
  textGlow: false,
}

export default function App() {
  const [history, setHistory] = useState(() => {
    const shared = decodeShareURL()
    if (shared) {
      return createHistory({ ...baseDefaults, ...shared.eventData })
    }
    const draft = loadDraft()
    if (draft?.eventData) {
      return createHistory({ ...baseDefaults, ...draft.eventData })
    }
    return createHistory(baseDefaults)
  })

  const [template, setTemplate] = useState(() => {
    const shared = decodeShareURL()
    if (shared) return shared.template
    const draft = loadDraft()
    return draft?.template || 'modern'
  })

  const [eventType, setEventType] = useState(() => {
    const draft = loadDraft()
    return draft?.eventType || 'concert'
  })

  const [posterSize, setPosterSize] = useState({ width: 500, height: 700 })
  const [toast, setToast] = useState(null)
  const [showGuide, setShowGuide] = useState(false)
  const [mobileTab, setMobileTab] = useState('edit') // 'edit' | 'preview'
  const saveTimer = useRef(null)

  const eventData = history.present

  // Auto-save
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveDraft(eventData, template, eventType)
    }, 1000)
    return () => clearTimeout(saveTimer.current)
  }, [eventData, template, eventType])

  // Undo/Redo keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        setHistory(h => undo(h))
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        setHistory(h => redo(h))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const updateField = useCallback((field, value) => {
    setHistory(h => pushState(h, { ...h.present, [field]: value }))
  }, [])

  const updateMultipleFields = useCallback((fields) => {
    setHistory(h => pushState(h, { ...h.present, ...fields }))
  }, [])

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const handleEventTypeChange = useCallback((typeId) => {
    setEventType(typeId)
    const typeConfig = getEventType(typeId)
    if (typeConfig.defaults) {
      setHistory(h => pushState(h, {
        ...h.present,
        ...typeConfig.defaults,
        // Preserve images, stickers, pattern, effects
        backgroundImage: h.present.backgroundImage,
        logoImage: h.present.logoImage,
        stickers: h.present.stickers,
        bgPattern: h.present.bgPattern,
        textShadow: h.present.textShadow,
        textOutline: h.present.textOutline,
        textGlow: h.present.textGlow,
      }))
    }
    showToast(`Switched to ${typeConfig.name}`)
  }, [showToast])

  const handleResetToDefaults = useCallback(() => {
    setHistory(h => pushState(h, { ...baseDefaults }))
    setEventType('concert')
    setTemplate('modern')
    showToast('Reset to defaults')
  }, [showToast])

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="logo">🎨 Posterfy</h1>
        <p className="tagline hide-mobile">Create stunning event posters in seconds</p>
        <div className="header-actions">
          <button className="header-btn guide-btn" onClick={() => setShowGuide(true)} title="User Guide">
            📖 Guide
          </button>
          <button className="header-btn" onClick={() => setHistory(h => undo(h))}
            disabled={!canUndo(history)} title="Undo (Ctrl+Z)">↩</button>
          <button className="header-btn" onClick={() => setHistory(h => redo(h))}
            disabled={!canRedo(history)} title="Redo (Ctrl+Y)">↪</button>
        </div>
      </header>

      {/* Mobile tab bar */}
      <div className="mobile-tabs">
        <button className={`mobile-tab ${mobileTab === 'edit' ? 'active' : ''}`}
          onClick={() => setMobileTab('edit')}>✏️ Edit</button>
        <button className={`mobile-tab ${mobileTab === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileTab('preview')}>👁️ Preview</button>
      </div>

      <div className="app-layout">
        <aside className={`sidebar ${mobileTab === 'edit' ? 'mobile-show' : 'mobile-hide'}`}>
          <TemplateSelector selected={template} onSelect={setTemplate} />
          <PaletteSelector onApply={updateMultipleFields} />
          <EventForm
            eventData={eventData}
            updateField={updateField}
            eventType={eventType}
            onEventTypeChange={handleEventTypeChange}
            onResetToDefaults={handleResetToDefaults}
          />
          <PatternSelector current={eventData.bgPattern} onSelect={(v) => updateField('bgPattern', v)} />
          <StickerPanel stickers={eventData.stickers} onUpdate={(s) => updateField('stickers', s)} />
          <ContrastWarnings eventData={eventData} />
        </aside>

        <main className={`main-content ${mobileTab === 'preview' ? 'mobile-show' : 'mobile-hide'}`}>
          <div className="toolbar-row">
            <ExportBar posterSize={posterSize} showToast={showToast} />
            <SocialSizeSelector current={posterSize} onSelect={setPosterSize} />
          </div>
          <ShareBar eventData={eventData} template={template} showToast={showToast} />
          <PosterPreview eventData={eventData} template={template} posterSize={posterSize} />
        </main>
      </div>

      {showGuide && <UserGuide onClose={() => setShowGuide(false)} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

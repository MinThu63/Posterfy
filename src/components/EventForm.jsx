import { useRef } from 'react'
import './EventForm.css'
import { eventTypes, getEventType } from '../data/eventTypes'

const fontOptions = [
  'Inter', 'Playfair Display', 'Bebas Neue', 'Dancing Script', 'Oswald'
]

const fieldLabels = {
  title: 'Event Title',
  subtitle: 'Subtitle / Tagline',
  date: 'Date',
  time: 'Time',
  venue: 'Venue',
  address: 'Address',
  organizer: 'Organizer',
  description: 'Description',
  ticketInfo: 'Ticket / RSVP Info',
  contactInfo: 'Contact',
  qrUrl: 'QR Code URL (optional)',
}

const defaultPlaceholders = {
  title: 'Enter event title',
  subtitle: 'A catchy subtitle',
  venue: 'Venue name',
  address: 'Full address',
  organizer: 'Organized by...',
  description: 'Brief event description',
  ticketInfo: 'e.g. Free Entry, $20',
  contactInfo: 'Email or phone',
  qrUrl: 'https://your-event-link.com',
}

export default function EventForm({ eventData, updateField, eventType, onEventTypeChange, onResetToDefaults }) {
  const bgInputRef = useRef(null)
  const logoInputRef = useRef(null)
  const typeConfig = getEventType(eventType)
  const placeholders = { ...defaultPlaceholders, ...typeConfig.placeholders }

  const handleImageUpload = (field, e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => updateField(field, ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="event-form">
      {/* Event Type Selector */}
      <div className="form-section">
        <h3 className="section-title">Event Type</h3>
        <div className="form-group">
          <select value={eventType} onChange={e => onEventTypeChange(e.target.value)}>
            {eventTypes.map(t => (
              <option key={t.id} value={t.id}>{t.icon} {t.name}</option>
            ))}
          </select>
        </div>
        <button className="reset-btn" onClick={onResetToDefaults}>
          🔄 Reset to Defaults
        </button>
      </div>

      {/* Event Details */}
      <div className="form-section">
        <h3 className="section-title">Event Details</h3>
        {typeConfig.fields.includes('title') && (
          <div className="form-group">
            <label>{fieldLabels.title}</label>
            <input type="text" value={eventData.title}
              onChange={e => updateField('title', e.target.value)}
              placeholder={placeholders.title} />
          </div>
        )}
        {typeConfig.fields.includes('subtitle') && (
          <div className="form-group">
            <label>{fieldLabels.subtitle}</label>
            <input type="text" value={eventData.subtitle}
              onChange={e => updateField('subtitle', e.target.value)}
              placeholder={placeholders.subtitle} />
          </div>
        )}
        {(typeConfig.fields.includes('date') || typeConfig.fields.includes('time')) && (
          <div className="form-row">
            {typeConfig.fields.includes('date') && (
              <div className="form-group">
                <label>{fieldLabels.date}</label>
                <input type="date" value={eventData.date}
                  onChange={e => updateField('date', e.target.value)} />
              </div>
            )}
            {typeConfig.fields.includes('time') && (
              <div className="form-group">
                <label>{fieldLabels.time}</label>
                <input type="time" value={eventData.time}
                  onChange={e => updateField('time', e.target.value)} />
              </div>
            )}
          </div>
        )}
        {typeConfig.fields.includes('venue') && (
          <div className="form-group">
            <label>{fieldLabels.venue}</label>
            <input type="text" value={eventData.venue}
              onChange={e => updateField('venue', e.target.value)}
              placeholder={placeholders.venue} />
          </div>
        )}
        {typeConfig.fields.includes('address') && (
          <div className="form-group">
            <label>{fieldLabels.address}</label>
            <input type="text" value={eventData.address}
              onChange={e => updateField('address', e.target.value)}
              placeholder={placeholders.address} />
          </div>
        )}
        {typeConfig.fields.includes('organizer') && (
          <div className="form-group">
            <label>{fieldLabels.organizer}</label>
            <input type="text" value={eventData.organizer}
              onChange={e => updateField('organizer', e.target.value)}
              placeholder={placeholders.organizer} />
          </div>
        )}
        {typeConfig.fields.includes('description') && (
          <div className="form-group">
            <label>{fieldLabels.description}</label>
            <textarea value={eventData.description}
              onChange={e => updateField('description', e.target.value)}
              placeholder={placeholders.description} rows={3} />
          </div>
        )}
        {typeConfig.fields.includes('ticketInfo') && (
          <div className="form-group">
            <label>{fieldLabels.ticketInfo}</label>
            <input type="text" value={eventData.ticketInfo}
              onChange={e => updateField('ticketInfo', e.target.value)}
              placeholder={placeholders.ticketInfo} />
          </div>
        )}
        {typeConfig.fields.includes('contactInfo') && (
          <div className="form-group">
            <label>{fieldLabels.contactInfo}</label>
            <input type="text" value={eventData.contactInfo}
              onChange={e => updateField('contactInfo', e.target.value)}
              placeholder={placeholders.contactInfo} />
          </div>
        )}
        {typeConfig.fields.includes('qrUrl') && (
          <div className="form-group">
            <label>{fieldLabels.qrUrl}</label>
            <input type="text" value={eventData.qrUrl || ''}
              onChange={e => updateField('qrUrl', e.target.value)}
              placeholder={placeholders.qrUrl} />
          </div>
        )}
      </div>

      {/* Style */}
      <div className="form-section">
        <h3 className="section-title">Style</h3>
        <div className="form-group">
          <label>Font</label>
          <select value={eventData.fontFamily}
            onChange={e => updateField('fontFamily', e.target.value)}>
            {fontOptions.map(f => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
            ))}
          </select>
        </div>
        <div className="color-grid">
          <div className="form-group color-group">
            <label>Background 1</label>
            <div className="color-input-wrap">
              <input type="color" value={eventData.bgColor1}
                onChange={e => updateField('bgColor1', e.target.value)} />
              <span className="color-hex">{eventData.bgColor1}</span>
            </div>
          </div>
          <div className="form-group color-group">
            <label>Background 2</label>
            <div className="color-input-wrap">
              <input type="color" value={eventData.bgColor2}
                onChange={e => updateField('bgColor2', e.target.value)} />
              <span className="color-hex">{eventData.bgColor2}</span>
            </div>
          </div>
          <div className="form-group color-group">
            <label>Text</label>
            <div className="color-input-wrap">
              <input type="color" value={eventData.textColor}
                onChange={e => updateField('textColor', e.target.value)} />
              <span className="color-hex">{eventData.textColor}</span>
            </div>
          </div>
          <div className="form-group color-group">
            <label>Accent</label>
            <div className="color-input-wrap">
              <input type="color" value={eventData.accentColor}
                onChange={e => updateField('accentColor', e.target.value)} />
              <span className="color-hex">{eventData.accentColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text Effects */}
      <div className="form-section">
        <h3 className="section-title">Text Effects</h3>
        <div className="effects-grid">
          <label className="effect-toggle">
            <input type="checkbox" checked={eventData.textShadow || false}
              onChange={e => updateField('textShadow', e.target.checked)} />
            <span>Shadow</span>
          </label>
          <label className="effect-toggle">
            <input type="checkbox" checked={eventData.textOutline || false}
              onChange={e => updateField('textOutline', e.target.checked)} />
            <span>Outline</span>
          </label>
          <label className="effect-toggle">
            <input type="checkbox" checked={eventData.textGlow || false}
              onChange={e => updateField('textGlow', e.target.checked)} />
            <span>Glow</span>
          </label>
        </div>
      </div>

      {/* Images */}
      <div className="form-section">
        <h3 className="section-title">Images</h3>
        <div className="image-uploads">
          <button className="upload-btn" onClick={() => bgInputRef.current?.click()}>
            {eventData.backgroundImage ? '✅ Background Set' : '🖼️ Upload Background'}
          </button>
          <input ref={bgInputRef} type="file" accept="image/*" hidden
            onChange={e => handleImageUpload('backgroundImage', e)} />
          <button className="upload-btn" onClick={() => logoInputRef.current?.click()}>
            {eventData.logoImage ? '✅ Logo Set' : '🏷️ Upload Logo'}
          </button>
          <input ref={logoInputRef} type="file" accept="image/*" hidden
            onChange={e => handleImageUpload('logoImage', e)} />
          {(eventData.backgroundImage || eventData.logoImage) && (
            <button className="upload-btn clear-btn"
              onClick={() => { updateField('backgroundImage', null); updateField('logoImage', null) }}>
              🗑️ Clear Images
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

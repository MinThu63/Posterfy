import { useRef, useEffect, useState, useCallback } from 'react'
import QRCode from 'qrcode'
import './PosterPreview.css'
import { formatDate, formatTime } from '../utils/format'
import { bgPatterns } from '../data/palettes'

export default function PosterPreview({ eventData, template, posterSize }) {
  const d = eventData
  const [qrDataUrl, setQrDataUrl] = useState(null)

  useEffect(() => {
    if (d.qrUrl) {
      QRCode.toDataURL(d.qrUrl, { width: 100, margin: 1, color: { dark: '#000', light: '#fff' } })
        .then(setQrDataUrl)
        .catch(() => setQrDataUrl(null))
    } else {
      setQrDataUrl(null)
    }
  }, [d.qrUrl])

  const titleStyle = buildTextEffectStyle(d)
  const patternObj = bgPatterns.find(p => p.value === d.bgPattern)
  const patternStyle = d.bgPattern && d.bgPattern !== 'none' && patternObj ? {
    backgroundImage: patternObj.value,
    backgroundSize: patternObj.size || 'auto',
    color: 'rgba(255,255,255,0.06)',
  } : {}

  const style = {
    '--bg1': d.bgColor1,
    '--bg2': d.bgColor2,
    '--text': d.textColor,
    '--accent': d.accentColor,
    '--font': d.fontFamily,
    width: posterSize.width + 'px',
    minHeight: posterSize.height + 'px',
  }

  return (
    <div className="poster-preview-wrapper">
      <div className="poster-scale-container" style={{
        transform: posterSize.width > 600 ? `scale(${Math.min(1, 600 / posterSize.width)})` : 'none',
        transformOrigin: 'top center',
      }}>
        <div id="poster-capture" className={`poster poster-${template}`} style={style}>
          {d.backgroundImage && (
            <div className="poster-bg-image"
              style={{ backgroundImage: `url(${d.backgroundImage})` }} />
          )}
          {d.bgPattern && d.bgPattern !== 'none' && (
            <div className="poster-pattern" style={patternStyle} />
          )}
          <div className="poster-overlay" />
          <div className="poster-content">
            {template === 'modern' && <ModernLayout d={d} titleStyle={titleStyle} qr={qrDataUrl} />}
            {template === 'elegant' && <ElegantLayout d={d} titleStyle={titleStyle} qr={qrDataUrl} />}
            {template === 'neon' && <NeonLayout d={d} titleStyle={titleStyle} qr={qrDataUrl} />}
            {template === 'minimal' && <MinimalLayout d={d} titleStyle={titleStyle} qr={qrDataUrl} />}
            {template === 'festival' && <FestivalLayout d={d} titleStyle={titleStyle} qr={qrDataUrl} />}
          </div>
          <StickerLayer stickers={d.stickers} />
        </div>
      </div>
    </div>
  )
}

function buildTextEffectStyle(d) {
  const parts = []
  if (d.textShadow) parts.push('2px 2px 8px rgba(0,0,0,0.7)')
  if (d.textGlow) parts.push(`0 0 20px ${d.accentColor}, 0 0 40px ${d.accentColor}`)
  const style = {}
  if (parts.length) style.textShadow = parts.join(', ')
  if (d.textOutline) style.WebkitTextStroke = `1px ${d.accentColor}`
  return style
}

function QRBlock({ qr }) {
  if (!qr) return null
  return (
    <div className="qr-block">
      <img src={qr} alt="QR Code" className="qr-image" />
    </div>
  )
}

function StickerLayer({ stickers }) {
  if (!stickers || stickers.length === 0) return null
  return (
    <div className="sticker-layer">
      {stickers.map(s => (
        <DraggableSticker key={s.id} sticker={s} />
      ))}
    </div>
  )
}

function DraggableSticker({ sticker }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: sticker.x, y: sticker.y })
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseDown = useCallback((e) => {
    e.preventDefault()
    dragging.current = true
    const rect = ref.current.getBoundingClientRect()
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    const onMove = (ev) => {
      if (!dragging.current) return
      const parent = ref.current.parentElement.getBoundingClientRect()
      setPos({
        x: ev.clientX - parent.left - offset.current.x,
        y: ev.clientY - parent.top - offset.current.y,
      })
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  return (
    <div
      ref={ref}
      className="draggable-sticker"
      style={{
        left: pos.x + 'px',
        top: pos.y + 'px',
        fontSize: sticker.size + 'px',
        opacity: sticker.opacity,
        transform: `rotate(${sticker.rotation}deg)`,
      }}
      onMouseDown={onMouseDown}
    >
      {sticker.icon}
    </div>
  )
}

function ModernLayout({ d, titleStyle, qr }) {
  return (
    <>
      {d.logoImage && <img src={d.logoImage} alt="Logo" className="poster-logo" />}
      <div className="modern-top">
        <span className="modern-tag">{d.organizer}</span>
        <span className="modern-presents">PRESENTS</span>
      </div>
      <h1 className="poster-title modern-title" style={titleStyle}>{d.title}</h1>
      <p className="poster-subtitle">{d.subtitle}</p>
      <div className="modern-divider" />
      <div className="modern-details">
        <div className="detail-block">
          <span className="detail-icon">📅</span>
          <div>
            <strong>{formatDate(d.date)}</strong>
            <span>{formatTime(d.time)}</span>
          </div>
        </div>
        <div className="detail-block">
          <span className="detail-icon">📍</span>
          <div>
            <strong>{d.venue}</strong>
            <span>{d.address}</span>
          </div>
        </div>
      </div>
      {d.description && <p className="poster-description">{d.description}</p>}
      <div className="modern-footer">
        {d.ticketInfo && <span className="ticket-badge">{d.ticketInfo}</span>}
        {d.contactInfo && <span className="contact-info">{d.contactInfo}</span>}
      </div>
      <QRBlock qr={qr} />
    </>
  )
}

function ElegantLayout({ d, titleStyle, qr }) {
  return (
    <>
      <div className="elegant-border">
        <div className="elegant-inner">
          {d.logoImage && <img src={d.logoImage} alt="Logo" className="poster-logo" />}
          <div className="elegant-ornament">✦ ✦ ✦</div>
          <p className="elegant-presents">{d.organizer} cordially invites you to</p>
          <h1 className="poster-title elegant-title" style={titleStyle}>{d.title}</h1>
          <p className="poster-subtitle elegant-sub">{d.subtitle}</p>
          <div className="elegant-ornament">— ✦ —</div>
          <div className="elegant-details">
            <p><strong>{formatDate(d.date)}</strong> at <strong>{formatTime(d.time)}</strong></p>
            <p>{d.venue}</p>
            <p className="elegant-address">{d.address}</p>
          </div>
          {d.description && <p className="poster-description elegant-desc">{d.description}</p>}
          <div className="elegant-footer">
            {d.ticketInfo && <span className="elegant-ticket">{d.ticketInfo}</span>}
            {d.contactInfo && <span className="elegant-contact">{d.contactInfo}</span>}
          </div>
          <QRBlock qr={qr} />
          <div className="elegant-ornament">✦ ✦ ✦</div>
        </div>
      </div>
    </>
  )
}

function NeonLayout({ d, titleStyle, qr }) {
  return (
    <>
      {d.logoImage && <img src={d.logoImage} alt="Logo" className="poster-logo neon-logo" />}
      <div className="neon-glow-text">{d.organizer}</div>
      <h1 className="poster-title neon-title" style={titleStyle}>{d.title}</h1>
      <p className="poster-subtitle neon-sub">{d.subtitle}</p>
      <div className="neon-line" />
      <div className="neon-details">
        <div className="neon-detail">
          <span className="neon-label">WHEN</span>
          <span>{formatDate(d.date)} • {formatTime(d.time)}</span>
        </div>
        <div className="neon-detail">
          <span className="neon-label">WHERE</span>
          <span>{d.venue}</span>
          <span className="neon-small">{d.address}</span>
        </div>
      </div>
      {d.description && <p className="poster-description neon-desc">{d.description}</p>}
      <div className="neon-footer">
        {d.ticketInfo && <span className="neon-badge">{d.ticketInfo}</span>}
        {d.contactInfo && <span className="neon-contact">{d.contactInfo}</span>}
      </div>
      <QRBlock qr={qr} />
    </>
  )
}

function MinimalLayout({ d, titleStyle, qr }) {
  return (
    <>
      {d.logoImage && <img src={d.logoImage} alt="Logo" className="poster-logo minimal-logo" />}
      <h1 className="poster-title minimal-title" style={titleStyle}>{d.title}</h1>
      <div className="minimal-line" />
      <p className="poster-subtitle minimal-sub">{d.subtitle}</p>
      <div className="minimal-info">
        <p>{formatDate(d.date)} — {formatTime(d.time)}</p>
        <p>{d.venue}</p>
        <p className="minimal-address">{d.address}</p>
      </div>
      {d.description && <p className="poster-description minimal-desc">{d.description}</p>}
      <div className="minimal-footer">
        <span>{d.organizer}</span>
        {d.ticketInfo && <span>• {d.ticketInfo}</span>}
        {d.contactInfo && <span>• {d.contactInfo}</span>}
      </div>
      <QRBlock qr={qr} />
    </>
  )
}

function FestivalLayout({ d, titleStyle, qr }) {
  return (
    <>
      {d.logoImage && <img src={d.logoImage} alt="Logo" className="poster-logo festival-logo" />}
      <div className="festival-banner">
        <span className="festival-star">★</span>
        <span>{d.organizer}</span>
        <span className="festival-star">★</span>
      </div>
      <h1 className="poster-title festival-title" style={titleStyle}>{d.title}</h1>
      <p className="poster-subtitle festival-sub">{d.subtitle}</p>
      <div className="festival-info-box">
        <div className="festival-date">
          <span className="festival-big">{formatDate(d.date)}</span>
          <span>{formatTime(d.time)}</span>
        </div>
        <div className="festival-venue">
          <strong>{d.venue}</strong>
          <span>{d.address}</span>
        </div>
      </div>
      {d.description && <p className="poster-description festival-desc">{d.description}</p>}
      <div className="festival-footer">
        {d.ticketInfo && <div className="festival-ticket">{d.ticketInfo}</div>}
        {d.contactInfo && <span className="festival-contact">{d.contactInfo}</span>}
      </div>
      <QRBlock qr={qr} />
    </>
  )
}

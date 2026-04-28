import { stickerIcons } from '../data/palettes'
import './StickerPanel.css'

export default function StickerPanel({ stickers, onUpdate }) {
  const addSticker = (icon) => {
    const newSticker = {
      id: Date.now(),
      icon: icon.svg,
      x: 50 + Math.random() * 200,
      y: 50 + Math.random() * 200,
      size: 32,
      rotation: 0,
      opacity: 1,
    }
    onUpdate([...stickers, newSticker])
  }

  const removeSticker = (id) => {
    onUpdate(stickers.filter(s => s.id !== id))
  }

  const clearAll = () => onUpdate([])

  return (
    <div className="sticker-panel">
      <div className="sticker-header">
        <h3 className="section-title">Stickers</h3>
        {stickers.length > 0 && (
          <button className="sticker-clear" onClick={clearAll}>Clear all</button>
        )}
      </div>
      <div className="sticker-grid">
        {stickerIcons.map(icon => (
          <button
            key={icon.name}
            className="sticker-btn"
            onClick={() => addSticker(icon)}
            title={icon.name}
          >
            {icon.svg}
          </button>
        ))}
      </div>
      {stickers.length > 0 && (
        <div className="sticker-list">
          <span className="sticker-count">{stickers.length} placed — drag on poster to move</span>
          {stickers.map(s => (
            <div key={s.id} className="sticker-item">
              <span>{s.icon}</span>
              <button className="sticker-remove" onClick={() => removeSticker(s.id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

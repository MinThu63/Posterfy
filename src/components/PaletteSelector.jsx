import { colorPalettes } from '../data/palettes'
import './PaletteSelector.css'

export default function PaletteSelector({ onApply }) {
  return (
    <div className="palette-selector">
      <h3 className="section-title">Color Palettes</h3>
      <div className="palette-grid">
        {colorPalettes.map(p => (
          <button
            key={p.name}
            className="palette-chip"
            title={p.name}
            onClick={() => onApply({
              bgColor1: p.bgColor1,
              bgColor2: p.bgColor2,
              textColor: p.textColor,
              accentColor: p.accentColor,
            })}
          >
            <div className="palette-preview">
              <span style={{ background: p.bgColor1 }} />
              <span style={{ background: p.bgColor2 }} />
              <span style={{ background: p.textColor }} />
              <span style={{ background: p.accentColor }} />
            </div>
            <span className="palette-name">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

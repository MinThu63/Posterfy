import { bgPatterns } from '../data/palettes'
import './PatternSelector.css'

export default function PatternSelector({ current, onSelect }) {
  return (
    <div className="pattern-selector">
      <h3 className="section-title">Background Pattern</h3>
      <div className="pattern-grid">
        {bgPatterns.map(p => (
          <button
            key={p.name}
            className={`pattern-chip ${current === p.value ? 'active' : ''}`}
            onClick={() => onSelect(p.value)}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  )
}

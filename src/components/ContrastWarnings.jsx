import { getContrastWarnings } from '../utils/contrast'
import './ContrastWarnings.css'

export default function ContrastWarnings({ eventData }) {
  const warnings = getContrastWarnings(eventData)
  if (warnings.length === 0) return null

  return (
    <div className="contrast-warnings">
      <h3 className="section-title">⚠️ Accessibility</h3>
      {warnings.map((w, i) => (
        <div key={i} className={`contrast-warning contrast-${w.level}`}>
          {w.level === 'error' ? '🔴' : '🟡'} {w.message}
        </div>
      ))}
    </div>
  )
}

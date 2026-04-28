import './TemplateSelector.css'

const templates = [
  { id: 'modern', name: 'Modern', icon: '🔷', desc: 'Clean & bold' },
  { id: 'elegant', name: 'Elegant', icon: '✨', desc: 'Classic & refined' },
  { id: 'neon', name: 'Neon', icon: '💜', desc: 'Vibrant & electric' },
  { id: 'minimal', name: 'Minimal', icon: '⬜', desc: 'Simple & sleek' },
  { id: 'festival', name: 'Festival', icon: '🎪', desc: 'Fun & colorful' },
]

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="template-selector">
      <h3 className="section-title">Templates</h3>
      <div className="template-grid">
        {templates.map(t => (
          <button
            key={t.id}
            className={`template-card ${selected === t.id ? 'active' : ''}`}
            onClick={() => onSelect(t.id)}
          >
            <span className="template-icon">{t.icon}</span>
            <span className="template-name">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

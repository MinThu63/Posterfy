import { useState } from 'react'
import './UserGuide.css'

const sections = [
  {
    title: '🚀 Getting Started',
    content: `1. Pick an **Event Type** from the dropdown — it pre-fills the form with relevant placeholders and suggested colors.\n2. Choose a **Template** (Modern, Elegant, Neon, Minimal, Festival).\n3. Fill in your event details — the poster updates live as you type.\n4. Export as PNG, JPEG, or PDF when you're happy with it.`,
  },
  {
    title: '🎨 Customizing Your Poster',
    content: `**Color Palettes** — Click any palette to instantly apply a matching color scheme.\n\n**Background Patterns** — Add subtle texture (dots, grid, diagonal, etc.) behind your content.\n\n**Text Effects** — Toggle Shadow, Outline, or Glow on the title.\n\n**Images** — Upload a background image or logo. They stay in your browser and are never uploaded anywhere.\n\n**Stickers** — Click a sticker to place it on the poster, then drag it to reposition.\n\n**QR Code** — Paste any URL and a QR code appears on the poster automatically.`,
  },
  {
    title: '📐 Social Media Sizes',
    content: `Use the size dropdown to switch between:\n- **Poster** (500×700) — default\n- **Instagram Post** (1080×1080)\n- **Instagram Story** (1080×1920)\n- **Facebook Event** (1920×1005)\n- **Twitter/X** (1600×900)\n- **A4 Print** (794×1123)\n- **Letter Print** (816×1056)\n\nThe poster resizes in real-time. Use **📦 All Sizes** to batch-export every size as a ZIP.`,
  },
  {
    title: '💾 Saving & Sharing',
    content: `**Auto-save** — Your work is automatically saved to your browser. Come back anytime and it's still there.\n\n**Share Link** — Generates a URL with your design encoded in it. Anyone who opens it sees your poster config (images not included).\n\n**Export/Import Template** — Save your design as a JSON file and share it. Others can import it to remix your poster.\n\n**Copy to Clipboard** — Paste the poster image directly into Slack, email, or docs.`,
  },
  {
    title: '↩️ Undo / Redo',
    content: `Every change is tracked. Use the **Undo/Redo** buttons in the header, or:\n- **Ctrl+Z** to undo\n- **Ctrl+Y** or **Ctrl+Shift+Z** to redo`,
  },
  {
    title: '📱 Mobile',
    content: `Posterfy works on phones and tablets. The sidebar stacks above the preview on small screens. You can also install it as an app from your browser menu (Add to Home Screen) for offline use.`,
  },
  {
    title: '🔒 Privacy',
    content: `Everything runs 100% in your browser. No data is sent to any server. No accounts, no tracking, no cookies. Your images never leave your device.`,
  },
]

export default function UserGuide({ onClose }) {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <div className="guide-overlay" onClick={onClose}>
      <div className="guide-modal" onClick={e => e.stopPropagation()}>
        <div className="guide-header">
          <h2>📖 User Guide</h2>
          <button className="guide-close" onClick={onClose}>✕</button>
        </div>
        <div className="guide-body">
          {sections.map((s, i) => (
            <div key={i} className={`guide-section ${openIdx === i ? 'open' : ''}`}>
              <button className="guide-section-title" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                <span>{s.title}</span>
                <span className="guide-chevron">{openIdx === i ? '▾' : '▸'}</span>
              </button>
              {openIdx === i && (
                <div className="guide-section-content">
                  {s.content.split('\n').map((line, j) => (
                    <p key={j} dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        .replace(/^- /, '• ')
                    }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

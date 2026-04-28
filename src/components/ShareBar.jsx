import { encodeShareURL, copyToClipboard } from '../utils/share'
import './ShareBar.css'

export default function ShareBar({ eventData, template, showToast }) {
  const handleShare = async () => {
    const url = encodeShareURL(eventData, template)
    const ok = await copyToClipboard(url)
    if (ok) showToast('Share link copied to clipboard!')
  }

  const handleExportJSON = () => {
    const { backgroundImage, logoImage, stickers, ...exportable } = eventData
    const blob = new Blob(
      [JSON.stringify({ template, eventData: exportable }, null, 2)],
      { type: 'application/json' }
    )
    const link = document.createElement('a')
    link.download = 'poster-template.json'
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
    showToast('Template exported as JSON!')
  }

  const handleImportJSON = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result)
          if (data.eventData) {
            // Reload page with the imported data encoded in URL
            const url = encodeShareURL(data.eventData, data.template || template)
            window.location.href = url
          }
        } catch {
          showToast('Invalid template file')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <div className="share-bar">
      <button className="share-btn" onClick={handleShare}>🔗 Share Link</button>
      <button className="share-btn" onClick={handleExportJSON}>💾 Export Template</button>
      <button className="share-btn" onClick={handleImportJSON}>📂 Import Template</button>
    </div>
  )
}

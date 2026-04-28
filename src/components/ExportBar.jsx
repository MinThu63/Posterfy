import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import JSZip from 'jszip'
import { socialSizes } from '../data/palettes'
import './ExportBar.css'

export default function ExportBar({ posterSize, showToast }) {
  const [exporting, setExporting] = useState(false)

  const capture = async (customWidth, customHeight) => {
    const el = document.getElementById('poster-capture')
    if (!el) return null
    // Temporarily resize for capture if needed
    const origW = el.style.width
    const origH = el.style.minHeight
    if (customWidth) {
      el.style.width = customWidth + 'px'
      el.style.minHeight = customHeight + 'px'
    }
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    })
    if (customWidth) {
      el.style.width = origW
      el.style.minHeight = origH
    }
    return canvas
  }

  const exportPNG = async () => {
    setExporting(true)
    try {
      const canvas = await capture()
      if (!canvas) return
      const link = document.createElement('a')
      link.download = 'event-poster.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
      showToast('PNG downloaded!')
    } finally { setExporting(false) }
  }

  const exportJPEG = async () => {
    setExporting(true)
    try {
      const canvas = await capture()
      if (!canvas) return
      const link = document.createElement('a')
      link.download = 'event-poster.jpg'
      link.href = canvas.toDataURL('image/jpeg', 0.95)
      link.click()
      showToast('JPEG downloaded!')
    } finally { setExporting(false) }
  }

  const exportPDF = async () => {
    setExporting(true)
    try {
      const canvas = await capture()
      if (!canvas) return
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save('event-poster.pdf')
      showToast('PDF downloaded!')
    } finally { setExporting(false) }
  }

  const copyToClipboard = async () => {
    setExporting(true)
    try {
      const canvas = await capture()
      if (!canvas) return
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ])
          showToast('Copied to clipboard!')
        } catch {
          showToast('Clipboard not supported in this browser')
        }
      }, 'image/png')
    } finally { setExporting(false) }
  }

  const batchExport = async () => {
    setExporting(true)
    try {
      const zip = new JSZip()
      const el = document.getElementById('poster-capture')
      if (!el) return
      const origW = el.style.width
      const origH = el.style.minHeight

      for (const size of socialSizes) {
        el.style.width = size.width + 'px'
        el.style.minHeight = size.height + 'px'
        // Small delay for reflow
        await new Promise(r => setTimeout(r, 100))
        const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null })
        const dataUrl = canvas.toDataURL('image/png')
        const base64 = dataUrl.split(',')[1]
        zip.file(`poster-${size.id}-${size.width}x${size.height}.png`, base64, { base64: true })
      }

      el.style.width = origW
      el.style.minHeight = origH

      const blob = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.download = 'event-posters-all-sizes.zip'
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
      showToast('All sizes exported as ZIP!')
    } finally { setExporting(false) }
  }

  return (
    <div className="export-bar">
      <span className="export-label">Export:</span>
      <button className="export-btn" onClick={exportPNG} disabled={exporting}>📷 PNG</button>
      <button className="export-btn" onClick={exportJPEG} disabled={exporting}>🖼️ JPEG</button>
      <button className="export-btn" onClick={exportPDF} disabled={exporting}>📄 PDF</button>
      <button className="export-btn" onClick={copyToClipboard} disabled={exporting}>📋 Copy</button>
      <button className="export-btn batch-btn" onClick={batchExport} disabled={exporting}>📦 All Sizes</button>
      {exporting && <span className="export-status">Generating...</span>}
    </div>
  )
}

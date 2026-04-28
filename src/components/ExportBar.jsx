import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import JSZip from 'jszip'
import { socialSizes } from '../data/palettes'
import './ExportBar.css'

// Wait for all fonts to be fully loaded before capture
async function waitForFonts() {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready
  }
  // Extra safety delay for rendering
  await new Promise(r => setTimeout(r, 200))
}

// Prepare the poster element for capture:
// - Remove scale transform so html2canvas gets the real size
// - Force computed font-family inline so html2canvas picks it up
function prepareForCapture(el) {
  const wrapper = el.closest('.poster-scale-container')
  const origTransform = wrapper?.style.transform || ''
  if (wrapper) wrapper.style.transform = 'none'

  // Force font-family on all text nodes inside the poster
  const fontFamily = getComputedStyle(el).getPropertyValue('--font')?.trim()
  const textEls = el.querySelectorAll('h1, h2, h3, p, span, strong, div')
  const origFonts = []
  textEls.forEach((te) => {
    origFonts.push(te.style.fontFamily)
    const computed = getComputedStyle(te).fontFamily
    te.style.fontFamily = computed || `${fontFamily}, sans-serif`
  })

  return () => {
    if (wrapper) wrapper.style.transform = origTransform
    textEls.forEach((te, i) => {
      te.style.fontFamily = origFonts[i]
    })
  }
}

export default function ExportBar({ posterSize, showToast }) {
  const [exporting, setExporting] = useState(false)

  const capture = async (customWidth, customHeight) => {
    const el = document.getElementById('poster-capture')
    if (!el) return null

    await waitForFonts()

    const origW = el.style.width
    const origH = el.style.minHeight
    if (customWidth) {
      el.style.width = customWidth + 'px'
      el.style.minHeight = customHeight + 'px'
    }

    // Wait for layout reflow
    await new Promise(r => setTimeout(r, 150))

    const restore = prepareForCapture(el)

    // Another small delay after removing transform
    await new Promise(r => setTimeout(r, 100))

    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      allowTaint: true,
      letterRendering: true,
    })

    restore()

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
      link.download = 'posterfy-poster.png'
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
      link.download = 'posterfy-poster.jpg'
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
      pdf.save('posterfy-poster.pdf')
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

      for (const size of socialSizes) {
        const canvas = await capture(size.width, size.height)
        if (!canvas) continue
        const dataUrl = canvas.toDataURL('image/png')
        const base64 = dataUrl.split(',')[1]
        zip.file(`posterfy-${size.id}-${size.width}x${size.height}.png`, base64, { base64: true })
      }

      const blob = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.download = 'posterfy-all-sizes.zip'
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

// Accessibility contrast checker
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1))
  const l2 = relativeLuminance(hexToRgb(hex2))
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function getContrastWarnings(eventData) {
  const warnings = []
  const ratio = contrastRatio(eventData.textColor, eventData.bgColor1)
  if (ratio < 3) {
    warnings.push({
      level: 'error',
      message: `Low contrast (${ratio.toFixed(1)}:1) between text and background. Minimum recommended is 4.5:1.`,
    })
  } else if (ratio < 4.5) {
    warnings.push({
      level: 'warning',
      message: `Moderate contrast (${ratio.toFixed(1)}:1). Consider increasing for better readability.`,
    })
  }
  const accentRatio = contrastRatio(eventData.accentColor, eventData.bgColor1)
  if (accentRatio < 3) {
    warnings.push({
      level: 'warning',
      message: `Accent color has low visibility (${accentRatio.toFixed(1)}:1) against background.`,
    })
  }
  return warnings
}

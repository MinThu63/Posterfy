export const colorPalettes = [
  { name: 'Sunset', bgColor1: '#2d1b69', bgColor2: '#e94560', textColor: '#ffffff', accentColor: '#ffd700' },
  { name: 'Ocean', bgColor1: '#0c2461', bgColor2: '#0a8ea0', textColor: '#e8f4f8', accentColor: '#48dbfb' },
  { name: 'Forest', bgColor1: '#1b4332', bgColor2: '#2d6a4f', textColor: '#d8f3dc', accentColor: '#95d5b2' },
  { name: 'Corporate', bgColor1: '#1a1a2e', bgColor2: '#16213e', textColor: '#eaeaea', accentColor: '#0f3460' },
  { name: 'Party', bgColor1: '#6c0ba9', bgColor2: '#ff2e63', textColor: '#ffffff', accentColor: '#08d9d6' },
  { name: 'Midnight', bgColor1: '#0d0d0d', bgColor2: '#1a1a2e', textColor: '#f0f0f0', accentColor: '#e94560' },
  { name: 'Warm', bgColor1: '#5c2018', bgColor2: '#c0392b', textColor: '#fdebd0', accentColor: '#f39c12' },
  { name: 'Pastel', bgColor1: '#dfe6e9', bgColor2: '#b2bec3', textColor: '#2d3436', accentColor: '#6c5ce7' },
  { name: 'Neon Night', bgColor1: '#0a0a0a', bgColor2: '#1a0033', textColor: '#ffffff', accentColor: '#00ff88' },
  { name: 'Rose Gold', bgColor1: '#2c2c2c', bgColor2: '#4a3728', textColor: '#f5e6d3', accentColor: '#c9956b' },
  { name: 'Arctic', bgColor1: '#e3f2fd', bgColor2: '#bbdefb', textColor: '#1a237e', accentColor: '#0288d1' },
  { name: 'Lavender', bgColor1: '#2e1065', bgColor2: '#581c87', textColor: '#f3e8ff', accentColor: '#c084fc' },
]

export const bgPatterns = [
  { name: 'None', value: 'none' },
  { name: 'Dots', value: 'radial-gradient(circle, currentColor 1px, transparent 1px)', size: '20px 20px' },
  { name: 'Grid', value: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', size: '30px 30px' },
  { name: 'Diagonal', value: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)', size: null },
  { name: 'Waves', value: 'radial-gradient(ellipse at 50% 0%, currentColor 0.5px, transparent 0.5px)', size: '20px 15px' },
  { name: 'Crosses', value: 'linear-gradient(currentColor 2px, transparent 2px), linear-gradient(90deg, currentColor 2px, transparent 2px)', size: '40px 40px' },
  { name: 'Zigzag', value: 'linear-gradient(135deg, currentColor 25%, transparent 25%) -10px 0, linear-gradient(225deg, currentColor 25%, transparent 25%) -10px 0, linear-gradient(315deg, currentColor 25%, transparent 25%), linear-gradient(45deg, currentColor 25%, transparent 25%)', size: '20px 20px' },
  { name: 'Diamonds', value: 'linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%), linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%)', size: '30px 30px' },
]

export const stickerIcons = [
  { name: 'Star', svg: '★' },
  { name: 'Heart', svg: '♥' },
  { name: 'Music', svg: '♪' },
  { name: 'Diamond', svg: '◆' },
  { name: 'Arrow', svg: '➤' },
  { name: 'Circle', svg: '●' },
  { name: 'Lightning', svg: '⚡' },
  { name: 'Fire', svg: '🔥' },
  { name: 'Sparkle', svg: '✨' },
  { name: 'Crown', svg: '👑' },
  { name: 'Mic', svg: '🎤' },
  { name: 'Camera', svg: '📸' },
  { name: 'Ticket', svg: '🎫' },
  { name: 'Party', svg: '🎉' },
  { name: 'Globe', svg: '🌍' },
  { name: 'Pin', svg: '📌' },
]

export const socialSizes = [
  { name: 'Poster (500×700)', width: 500, height: 700, id: 'poster' },
  { name: 'Instagram Post (1080×1080)', width: 1080, height: 1080, id: 'ig-post' },
  { name: 'Instagram Story (1080×1920)', width: 1080, height: 1920, id: 'ig-story' },
  { name: 'Facebook Event (1920×1005)', width: 1920, height: 1005, id: 'fb-event' },
  { name: 'Twitter/X (1600×900)', width: 1600, height: 900, id: 'twitter' },
  { name: 'A4 Print (794×1123)', width: 794, height: 1123, id: 'a4' },
  { name: 'Letter Print (816×1056)', width: 816, height: 1056, id: 'letter' },
]

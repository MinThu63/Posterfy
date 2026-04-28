import { socialSizes } from '../data/palettes'
import './SocialSizeSelector.css'

export default function SocialSizeSelector({ current, onSelect }) {
  const currentId = socialSizes.find(
    s => s.width === current.width && s.height === current.height
  )?.id || 'poster'

  return (
    <div className="size-selector">
      <select
        value={currentId}
        onChange={e => {
          const size = socialSizes.find(s => s.id === e.target.value)
          if (size) onSelect({ width: size.width, height: size.height })
        }}
      >
        {socialSizes.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
    </div>
  )
}

import { useState } from 'react'
import { imgUrl } from './utils'
import './LogoImg.css'

export default function LogoImg({ path, alt, size = 52 }: { path: string; alt: string; size?: number }) {
  const [failed, setFailed] = useState(false)
  const url = imgUrl(path)

  if (!url || failed) {
    return (
      <div className="logo-fallback" style={{ width: size, height: size }}>
        {alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={alt}
      width={size}
      height={size}
      className="logo-img"
      onError={() => setFailed(true)}
    />
  )
}

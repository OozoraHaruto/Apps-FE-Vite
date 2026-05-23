import { useState } from 'react'
import type { CSSProperties } from 'react'

import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'
import '@web.awesome.me/webawesome-pro/dist/components/divider/divider.js'

export interface HomeAppLink {
  name: string
  url: string
  color: string
}

export interface HomeApp {
  name: string
  image: string
  links: HomeAppLink[]
  hiddenLinks?: HomeAppLink[]
}

const cloudinaryUrl = (uri: string) =>
  `https://res.cloudinary.com/duxmjjxns/image/upload/t_haruto_apps_thumbnail/${uri}`

type ButtonVariant = 'brand' | 'neutral' | 'success' | 'warning' | 'danger'

function LinkList({ links }: { links: HomeAppLink[] }) {
  return (
    <>
      {links.map((link, i) =>
        link.name === 'hr' ? (
          <wa-divider key={i} orientation="horizontal" />
        ) : (
          <wa-button
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variant={(link.color || 'brand') as ButtonVariant}
            appearance="outlined"
            pill
            size="s"
          >
            {link.name}
          </wa-button>
        )
      )}
    </>
  )
}

export default function HarutoAppCard({
  app,
  delay = 0,
}: {
  app: HomeApp
  delay?: number
}) {
  const [seeMore, setSeeMore] = useState(false)
  const hiddenCount = app.hiddenLinks?.length ?? 0

  return (
    <wa-card
      className="h-card"
      style={{ '--anim-delay': `${delay}s` } as CSSProperties}
    >
      <div slot="media">
        <img
          className="h-card-img"
          src={cloudinaryUrl(app.image)}
          alt={app.name}
          loading="lazy"
        />
      </div>
      <h3 className="h-card-name">{app.name}</h3>
      <div className="h-card-links">
        {app.links && <LinkList links={app.links} />}
        {hiddenCount > 0 && (
          <wa-button
            variant="neutral"
            appearance="outlined"
            pill
            size="s"
            onClick={() => setSeeMore((s) => !s)}
          >
            {seeMore ? '↑ less' : `+${hiddenCount} more`}
          </wa-button>
        )}
        {seeMore && app.hiddenLinks && (
          <LinkList links={app.hiddenLinks} />
        )}
      </div>
    </wa-card>
  )
}

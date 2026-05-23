import { useEffect } from 'react'

const SUFFIX = 'Haruto Apps'

export function useTitle(title?: string, use_suffix = false) {
  useEffect(() => {
    document.title = title ? use_suffix ? `${title} · ${SUFFIX}` : title  : SUFFIX
  }, [title])
}
import { useEffect, useState, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'auto'

const THEME_KEY = 'app:theme'

function getSystemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(theme: Theme) {
  const html = document.documentElement
  const effective = theme === 'auto' ? (getSystemPrefersDark() ? 'dark' : 'light') : theme
  html.classList.toggle('wa-dark', effective === 'dark')
  html.classList.toggle('wa-light', effective === 'light')
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(THEME_KEY) as Theme) || 'auto',
  )

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'auto') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('auto')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])

  return { theme, setTheme }
}

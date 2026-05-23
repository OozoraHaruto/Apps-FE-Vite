import { useTheme, type Theme } from '../../hooks/useTheme'
import './ThemeSwitcher.css'

// Web Awesome components used here
import '@web.awesome.me/webawesome-pro/dist/components/dropdown/dropdown.js'
import '@web.awesome.me/webawesome-pro/dist/components/dropdown-item/dropdown-item.js'

const THEMES: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'auto', label: 'System', icon: 'moon-over-sun' },
]

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const current = THEMES.find((t) => t.value === theme) ?? THEMES[2]

  return (
    <div className="theme-switcher">

      {/* Light/Dark/Auto */}
      <wa-dropdown placement="bottom-end">
        <wa-button slot="trigger" variant="neutral" appearance="plain">
          <wa-icon name={current.icon} label={current.label} family="duotone"></wa-icon>
        </wa-button>
        {THEMES.map((t) => (
          <wa-dropdown-item
            key={t.value}
            type="checkbox"
            checked={theme === t.value || undefined}
            onClick={() => setTheme(t.value)}
          >
            <wa-icon name={t.icon} slot="icon" family="duotone"></wa-icon>
            {t.label}
          </wa-dropdown-item>
        ))}
      </wa-dropdown>
    </div>
  )
}

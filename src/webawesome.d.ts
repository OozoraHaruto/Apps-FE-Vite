// Minimal JSX type declarations so TypeScript stops complaining about wa-* elements.
// For full typings, see Web Awesome's official type packages.

import type { HTMLAttributes, DetailedHTMLProps } from 'react'

type WAElement<T = HTMLElement> = DetailedHTMLProps<HTMLAttributes<T>, T> & {
  // common Web Awesome attrs we use here
  variant?: string
  appearance?: string
  size?: string
  name?: string
  library?: string
  label?: string
  placeholder?: string
  placement?: string
  type?: string
  checked?: boolean
  slot?: string
  ['with-caret']?: boolean
  open?: boolean
  autocomplete?: string
  required?: boolean
  loading?: boolean
  value?: string
  class?: string
  hint?: string
  resize?: string
  rows?: number
  title?: string
  family?: string
  'auto-width'?: boolean | string
  href?: string
  target?: string
  overview?: boolean
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wa-button': WAElement
      'wa-icon': WAElement
      'wa-card': WAElement
      'wa-input': WAElement
      'wa-badge': WAElement
      'wa-dropdown': WAElement
      'wa-dropdown-item': WAElement
      'wa-drawer': WAElement
      'wa-checkbox': WAElement
      'wa-textarea': WAElement
      'wa-divider': WAElement
      'wa-callout': WAElement
      'wa-copy-button': WAElement
      'wa-details': WAElement & { summary?: string }
      'wa-page': WAElement & {
        'mobile-breakpoint'?: string
        'navigation-placement'?: 'start' | 'end'
        'nav-open'?: boolean
        'disable-navigation-toggle'?: boolean
      }
    }
  }
}

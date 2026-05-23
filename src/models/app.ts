export type Platform = 'iOS' | 'iPadOS' | 'macOS' | 'watchOS' | 'visionOS' | 'Android' | 'Web'

export interface AppListing {
  id: string
  name: string
  subtitle: string
  description: string
  icon: string
  platforms: Platform[]
  price: 'Free' | string
  storeUrl?: string
  category?: string
}

export interface PrivacySection {
  color: string
  title: string
  facts: string[]
}

export interface PrivacyData {
  appName: string
  icon: string
  footerText: string
  intro: string
  sections: PrivacySection[]
}

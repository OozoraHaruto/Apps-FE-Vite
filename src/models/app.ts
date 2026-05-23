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
  privacyPath?: string
}

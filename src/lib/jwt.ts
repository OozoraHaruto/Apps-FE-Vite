import type { JwtPayload } from '../models/jwt'
export type { JwtPayload }

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

export function isExpired(payload: JwtPayload): boolean {
  return Date.now() / 1000 >= payload.exp
}

export function isPathAllowed(path: string, allowed: string[]): boolean {
  const norm = path.startsWith('/') ? path.slice(1) : path
  return allowed.some(pattern => {
    if (pattern === '*') return true
    if (pattern.endsWith('/*')) {
      const prefix = pattern.slice(0, -2)
      return norm === prefix || norm.startsWith(prefix + '/')
    }
    return norm === pattern
  })
}

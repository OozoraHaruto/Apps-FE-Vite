import md5 from 'crypto-js/md5';
import sha3 from 'crypto-js/sha3';
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { decodeJwt, isExpired } from '../lib/jwt'
import type { JwtPayload } from '../models/jwt'
import type { UserProfile } from '../models/user'


const API = 'https://app-api-pr9v.onrender.com'
const STORAGE_KEY = 'app:auth'

interface AuthState {
  token: string
  profile: UserProfile
  payload: JwtPayload
}

interface AuthContextValue {
  user: UserProfile | null
  token: string | null
  payload: JwtPayload | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

export const encryptPassword = (password: string) => {
  const encPass = sha3(md5(password), { outputLength: 384 }).toString();
  return encPass
};


const AuthContext = createContext<AuthContextValue | null>(null)

function loadStored(): AuthState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { token, profile } = JSON.parse(raw) as { token: string; profile: UserProfile }
    const payload = decodeJwt(token)
    if (!payload || isExpired(payload)) return null
    return { token, profile, payload }
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(loadStored)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logout = useCallback(() => {
    setAuth(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const saveAuth = useCallback((token: string, profile: UserProfile) => {
    const payload = decodeJwt(token)
    if (!payload) return
    const next: AuthState = { token, profile, payload }
    setAuth(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, profile }))
  }, [])

  // Schedule token refresh ~1 minute before expiry
  useEffect(() => {
    if (!auth) return
    const msLeft = auth.payload.exp * 1000 - Date.now() - 60_000
    if (msLeft <= 0) { logout(); return }
    const authValue = auth.payload.auth
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ auth: authValue }),
        })
        const json = await res.json()
        if (json.success) saveAuth(json.data.token, json.data.profile)
        else logout()
      } catch {
        // keep existing token on network error
      }
    }, msLeft)
    return () => clearTimeout(timer)
  }, [auth?.token, logout, saveAuth])

  const login = useCallback(async (email: string, password: string) => {
    setError(null)
    setLoading(true)
    try {
      const hash = encryptPassword(password);
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: hash }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message ?? 'Login failed')
      saveAuth(json.data.token, json.data.profile)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }, [saveAuth])

  return (
    <AuthContext.Provider value={{
      user: auth?.profile ?? null,
      token: auth?.token ?? null,
      payload: auth?.payload ?? null,
      login,
      logout,
      loading,
      error,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

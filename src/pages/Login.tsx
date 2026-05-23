import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useTitle } from '../hooks/useTitle'
import './Login.css'

import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/input/input.js'
import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'

type WaInput = HTMLElement & { value: string }

export default function Login() {
  useTitle('Login')
  const { user, login, loading, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from ?? '/'

  const emailRef = useRef<WaInput>(null)
  const passwordRef = useRef<WaInput>(null)

  useEffect(() => {
    if (user) navigate(from, { replace: true })
  }, [user, navigate, from])

  function submit() {
    const email = emailRef.current?.value.trim() ?? ''
    const password = passwordRef.current?.value ?? ''
    if (!email || !password) return
    login(email, password)
  }

  return (
    <section className="login-page">
      <wa-card className="login-card">
        <h2 slot="header">Sign In</h2>
        <form
          className="login-form"
          onSubmit={e => { e.preventDefault(); submit() }}
        >
          <wa-input
            ref={emailRef as React.RefObject<HTMLElement>}
            label="Email"
            placeholder="you@example.com"
            type="email"
            autocomplete="email"
          />
          <wa-input
            ref={passwordRef as React.RefObject<HTMLElement>}
            label="Password"
            type="password"
            autocomplete="current-password"
          />
          {error && <p className="login-error">{error}</p>}
          <wa-button
            variant="brand"
            style={{ width: '100%' }}
            onClick={submit}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </wa-button>
        </form>
      </wa-card>
    </section>
  )
}

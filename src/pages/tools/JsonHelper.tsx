import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTitle } from '../../hooks/useTitle'
import './JsonHelper.css'

import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/textarea/textarea.js'
import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'
import '@web.awesome.me/webawesome-pro/dist/components/callout/callout.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'

type WaTextarea = HTMLElement & { value: string }

export default function JsonHelper() {
  useTitle('JSON Helper', true)
  const navigate = useNavigate()

  const [encoded, setEncoded] = useState('')
  const [decoded, setDecoded] = useState('')
  const [error,   setError]   = useState('')

  const encodedRef = useRef<HTMLElement>(null)
  const decodedRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const enc = encodedRef.current
    const dec = decodedRef.current

    const onEncoded = (e: Event) => setEncoded((e.target as WaTextarea).value)
    const onDecoded = (e: Event) => setDecoded((e.target as WaTextarea).value)

    enc?.addEventListener('input', onEncoded)
    dec?.addEventListener('input', onDecoded)

    return () => {
      enc?.removeEventListener('input', onEncoded)
      dec?.removeEventListener('input', onDecoded)
    }
  }, [])

  const encodeJSON = () => {
    setEncoded(JSON.stringify(decoded))
    setError('')
  }

  const decodeJSON = () => {
    try {
      const parsed = JSON.parse(encoded)
      setDecoded(typeof parsed === 'string' ? parsed : JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : 'parse error'}`)
    }
  }

  return (
    <div className="tool-page json-tool-page">
      <wa-button appearance="plain" onClick={() => navigate('/tools')}>
        <wa-icon slot="start" name="arrow-left" family="duotone" />
        Back to Tools
      </wa-button>

      <wa-card className="json-card">
        <div className="json-content">
          <wa-textarea
            ref={encodedRef as React.RefObject<HTMLElement>}
            label="Encoded data"
            rows={8}
            resize="vertical"
            value={encoded}
          />

          <div className="json-actions">
            <wa-button variant="brand" onClick={encodeJSON}>↑ Encode Data ↑</wa-button>
            <wa-button variant="brand" onClick={decodeJSON}>↓ Decode Data ↓</wa-button>
          </div>

          <wa-textarea
            ref={decodedRef as React.RefObject<HTMLElement>}
            label="Decoded data"
            rows={8}
            resize="vertical"
            value={decoded}
          />

          {error && (
            <wa-callout variant="danger" className="json-error">
              <wa-icon slot="icon" name="circle-xmark" family="duotone" />
              {error}
            </wa-callout>
          )}
        </div>
      </wa-card>

      <p className="tool-privacy-note">All processing happens locally — nothing is sent to any server.</p>
    </div>
  )
}

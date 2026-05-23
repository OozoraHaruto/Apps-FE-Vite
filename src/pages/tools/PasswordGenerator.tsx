import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTitle } from '../../hooks/useTitle'
import * as ls from '../../lib/localstorage'
import './PasswordGenerator.css'

import '@web.awesome.me/webawesome-pro/dist/components/card/card.js'
import '@web.awesome.me/webawesome-pro/dist/components/input/input.js'
import '@web.awesome.me/webawesome-pro/dist/components/checkbox/checkbox.js'
import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'
import '@web.awesome.me/webawesome-pro/dist/components/callout/callout.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'
import '@web.awesome.me/webawesome-pro/dist/components/copy-button/copy-button.js'

type WaInput = HTMLElement & { value: string }
type WaCheckbox = HTMLElement & { checked: boolean }

const LS = {
  length:      'pwd_gen_passwordLength',
  count:       'pwd_gen_passwordNo',
  numbers:     'pwd_gen_addNumbers',
  lowercase:   'pwd_gen_addLowercaseCharacter',
  uppercase:   'pwd_gen_addUppercaseCharacter',
  symbols:     'pwd_gen_includeSymbols',
  noSimilar:   'pwd_gen_noSimilarCharacter',
  noDuplicate: 'pwd_gen_noDuplicateCharacter',
}

const NUMBERS   = '1234567890'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUXWXYZ'
const SIMILAR   = `01ǃ！״″＂＄％＆＇﹝（﹞）⁎＊+＋,‚，-‐−－.٠۔܁܂․‧。．｡/̸⁄∕╱⫻⫽／ﾉOoΟοОоՕＯｏIا１２３４５６７Ց８９։܃܄∶꞉：:;;；‹＜＝›＞?？@＠［\\＼］＾＿\`ÀÁÂÃÄÅàáâãäåɑΑαаᎪＡａßʙΒβВЬᏴᛒＢｂϲϹСсᏟⅭⅽＣｃĎďĐđԁժᎠḍⅮⅾＤｄÈÉÊËéêëĒēĔĕĖėĘĚěΕЕеᎬＥｅϜＦｆɡɢԌնᏀＧｇʜΗНһᎻＨｈilɩΙІіᎥᛁⅠⅰＩｉϳЈјյᎫＪｊΚκКᏦᛕKＫｋLʟιᏞⅬⅼＬｌΜϺМᎷᛖⅯⅿＭｍɴΝＮｎΡρРрᏢＰｐႭႳＱｑʀԻᏒᚱＲｒЅѕՏႽᏚＳｓΤτТᎢＴｔμυԱՍ⋃ＵｕνѴѵᏙⅤⅴＶｖѡᎳＷｗΧχХхⅩⅹＸｘʏΥγуҮＹｙΖᏃＺｚ｛ǀ｜｝⁓～ӧӒÖӦ`
const DEFAULT_SYMBOLS = `!"#$%&'()*+,-./:;<=>?@[]^_\`{|}~`

export default function PasswordGenerator() {
  useTitle('Password Generator', true)
  const navigate = useNavigate()

  const [passwordLength, setPasswordLength] = useState(() => ls.getStr(LS.length, '20'))
  const [passwordCount,  setPasswordCount]  = useState(() => ls.getStr(LS.count, '5'))
  const [addNumbers,     setAddNumbers]     = useState(() => ls.getBool(LS.numbers, true))
  const [addLowercase,   setAddLowercase]   = useState(() => ls.getBool(LS.lowercase, true))
  const [addUppercase,   setAddUppercase]   = useState(() => ls.getBool(LS.uppercase, true))
  const [symbols,        setSymbols]        = useState(() => ls.getStr(LS.symbols, DEFAULT_SYMBOLS))
  const [noSimilar,      setNoSimilar]      = useState(() => ls.getBool(LS.noSimilar, true))
  const [noDuplicate,    setNoDuplicate]    = useState(() => ls.getBool(LS.noDuplicate, true))

  const [passwords, setPasswords] = useState<string[]>([])
  const [warning,   setWarning]   = useState('')

  const lengthRef      = useRef<HTMLElement>(null)
  const countRef       = useRef<HTMLElement>(null)
  const numbersRef     = useRef<HTMLElement>(null)
  const lowercaseRef   = useRef<HTMLElement>(null)
  const uppercaseRef   = useRef<HTMLElement>(null)
  const symbolsRef     = useRef<HTMLElement>(null)
  const noSimilarRef   = useRef<HTMLElement>(null)
  const noDuplicateRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const length      = lengthRef.current
    const count       = countRef.current
    const numbers     = numbersRef.current
    const lowercase   = lowercaseRef.current
    const uppercase   = uppercaseRef.current
    const syms        = symbolsRef.current
    const noSim       = noSimilarRef.current
    const noDup       = noDuplicateRef.current

    const onLength    = (e: Event) => { const v = (e.target as WaInput).value;    ls.setStr(LS.length, v);      setPasswordLength(v) }
    const onCount     = (e: Event) => { const v = (e.target as WaInput).value;    ls.setStr(LS.count, v);       setPasswordCount(v) }
    const onNumbers   = (e: Event) => { const v = (e.target as WaCheckbox).checked; ls.setNonStr(LS.numbers, v);   setAddNumbers(v) }
    const onLowercase = (e: Event) => { const v = (e.target as WaCheckbox).checked; ls.setNonStr(LS.lowercase, v); setAddLowercase(v) }
    const onUppercase = (e: Event) => { const v = (e.target as WaCheckbox).checked; ls.setNonStr(LS.uppercase, v); setAddUppercase(v) }
    const onSymbols   = (e: Event) => { const v = (e.target as WaInput).value;    ls.setStr(LS.symbols, v);     setSymbols(v) }
    const onNoSimilar = (e: Event) => { const v = (e.target as WaCheckbox).checked; ls.setNonStr(LS.noSimilar, v);  setNoSimilar(v) }
    const onNoDup     = (e: Event) => { const v = (e.target as WaCheckbox).checked; ls.setNonStr(LS.noDuplicate, v); setNoDuplicate(v) }

    length?.addEventListener('input', onLength)
    count?.addEventListener('input', onCount)
    numbers?.addEventListener('input', onNumbers)
    lowercase?.addEventListener('input', onLowercase)
    uppercase?.addEventListener('input', onUppercase)
    syms?.addEventListener('input', onSymbols)
    noSim?.addEventListener('input', onNoSimilar)
    noDup?.addEventListener('input', onNoDup)

    return () => {
      length?.removeEventListener('input', onLength)
      count?.removeEventListener('input', onCount)
      numbers?.removeEventListener('input', onNumbers)
      lowercase?.removeEventListener('input', onLowercase)
      uppercase?.removeEventListener('input', onUppercase)
      syms?.removeEventListener('input', onSymbols)
      noSim?.removeEventListener('input', onNoSimilar)
      noDup?.removeEventListener('input', onNoDup)
    }
  }, [])

  const buildCharLibrary = (): string => {
    let chars = ''
    if (addNumbers)   chars += NUMBERS
    if (addLowercase) chars += LOWERCASE
    if (addUppercase) chars += UPPERCASE
    chars += symbols

    if (noSimilar) {
      for (let i = 0; i < SIMILAR.length; i++) {
        chars = chars.replace(SIMILAR[i], '')
      }
    }
    return chars
  }

  const generate = () => {
    const chars = buildCharLibrary()
    const len   = Math.max(1, parseInt(passwordLength) || 20)
    const count = Math.max(1, Math.min(50, parseInt(passwordCount) || 5))

    if (noDuplicate && chars.length < len) {
      setWarning(
        `Only ${chars.length} unique characters available with the current options. ` +
        `Reduce the length to ≤ ${chars.length} or uncheck "No duplicate characters".`
      )
      setPasswords([])
      return
    }
    setWarning('')

    const result: string[] = []
    for (let i = 0; i < count; i++) {
      let pool = chars
      let pwd  = ''
      for (let j = 0; j < len; j++) {
        if (!pool.length) break
        const r = Math.floor(Math.random() * pool.length)
        pwd += pool[r]
        if (noDuplicate) pool = pool.slice(0, r) + pool.slice(r + 1)
      }
      result.push(pwd)
    }
    setPasswords(result)
  }

  const len      = parseInt(passwordLength) || 0
  const strength = len >= 16 ? 'Strong' : len >= 12 ? 'Fair' : 'Weak'

  return (
    <div className="tool-page">
      <wa-button appearance="plain" onClick={() => navigate('/tools')}>
        <wa-icon slot="start" name="arrow-left" family="duotone" />
        Back to Tools
      </wa-button>

      <wa-card className="pwd-card">
        <div className="pwd-content">
          <div className="pwd-row">
            <wa-input
              ref={lengthRef as React.RefObject<HTMLElement>}
              label="Password length"
              hint={`Estimated strength: ${strength}`}
              value={passwordLength}
              type="number"
            />
            <wa-input
              ref={countRef as React.RefObject<HTMLElement>}
              label="How many to generate"
              hint="Max 50"
              value={passwordCount}
              type="number"
            />
          </div>

          <div className="pwd-section-label">Character Sets</div>

          <wa-checkbox ref={numbersRef as React.RefObject<HTMLElement>} checked={addNumbers}>
            Include numbers&ensp;<span className="pwd-example">0–9</span>
          </wa-checkbox>
          <wa-checkbox ref={lowercaseRef as React.RefObject<HTMLElement>} checked={addLowercase}>
            Include lowercase&ensp;<span className="pwd-example">a–z</span>
          </wa-checkbox>
          <wa-checkbox ref={uppercaseRef as React.RefObject<HTMLElement>} checked={addUppercase}>
            Include uppercase&ensp;<span className="pwd-example">A–Z</span>
          </wa-checkbox>
          <wa-input
            ref={symbolsRef as React.RefObject<HTMLElement>}
            label="Symbols"
            value={symbols}
          />

          <div className="pwd-section-label">Rules</div>

          <wa-checkbox ref={noSimilarRef as React.RefObject<HTMLElement>} checked={noSimilar}>
            No similar characters&ensp;<span className="pwd-example">i, l, 1, L, o, 0, O …</span>
          </wa-checkbox>
          <wa-checkbox
            ref={noDuplicateRef as React.RefObject<HTMLElement>}
            checked={noDuplicate}
            hint="Limits pool size — may restrict maximum length"
          >
            No duplicate characters
          </wa-checkbox>

          <wa-button variant="brand" style={{ width: '100%', marginTop: '0.5rem' }} onClick={generate}>
            Generate Passwords
          </wa-button>

          {(warning || passwords.length > 0) && (
            <div className="pwd-results">
              {warning && (
                <wa-callout variant="warning">
                  <wa-icon slot="icon" name="triangle-exclamation" family="duotone" />
                  {warning}
                </wa-callout>
              )}
              {passwords.map((pwd, i) => (
                <div key={i} className="pwd-result-item">
                  <span className="pwd-value">{pwd}</span>
                  <wa-copy-button value={pwd} />
                </div>
              ))}
            </div>
          )}
        </div>
      </wa-card>

      <p className="tool-privacy-note">All processing happens locally — nothing is sent to any server.</p>
    </div>
  )
}

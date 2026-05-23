import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

// Web Awesome core styles + default theme
import '@web.awesome.me/webawesome-pro/dist/styles/themes/active.css'; /* Theme */
import '@web.awesome.me/webawesome-pro/dist/styles/color/palettes/bright.css'; /* Color palette */
import '@web.awesome.me/webawesome-pro/dist/styles/native.css';/* Native styles */
import '@web.awesome.me/webawesome-pro/dist/styles/utilities.css'; /* CSS utilities */

import { AuthProvider } from './contexts/AuthContext'
import App from './App'
import './styles/app.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

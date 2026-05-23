import { useAuth } from '../../contexts/AuthContext'
import './UserMenu.css'

import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'

export default function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="user-menu">
      <img src={user.icon} alt={user.name} className="user-avatar" />
      <span className="user-name">{user.name}</span>
      <wa-button appearance="plain" size="small" onClick={logout}>
        Logout
      </wa-button>
    </div>
  )
}

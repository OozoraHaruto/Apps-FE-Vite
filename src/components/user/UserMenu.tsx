import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import ThemeSwitcher from '../theme/ThemeSwitcher'
import './UserMenu.css'

import '@web.awesome.me/webawesome-pro/dist/components/button/button.js'
import '@web.awesome.me/webawesome-pro/dist/components/icon/icon.js'
import '@web.awesome.me/webawesome-pro/dist/components/avatar/avatar.js'

export default function UserMenu() {
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="user-menu">
      <Link to="/me" className="user-menu-identity">
        <wa-avatar
          image={user.icon}
          label={user.name}
          shape="circle"
          style={{ '--size': '2rem' } as React.CSSProperties}
        />
        <span className="user-name">{user.name}</span>
      </Link>
      <ThemeSwitcher />
      <wa-button appearance="plain" onClick={logout} label="Logout">
        <wa-icon name="arrow-right-from-bracket" />
      </wa-button>
    </div>
  )
}

import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import { isPathAllowed } from '../../lib/jwt'

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, payload } = useAuth()
  const { pathname } = useLocation()

  if (!user || !payload) {
    return <Navigate to="/auth/login" state={{ from: pathname }} replace />
  }

  if (!isPathAllowed(pathname, payload.allowed)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

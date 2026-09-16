import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthGuard() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect unauthenticated users to login, saving current location
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // Render child routes defined inside <Route element={<AuthGuard />}>
  return <Outlet />
}
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthPage } from '../pages/AuthPage'
import { AppointmentsPage } from '../pages/AppointmentsPage'
import { ResetPassword } from '../pages/ResetPassword'
import { Profile } from '../pages/Profile'
import { useAuth } from '../context/AuthContext'

export const AppRouter = () => {
  const { user, loading } = useAuth()

  if (loading) return <p>Chargement...</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/appointments" /> : <Navigate to="/auth" />}
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/appointments"
          element={user ? <AppointmentsPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/profile"
          element={user? <Profile /> : <Navigate to="/" />}
        />

        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

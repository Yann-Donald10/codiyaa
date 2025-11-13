import { AppRouter } from './routes/AppRouter'
import { AuthProvider } from './context/AuthContext'
import './index.css'

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

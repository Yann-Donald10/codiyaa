import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')

  // Connexion ou inscription
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Vérifie ton email pour confirmer ton inscription ✅')
    }
  }

  // Mot de passe oublié
  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password',
    })
    if (error) setMessage(error.message)
    else setMessage('Email de réinitialisation envoyé ✅')
  }

  // Connexion avec Google
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000',
      },
    })
    if (error) setMessage(error.message)
  }

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? 'Connexion' : 'Inscription'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>

      {/* Connexion avec Google */}
      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          <span className="font-medium">Se connecter avec Google</span>
        </button>
      </div>

      {isLogin && (
        <button
          onClick={handleResetPassword}
          className="mt-3 text-sm text-blue-500 underline"
        >
          Mot de passe oublié ?
        </button>
      )}

      <p className="text-sm mt-4 text-center">
        {isLogin ? "Pas encore de compte ?" : 'Déjà un compte ?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 underline"
        >
          {isLogin ? "S'inscrire" : 'Se connecter'}
        </button>
      </p>

      {message && <p className="text-red-500 mt-3 text-center">{message}</p>}
    </div>
  )
}

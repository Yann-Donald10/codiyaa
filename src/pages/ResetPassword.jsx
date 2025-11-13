import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function ResetPassword() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.updateUser({ password })
    if (error) setMessage(error.message)
    else setMessage('Mot de passe mis à jour ✅')
  }

  return (
    <div className="max-w-sm mx-auto mt-20 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Nouveau mot de passe</h2>
      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Mettre à jour
        </button>
      </form>
      {message && <p className="text-center mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  )
}

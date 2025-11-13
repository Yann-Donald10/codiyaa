import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { readAndCompressImage } from 'browser-image-resizer'

const resizeConfig = {
  quality: 0.8,
  maxWidth: 100,
  maxHeight: 100,
  autoRotate: true,
  debug: false,
}

export function Profile() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ first_name: '', last_name: '', avatar_url: '' })
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      if (data.user) fetchProfile(data.user)
    })
  }, [])

  async function fetchProfile(user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    if (data) setProfile(data)
  }

  // 🔹 Mettre à jour prénom/nom
  async function handleUpdate(e) {
    e.preventDefault()
    const updates = {
      id: user.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar_url: profile.avatar_url,
      updated_at: new Date(),
    }
    const { error } = await supabase.from('profiles').upsert(updates)
    if (error) setMessage(error.message)
    else setMessage('Profil mis à jour ✅')
  }

  // 🔹 Upload avatar avec redimensionnement + suppression de l’ancienne image
  const uploadAvatar = async (event) => {
    try {
      setUploading(true)
      setMessage('')
      const file = event.target.files[0]
      if (!file) return

      // Redimensionner l'image
      const resizedFile = await readAndCompressImage(file, resizeConfig)

      // Nom du fichier
      const fileExt = resizedFile.name?.split('.').pop() || 'png'
      const fileName = `${user.id}.${fileExt}`
      const filePath = fileName

      // Supprimer ancienne image si elle existe
      const oldFile = profile.avatar_url?.split('/').pop()
      if (oldFile) {
        await supabase.storage.from('avatars').remove([oldFile])
      }

      // Upload du nouveau fichier
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, resizedFile, { upsert: true })
      if (uploadError) throw uploadError

      // URL publique
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

      // Mise à jour table profiles
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        avatar_url: data.publicUrl,
        updated_at: new Date(),
      })
      if (error) throw error

      // Mise à jour locale
      setProfile({ ...profile, avatar_url: data.publicUrl })
      setMessage('Avatar mis à jour ✅')
    } catch (error) {
      console.error(error)
      alert('Erreur lors du téléchargement : ' + (error.message || error))
    } finally {
      setUploading(false)
    }
  }

  // 🔹 Supprimer avatar
  const deleteAvatar = async () => {
    try {
      const oldFile = profile.avatar_url?.split('/').pop()
      if (!oldFile) return

      await supabase.storage.from('avatars').remove([oldFile])
      setProfile({ ...profile, avatar_url: '' })
      setMessage('Photo supprimée 🚫')
    } catch (error) {
      console.error(error)
      alert('Erreur lors de la suppression : ' + (error.message || error))
    }
  }

  if (!user) return <p className="text-center mt-10">Chargement...</p>

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Mon Profil</h2>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-4">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />
        )}

        <div className="flex gap-2">
          <label className="text-sm text-blue-500 underline cursor-pointer">
            {uploading ? 'Upload...' : 'Changer la photo'}
            <input
              type="file"
              hidden
              onChange={uploadAvatar}
              accept="image/*"
              disabled={uploading}
            />
          </label>
          {profile.avatar_url && (
            <button onClick={deleteAvatar} className="text-sm text-red-500 underline">
              Supprimer
            </button>
          )}
        </div>
      </div>

      {/* Formulaire prénom/nom */}
      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          type="text"
          placeholder="Prénom"
          value={profile.first_name || ''}
          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Nom"
          value={profile.last_name || ''}
          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Enregistrer
        </button>
      </form>

      {message && <p className="text-center text-green-600 mt-3">{message}</p>}

      <button
        onClick={() => navigate('/appointments')}
        className="w-full mt-4 bg-gray-200 p-2 rounded hover:bg-gray-300"
      >
        Retour aux rendez-vous
      </button>
    </div>
  )
}

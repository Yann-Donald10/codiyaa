import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { AppointmentForm } from '../components/AppointmentForm'
import { AppointmentList } from '../components/AppointmentList'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const AppointmentsPage = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate()

  // Charger les rendez-vous
  const fetchAppointments = async () => {
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: true })
    setAppointments(data || [])
  }

  // Charger le profil (avatar + prénom)
  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    setProfile(data)
  }

  // Supprimer un rendez-vous
  const deleteAppointment = async (id) => {
    await supabase.from('appointments').delete().eq('id', id)
    fetchAppointments()
  }

  // Déconnexion
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  // Chargement initial
  useEffect(() => {
    if (user) {
      fetchProfile()
      fetchAppointments()
    }
  }, [user])

  if (!profile) return <p className="text-center mt-10">Chargement...</p>

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      {/* En-tête utilisateur */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            src={profile.avatar_url || '/default-avatar.png'}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover cursor-pointer border"
            onClick={() => navigate('/profile')}
          />
          <h2 className="text-xl font-semibold">
            Salut, {profile.first_name || 'Utilisateur'} 👋
          </h2>
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Déconnexion
        </button>
      </div>

      {/* Section rendez-vous */}
      <h1 className="text-2xl font-bold mb-4">Mes rendez-vous</h1>
      <AppointmentForm onAdd={fetchAppointments} />
      <AppointmentList appointments={appointments} onDelete={deleteAppointment} />
    </div>
  )
}

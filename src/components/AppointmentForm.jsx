import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export const AppointmentForm = ({ onAdd }) => {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title || !date) return

    const { error } = await supabase.from('appointments').insert([
      { title, date, user_id: user.id },
    ])

    if (!error) {
      onAdd()
      setTitle('')
      setDate('')
    } else {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 mt-4">
      <input
        type="text"
        placeholder="Titre du rendez-vous"
        className="border p-2 rounded flex-1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        className="border p-2 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Ajouter
      </button>
    </form>
  )
}

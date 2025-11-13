export const AppointmentList = ({ appointments, onDelete }) => (
  <ul className="mt-6 space-y-3">
    {appointments.map((a) => (
      <li
        key={a.id}
        className="border rounded p-3 flex justify-between items-center"
      >
        <div>
          <p className="font-semibold">{a.title}</p>
          <p className="text-sm text-gray-500">{a.date}</p>
        </div>
        <button
          onClick={() => onDelete(a.id)}
          className="text-red-600 hover:underline"
        >
          Supprimer
        </button>
      </li>
    ))}
  </ul>
)

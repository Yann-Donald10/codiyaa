import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from '../context/AuthContext'



export default function JoinSession() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: student, error: studentError } = await supabase
        .from("student")
        .select("id_student, student_firstname, student_lastname, id_educator")
        .eq("student_code", code)
        .single();

      if (studentError || !student) throw new Error("Code invalide ou session inactivée");

      const { data: educator, error: educatorError } = await supabase
        .from("educator")
        .select("session_status")
        .eq("id_educator", student.id_educator)
        .single();

      if (educatorError || !educator) throw new Error("Erreur lors de la récupération du prof");
      if (!educator.session_status) throw new Error("La session n'est pas ouverte");

      navigate(`/workspace/${student.id_student}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Entrer votre code étudiant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Vérification..." : "Rejoindre"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

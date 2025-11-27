import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SessionForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 4) return;

    setLoading(true);
    setError(null);

    try {
      const { data: student, error: studentError } = await supabase
        .from("student")
        .select("id_student, student_firstname, student_lastname, id_educator")
        .eq("student_code", code)
        .single();

      if (studentError || !student) throw new Error("Code invalide");

      const { data: educator } = await supabase
        .from("educator")
        .select("session_status")
        .eq("id_educator", student.id_educator)
        .single();

      if (!educator?.session_status) throw new Error("La session n'est pas ouverte");

      navigate(`/projects/${student.id_student}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDigit = (digit) => {
    if (code.length < 4) setCode((prev) => prev + digit);
  };

  const handleDelete = () => setCode((prev) => prev.slice(0, -1));

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <input
        type="text"
        value={code}
        readOnly
        placeholder="----"
        style={{
          fontSize: "2rem",
          textAlign: "center",
          letterSpacing: "10px",
          width: "150px",
          marginBottom: "20px"
        }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 80px)", gap: "10px", justifyContent: "center" }}>
        {[1,2,3,4,5,6,7,8,9].map((num) => (
          <button key={num} type="button" onClick={() => handleDigit(num)} style={{ fontSize: "2rem", padding: "15px" }}>
            {num}
          </button>
        ))}

        <button type="button" onClick={handleDelete} style={{ fontSize: "2rem", padding: "15px" }}>⌫</button>
        <button type="button" onClick={() => handleDigit(0)} style={{ fontSize: "2rem", padding: "15px" }}>0</button>
        <button type="submit" disabled={loading || code.length !== 4} style={{
          fontSize: "1.5rem",
          padding: "15px",
          backgroundColor: code.length === 4 ? "#4CAF50" : "#aaa",
          color: "white"
        }}>
          OK
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

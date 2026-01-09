// src/components/SessionForm.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../css/SessionForm.css";

export default function SessionForm({ code, setCode, setSubmitState }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dès que l’utilisateur modifie le code (ajout/suppression), on revient à l’état normal
  useEffect(() => {
    if (error) setError(null);
    if (setSubmitState) setSubmitState("idle");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || code.length !== 4) return;

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

      if (!educator?.session_status)
        throw new Error("La session n'est pas ouverte");

      // ✅ Code bon : on déclenche l'image "win"
      if (setSubmitState) setSubmitState("success");

      // ✅ Attente 3 secondes avant de naviguer
      await wait(2000);

      navigate(`/projects/${student.id_student}`);
    } catch (err) {
      if (setSubmitState) setSubmitState("error");
      setError(err.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const handleDigit = (digit) => {
    if (code.length < 4) setCode((prev) => prev + String(digit));
  };

  const handleDelete = () => setCode((prev) => prev.slice(0, -1));

  // Pastilles de code
  const dots = Array.from({ length: 4 }, (_, i) => {
    const filled = i < code.length;
    return (
      <span
        key={i}
        className={`session-code-dot ${filled ? "session-code-dot--filled" : ""}`}
      />
    );
  });

  const keypadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  // Texte qui évolue selon l’avancement
  const helperByLength = [
    "Tape les 4 chiffres de ton code.",
    "Plus que 3 chiffres…",
    "Plus que 2 chiffres…",
    "Plus qu’1 chiffre…",
    "Parfait ! Appuie sur OK.",
  ];
  const progressText = helperByLength[code.length] || helperByLength[0];

  return (
    <form
      onSubmit={handleSubmit}
      className={`session-form ${error ? "session-form--error" : ""}`}
    >
      <div className="session-code-display">{dots}</div>
      <p className="session-progress-text">{progressText}</p>

      <div className="session-keypad">
        {keypadRows.map((row, rowIndex) => (
          <div className="session-keypad-row" key={rowIndex}>
            {row.map((digit) => (
              <button
                key={digit}
                type="button"
                className="session-key-btn"
                onClick={() => handleDigit(digit)}
                disabled={loading}
              >
                {digit}
              </button>
            ))}
          </div>
        ))}

        <div className="session-keypad-row">
          <button
            type="button"
            className="session-key-btn session-key-btn--ghost"
            onClick={handleDelete}
            disabled={loading || code.length === 0}
            aria-label="Supprimer"
            title="Supprimer"
          >
            ⌫
          </button>

          <button
            type="button"
            className="session-key-btn"
            onClick={() => handleDigit("0")}
            disabled={loading}
          >
            0
          </button>

          <button
            type="submit"
            disabled={loading || code.length !== 4}
            className={`session-key-btn session-key-btn--ok ${
              code.length === 4 ? "session-key-btn--ok-ready" : ""
            }`}
          >
            OK
          </button>
        </div>
      </div>

      {error && <p className="session-error">{error}</p>}
    </form>
  );
}

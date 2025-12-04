/*import { useState } from "react";
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
*/

/*
// src/components/SessionForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../css/SessionForm.css";

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

      if (!educator?.session_status)
        throw new Error("La session n'est pas ouverte");

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

  // Pastilles de code
  const dots = Array.from({ length: 4 }, (_, i) => {
    const filled = i < code.length;
    return (
      <span
        key={i}
        className={`session-code-dot ${
          filled ? "session-code-dot--filled" : ""
        }`}
      />
    );
  });

  const keypadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`session-form ${error ? "session-form--error" : ""}`}
    >
      {/* Affichage du code */ /*}
      <div className="session-code-display">{dots}</div>

      {/* Clavier numérique */ /*}
      <div className="session-keypad">
        {keypadRows.map((row, rowIndex) => (
          <div className="session-keypad-row" key={rowIndex}>
            {row.map((digit) => (
              <button
                key={digit}
                type="button"
                className="session-key-btn"
                onClick={() => handleDigit(digit)}
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
          >
            ⌫
          </button>
          <button
            type="button"
            className="session-key-btn"
            onClick={() => handleDigit("0")}
          >
            0
          </button>
          <button
            type="submit"
            disabled={loading || code.length !== 4}
            className="session-key-btn session-key-btn--ok"
          >
            OK
          </button>
        </div>
      </div>

      {error && <p className="session-error">{error}</p>}
    </form>
  );
}
*/


// src/components/SessionForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import "../css/SessionForm.css";

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

      if (!educator?.session_status)
        throw new Error("La session n'est pas ouverte");

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

  // pastilles
  const dots = Array.from({ length: 4 }, (_, i) => {
    const filled = i < code.length;
    return (
      <span
        key={i}
        className={`session-code-dot ${
          filled ? "session-code-dot--filled" : ""
        }`}
      />
    );
  });

  const keypadRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  // petit texte qui évolue
  const helperByLength = [
    "Tape les 4 chiffres de ton code.",
    "Plus que 3 chiffres…",
    "Plus que 2 chiffres…",
    "Plus qu’1 chiffre…",
    "Parfait ! Appuie sur OK.",
  ];
  const progressText = helperByLength[code.length];

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
          >
            ⌫
          </button>
          <button
            type="button"
            className="session-key-btn"
            onClick={() => handleDigit("0")}
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

/*import SessionForm from "../components/SessionForm";

export default function JoinSession() {
  return (
    <div>
      <h2>Entrer votre code étudiant</h2>
      <SessionForm />
    </div>
  );
}
*/



// src/pages/SessionPage.jsx
import SessionForm from "../components/SessionForm";
import "../css/SessionForm.css";

export default function JoinSession() {
  return (
    <div className="join-session-page">
      {/* Bandeaux motifs haut / bas */}
      <div className="join-pattern-strip join-pattern-strip--top" />
      <div className="join-pattern-strip join-pattern-strip--bottom" />

      <div className="join-session-card">
        <div className="join-session-header">
          <p className="join-session-subtitle">Rejoindre une session</p>
          <h1 className="join-session-title">Entre ton code élève</h1>
          <p className="join-session-helper">
            Demande à ton·ta professeur·e si tu ne connais pas ton code.
          </p>
        </div>

        <SessionForm />
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import SessionForm from "../components/SessionForm";
import "../css/SessionForm.css";

import img0 from "../assets/images/Session/Pensif.png";
import img1 from "../assets/images/Session/1pcs.png";
import img2 from "../assets/images/Session/2pcs.png";
import img3 from "../assets/images/Session/Lose.png"; // code mauvais
import img4 from "../assets/images/Session/Win.png";  // code bon

export default function JoinSession() {
  const [code, setCode] = useState("");
  const [submitState, setSubmitState] = useState("idle"); 
  // "idle" | "success" | "error"

  const illustrationSrc = useMemo(() => {
    if (submitState === "success") return img4;
    if (submitState === "error") return img3;

    if (code.length === 0) return img0;
    if (code.length === 1) return img1;
    return img2; // 2, 3, 4 -> img2
  }, [code.length, submitState]);

  return (
    <div className="join-session-page">
      <div className="join-pattern-strip join-pattern-strip--top" />
      <div className="join-pattern-strip join-pattern-strip--bottom" />

      <div className="join-session-shell">
        <div className="join-session-visual">
          <img src={illustrationSrc} alt="" className="join-session-illustration" />
        </div>

        <div className="join-session-card">
          <div className="join-session-header">
            <p className="join-session-subtitle">Rejoindre une session</p>
            <h1 className="join-session-title">Entre ton code élève</h1>
            <p className="join-session-helper">
              Demande à ton·ta professeur·e si tu ne connais pas ton code.
            </p>
          </div>

          <SessionForm
            code={code}
            setCode={setCode}
            setSubmitState={setSubmitState}
          />
        </div>
      </div>
    </div>
  );
}

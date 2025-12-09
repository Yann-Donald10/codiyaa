import React from "react";
import start from "../assets/images/start.png"
import stop from "../assets/images/stop.png"

export default function ExecutionArea() {
  return (
    <div className="execution-wrapper">
      {/*<div className="exec-controls">
        <img
            src={start}
            alt="start button"
            className="exec-btn-start"
          />
          <img
            src={stop}
            alt="stop button"
            className="exec-btn-stop"
          />
      </div>*/}
      <div className="execution-area">
        <div className="execution-header">Zone d'exécution</div>
        <div>
          {/* Ici on affichera le personnage / décor / aperçu */}
          <div className="execution-placeholder">
            Ici l'exécution du projet (aperçu du personnage)
          </div>
        </div>
      </div>
    </div>
  );
}

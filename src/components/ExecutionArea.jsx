import React from "react";

export default function ExecutionArea() {
  return (
    <div className="execution-area">
      <div className="execution-header">Zone d'exécution</div>
      <div>
        {/* Ici on affichera le personnage / décor / aperçu */}
        <div className="execution-placeholder">
          Ici l'exécution du projet (aperçu du personnage)
        </div>
      </div>
    </div>
  );
}

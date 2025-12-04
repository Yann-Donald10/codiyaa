import React from "react";

export default function AsssemblyArea() {
  return (
    <div className="workspace-area">
      <div>
        {/* Ici c'est l'aire where Blockly will mount later */}
        <div className="workspace-placeholder">
          Zone d'assemblage (Blockly) — glisser les blocs ici
        </div>
      </div>
    </div>
  );
}




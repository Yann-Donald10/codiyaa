import React from "react";

export default function AssetList() {
  const icons = ["Person", "Robot", "Ball"];
  const backgrounds = ["Beach", "Forest", "City"];

  return (
    <div className="assets-wrapper">
      {/* Section icônes */}
      <div className="assets-sidebar">
        <div className="assets-section">
          <h4>Icônes</h4>
          <div className="assets-list">
            {icons.map((c) => (
              <div key={c} className="asset-card">{c}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Section décors */}
      <div className="assets-sidebar">
        <div className="assets-section">
          <h4>Décors</h4>
          <div className="assets-list">
            {backgrounds.map((b) => (
              <div key={b} className="asset-card">{b}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

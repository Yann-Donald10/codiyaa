
import React from "react";

export default function BlockType({ types, selectedType, onTypeClick }) {
  return (
    <div className="types-container">
      {types.map((t) => (
        <div
          key={t.id}
          className={`type-box ${selectedType === t.id ? "active" : ""}`}
          onClick={() => onTypeClick(t.id)}
          style={{
            backgroundColor: selectedType === t.id ? t.color : "transparent",
            color: selectedType === t.id ? "#fff" : "#333"
          }}
        >
          <span className="type-label">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

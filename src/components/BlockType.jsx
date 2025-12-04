import React from "react";

export default function BlockType({ types, selectedType, onTypeClick }) {
  return (
    <div className="types-bar">
      {types.map((t) => (
        <button
          key={t.id}
          className={`type-pill ${selectedType === t.id ? "active" : ""}`}
          onClick={() => onTypeClick(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}


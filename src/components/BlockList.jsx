import React from "react";

export default function BlockList({ blocks = [], visible }) {
  if (!visible) return null;

  return (
    <div className="blocks-panel">
      <div className="blocks-scroll">
        {blocks.length === 0 && <div className="empty">Aucun bloc</div>}
        {blocks.map((b, i) => (
          <div key={i} className="block-item" draggable>
            {b}
          </div>
        ))}
      </div>
    </div>
  );
}


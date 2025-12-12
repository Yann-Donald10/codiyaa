/*import React from "react";

export default function BlockList({ blocks = [], visible, onDropBlock }) {
  if (!visible) return null;

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("blockType", type);
  };

  return (
    <div
      className="blocks-panel"
      onDragEnd={(e) => {
        const type = e.dataTransfer.getData("blockType");
        if (type && onDropBlock) onDropBlock(type);
      }}
    >
      <div className="blocks-scroll">
        {blocks.length === 0 && <div className="empty">Aucun bloc</div>}
        {blocks.map((b, i) => (
          <div
            key={i}
            className="block-item"
            draggable
            onDragStart={(e) => handleDragStart(e, b.blocklyType)}
          >
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}*/

import React, { useEffect, useRef } from "react";
import { renderBlockPreview } from "../components/Blockly/BlocksRender";

export default function BlockList({ blocks = [], visible }) {
  const previewRefs = useRef({});

  useEffect(() => {
    blocks.forEach((b) => {
      if (!previewRefs.current[b.blocklyType]) return;

      const svg = renderBlockPreview(b.blocklyType);
      const container = previewRefs.current[b.blocklyType];

      container.innerHTML = "";
      container.appendChild(svg);
    });
  }, [blocks]);

  if (!visible) return null;

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("blockType", type);
  };

  return (
    <div className="blocks-panel">
      <div className="blocks-scroll">
        {blocks.map((b, i) => (
          <div
            key={i}
            className="block-item"
            draggable
            onDragStart={(e) => handleDragStart(e, b.blocklyType)}
          >
            <div
              className="block-preview"
              ref={(el) => (previewRefs.current[b.blocklyType] = el)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}


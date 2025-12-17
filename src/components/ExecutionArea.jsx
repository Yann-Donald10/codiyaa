import React, { useState, useEffect, useRef } from "react";

export default function ExecutionArea({
  selectedSprite,
  spritePath,
  backgroundPath,
  spriteX,
  spriteY,
  onSpritePositionChange
}) {
  const [spriteState, setSpriteState] = useState({
    x: 0,
    y: 0,
    rotation: 0
  });

  const spriteRef = useRef(null);
  const spritePosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const areaRef = useRef(null);

  const SPRITE_SIZE = 100;

  const handleDragStart = (e) => {
    if (!spritePath) return;

    e.preventDefault();
    const rect = e.target.getBoundingClientRect();

    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    isDraggingRef.current = true;
  };

  const handleDragging = (e) => {
    if (!isDraggingRef.current || !areaRef.current) return;

    const areaRect = areaRef.current.getBoundingClientRect();

    let newX = e.clientX - areaRect.left - offset.x;
    let newY = e.clientY - areaRect.top - offset.y;

    const spriteRect = spriteRef.current.getBoundingClientRect();
    const spriteWidth = spriteRect.width;
    const spriteHeight = spriteRect.height;

    newX = Math.max(
    0,
    Math.min(newX, areaRect.width - spriteWidth)
    );

    newY = Math.max(
    0,
    Math.min(newY, areaRect.height - spriteHeight)
    );


    // ✅ SOURCE DE VÉRITÉ
    spritePosRef.current = { x: newX, y: newY };

    // Affichage
    setSpriteState(prev => ({
      ...prev,
      x: newX,
      y: newY
    }));
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    const { x, y } = spritePosRef.current;

    // 🛡️ SÉCURITÉ ANTI (0,0)
    if (Number.isFinite(x) && Number.isFinite(y)) {
      onSpritePositionChange?.(x, y);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleDragging);
    window.addEventListener("mouseup", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDragging);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [offset]);

  // 🔄 Sync depuis WorkspacePage (chargement DB)
  useEffect(() => {
    if (spriteX === null || spriteY === null) return;

    spritePosRef.current = { x: spriteX, y: spriteY };

    setSpriteState(prev => ({
      ...prev,
      x: spriteX,
      y: spriteY
    }));
  }, [spriteX, spriteY]);

  return (
    <div className="execution-wrapper">
      <div
        className="execution-area"
        style={{
          backgroundImage: backgroundPath ? `url(${backgroundPath})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        ref={areaRef}
      >
       {/* <div
          ref={areaRef}
          className="execution-placeholder"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >*/}
          {spritePath && (
            <img
              src={spritePath}
              alt={selectedSprite}
              ref={spriteRef}
              onMouseDown={handleDragStart}
              style={{
                position: "absolute",
                left: spriteState.x,
                top: spriteState.y,
                width: SPRITE_SIZE,
                height: SPRITE_SIZE,
                cursor: isDraggingRef.current ? "grabbing" : "grab"
              }}
            />
          )}
        {/*</div>*/}
      </div>
    </div>
  );
}

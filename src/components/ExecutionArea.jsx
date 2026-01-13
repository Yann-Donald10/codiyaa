import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle  } from "react";

const ExecutionArea = forwardRef(({
  selectedSprite,
  spritePath,
  backgroundPath,
  spriteX,
  spriteY,
  onSpritePositionChange
}, ref) => {
  const [spriteState, setSpriteState] = useState({
    x: 0,
    y: 0,
    rotation: 0
  });

  const initialStateRef = useRef({
    x: 0,
    y: 0,
    rotation: 0
  });

  const [spriteSize, setSpriteSize] = useState({
  width: 0,
  height: 0
});

  const spriteRef = useRef(null);
  const audioRef = useRef(null);
  const spritePosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const areaRef = useRef(null);

  //const SPRITE_SIZE_LONG = 200;
  //const SPRITE_SIZE_LARGE = 170;

  useEffect(() => {
  if (!areaRef.current) return;

  const updateSpriteSize = () => {
    const { width, height } = areaRef.current.getBoundingClientRect();

    const spriteWidth = width * 0.30;
    const spriteHeight = spriteWidth * 1.25; // ratio image

    setSpriteSize({
      width: spriteWidth,
      height: spriteHeight
    });
  };

  updateSpriteSize();

  window.addEventListener("resize", updateSpriteSize);
  return () => window.removeEventListener("resize", updateSpriteSize);
}, []);


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


    spritePosRef.current = { x: newX, y: newY };

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

  // 🔄 Sync depuis WorkspacePage + mémorisation état initial
  useEffect(() => {
    if (spriteX === null || spriteY === null) return;

    const initial = {
      x: spriteX,
      y: spriteY,
      rotation: 0
    };

    // mémorise le point de départ
    initialStateRef.current = initial;

    spritePosRef.current = { x: spriteX, y: spriteY };

    // applique visuellement
    setSpriteState(initial);
  }, [spriteX, spriteY]);


  const runningRef = useRef(true);

  useImperativeHandle(ref, () => ({
    moveForward(steps) {
      return new Promise(resolve => {
        if (!runningRef.current) return resolve();
        const distance = steps * 10;
        setSpriteState(prev => ({
          ...prev,
          x: prev.x + distance
        }));
        setTimeout(resolve, 2000);
      });
    },

    moveUp(steps) {
      return new Promise(resolve => {
        if (!runningRef.current) return resolve();

        const distance = steps * 10;
        setSpriteState(prev => ({
          ...prev,
          y: prev.y - distance
        }));

        setTimeout(resolve, 2000);
      });
    },

    moveDown(steps) {
      return new Promise(resolve => {
        if (!runningRef.current) return resolve();

        const distance = steps * 10;
        setSpriteState(prev => ({
          ...prev,
          y: prev.y + distance
        }));

        setTimeout(resolve, 2000);
      });
    },

    turnRight(angle) {
      return new Promise(resolve => {
        if (!runningRef.current) return resolve();
        setSpriteState(prev => ({
          ...prev,
          rotation: prev.rotation + angle
        }));
        setTimeout(resolve, 2000);
      });
    },
    
    turnLeft(angle) {
      return new Promise(resolve => {
        if (!runningRef.current) return resolve();
        setSpriteState(prev => ({
          ...prev,
          rotation: prev.rotation - angle
        }));
        setTimeout(resolve, 2000);
      });
    },

    playSound(name) {
      return new Promise(resolve => {
        if (!name || !runningRef.current) return resolve();

        const audio = new Audio(`/sounds/${name}.mp3`);
        audioRef.current = audio; // On stocke l'audio actuel

        const cleanup = () => {
          audioRef.current = null;
          resolve();
        };

        audio.addEventListener('ended', cleanup);
        audio.addEventListener('error', cleanup);

        audio.play().catch(err => {
          console.warn(err);
          cleanup();
        });
        setTimeout(resolve, 3000);
      });
    },

    stopProgram() {
      runningRef.current = false;

      if (audioRef.current) {
        audioRef.current.pause();   // stop la lecture
        audioRef.current.currentTime = 0; // remettre à 0 pour repartir
        audioRef.current = null;    // reset référence
      }
    },

    reset() {
      runningRef.current = true;

      setSpriteState({
        ...initialStateRef.current
      });
    },

    isRunning() {
      return runningRef.current;
    }
  }));

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
                width: spriteSize.width,
                height: spriteSize.height,
                //width: SPRITE_SIZE_LARGE,
                //height: SPRITE_SIZE_LONG,
                cursor: isDraggingRef.current ? "grabbing" : "grab",
                transform: `rotate(${spriteState.rotation}deg)`
              }}
            />
          )}
        {/*</div>*/}
      </div>
    </div>
  );
});

export default ExecutionArea;

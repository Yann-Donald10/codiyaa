import React, {useState} from "react";

export default function ExecutionArea({ selectedSprite, selectedBackground, spritePath, backgroundPath }) {

  // État du sprite pour l'exécution (position, rotation, etc.)
  const [spriteState, setSpriteState] = useState({ x: 0, y: 0, rotation: 0 });


  return (
        <div className="execution-wrapper">
            <div className="execution-area" style={{ 
                backgroundImage: backgroundPath ? `url(${backgroundPath})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="execution-placeholder" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* Affichage du Sprite sélectionné (V1) */}
                    {spritePath && (
                        <img 
                            src={spritePath} 
                            alt={selectedSprite} 
                            style={{
                                position: 'absolute',
                                // Centrer le sprite
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) rotate(${spriteState.rotation}deg)`,
                                transition: 'transform 0.1s linear', 
                                width: '200px', // Taille réduite pour le test visuel
                                height: '200px'
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
  }
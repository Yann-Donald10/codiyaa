import React from 'react';

// Le composant reçoit :
// - isOpen (boolean) : Pour afficher ou masquer
// - onClose (function) : Pour fermer le modal
// - title (string) : "Icônes" ou "Décors"
// - assetNames (array) : La liste complète des noms (allIconAssets ou allDecorAssets)
// - assetMap (object) : Les chemins d'accès aux images (iconAssetMap ou decorAssetMap)
// - onSelect (function) : La fonction à appeler après la sélection (handleSpriteAddOrSelect ou handleBackgroundSelect)
// - type (string) : 'icon' ou 'background'
const AssetPopup = ({ isOpen, onClose, title, assetNames, assetMap, onSelect, type }) => {
    if (!isOpen) return null;

    const handleAssetClick = (name) => {
        onSelect(name);
        onClose(); // Fermer le pop-up après la sélection
    };

    return (
        <div className="popup-backdrop">
            <div className="asset-popup">
                <div className="popup-header">
                    <h2>Choisir un {title}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="popup-asset-grid">
                    {assetNames.map((name) => {
                        const imagePath = assetMap[name];
                        
                        return (
                            <div 
                                key={name} 
                                className="asset-card popup-asset-card" 
                                onClick={() => handleAssetClick(name)}
                            >
                                {imagePath ? (
                                    <img 
                                        src={imagePath} 
                                        alt={name} 
                                        className="asset-image-preview" 
                                        // S'assurer que le fond est bien cover/contain
                                        style={type === 'background' ? { objectFit: 'cover', width: '100%', height: '100%' } : {}}
                                    />
                                ) : (
                                    <span className="asset-name-fallback">{name}</span>
                                )}
                                <span className="asset-name">{name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AssetPopup;
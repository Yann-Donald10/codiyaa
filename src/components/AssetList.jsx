import React, { useState } from "react";
import AssetPopup from './AssetPopup';
import PlusIcon from "../assets/images/addproject.png";

export default function AssetList({ 
  selectedSprite, selectedBackground, 
  onSpriteSelect, onBackgroundSelect,
  allIconAssets, allDecorAssets, // Liste de tous les noms (Person, Robot, etc.)
  iconAssetMap, decorAssetMap
  }) 
{
  //etat des pop-up
const [isIconPopupOpen, setIsIconPopupOpen] = useState(false);
const [isDecorPopupOpen, setIsDecorPopupOpen] = useState(false);

  // Par exemple, si vous affichez 4 cartes + le bouton Plus, la limite est 4.
const MAX_DISPLAY_COUNT = 2; // Affichons jusqu'à 4 cartes d'assets

// Les listes complètes d'assets disponibles
const totalAvailableIcons = allIconAssets.length;
const totalAvailableDecors = allDecorAssets.length;

// Déterminer les listes à afficher
// 🛑 IMPORTANT : Nous utilisons slice(0, MAX_DISPLAY_COUNT) pour contraindre l'affichage
const displayedIcons = Array.from(new Set([selectedSprite, ...allIconAssets])).slice(0, MAX_DISPLAY_COUNT);
const displayedBackgrounds = Array.from(new Set([selectedBackground, ...allDecorAssets])).slice(0, MAX_DISPLAY_COUNT);

// Déterminer si le bouton "Plus" est affiché
const showIconPlusButton = totalAvailableIcons > MAX_DISPLAY_COUNT;
const showDecorPlusButton = totalAvailableDecors > MAX_DISPLAY_COUNT;

  const renderAsset = (name, type, isSelected, onClick) => {
        // Déterminer la map et le chemin d'accès
        const assetMap = (type === 'icon') ? iconAssetMap : decorAssetMap;
        const imagePath = assetMap[name]; // Ex: iconAssetMap['Person'] donne le chemin réel
        return (
        <div 
          key={name} 
          className={`asset-card ${isSelected ? 'selected' : ''}`}
          onClick={() => onClick(name)}
        >
          {/* 🚀 Remplacer le nom par l'image */}
          {imagePath ? (
            <img 
              src={imagePath} 
              alt={name} 
              className="asset-image-preview"
            />) : (
              name // Fallback au nom si le chemin n'est pas trouvé
          )}
        </div>
      );
  };

  return (
    <div className="assets-wrapper">
    {/* 1. Section icônes (Sprites) */}
      <div className="assets-sidebar">
        <div className="assets-list">
          {displayedIcons.map((name) =>
          renderAsset(
            name, 
            'icon', 
            name === selectedSprite,
            onSpriteSelect
          )
          )}
          {/* Bouton Plus */}
          {showIconPlusButton && (
            <div className="asset-card plus-btn" onClick={() => setIsIconPopupOpen(true)}>
              <img src={PlusIcon} alt="More" style={{ width: '5rem' }} />
            </div>
          )}
        </div>
      </div>

      {/* 2. Section décors */}
      <div className="assets-sidebar">
        <div className="assets-list">
          {displayedBackgrounds.map((name) => 
            renderAsset(
              name, 
              'background',
              name === selectedBackground,
              onBackgroundSelect
            )
            )}
          {/* Bouton Plus */}
          {showDecorPlusButton && (
            <div className="asset-card plus-btn" onClick={() => setIsDecorPopupOpen(true)}>
              <img src={PlusIcon} alt="More" style={{ width: '5rem' }} />
            </div>
          )}
        </div>
      </div>
      <AssetPopup
        isOpen={isIconPopupOpen}
        onClose={() => setIsIconPopupOpen(false)}
        title="Icône"
        assetNames={allIconAssets}
        assetMap={iconAssetMap}
        onSelect={onSpriteSelect} // 🛑 onSpriteSelect (handleSpriteAddOrSelect) pour l'ajout
        type="icon"
      />

      <AssetPopup
        isOpen={isDecorPopupOpen}
        onClose={() => setIsDecorPopupOpen(false)}
        title="Décor"
        assetNames={allDecorAssets}
        assetMap={decorAssetMap}
        onSelect={onBackgroundSelect} // 🛑 onBackgroundSelect (handleBackgroundSelect) pour la sélection unique
        type="background"
      />
    </div>
  );
}

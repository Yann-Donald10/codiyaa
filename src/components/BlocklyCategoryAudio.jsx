import * as Blockly from "blockly/core";


export function setupBlocklyCategoryAudio(workspace) {
  let audioRef = null;

  const handleCategorySelected = (categoryName) => {
    const audioMap = {
      "Événements": "/sounds/types/evenements.mp3",
      "Mouvement": "/sounds/types/mouvement.mp3",
      "Opérations": "/sounds/types/operations.mp3",
      "Son": "/sounds/types/son.mp3",
      "Conditions": "/sounds/types/conditions.mp3"
    };

    const src = audioMap[categoryName];
    if (!src) return;

    // Stop audio précédent
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }

    audioRef = new Audio(src);
    audioRef.play().catch(err => console.warn(err));
  };

  // Blockly émet cet event quand une catégorie est ouverte
  const listener = workspace.addChangeListener((event) => {
    if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
      handleCategorySelected(event.name);
    }
  });

  // Cleanup
  return () => {
    workspace.removeChangeListener(listener);
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
  };
}

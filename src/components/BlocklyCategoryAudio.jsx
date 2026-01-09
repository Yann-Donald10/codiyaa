import * as Blockly from "blockly/core";


export function setupBlocklyCategoryAudio(workspace, audioEnabled = true) {
  let audioRef = null;

  const handleCategorySelected = (categoryName) => {
    if (!audioEnabled) return; // Si audio désactivé, ne pas jouer
    
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
    console.log(`🔊 Son joué pour: ${categoryName} (${src})`);
    audioRef.play().catch(err => console.warn(err));
  };

  const handleBlockSelected = (blockType) => {
    if (!audioEnabled) return; // Si audio désactivé, ne pas jouer
    
    const blockAudioMap = {
      "event_start": "/sounds/types/evenements.mp3",
      "event_stop": "/sounds/types/evenements.mp3",
      "event_change_sprite": "/sounds/types/evenements.mp3",
      "event_change_background": "/sounds/types/evenements.mp3",
      "move_forward": "/sounds/types/mouvement.mp3",
      "move_backward": "/sounds/types/mouvement.mp3",
      "turn_right": "/sounds/types/mouvement.mp3",
      "turn_left": "/sounds/types/mouvement.mp3",
      "go_to": "/sounds/types/mouvement.mp3",
      "op_add": "/sounds/types/operations.mp3",
      "op_sub": "/sounds/types/operations.mp3",
      "op_compare": "/sounds/types/operations.mp3",
      "sound_play": "/sounds/types/son.mp3",
      "sound_stop_all": "/sounds/types/son.mp3",
      "ctrl_if": "/sounds/types/conditions.mp3",
      "ctrl_repeat": "/sounds/types/conditions.mp3"
    };

    const src = blockAudioMap[blockType];
    if (!src) return;

    // Stop audio précédent
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }

    audioRef = new Audio(src);
    console.log(`🔊 Son bloc joué pour: ${blockType} (${src})`);
    audioRef.play().catch(err => console.warn(err));
  };

  // Listener pour sélection de catégorie
  const categoryListener = workspace.addChangeListener((event) => {
    if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
      const categoryName = event.newItem;
      console.log("✅ Catégorie sélectionnée:", categoryName);
      if (categoryName) {
        handleCategorySelected(categoryName);
      }
    }
  });

  // Listener pour sélection de bloc
  const blockListener = workspace.addChangeListener((event) => {
    if (event.type === "selected") {
      const blockId = event.newElementId; // C'est newElementId, pas blockId !
      if (!blockId) return;
      const block = workspace.getBlockById(blockId);
      if (block) {
        console.log("✅ Bloc sélectionné:", block.type);
        handleBlockSelected(block.type);
      }
    }
  });

  // Cleanup
  return () => {
    workspace.removeChangeListener(categoryListener);
    workspace.removeChangeListener(blockListener);
    if (audioRef) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
  };
}

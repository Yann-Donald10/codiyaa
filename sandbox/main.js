// sandbox/main.js

// 0) init motifs + extensions + hook renderer
initCodiyaaMotifs(Blockly, {
  bandH: 20,
  tileW: 140,
  tileH: 40,
  opacity: 1
});

// 1) Enregistrer tous les blocs
registerEventBlocks(Blockly);
registerMovementBlocks(Blockly);
registerOperationBlocks(Blockly);
registerSoundBlocks(Blockly);
registerConditionBlocks(Blockly);

// 2) Injecter Blockly
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: getToolbox(),
  trashcan: true,
  grid: { spacing: 20, length: 3, colour: "#ddd", snap: true },
  zoom: { controls: true, wheel: true }
});

window.__workspace = workspace;

// sandbox/main.js

// 1) importer les fichiers (simple en dev : on les charge via <script>)
// Donc dans main.js on suppose qu'ils existent en global.
// -> Solution simple : on met aussi <script src="./blocks/movement.js"></script> etc.
// (je te donne juste après)

// 1) Enregistrer tous les blocs (1 fichier = 1 fonction)
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

// (option) rendre accessible pour debug
window.__workspace = workspace;



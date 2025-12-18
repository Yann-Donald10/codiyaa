function registerSoundBlocks(Blockly) {
  Blockly.defineBlocksWithJsonArray([
    {
      type: "sound_play",
      message0: "🔊 %1",
      args0: [{
        type: "field_dropdown",
        name: "SOUND",
        options: [["tam-tam","tamtam"],["hymne","anthem"],["animal","animal"]]
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "#F59E0B"
    },
    {
      type: "sound_stop_all",
      message0: "🔇",
      previousStatement: null,
      nextStatement: null,
      colour: "#F59E0B"
    }
  ]);
}

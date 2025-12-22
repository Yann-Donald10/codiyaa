function registerMovementBlocks(Blockly) {
  Blockly.defineBlocksWithJsonArray([
    {
      type: "move_forward",
      message0: "→ %1",
      args0: [{ type: "field_number", name: "STEPS", value: 10, min: 1, max: 999 }],
      previousStatement: null,
      nextStatement: null,
      colour: "#C9A227"
    },
    {
      type: "move_backward",
      message0: "← %1",
      args0: [{ type: "field_number", name: "STEPS", value: 10, min: 1, max: 999 }],
      previousStatement: null,
      nextStatement: null,
      colour: "#C9A227"
    },
    {
      type: "turn_right",
      message0: "↻ %1",
      args0: [{
        type: "field_dropdown",
        name: "ANGLE",
        options: [["15°","15"],["30°","30"],["45°","45"],["90°","90"]]
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "#C9A227"
    },
    {
      type: "turn_left",
      message0: "↺ %1",
      args0: [{
        type: "field_dropdown",
        name: "ANGLE",
        options: [["15°","15"],["30°","30"],["45°","45"],["90°","90"]]
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "#C9A227"
    },
    {
      type: "go_to",
      message0: "◎ %1",
      args0: [{
        type: "field_dropdown",
        name: "TARGET",
        options: [["A","A"],["B","B"],["C","C"]]
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "#C9A227"
    }
  ]);
}

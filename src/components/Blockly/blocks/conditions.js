export function registerConditionBlocks(Blockly) {
  Blockly.defineBlocksWithJsonArray([
    {
      type: "ctrl_if",
      message0: "if %1 do %2",
      args0: [
        { type: "input_value", name: "COND", check: "Boolean" },
        { type: "input_statement", name: "DO" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#C2410C"
    },
    {
      type: "ctrl_repeat",
      message0: "repeat %1 do %2",
      args0: [
        { type: "field_number", name: "N", value: 3, min: 1, max: 50 },
        { type: "input_statement", name: "DO" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#C2410C"
    }
  ]);
}

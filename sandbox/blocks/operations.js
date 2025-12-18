function registerOperationBlocks(Blockly) {
  Blockly.defineBlocksWithJsonArray([
    {
      type: "op_add",
      message0: "+ %1 %2",
      args0: [
        { type: "input_value", name: "A" },
        { type: "input_value", name: "B" }
      ],
      output: "Number",
      colour: "#F6D365"
    },
    {
      type: "op_sub",
      message0: "− %1 %2",
      args0: [
        { type: "input_value", name: "A" },
        { type: "input_value", name: "B" }
      ],
      output: "Number",
      colour: "#F6D365"
    },
    {
      type: "op_compare",
      message0: "≷ %1 %2",
      args0: [
        { type: "input_value", name: "A" },
        { type: "input_value", name: "B" }
      ],
      output: "Boolean",
      colour: "#F6D365"
    }
  ]);
}

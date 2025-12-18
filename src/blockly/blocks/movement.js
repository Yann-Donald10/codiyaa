import * as Blockly from "blockly";

Blockly.Blocks["move_forward"] = {
  init() {
    this.setColour("#C9A227");
    this.setPreviousStatement(true);
    this.setNextStatement(true);

    // icône (tu la mets après, sinon ça casse pas)
    this.appendDummyInput()
      .appendField("➡️") // TEMPORAIRE (juste pour tester)
      .appendField(new Blockly.FieldDropdown([
        ["1", "1"],
        ["2", "2"],
        ["5", "5"],
        ["10", "10"],
      ]), "STEP");

    this.setTooltip("Avancer");
  },
};

// Bloc événement "début de scène" (version minimale)
Blockly.Blocks["event_start_scene"] = {
  init() {
    this.setColour("#F3E7C7");
    this.setNextStatement(true);
    this.appendDummyInput().appendField("▶️"); // TEMPORAIRE
  },
};

Blockly.Blocks["event_stop"] = {
  init() {
    this.setColour("#F3E7C7");
    this.setPreviousStatement(true);
    this.appendDummyInput().appendField("⏹️"); // TEMPORAIRE
  },
};

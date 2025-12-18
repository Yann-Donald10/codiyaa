import * as Blockly from "blockly";

Blockly.Blocks["event_start"] = {
  init: function () {
    this.setNextStatement(true, null);   // start => pas de femelle au-dessus
    this.setColour("#FFF1D6");           // crème (ta couleur events)
    this.appendDummyInput().appendField("▶"); // placeholder icône (temp)
  },
};

Blockly.Blocks["event_stop"] = {
  init: function () {
    this.setPreviousStatement(true, null); // stop => femelle au-dessus
    this.setColour("#FFF1D6");
    this.appendDummyInput().appendField("■");
  },
};

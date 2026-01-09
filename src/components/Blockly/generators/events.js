// eventGenerators.js
import { javascriptGenerator } from "blockly/javascript";

export function registerEventGenerators() {

  // START = point d'entrée visuel seulement
  javascriptGenerator.forBlock["event_start"] = function () {
    return "";
  };

  javascriptGenerator.forBlock["event_stop"] = function (block) {
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); api.stopProgram();\n`;
  };

  javascriptGenerator.forBlock["event_change_sprite"] = function (block) {
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); api.changeSprite();\n`;
  };

  javascriptGenerator.forBlock["event_change_background"] = function (block) {
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); api.changeBackground();\n`;
  };
}

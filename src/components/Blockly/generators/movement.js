import { javascriptGenerator } from "blockly/javascript";

export function registerMovementGenerators() {
  javascriptGenerator.forBlock['move_forward'] = function (block) {
    const steps = block.getFieldValue('STEPS') || 10;
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); await api.moveForward(${steps});\n`;
  };

  javascriptGenerator.forBlock['move_backward'] = function (block) {
    const steps = block.getFieldValue('STEPS') || 10;
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); await api.moveBackward(${steps});\n`;
  };

  javascriptGenerator.forBlock['turn_right'] = function (block) {
    const angle = block.getFieldValue('ANGLE') || 90;
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); await api.turnRight(${angle});\n`;
  };

  javascriptGenerator.forBlock['turn_left'] = function (block) {
    const angle = block.getFieldValue('ANGLE') || 90;
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); await api.turnLeft(${angle});\n`;
  };

  javascriptGenerator.forBlock['go_to'] = function (block) {
    const target = block.getFieldValue('TARGET') || "A";
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); await api.goTo("${target}");\n`;
  };
}
// Usage: Call registerMovementGenerators() during Blockly initialization to set up the custom generators.
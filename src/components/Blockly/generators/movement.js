import { javascriptGenerator } from "blockly/javascript";
export function registerMovementGenerators(Blockly) {

  // ▶️ Avancer
  javascriptGenerator.forBlock['move_forward'] = function(block) {
    const steps = block.getFieldValue('STEPS');
    return `moveForward(${steps});\n`;
  };

  // ◀️ Reculer
  javascriptGenerator.forBlock['move_backward'] = function(block) {
    const steps = block.getFieldValue('STEPS');
    return `moveBackward(${steps});\n`;
  };

  // ↻ Tourner à droite
  javascriptGenerator.forBlock['turn_right'] = function(block) {
    const angle = block.getFieldValue('ANGLE');
    return `turnRight(${angle});\n`;
  };

  // ↺ Tourner à gauche
  javascriptGenerator.forBlock['turn_left'] = function(block) {
    const angle = block.getFieldValue('ANGLE');
    return `turnLeft(${angle});\n`;
  };

  // ◎ Aller à un point
  javascriptGenerator.forBlock['go_to'] = function(block) {
    const target = block.getFieldValue('TARGET');
    return `goTo("${target}");\n`;
  };
}

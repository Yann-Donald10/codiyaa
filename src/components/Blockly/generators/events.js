import { javascriptGenerator } from "blockly/javascript";
const originalScrub = javascriptGenerator.scrub_;

javascriptGenerator.scrub_ = function(block, code, thisOnly) {
  // 🚫 Empêche Blockly d'ajouter automatiquement le next pour event_start
  if (block.type === 'event_start') {
    return code;
  }
  return originalScrub.call(this, block, code, thisOnly);
};
export function registerEventGenerators(Blockly) {

javascriptGenerator.forBlock['event_start'] = function(block) {
  // Génère seulement le code du bloc lui-même, Blockly s'occupe du next
  const code = javascriptGenerator.statementToCode(block, 'NEXT');
  return `onStart(() => {\n${code}});\n`;
};


  javascriptGenerator.forBlock['event_stop'] = function() {
    return `stopProgram();\n`;
  };

  javascriptGenerator.forBlock['event_change_sprite'] = function() {
    return `changeSprite();\n`;
  };

  javascriptGenerator.forBlock['event_change_background'] = function() {
    return `changeBackground();\n`;
  };
}

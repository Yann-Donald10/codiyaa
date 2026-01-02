import { javascriptGenerator } from "blockly/javascript";
export function registerSoundGenerators(Blockly) {

  javascriptGenerator.forBlock['sound_play'] = function(block) {
    const sound = block.getFieldValue('SOUND');
    return `playSound("${sound}");\n`;
  };

  javascriptGenerator.forBlock['sound_stop_all'] = function() {
    return `stopAllSounds();\n`;
  };
}

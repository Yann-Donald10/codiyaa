import { javascriptGenerator } from "blockly/javascript";

export function registerSoundGenerators() {

  javascriptGenerator.forBlock['sound_play'] = block => {
    const name = block.getFieldValue('SOUND');
    return `await api.playSound("${name}");\n`;
  };

  javascriptGenerator.forBlock['sound_stop_all'] = function () {
    return `await api.stopProgram();\n`;
  };
}

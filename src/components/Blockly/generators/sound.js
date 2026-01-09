import { javascriptGenerator } from "blockly/javascript";

export function registerSoundGenerators() {

  javascriptGenerator.forBlock['sound_play'] = block => {
    const name = block.getFieldValue('SOUND');
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); await api.playSound("${name}");\n`;
  };

  javascriptGenerator.forBlock['sound_stop_all'] = function (block) {
    const blockId = block.id;
    return `api.highlightBlock('${blockId}'); await api.stopProgram();\n`;
  };
}

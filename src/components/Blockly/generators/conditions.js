import { javascriptGenerator } from "blockly/javascript";

export function registerConditionGenerators() {

  javascriptGenerator.forBlock['ctrl_if'] = function (block) {
    const blockId = block.id;
    const condition =
      javascriptGenerator.valueToCode(block, 'COND', javascriptGenerator.ORDER_NONE) || 'false';

    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `api.highlightBlock('${blockId}'); if (${condition}) {\n${statements}}\n`;
  };

  javascriptGenerator.forBlock['ctrl_repeat'] = function (block) {
  const blockId = block.id;
  const times = block.getFieldValue('N') || 1;
  const statements = javascriptGenerator.statementToCode(block, 'DO');

  return `api.highlightBlock('${blockId}'); for (let i = 0; i < ${times}; i++) {\n${statements}}\n`;
};
}

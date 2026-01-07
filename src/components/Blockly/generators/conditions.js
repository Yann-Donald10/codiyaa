import { javascriptGenerator } from "blockly/javascript";

export function registerConditionGenerators() {

  javascriptGenerator.forBlock['ctrl_if'] = function (block) {
    const condition =
      javascriptGenerator.valueToCode(block, 'COND', javascriptGenerator.ORDER_NONE) || 'false';

    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `if (${condition}) {\n${statements}}\n`;
  };

  javascriptGenerator.forBlock['ctrl_repeat'] = function (block) {
    const times =
      javascriptGenerator.valueToCode(block, 'N', javascriptGenerator.ORDER_NONE) || 1;

    const statements = javascriptGenerator.statementToCode(block, 'DO');
    return `for (let i = 0; i < ${times}; i++) {\n${statements}}\n`;
  };
}

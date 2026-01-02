import { javascriptGenerator } from "blockly/javascript";
export function registerOperationGenerators(Blockly) {

  javascriptGenerator.forBlock['op_add'] = function(block) {
    const A = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_ADDITION) || 0;
    const B = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_ADDITION) || 0;
    return [`(${A} + ${B})`, javascriptGenerator.ORDER_ADDITION];
  };

  javascriptGenerator.forBlock['op_sub'] = function(block) {
    const A = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_SUBTRACTION) || 0;
    const B = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_SUBTRACTION) || 0;
    return [`(${A} - ${B})`, javascriptGenerator.ORDER_SUBTRACTION];
  };

  javascriptGenerator.forBlock['op_compare'] = function(block) {
    const A = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_RELATIONAL) || 0;
    const B = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_RELATIONAL) || 0;
    return [`(${A} > ${B})`, javascriptGenerator.ORDER_RELATIONAL];
  };
}

// sandbox/blocks/operations.js
// Opérations (Codiyaa) — sockets vides + icône opérateur au centre

function registerOperationBlocks(Blockly) {
  const svgToDataUri = (svg) =>
    "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());

  const BROWN = "#3A1D0B";
  const OPS_COLOR = "#F6D365";

  function makeOpIcon(symbol) {
    return svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" fill="rgba(58,29,11,0.18)"/>
        <text x="22" y="28" text-anchor="middle"
              font-family="system-ui, Arial" font-size="22" font-weight="800"
              fill="${BROWN}">${symbol}</text>
      </svg>
    `);
  }

  const ICON_PLUS  = makeOpIcon("+");
  const ICON_MINUS = makeOpIcon("−");
  const ICON_GT    = makeOpIcon(">");
  const ICON_LT    = makeOpIcon("<");

  // --- Bloc "Nombre" à clipser dans les cases (l'enfant tape dedans)
  Blockly.defineBlocksWithJsonArray([
    {
      type: "codiyaa_number",
      message0: "%1",
      args0: [
        { type: "field_number", name: "NUM", value: 0 }
      ],
      output: "Number",
      colour: OPS_COLOR,
      inputsInline: true
    }
  ]);

  // --- Blocs opérations : 2 sockets vides + icône au centre
  Blockly.defineBlocksWithJsonArray([
    {
      type: "op_add",
      message0: "%1 %2 %3",
      args0: [
        { type: "input_value", name: "A", check: "Number" },
        { type: "field_image", src: ICON_PLUS, width: 22, height: 22, alt: "" },
        { type: "input_value", name: "B", check: "Number" }
      ],
      output: "Number",
      colour: OPS_COLOR,
      inputsInline: true
    },
    {
      type: "op_sub",
      message0: "%1 %2 %3",
      args0: [
        { type: "input_value", name: "A", check: "Number" },
        { type: "field_image", src: ICON_MINUS, width: 22, height: 22, alt: "" },
        { type: "input_value", name: "B", check: "Number" }
      ],
      output: "Number",
      colour: OPS_COLOR,
      inputsInline: true
    },
    {
      type: "op_gt",
      message0: "%1 %2 %3",
      args0: [
        { type: "input_value", name: "A", check: "Number" },
        { type: "field_image", src: ICON_GT, width: 22, height: 22, alt: "" },
        { type: "input_value", name: "B", check: "Number" }
      ],
      output: "Boolean",
      colour: OPS_COLOR,
      inputsInline: true
    },
    {
      type: "op_lt",
      message0: "%1 %2 %3",
      args0: [
        { type: "input_value", name: "A", check: "Number" },
        { type: "field_image", src: ICON_LT, width: 22, height: 22, alt: "" },
        { type: "input_value", name: "B", check: "Number" }
      ],
      output: "Boolean",
      colour: OPS_COLOR,
      inputsInline: true
    }
  ]);
}

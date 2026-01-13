// blocks/movement.js
// Blocs Mouvement – Design sandbox + compatibilité generators

export function registerMovementBlocks(Blockly) {

  /* =========================================================
     Helpers SVG → Data URI
     ========================================================= */
  const svgToDataUri = (svg) =>
    "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());

  /* =========================================================
     Icônes
     ========================================================= */
  const ICON_MINUS = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r="18" fill="rgba(58,29,11,0.14)"/>
      <rect x="13" y="20" width="18" height="4" rx="2" fill="#3A1D0B"/>
    </svg>
  `);

  const ICON_PLUS = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r="18" fill="rgba(58,29,11,0.14)"/>
      <rect x="13" y="20" width="18" height="4" rx="2" fill="#3A1D0B"/>
      <rect x="20" y="13" width="4" height="18" rx="2" fill="#3A1D0B"/>
    </svg>
  `);

  const ICON_ARROW_FWD = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M10 22 H34" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M28 12 L40 22 L28 32" fill="none" stroke="#3A1D0B" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_ARROW_BWD = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M42 22 H18" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M24 12 L12 22 L24 32" fill="none" stroke="#3A1D0B" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_TURN_RIGHT = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M18 32 C30 32, 34 26, 34 18" fill="none" stroke="#3A1D0B"
            stroke-width="5" stroke-linecap="round"/>
      <path d="M34 18 L26 18" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 18 L34 26" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 18 L42 26" fill="none" stroke="#3A1D0B"
            stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_TURN_LEFT = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M34 32 C22 32, 18 26, 18 18" fill="none" stroke="#3A1D0B"
            stroke-width="5" stroke-linecap="round"/>
      <path d="M18 18 L26 18" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M18 18 L18 26" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M18 18 L10 26" fill="none" stroke="#3A1D0B"
            stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  // 🆕 UP / DOWN
  const ICON_ARROW_UP = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M26 34 V14" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M16 20 L26 10 L36 20" fill="none"
            stroke="#3A1D0B" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_ARROW_DOWN = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M26 10 V30" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M16 24 L26 34 L36 24" fill="none"
            stroke="#3A1D0B" stroke-width="5"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  /* =========================================================
     Champs custom
     ========================================================= */
  if (!Blockly.FieldCodiyaaStepper) {
    class FieldCodiyaaStepper extends Blockly.FieldNumber {
      constructor(value = 10, min = 1, max = 999, precision = 1) {
        super(value, min, max, precision);
      }
      showEditor_() {}
      bump(delta) {
        this.setValue((Number(this.getValue()) || 0) + delta);
      }
    }
    Blockly.FieldCodiyaaStepper = FieldCodiyaaStepper;
  }

  if (!Blockly.FieldCodiyaaAngle) {
    class FieldCodiyaaAngle extends Blockly.FieldLabelSerializable {
      constructor(value = "90") {
        super(String(value));
        this.ANGLES = [15, 30, 45, 60, 90, 120, 180];
      }
      showEditor_() {}
      bump(delta) {
        const cur = Number(this.getValue()) || 90;
        const i = this.ANGLES.indexOf(cur);
        const next = (i + delta + this.ANGLES.length) % this.ANGLES.length;
        this.setValue(String(this.ANGLES[next]));
      }
    }
    Blockly.FieldCodiyaaAngle = FieldCodiyaaAngle;
  }

  /* =========================================================
     Helpers UI
     ========================================================= */
  const icon = (src, alt) => new Blockly.FieldImage(src, 26, 22, alt);
  const minus = (cb) => new Blockly.FieldImage(ICON_MINUS, 22, 22, "−", cb);
  const plus  = (cb) => new Blockly.FieldImage(ICON_PLUS, 22, 22, "+", cb);

  /* =========================================================
     BLOCS
     ========================================================= */

  const makeMoveBlock = (type, iconSrc, label) => {
    Blockly.Blocks[type] = {
      init() {
        this.setColour("#F6D365");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);

        const steps = new Blockly.FieldCodiyaaStepper(10);

        this.appendDummyInput()
          .appendField(icon(iconSrc, label))
          .appendField(minus(() => steps.bump(-1)))
          .appendField(steps, "STEPS")
          .appendField(plus(() => steps.bump(1)));
      },
    };
  };

  makeMoveBlock("move_forward",  ICON_ARROW_FWD,  "avancer");
  makeMoveBlock("move_backward", ICON_ARROW_BWD,  "reculer");
  makeMoveBlock("move_up",       ICON_ARROW_UP,   "monter");
  makeMoveBlock("move_down",     ICON_ARROW_DOWN, "descendre");

  Blockly.Blocks["turn_right"] = {
    init() {
      this.setColour("#F6D365");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const angle = new Blockly.FieldCodiyaaAngle("90");

      this.appendDummyInput()
        .appendField(icon(ICON_TURN_RIGHT, "droite"))
        .appendField(minus(() => angle.bump(-1)))
        .appendField(angle, "ANGLE")
        .appendField("°")
        .appendField(plus(() => angle.bump(1)));
    },
  };

  Blockly.Blocks["turn_left"] = {
    init() {
      this.setColour("#F6D365");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const angle = new Blockly.FieldCodiyaaAngle("90");

      this.appendDummyInput()
        .appendField(icon(ICON_TURN_LEFT, "gauche"))
        .appendField(minus(() => angle.bump(-1)))
        .appendField(angle, "ANGLE")
        .appendField("°")
        .appendField(plus(() => angle.bump(1)));
    },
  };

  Blockly.defineBlocksWithJsonArray([
    {
      type: "go_to",
      message0: "◎ %1",
      args0: [{
        type: "field_dropdown",
        name: "TARGET",
        options: [["A","A"],["B","B"],["C","C"]],
      }],
      previousStatement: null,
      nextStatement: null,
      colour: "#F6D365",
      inputsInline: true,
    }
  ]);
}

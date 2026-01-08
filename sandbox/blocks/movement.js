// sandbox/blocks/movement.js
// Blocs Mouvement (Codiyaa) — + / valeur / - (sans saisie clavier)

function registerMovementBlocks(Blockly) {
  // ---------- Helpers ----------
  const svgToDataUri = (svg) =>
    "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());

  // Icônes + / -
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

  // Flèches avance/recul
  const ICON_ARROW_FWD = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M10 22 H34" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M28 12 L40 22 L28 32" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_ARROW_BWD = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M42 22 H18" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M24 12 L12 22 L24 32" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  // Rotation droite / gauche (icônes propres)
  const ICON_TURN_RIGHT = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M18 32 C30 32, 34 26, 34 18" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 18 L26 18" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 18 L34 26" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M34 18 L42 26" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_TURN_LEFT = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M34 32 C22 32, 18 26, 18 18" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M18 18 L26 18" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M18 18 L18 26" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M18 18 L10 26" fill="none" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_ARROW_UP = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M26 34 V14" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M16 20 L26 10 L36 20"
        fill="none"
        stroke="#3A1D0B"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"/>
    </svg>
  `);

  const ICON_ARROW_DOWN = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="44" viewBox="0 0 52 44">
      <path d="M26 10 V30" stroke="#3A1D0B" stroke-width="5" stroke-linecap="round"/>
      <path d="M16 24 L26 34 L36 24"
        fill="none"
        stroke="#3A1D0B"
        stroke-width="5"
        stroke-linecap="round"
        stroke-linejoin="round"/>
    </svg>
  `);




  function makeMinus(onClick) {
    return new Blockly.FieldImage(ICON_MINUS, 22, 22, "−", onClick);
  }
  function makePlus(onClick) {
    return new Blockly.FieldImage(ICON_PLUS, 22, 22, "+", onClick);
  }
  function makeIcon(src, alt) {
    return new Blockly.FieldImage(src, 26, 22, alt);
  }

  // ---------- Stepper "pas" (nombre) : affiché, pas éditable ----------
  if (!Blockly.FieldCodiyaaStepper) {
    class FieldCodiyaaStepper extends Blockly.FieldNumber {
      constructor(value = 1, min = 1, max = 999, precision = 1) {
        super(value, min, max, precision);
      }
      showEditor_() {} // pas d'édition clavier
      bump(delta) {
        const cur = Number(this.getValue()) || 0;
        this.setValue(cur + delta);
      }
    }
    Blockly.FieldCodiyaaStepper = FieldCodiyaaStepper;
  }

  // ---------- Stepper "angle" (liste discrète) ----------
  if (!Blockly.FieldCodiyaaAngle) {
    class FieldCodiyaaAngle extends Blockly.FieldLabelSerializable {
      constructor(value = "90") {
        super(String(value));
        this.ANGLES = [15, 30, 45, 60, 90, 120, 180];
      }
      showEditor_() {} // pas de saisie
      getValue() {
        return String(super.getValue());
      }
      setValue(newValue) {
        super.setValue(String(newValue));
      }
      bump(delta) {
        const cur = Number(this.getValue()) || 90;
        const idx = this.ANGLES.indexOf(cur);
        const start = idx >= 0 ? idx : this.ANGLES.indexOf(90);
        const nextIdx = (start + delta + this.ANGLES.length) % this.ANGLES.length;
        this.setValue(this.ANGLES[nextIdx]);
      }
    }
    Blockly.FieldCodiyaaAngle = FieldCodiyaaAngle;
  }

  // ---------- Blocs ----------
  Blockly.Blocks["move_forward"] = {
    init: function () {
      this.setColour("#C9A227");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const steps = new Blockly.FieldCodiyaaStepper(10, 1, 999, 1);

      this.appendDummyInput()
        .appendField(makeIcon(ICON_ARROW_FWD, "avancer"))
        .appendField(makeMinus(() => steps.bump(-1)))
        .appendField(steps, "STEPS")
        .appendField(makePlus(() => steps.bump(+1)));

      this.extensions = ["codiyaa_pattern_movement"];
    },
  };

  Blockly.Blocks["move_backward"] = {
    init: function () {
      this.setColour("#C9A227");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const steps = new Blockly.FieldCodiyaaStepper(10, 1, 999, 1);

      this.appendDummyInput()
        .appendField(makeIcon(ICON_ARROW_BWD, "reculer"))
        .appendField(makeMinus(() => steps.bump(-1)))
        .appendField(steps, "STEPS")
        .appendField(makePlus(() => steps.bump(+1)));

      this.extensions = ["codiyaa_pattern_movement"];
    },
  };

  Blockly.Blocks["turn_right"] = {
    init: function () {
      this.setColour("#C9A227");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const angle = new Blockly.FieldCodiyaaAngle("90");

      this.appendDummyInput()
        .appendField(makeIcon(ICON_TURN_RIGHT, "tourner droite"))
        .appendField(makeMinus(() => angle.bump(-1)))
        .appendField(angle, "ANGLE")
        .appendField("°")
        .appendField(makePlus(() => angle.bump(+1)));

      this.extensions = ["codiyaa_pattern_movement"];
    },
  };

  Blockly.Blocks["turn_left"] = {
    init: function () {
      this.setColour("#C9A227");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const angle = new Blockly.FieldCodiyaaAngle("90");

      this.appendDummyInput()
        .appendField(makeIcon(ICON_TURN_LEFT, "tourner gauche"))
        .appendField(makeMinus(() => angle.bump(-1)))
        .appendField(angle, "ANGLE")
        .appendField("°")
        .appendField(makePlus(() => angle.bump(+1)));

      this.extensions = ["codiyaa_pattern_movement"];
    },
  };


    Blockly.Blocks["move_up"] = {
    init: function () {
      this.setColour("#C9A227");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const steps = new Blockly.FieldCodiyaaStepper(10, 1, 999, 1);

      this.appendDummyInput()
        .appendField(makeIcon(ICON_ARROW_UP, "monter"))
        .appendField(makeMinus(() => steps.bump(-1)))
        .appendField(steps, "STEPS")
        .appendField(makePlus(() => steps.bump(+1)));

      this.extensions = ["codiyaa_pattern_movement"];
    }
  };

  Blockly.Blocks["move_down"] = {
    init: function () {
      this.setColour("#C9A227");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setInputsInline(true);

      const steps = new Blockly.FieldCodiyaaStepper(10, 1, 999, 1);

      this.appendDummyInput()
        .appendField(makeIcon(ICON_ARROW_DOWN, "descendre"))
        .appendField(makeMinus(() => steps.bump(-1)))
        .appendField(steps, "STEPS")
        .appendField(makePlus(() => steps.bump(+1)));

      this.extensions = ["codiyaa_pattern_movement"];
    }
  };


  // go_to inchangé
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
      colour: "#C9A227",
      inputsInline: true,
      extensions: ["codiyaa_pattern_movement"],
    },
  ]);
}

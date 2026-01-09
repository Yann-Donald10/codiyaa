// sandbox/blocks/sound.js
// Blocs Son (Codiyaa) — dropdown visuel (icônes only) + menu horizontal
// FIX: fromJson + valeur par défaut + ne casse pas le drag (pas de capture pointer)

function registerSoundBlocks(Blockly) {
  const svgToDataUri = (svg) =>
    "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());

  const BROWN = "#3A1D0B";
  const ORANGE = "#F59E0B";

  // --- Icônes principales ---
  const ICON_SPEAKER = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="44" viewBox="0 0 54 44">
      <path d="M10 18 H18 L28 10 V34 L18 26 H10 Z" fill="${BROWN}"/>
      <path d="M34 16 Q40 22 34 28" fill="none" stroke="${BROWN}" stroke-width="4" stroke-linecap="round"/>
      <path d="M39 12 Q48 22 39 32" fill="none" stroke="${BROWN}" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `);

  const ICON_MUTED = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="44" viewBox="0 0 54 44">
      <path d="M10 18 H18 L28 10 V34 L18 26 H10 Z" fill="${BROWN}"/>
      <path d="M33 14 L47 30" stroke="${BROWN}" stroke-width="5" stroke-linecap="round"/>
      <path d="M47 14 L33 30" stroke="${BROWN}" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `);

  // --- Icônes du menu (3 sons) ---
  const ICON_ROOSTER = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
      <path d="M9 8c1-2 3-3 5-2 1 0 2 1 2 2 0 1-1 2-2 2" fill="none" stroke="${BROWN}" stroke-width="2" stroke-linecap="round"/>
      <path d="M7 10c-1 1-1 3 0 4 1 1 3 1 4 0" fill="none" stroke="${BROWN}" stroke-width="2" stroke-linecap="round"/>
      <path d="M11 14c1 1 3 2 5 1 2-1 2-3 1-5" fill="none" stroke="${BROWN}" stroke-width="2" stroke-linecap="round"/>
      <path d="M10 18v3M14 18v3" stroke="${BROWN}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="16.5" cy="8.5" r="0.9" fill="${BROWN}"/>
    </svg>
  `);

  const ICON_DRUM = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
      <ellipse cx="12" cy="7" rx="7" ry="3" fill="none" stroke="${BROWN}" stroke-width="2"/>
      <path d="M5 7v10c0 2 14 2 14 0V7" fill="none" stroke="${BROWN}" stroke-width="2"/>
      <path d="M7 5l-2-2M17 5l2-2" stroke="${BROWN}" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `);

  const ICON_FLAG = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
      <path d="M6 21V4" stroke="${BROWN}" stroke-width="2" stroke-linecap="round"/>
      <path d="M6 5c3-2 5 2 8 0s5 2 8 0v9c-3 2-5-2-8 0s-5-2-8 0" fill="none" stroke="${BROWN}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9 16c2 0 3 2 5 2" stroke="${BROWN}" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `);

  // CSS menu horizontal (scope: uniquement dropdown son)
  (function ensureSoundDropdownCss() {
    const id = "codiyaa-sound-dropdown-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      .blocklyDropDownDiv.codiyaa-sound-dropdown .blocklyMenu {
        display: flex !important;
        gap: 14px !important;
        padding: 10px 12px !important;
        align-items: center !important;
      }
      .blocklyDropDownDiv.codiyaa-sound-dropdown .blocklyMenuItem {
        padding: 0 !important;
        margin: 0 !important;
        background: transparent !important;
      }
      .blocklyDropDownDiv.codiyaa-sound-dropdown .blocklyMenuItemContent {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .blocklyDropDownDiv.codiyaa-sound-dropdown .blocklyMenuItem:hover {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
  })();

  // Field dropdown custom (icônes only) + tag CSS sans casser le drag
  if (!Blockly.FieldCodiyaaSoundDropdown) {
    class FieldCodiyaaSoundDropdown extends Blockly.FieldDropdown {
      constructor(value = "tamtam") {
        const options = [
          [{ src: ICON_ROOSTER, width: 28, height: 28, alt: "" }, "animal"],
          [{ src: ICON_DRUM, width: 28, height: 28, alt: "" }, "tamtam"],
          [{ src: ICON_FLAG, width: 28, height: 28, alt: "" }, "anthem"],
        ];
        super(options);
        this.setValue(value);
      }

      static fromJson(options) {
        return new FieldCodiyaaSoundDropdown(options?.value || "tamtam");
      }

      showEditor_() {
        super.showEditor_();

        // IMPORTANT: ne pas toucher aux events -> sinon "souris collée"
        setTimeout(() => {
          const contentDiv = Blockly.DropDownDiv.getContentDiv();
          const dropDownRoot = contentDiv && contentDiv.parentElement;
          if (!dropDownRoot) return;

          dropDownRoot.classList.add("codiyaa-sound-dropdown");
          Blockly.DropDownDiv.onHide(() => {
            dropDownRoot.classList.remove("codiyaa-sound-dropdown");
          });
        }, 0);
      }
    }

    Blockly.FieldCodiyaaSoundDropdown = FieldCodiyaaSoundDropdown;
    Blockly.fieldRegistry.register(
      "field_codiyaa_sound_dropdown",
      FieldCodiyaaSoundDropdown
    );
  }

  // Blocks
  Blockly.defineBlocksWithJsonArray([
    {
      type: "sound_play",
      message0: "%1 %2",
      args0: [
        { type: "field_image", src: ICON_SPEAKER, width: 26, height: 22, alt: "" },
        { type: "field_codiyaa_sound_dropdown", name: "SOUND", value: "tamtam" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ORANGE,
      inputsInline: true,
      extensions: ["codiyaa_pattern_sound"],
    },
    {
      type: "sound_stop_all",
      message0: "%1",
      args0: [
        { type: "field_image", src: ICON_MUTED, width: 26, height: 22, alt: "" },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ORANGE,
      inputsInline: true,
      extensions: ["codiyaa_pattern_sound"],
    },
  ]);
}

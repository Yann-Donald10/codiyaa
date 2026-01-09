export function registerSoundBlocks(Blockly) {
  const svgToDataUri = (svg) =>
    "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());

  const BROWN = "#3A1D0B";
  const ORANGE = "#F59E0B";

  /* =========================
     ICÔNES
  ========================= */

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

  const ICON_ROOSTER = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
      <path d="M9 8c1-2 3-3 5-2 1 0 2 1 2 2 0 1-1 2-2 2" fill="none" stroke="${BROWN}" stroke-width="2"/>
      <path d="M7 10c-1 1-1 3 0 4 1 1 3 1 4 0" fill="none" stroke="${BROWN}" stroke-width="2"/>
      <circle cx="16.5" cy="8.5" r="1" fill="${BROWN}"/>
    </svg>
  `);

  const ICON_DRUM = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
      <ellipse cx="12" cy="7" rx="7" ry="3" fill="none" stroke="${BROWN}" stroke-width="2"/>
      <path d="M5 7v10c0 2 14 2 14 0V7" fill="none" stroke="${BROWN}" stroke-width="2"/>
    </svg>
  `);

  const ICON_FLAG = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
      <path d="M6 21V4" stroke="${BROWN}" stroke-width="2"/>
      <path d="M6 5c3-2 5 2 8 0s5 2 8 0v9c-3 2-5-2-8 0s-5-2-8 0"
        fill="none" stroke="${BROWN}" stroke-width="2"/>
    </svg>
  `);

  /* =========================
     CSS dropdown horizontal
  ========================= */
  (function injectCss() {
    const id = "codiyaa-sound-css";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      .blocklyDropDownDiv.codiyaa-sound .blocklyMenu {
        display: flex !important;
        gap: 14px;
        padding: 10px 12px;
        align-items: center;
      }
      .blocklyDropDownDiv.codiyaa-sound .blocklyMenuItem {
        background: transparent !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      .blocklyDropDownDiv.codiyaa-sound .blocklyMenuItem:hover {
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
  })();

  /* =========================
     FIELD DROPDOWN CUSTOM
  ========================= */
  if (!Blockly.FieldCodiyaaSoundDropdown) {
    class FieldCodiyaaSoundDropdown extends Blockly.FieldDropdown {
      constructor(value = "tamtam") {
        super([
          [{ src: ICON_DRUM, width: 28, height: 28, alt: "" }, "tamtam"],
          [{ src: ICON_FLAG, width: 28, height: 28, alt: "" }, "anthem"],
          [{ src: ICON_ROOSTER, width: 28, height: 28, alt: "" }, "animal"],
        ]);
        this.setValue(value);
      }

      static fromJson(options) {
        return new FieldCodiyaaSoundDropdown(options?.value || "tamtam");
      }

      showEditor_() {
        super.showEditor_();

        // ⚠️ PAS de onHide (non supporté)
        setTimeout(() => {
          const root = Blockly.DropDownDiv.getContentDiv()?.parentElement;
          if (!root) return;
          root.classList.add("codiyaa-sound");
        }, 0);
      }
    }

    Blockly.FieldCodiyaaSoundDropdown = FieldCodiyaaSoundDropdown;
    Blockly.fieldRegistry.register(
      "field_codiyaa_sound_dropdown",
      FieldCodiyaaSoundDropdown
    );
  }

  /* =========================
     BLOCKS (generator-safe)
  ========================= */
  Blockly.defineBlocksWithJsonArray([
    {
      type: "sound_play",
      message0: "%1 %2",
      args0: [
        { type: "field_image", src: ICON_SPEAKER, width: 26, height: 22 },
        {
          type: "field_codiyaa_sound_dropdown",
          name: "SOUND",
          value: "tamtam",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ORANGE,
      inputsInline: true,
    },
    {
      type: "sound_stop_all",
      message0: "%1",
      args0: [
        { type: "field_image", src: ICON_MUTED, width: 26, height: 22 },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: ORANGE,
      inputsInline: true,
    },
  ]);
}

export function registerEventBlocks(Blockly) {
  // --- SVG icons (no external files) ---
  const svgToDataUri = (svg) =>
    "data:image/svg+xml;utf8," + encodeURIComponent(svg.trim());

  // PLAY (plein) - vert
  const ICON_PLAY = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="24" fill="#22C55E"/>
      <path d="M28 22 L28 42 L44 32 Z" fill="#FFFFFF"/>
    </svg>
  `);

  // STOP - rond rouge + carré (plein)
  const ICON_STOP = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="24" fill="#EF4444"/>
      <rect x="24" y="24" width="16" height="16" rx="3" fill="#FFFFFF"/>
    </svg>
  `);

  // Change sprite - 2 persos + flèche
  const ICON_SPRITE = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="88" height="44" viewBox="0 0 88 44">
      <rect width="88" height="44" fill="none"/>
      <!-- left stick -->
      <circle cx="18" cy="12" r="6" fill="#3A1D0B"/>
      <rect x="16" y="18" width="4" height="14" rx="2" fill="#3A1D0B"/>
      <rect x="12" y="24" width="12" height="3" rx="1.5" fill="#3A1D0B"/>
      <rect x="14" y="32" width="4" height="10" rx="2" fill="#3A1D0B"/>
      <rect x="20" y="32" width="4" height="10" rx="2" fill="#3A1D0B"/>

      <!-- arrow -->
      <path d="M36 22 C42 16, 46 16, 52 22" fill="none" stroke="#3A1D0B" stroke-width="3" stroke-linecap="round"/>
      <path d="M51 17 L56 22 L50 25" fill="none" stroke="#3A1D0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- right stick -->
      <circle cx="70" cy="12" r="6" fill="#3A1D0B"/>
      <rect x="68" y="18" width="4" height="14" rx="2" fill="#3A1D0B"/>
      <rect x="64" y="24" width="12" height="3" rx="1.5" fill="#3A1D0B"/>
      <rect x="66" y="32" width="4" height="10" rx="2" fill="#3A1D0B"/>
      <rect x="72" y="32" width="4" height="10" rx="2" fill="#3A1D0B"/>
    </svg>
  `);

  // Change background - petit paysage
  const ICON_BG = svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="44" viewBox="0 0 70 44">
      <rect x="2" y="6" width="66" height="36" rx="8" fill="none" stroke="#3A1D0B" stroke-width="3"/>
      <circle cx="18" cy="18" r="5" fill="#3A1D0B"/>
      <path d="M10 38 L28 22 L40 30 L50 20 L62 38" fill="none" stroke="#3A1D0B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `);

  Blockly.defineBlocksWithJsonArray([
    // START: pas de previous (pas d'encoche femelle en haut), next only
    {
      type: "event_start",
      message0: "%1",
      args0: [
        {
          type: "field_image",
          src: ICON_PLAY,
          width: 44,
          height: 44,
          alt: "start",
        },
      ],
      nextStatement: null,
      colour: "#F2E7D0",
      inputsInline: true,
    },

    // STOP: previous only (encoche femelle en haut), PAS de next
    {
      type: "event_stop",
      message0: "%1",
      args0: [
        {
          type: "field_image",
          src: ICON_STOP,
          width: 44,
          height: 44,
          alt: "stop",
        },
      ],
      previousStatement: null,
      colour: "#F2E7D0",
      inputsInline: true,
    },

    // Change sprite: previous + next
    {
      type: "event_change_sprite",
      message0: "%1",
      args0: [
        {
          type: "field_image",
          src: ICON_SPRITE,
          width: 88,
          height: 44,
          alt: "sprite",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#F2E7D0",
      inputsInline: true,
    },

    // Change background: previous + next
    {
      type: "event_change_background",
      message0: "%1",
      args0: [
        {
          type: "field_image",
          src: ICON_BG,
          width: 70,
          height: 44,
          alt: "background",
        },
      ],
      previousStatement: null,
      nextStatement: null,
      colour: "#F2E7D0",
      inputsInline: true,
    },
  ]);
}

export const toolboxConfig = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Événements",
      colour: "#FFF1D6",
      contents: [
        { kind: "block", type: "event_start" },
        { kind: "block", type: "event_stop" },
      ],
    },
    {
      kind: "category",
      name: "Mouvement",
      colour: "#C9A227",
      contents: [
        { kind: "block", type: "move_forward" },
      ],
    },
  ],
};

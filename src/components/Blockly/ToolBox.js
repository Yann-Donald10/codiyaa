export const toolboxJson = {
 kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Événements",
        colour: "#F6E7C8", // crème
        contents: [
          { kind: "block", type: "event_start" },
          { kind: "block", type: "event_stop" },
          { kind: "block", type: "event_change_sprite" },
          { kind: "block", type: "event_change_background" }
        ]
      },
      {
        kind: "category",
        name: "Mouvement",
        colour: "#C9A227", // jaune-or
        contents: [
          { kind: "block", type: "move_forward" },
          { kind: "block", type: "move_backward" },
          { kind: "block", type: "turn_right" },
          { kind: "block", type: "turn_left" },
          { kind: "block", type: "go_to" }
        ]
      },
      {
        kind: "category",
        name: "Opérations",
        colour: "#F6D365", // jaune plus clair (avant oranges)
        contents: [
          { kind: "block", type: "op_add" },
          { kind: "block", type: "op_sub" },
          { kind: "block", type: "op_compare" }
        ]
      },
      {
        kind: "category",
        name: "Son",
        colour: "#F59E0B", // orange clair
        contents: [
          { kind: "block", type: "sound_play" },
          { kind: "block", type: "sound_stop_all" }
        ]
      },
      {
        kind: "category",
        name: "Conditions",
        colour: "#C2410C", // orange foncé
        contents: [
          { kind: "block", type: "ctrl_if" },
          { kind: "block", type: "ctrl_repeat" }
        ]
      }
    ]
};
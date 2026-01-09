export const toolboxJson = {
 kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Événements",
        colour: "#F6E7C8", // crème
        icon: "event",
        contents: [
          { kind: "block", type: "event_start" },
          { kind: "block", type: "event_stop" },
          { kind: "block", type: "event_change_sprite" },
          //{ kind: "block", type: "event_change_background" }
        ]
      },
      {
        kind: "category",
        name: "Mouvement",
        colour: "#C9A227", // jaune-or
        icon: "movement",
        contents: [
          { kind: "block", type: "move_forward" },
          { kind: "block", type: "move_backward" },
          { kind: "block", type: "turn_right" },
          { kind: "block", type: "turn_left" },
          { kind: "block", type: "move_up" },
          { kind: "block", type: "move_down" },
          { kind: "block", type: "go_to" }
        ]
      },
      {
        kind: "category",
        name: "Opérations",
        colour: "#F6D365", // jaune plus clair (avant oranges)
        icon: "operation",
        contents: [
          { kind: "block", type: "codiyaa_number" },
          { kind: "block", type: "op_add" },
          { kind: "block", type: "op_sub" },
          { kind: "block", type: "op_gt" },
          { kind: "block", type: "op_lt" },
        ]
      },
      {
        kind: "category",
        name: "Son",
        colour: "#F59E0B", // orange clair
        icon: "sound",
        contents: [
          { kind: "block", type: "sound_play" },
          { kind: "block", type: "sound_stop_all" }
        ]
      },
      {
        kind: "category",
        name: "condition",
        colour: "#C2410C", // orange foncé
        icon: "condition",
        contents: [
          { kind: "block", type: "ctrl_if" },
          { kind: "block", type: "ctrl_repeat" }
        ]
      }
    ]
};
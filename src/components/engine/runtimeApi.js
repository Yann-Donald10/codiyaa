const runtimeApi = {
  moveForward(steps) {
    console.log("Move forward", steps);
  },

  turnRight(angle) {
    console.log("Turn right", angle);
  },

  playSound(name) {
    console.log("Play sound", name);
  },

  changeSprite(name) {
    console.log("Change sprite", name);
  }
};

export default runtimeApi;

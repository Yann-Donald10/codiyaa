// src/components/engine/runtimeApi.js

const runtimeApi = {
  spriteRef: null,
  interpreterRef: null,

  /* ========================
     BINDINGS
  ======================== */

  bindSprite(ref) {
    this.spriteRef = ref;
  },

  bindInterpreter(interpreter) {
    this.interpreterRef = interpreter;
  },

  /* ========================
     ACTIONS SPRITE
  ======================== */

  moveForward(steps) {
    return this.spriteRef?.moveForward(steps);
  },

  turnRight(angle) {
    return this.spriteRef?.turnRight(angle);
  },

  turnLeft(angle) {
    return this.spriteRef?.turnLeft(angle);
  },

  moveBackward(steps) {
    return this.spriteRef?.moveForward(-steps);
  },

  playSound(name) {
    this.spriteRef?.playSound(name);
  },

  /* ========================
     CONTROL
  ======================== */

  stopProgram() {
    // stop JS execution
    this.interpreterRef?.stop();

    // stop sprite animations if needed
    this.spriteRef?.stopProgram?.();
  },

  onStart(callback) {
    this.spriteRef?.reset?.();
    callback();
  }
};

export default runtimeApi;

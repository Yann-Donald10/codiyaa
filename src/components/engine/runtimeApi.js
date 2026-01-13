// src/components/engine/runtimeApi.js

const runtimeApi = {
  spriteRef: null,
  interpreterRef: null,
  currentAudio: null,
  currentScenario: null,

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

  setScenario(scenario) {
    this.currentScenario = scenario;
  },

  async moveUp(steps) {
    if (this.currentScenario?.onMoveUp) {
      await this.currentScenario.onMoveUp(steps);
    }
  },

  async moveDown(steps) {
    if (this.currentScenario?.onMoveDown) {
      await this.currentScenario.onMoveDown(steps);
    }
  },

  sleep(ms) {
    return new Promise(resolve => {
      const start = Date.now();
      const check = () => {
        if (!this.spriteRef?.isRunning?.() ?? true) return resolve();
        if (Date.now() - start >= ms) return resolve();
        requestAnimationFrame(check);
      };
      check();
    });
  },

  playSound(name) {
    // Arrête le son précédent s'il y en a un
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    return new Promise((resolve) => {
      const audio = new Audio(`/sounds/${name}.mp3`);
      this.currentAudio = audio;
      audio.onended = () => {
        this.currentAudio = null;
        resolve();
      };
      audio.play().catch(() => {
        this.currentAudio = null;
        resolve();
      });
    });
  },

  /* ========================
     CONTROL
  ======================== */

  stopProgram() {
    // Arrête le son en cours
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    if (this.currentScenario?.onStop) {
      this.currentScenario.onStop();
    }

    // stop JS execution
    this.interpreterRef?.stop();

    // stop sprite animations if needed
    this.spriteRef?.stopProgram?.();
  },

  onStart(callback) {
    this.spriteRef?.reset?.();
    if (this.currentScenario?.onStart) {
      this.currentScenario.onStart();
    }
    callback();
  }
};

export default runtimeApi;

class BlocklyInterpreter {
  constructor(runtimeApi) {
    this.runtimeApi = runtimeApi;
    this.running = false;
  }

  run(code) {
    this.running = true;

    try {
      // Le code généré appelle des fonctions runtime (move, playSound, etc.)
      const func = new Function("api", `
        if (!this.running) return;
        ${code}
      `);

      func(this.runtimeApi);
    } catch (err) {
      console.error("Erreur d'exécution:", err);
    }
  }

  stop() {
    this.running = false;
    console.log("Interpreter stopped");
  }
}

export default BlocklyInterpreter;

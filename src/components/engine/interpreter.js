// src/components/engine/interpreter.js

class BlocklyInterpreter {
  constructor(runtimeApi) {
    this.api = runtimeApi;
    this.running = false;
  }

  async run(code) {
    this.running = true;

    try {
      const fn = new Function("api", `
        return (async () => {
          ${code}
        })();
      `);

      await fn(this.api);
    } catch (err) {
      console.error("Erreur d'exécution :", err);
      this.running = false;
    }
  }

  stop() {
    this.running = false;
    console.log("Interpreter stopped");
  }
}

export default BlocklyInterpreter;

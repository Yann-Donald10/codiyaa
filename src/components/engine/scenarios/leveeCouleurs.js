export function createLeveeCouleursScenario(runtimeApi, setBackground) {

  const FLAG_BACKGROUNDS = [
    "EcoleBas",
    "EcoleMid",
    "EcoleHaut"
  ];

  let flagPosition = 0;

  return {
    async onMoveUp(steps) {
      for (let i = 0; i < steps; i++) {
        if (!runtimeApi.spriteRef?.isRunning?.()) break;
        if (flagPosition < FLAG_BACKGROUNDS.length - 1) {
          flagPosition++;
          setBackground(FLAG_BACKGROUNDS[flagPosition]);
          await runtimeApi.sleep(2000);
        }
      }
    },

    async onMoveDown(steps) {
      for (let i = 0; i < steps; i++) {
        if (!runtimeApi.spriteRef?.isRunning?.()) break;
        if (flagPosition > 0) {
          flagPosition--;
          setBackground(FLAG_BACKGROUNDS[flagPosition]);
          await runtimeApi.sleep(2000);
        }
      }
    },

    reset() {
      flagPosition = 0;
      setBackground(FLAG_BACKGROUNDS[0]);
    }
  };
}

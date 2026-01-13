export function createLeveeCouleursScenario(
  runtimeApi,
  setBackground,
  setRuntimeSprite,
  getInitialSprite   // 👈 nouveau
) {
  const FLAG_BACKGROUNDS = ["EcoleBas", "EcoleMid", "EcoleHaut"];
  let flagPosition = 0;
  let spriteChanged = false;

  return {
    async onMoveUp(steps) {
      await runtimeApi.sleep(2000);
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
      await runtimeApi.sleep(2000);
      for (let i = 0; i < steps; i++) {
        if (!runtimeApi.spriteRef?.isRunning?.()) break;
        if (flagPosition > 0) {
          flagPosition--;
          setBackground(FLAG_BACKGROUNDS[flagPosition]);
          await runtimeApi.sleep(2000);
        }
      }
    },

    // ✅ LOGIQUE DU BLOC event_change_sprite
    onChangeSprite: async () => {
      if (!runtimeApi.spriteRef?.isRunning?.()) return;

      const initialSprite = getInitialSprite();

      if (initialSprite === "Homme") {
        setRuntimeSprite("HommeDos");
      }

      if (initialSprite === "Femme") {
        setRuntimeSprite("FemmeDos");
      }

      // ⏱️ ATTENTE AVANT LE BLOC SUIVANT
      await runtimeApi.sleep(2000);
    },


    reset() {
      flagPosition = 0;
      spriteChanged = false;
      setBackground(FLAG_BACKGROUNDS[0]);
      setRuntimeSprite(null);
    }
  };
}

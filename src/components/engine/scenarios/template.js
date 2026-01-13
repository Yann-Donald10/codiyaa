export function createTemplateScenario(runtimeApi) {
  return {
    async onMoveUp(steps) {
      if (!runtimeApi.spriteRef?.isRunning?.()) return;
      await runtimeApi.spriteRef.moveUp(steps);
    },

    async onMoveDown(steps) {
      if (!runtimeApi.spriteRef?.isRunning?.()) return;
      await runtimeApi.spriteRef.moveDown(steps);
    },

    reset() {}
  };
}

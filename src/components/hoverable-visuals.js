const interactorOneTransform = [];
const interactorTwoTransform = [];

/**
 * Applies effects to a hoverable based on hover state.
 * @namespace interactables
 * @component hoverable-visuals
 */
AFRAME.registerComponent("hoverable-visuals", {
  schema: {
    cursorController: { type: "selector" },
    enableSweepingEffect: { type: "boolean", default: true }
  },
  init() {
    // uniforms and boundingSphere are set from the component responsible for loading the mesh.
    this.uniforms = null;
    this.boundingSphere = new THREE.Sphere();

    this.sweepParams = [0, 0];
  },
  remove() {
    this.uniforms = null;
    this.boundingBox = null;
  },
  tick(time) {
    if (!this.uniforms || !this.uniforms.size) return;

    const isFrozen = this.el.sceneEl.is("frozen");

    let interactorOne, interactorTwo;
    const interaction = AFRAME.scenes[0].systems.interaction;
    if (interaction.left.ConstraintTarget === this.el) {
      interactorOne = interaction.leftHand.object3D;
    }
    if (interaction.rightRemoteConstraintTarget === this.el) {
      interactorTwo = this.data.cursorController.components["cursor-controller"].data.cursor.object3D;
    }
    if (interaction.right.ConstraintTarget === this.el) {
      interactorTwo = interaction.rightHand.object3D;
    }

    if (interactorOne) {
      interactorOne.matrixWorld.toArray(interactorOneTransform);
    }
    if (interactorTwo) {
      interactorTwo.matrixWorld.toArray(interactorTwoTransform);
    }

    if (interactorOne || interactorTwo || isFrozen) {
      const worldY = this.el.object3D.matrixWorld.elements[13];
      const scaledRadius = this.el.object3D.scale.y * this.boundingSphere.radius;
      this.sweepParams[0] = worldY - scaledRadius;
      this.sweepParams[1] = worldY + scaledRadius;
    }

    for (const uniform of this.uniforms.values()) {
      uniform.hubs_EnableSweepingEffect.value = this.data.enableSweepingEffect;
      uniform.hubs_IsFrozen.value = isFrozen;
      uniform.hubs_SweepParams.value = this.sweepParams;

      uniform.hubs_HighlightInteractorOne.value = !!interactorOne;
      uniform.hubs_InteractorOnePos.value[0] = interactorOneTransform[12];
      uniform.hubs_InteractorOnePos.value[1] = interactorOneTransform[13];
      uniform.hubs_InteractorOnePos.value[2] = interactorOneTransform[14];

      uniform.hubs_HighlightInteractorTwo.value = !!interactorTwo;
      uniform.hubs_InteractorTwoPos.value[0] = interactorTwoTransform[12];
      uniform.hubs_InteractorTwoPos.value[1] = interactorTwoTransform[13];
      uniform.hubs_InteractorTwoPos.value[2] = interactorTwoTransform[14];

      if (interactorOne || interactorTwo || isFrozen) {
        uniform.hubs_Time.value = time;
      }
    }
  }
});

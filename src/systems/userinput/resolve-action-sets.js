import { sets } from "./sets";

let leftTeleporter;
let rightTeleporter;
let cursorController;

export function resolveActionSets() {
  leftTeleporter = leftTeleporter || document.querySelector("#player-left-controller").components["teleporter"];
  rightTeleporter = rightTeleporter || document.querySelector("#player-right-controller").components["teleporter"];
  cursorController = cursorController || document.querySelector("#cursor-controller").components["cursor-controller"];

  const userinput = AFRAME.scenes[0].systems.userinput;

  const interaction = AFRAME.scenes[0].systems.interaction;

  const leftHandConstraintTarget = interaction.leftHandConstraintTarget || interaction.thingHeldOnLeft;
  const leftHandCollisionTarget = !leftHandConstraintTarget && interaction.leftHandCollisionTarget;
  userinput.toggleSet(sets.leftHandHoveringOnNothing, !leftHandConstraintTarget && !leftHandCollisionTarget);
  userinput.toggleSet(
    sets.leftHandHoveringOnPen,
    leftHandCollisionTarget && !!leftHandCollisionTarget.components["is-pen"]
  );
  userinput.toggleSet(
    sets.leftHandHoveringOnCamera,
    leftHandCollisionTarget && !!leftHandCollisionTarget.components["camera-tool"]
  );
  userinput.toggleSet(
    sets.leftHandHoveringOnInteractable,
    leftHandCollisionTarget &&
      (!!leftHandCollisionTarget.components["offers-remote-constraint"] ||
        !!leftHandCollisionTarget.components["super-spawner"])
  );
  userinput.toggleSet(
    sets.leftHandHoveringOnVideo,
    leftHandCollisionTarget && !!leftHandCollisionTarget.components["media-video"]
  );

  userinput.toggleSet(
    sets.leftHandHoldingPen,
    leftHandConstraintTarget && !!leftHandConstraintTarget.components["is-pen"]
  );
  userinput.toggleSet(
    sets.leftHandHoldingCamera,
    leftHandConstraintTarget && !!leftHandConstraintTarget.components["camera-tool"]
  );
  userinput.toggleSet(sets.leftHandHoldingInteractable, !!leftHandConstraintTarget);
  userinput.toggleSet(
    sets.inputFocused,
    document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA"
  );

  const rightHandConstraintTarget =
    interaction.rightHandConstraintTarget ||
    (interaction.rightStretcher === interaction.rightHand && interaction.thingHeldOnRight);
  const rightHandCollisionTarget = !rightHandConstraintTarget && interaction.rightHandCollisionTarget;
  userinput.toggleSet(
    sets.rightHandHoveringOnNothing,
    !rightHandConstraintTarget && !rightHandCollisionTarget && !interaction.rightRemoteHoverTarget
  );
  userinput.toggleSet(
    sets.rightHandHoveringOnPen,
    rightHandCollisionTarget && !!rightHandCollisionTarget.components["is-pen"]
  );
  userinput.toggleSet(
    sets.rightHandHoveringOnCamera,
    rightHandCollisionTarget && !!rightHandCollisionTarget.components["camera-tool"]
  );
  userinput.toggleSet(
    sets.rightHandHoveringOnInteractable,
    rightHandCollisionTarget &&
      (!!rightHandCollisionTarget.components["offers-remote-constraint"] ||
        !!rightHandCollisionTarget.components["super-spawner"])
  );
  userinput.toggleSet(
    sets.rightHandHoveringOnVideo,
    rightHandCollisionTarget && !!rightHandCollisionTarget.components["media-video"]
  );

  userinput.toggleSet(
    sets.rightHandHoldingPen,
    rightHandConstraintTarget && !!rightHandConstraintTarget.components["is-pen"]
  );
  userinput.toggleSet(
    sets.rightHandHoldingCamera,
    rightHandConstraintTarget && !!rightHandConstraintTarget.components["camera-tool"]
  );
  userinput.toggleSet(sets.rightHandHoldingInteractable, !!rightHandConstraintTarget);
  userinput.toggleSet(
    sets.inputFocused,
    document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA"
  );

  const rightRemoteConstraintTarget =
    interaction.rightRemoteConstraintTarget ||
    (interaction.rightStretcher === interaction.cursor && interaction.thingHeldOnRight);
  const rightRemoteHoverTarget =
    !rightHandConstraintTarget &&
    !rightHandCollisionTarget &&
    !rightRemoteConstraintTarget &&
    interaction.rightRemoteHoverTarget;
  userinput.toggleSet(
    sets.cursorHoveringOnNothing,
    !rightHandConstraintTarget && !rightHandCollisionTarget && !rightRemoteConstraintTarget && !rightRemoteHoverTarget
  );
  userinput.toggleSet(
    sets.cursorHoveringOnPen,
    rightRemoteHoverTarget && !!rightRemoteHoverTarget.components["is-pen"]
  );
  userinput.toggleSet(
    sets.cursorHoveringOnCamera,
    rightRemoteHoverTarget && !!rightRemoteHoverTarget.components["camera-tool"]
  );
  userinput.toggleSet(
    sets.cursorHoveringOnInteractable,
    !interaction.buttonHeldByRightRemote &&
      rightRemoteHoverTarget &&
      (!!rightRemoteHoverTarget.components["offers-remote-constraint"] ||
        !!rightRemoteHoverTarget.components["super-spawner"])
  );
  userinput.toggleSet(
    sets.cursorHoveringOnUI,
    !interaction.buttonHeldByRightRemote &&
      rightRemoteHoverTarget &&
      (!!rightRemoteHoverTarget.components["single-action-button"] ||
        !!rightRemoteHoverTarget.components["holdable-button"])
  );
  userinput.toggleSet(
    sets.cursorHoveringOnVideo,
    rightRemoteHoverTarget && !!rightRemoteHoverTarget.components["media-video"]
  );

  userinput.toggleSet(
    sets.cursorHoldingPen,
    rightRemoteConstraintTarget && !!rightRemoteConstraintTarget.components["is-pen"]
  );
  userinput.toggleSet(
    sets.cursorHoldingCamera,
    rightRemoteConstraintTarget && !!rightRemoteConstraintTarget.components["camera-tool"]
  );
  userinput.toggleSet(sets.cursorHoldingUI, !!interaction.buttonHeldByRightRemote);
  userinput.toggleSet(sets.cursorHoldingInteractable, !!rightRemoteConstraintTarget);
  userinput.toggleSet(
    sets.inputFocused,
    document.activeElement.nodeName === "INPUT" || document.activeElement.nodeName === "TEXTAREA"
  );
}

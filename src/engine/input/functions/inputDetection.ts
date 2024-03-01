import { InputState } from "../InputState.ts";
import { InputMap } from "../InputMap.ts";

export function inputDetection(
  inputState: InputState,
  inputMap: InputMap,
  pressedKeyCode: string,
) {
  let inputDetected: boolean = false;

  for (const inputMapKey in inputMap) {
    const inputCodes = inputMap[inputMapKey as keyof InputMap];
    for (const inputCode of inputCodes) {
      if (inputCode.toString() === pressedKeyCode) {
        inputState[inputMapKey as keyof InputState] = true;
        inputDetected = true;
        break;
      }
    }

    if (inputDetected) {
      break;
    }
  }
}

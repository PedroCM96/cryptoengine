import { InputState } from "../InputState.ts";
import { Direction } from "../Direction.ts";

export function getInputDirection(inputState: InputState): Direction | null {
  if (inputState.UP) {
    return Direction.UP;
  }

  if (inputState.DOWN) {
    return Direction.DOWN;
  }

  if (inputState.LEFT) {
    return Direction.LEFT;
  }

  if (inputState.RIGHT) {
    return Direction.RIGHT;
  }

  return null;
}

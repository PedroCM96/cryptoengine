import {getInputDirection, InputState} from "../input";

export function shouldMoveCharacter(inputState: InputState): boolean {
    return getInputDirection(inputState) !== null;
}
import {shouldMoveCharacter} from "./index.ts";
import {Direction, getInputDirection} from "../input";
import {Global} from "../Global.ts";

export function handleCharacterMovement(global: Global): boolean  {
    const inputState = global.inputState;
    if (shouldMoveCharacter(inputState)) {
        const direction: Direction = getInputDirection(inputState) as Direction;
        if (!global.map.willCollide(global.character.getNextPosition(direction))) {
            return global.character.move(getInputDirection(inputState) as Direction);
        }
    }

    return false;
}
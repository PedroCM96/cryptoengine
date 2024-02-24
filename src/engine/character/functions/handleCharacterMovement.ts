import {Character, shouldMoveCharacter} from "../index.ts";
import {Direction, getInputDirection, InputState} from "../../input";
import {Map} from '../../map';

export function handleCharacterMovement(
    inputState: InputState,
    map: Map,
    character: Character
    ): boolean  {
    if (shouldMoveCharacter(inputState)) {
        const direction: Direction = getInputDirection(inputState) as Direction;
        if (!map.willCollide(character.getNextPosition(direction))) {
            return character.move(getInputDirection(inputState) as Direction);
        } else {
            character.lookAt(direction);
        }
    }

    return false;
}
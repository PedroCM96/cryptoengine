import {InputMap} from "./InputMap.ts";

export type InputState = {
    [key in keyof InputMap]: boolean;
}

export function initInputState(inputMap: InputMap): InputState
{
    const initializedState: Record<keyof InputState, boolean> = {} as Record<keyof InputState, boolean>;

    for (const key in inputMap) {
        initializedState[key as keyof InputMap] = false;
    }

   return initializedState;
}

export function resetInputState(inputState: &InputState) {
    for (const key in inputState) {
        inputState[key as keyof InputMap] = false;
    }
}

export function resetActionButtons(inputState: InputState) {
    inputState.CANCEL = false;
    inputState.ACCEPT = false;
}
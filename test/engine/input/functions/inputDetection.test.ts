import {inputDetection, InputMap, InputState} from "../../../../src/engine/input";

describe('Input detection function test', () => {
    /**
     * To detect the input, the key code passed should be contained in the array
     * of InputMap. For example, if InputMap contains [ArrowUP, W] for UP state,
     * the key code should be ArrowUp or 'W' to enable the UP state.
     */

    it('Should enable UP in input state if up key is pressed', () => {
        const inputState = {UP: false} as InputState;

       inputDetection(inputState, {UP: ['up']} as unknown as InputMap, 'up');
       expect(inputState.UP).toBeTruthy();
    });

    it('Should enable DOWN in input state if up key is pressed', () => {
        const inputState = {DOWN: false} as InputState;

        inputDetection(inputState, {DOWN: ['down']} as unknown as InputMap, 'down');
        expect(inputState.DOWN).toBeTruthy();
    });

    it('Should enable LEFT in input state if up key is pressed', () => {
        const inputState = {LEFT: false} as InputState;

        inputDetection(inputState, {LEFT: ['left']} as unknown as InputMap, 'left');
        expect(inputState.LEFT).toBeTruthy();
    });

    it('Should enable RIGHT in input state if up key is pressed', () => {
        const inputState = {RIGHT: false} as InputState;

        inputDetection(inputState, {RIGHT: ['right']} as unknown as InputMap, 'right');
        expect(inputState.RIGHT).toBeTruthy();
    });

    it('Should not update any input state if key code is not recognized', () => {
        const inputState = {RIGHT: false} as InputState;

        inputDetection(inputState, {RIGHT: ['right']} as unknown as InputMap, 'unknown');
        for(const value of Object.values(inputState)) {
            expect(value).toBeFalsy();
        }
    })
});
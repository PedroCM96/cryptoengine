import {initInputState, InputState, resetActionButtons, resetInputState} from "../../../src/engine/input";
import {KEYBOARD_INPUT_MAP} from "../../../src/engine";

describe('Input State functions test', () => {
   it('initInputState function should return an empty state', () => {
      const emptyState = initInputState(KEYBOARD_INPUT_MAP);
      for (const value of Object.values(emptyState)) {
          expect(value).toBeFalsy();
      }
   });

    it('resetInputState function should return an empty state', () => {
        const state = {UP: true, DOWN: true, LEFT: true} as InputState;
        resetInputState(state);
        for (const value of Object.values(state)) {
            expect(value).toBeFalsy();
        }
    });

    it('resetActionButtons should disable ACCEPT and CANCEL inputs', () => {
        const state = {UP: true, CANCEL: true, ACCEPT: true} as InputState;
        resetActionButtons(state);

        expect(state.UP).toBeTruthy(); // Should not affect to the rest of the inputs
        expect(state.ACCEPT).toBeFalsy();
        expect(state.CANCEL).toBeFalsy();
    });
});
import {Direction, getInputDirection, InputState} from "../../../../src/engine/input";

describe('Get Input Direction function test', () => {
   it('Should return Direction.UP if InputState is UP', () => {
      const direction = getInputDirection({UP: true} as InputState);
      expect(direction).toBe(Direction.UP);
   });

    it('Should return Direction.DOWN if InputState is DOWN', () => {
        const direction = getInputDirection({DOWN: true} as InputState);
        expect(direction).toBe(Direction.DOWN);
    });

    it('Should return Direction.LEFT if InputState is LEFT', () => {
        const direction = getInputDirection({LEFT: true} as InputState);
        expect(direction).toBe(Direction.LEFT);
    });

    it('Should return Direction.RIGHT if InputState is RIGHT', () => {
        const direction = getInputDirection({RIGHT: true} as InputState);
        expect(direction).toBe(Direction.RIGHT);
    });

    it('Should return null if no direction input is enabled', () => {
        const direction = getInputDirection({} as InputState);
        expect(direction).toBeNull();
    });
});
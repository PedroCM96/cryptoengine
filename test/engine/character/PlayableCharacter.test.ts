import {PlayableCharacter} from "../../../src/engine/character";
import {Position} from "../../../src/engine/shared";
import {Direction} from "../../../src/engine/input";

describe('Character class test', () => {
    const initialPosition: Position = {x: 1, y: 1};
    let sut: PlayableCharacter;

    beforeEach(() => {
        /*@ts-ignore*/
       sut = new PlayableCharacter({} as HTMLImageElement, initialPosition);
    });

    it('Should calculate correctly next position if movement direction is UP', () => {
        const newPosition = sut.getNextPosition(Direction.UP);
        /**
         * Positions are located in the 4th quadrant of a cartesian plane, so
         * the greater Y, the lower position. In this case, we start from
         * position 1,1, so UP movement means reducing 1 position in Y axis, the result
         * will be 0.
         */
        expect(newPosition).toStrictEqual({x: 1, y: 0});
    });

    it('Should calculate correctly next position if movement direction is DOWN', () => {
        const newPosition = sut.getNextPosition(Direction.DOWN);
        /**
         * Positions are located in the 4th quadrant of a cartesian plane, so
         * the greater Y, the lower position. In this case, we start from
         * position 1,1, so DOWN movement means adding 1 position in Y axis, the result
         * will be 2.
         */
        expect(newPosition).toStrictEqual({x: 1, y: 2});
    });

    it('Should calculate correctly next position if movement direction is RIGHT', () => {
        const newPosition = sut.getNextPosition(Direction.RIGHT);
        /**
         * Positions are located in the 4th quadrant of a cartesian plane, so
         * the greater X, the greater position. In this case, we start from
         * position 1,1, so RIGHT movement means adding 1 position in X axis, the result
         * will be 2.
         */
        expect(newPosition).toStrictEqual({x: 2, y: 1});
    });

    it('Should calculate correctly next position if movement direction is LEFT', () => {
        const newPosition = sut.getNextPosition(Direction.LEFT);
        /**
         * Positions are located in the 4th quadrant of a cartesian plane, so
         * the greater X, the greater position. In this case, we start from
         * position 1,1, so LEFT movement means reducing 1 position in X axis, the result
         * will be 0.
         */
        expect(newPosition).toStrictEqual({x: 0, y: 1});
    });

    it('Should not move if movement is disabled', () => {
        sut.disableMovement();
        const hasMoved = sut.move(Direction.LEFT);
        expect(hasMoved).toBeFalsy();
        expect(sut.getPosition()).toBe(initialPosition);
    });

    it('Should not move if is currently moving', () => {
        sut.startMove();
        const hasMoved = sut.move(Direction.LEFT);
        expect(hasMoved).toBeFalsy();
        expect(sut.getPosition()).toBe(initialPosition);
    });

    it('Should move if movement is enabled and is not currently moving', () => {
        sut.enableMovement();
        sut.finishMove();
        const hasMoved = sut.move(Direction.RIGHT);
        expect(hasMoved).toBeTruthy();
        expect(sut.getPosition()).not.toBe(initialPosition)
    });

    it('Should update character looking direction', () => {
        // Assert that character is no looking at RIGHT.
        expect(sut.isLookingAt(Direction.RIGHT));
        sut.enableMovement();
        sut.finishMove();
        sut.move(Direction.RIGHT);
        expect(sut.isLookingAt(Direction.RIGHT)).toBeTruthy();
    });

    it('Should return the correct cell if character is looking up', () => {
        sut.lookAt(Direction.UP);
        const lookingCellPosition = sut.getLookingCellPosition();
       expect(lookingCellPosition).toStrictEqual({x: 1, y: 0})
    });

    it('Should return the correct cell if character is looking down', () => {
        sut.lookAt(Direction.DOWN);
        const lookingCellPosition = sut.getLookingCellPosition();
        expect(lookingCellPosition).toStrictEqual({x: 1, y: 2})
    });

    it('Should return the correct cell if character is looking right', () => {
        sut.lookAt(Direction.RIGHT);
        const lookingCellPosition = sut.getLookingCellPosition();
        expect(lookingCellPosition).toStrictEqual({x: 2, y: 1})
    });

    it('Should return the correct cell if character is looking left', () => {
        sut.lookAt(Direction.LEFT);
        const lookingCellPosition = sut.getLookingCellPosition();
        expect(lookingCellPosition).toStrictEqual({x: 0, y: 1})
    });

    // TODO: Test render method
});
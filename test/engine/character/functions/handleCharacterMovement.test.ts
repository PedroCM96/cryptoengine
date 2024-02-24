import {Character, handleCharacterMovement, shouldMoveCharacter} from "../../../../src/engine/character";
import {Direction, getInputDirection, InputState} from "../../../../src/engine/input";
import {Map} from "../../../../src/engine"
import {StubbedInstance, stubInterface} from "ts-sinon";

jest.mock("../../../../src/engine/character/functions/shouldMoveCharacter", () => ({
    shouldMoveCharacter: jest.fn()
}));

jest.mock("../../../../src/engine/input/functions/getInputDirection", () => ({
    getInputDirection: jest.fn()
}));

describe('Handle Character Movement functions test', () => {

    const sut = handleCharacterMovement;

    let inputState: InputState;
    let map: StubbedInstance<Map>;
    let character: StubbedInstance<Character>;
    let shouldMoveCharacterMock: jest.Mock;
    let getInputDirectionMock: jest.Mock;

    beforeEach(() => {
        inputState = {} as InputState;
        map = stubInterface<Map>()
        map.willCollide.returns(false);
        character = stubInterface<Character>();

        shouldMoveCharacterMock = shouldMoveCharacter as jest.Mock;
        getInputDirectionMock = getInputDirection as jest.Mock;
    });

    it('Should not move character if shouldMoveCharacter returns false', () => {
        shouldMoveCharacterMock.mockReturnValue(false);
        expect(sut(inputState, map, character)).toBeFalsy();
    });

    it("Should return false if character will collide", () => {
        shouldMoveCharacterMock.mockReturnValue(true);
        map.willCollide.returns(true);
        expect(sut(inputState, map, character)).toBeFalsy();
    });

    it("Should update character direction if will collide", () => {
        const expectedDirection = Direction.UP;
        shouldMoveCharacterMock.mockReturnValue(true);
        map.willCollide.returns(true);
        getInputDirectionMock.mockReturnValue(expectedDirection);
        sut(inputState, map, character);

        expect(character.lookAt.calledWith(expectedDirection));
    });

    it("Should move character in the proper direction", () => {
        const expectedDirection = Direction.DOWN;
        shouldMoveCharacterMock.mockReturnValue(true);
        getInputDirectionMock.mockReturnValue(expectedDirection);
        map.willCollide.returns(false);
        sut(inputState, map, character);

        expect(character.move.calledWith(expectedDirection));
    })
})

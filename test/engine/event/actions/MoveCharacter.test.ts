import {MoveCharacter} from "../../../../src/engine/event/actions/MoveCharacter";
import {StubbedInstance, stubInterface} from "ts-sinon";
import {mockGlobal} from "../../mockGlobal";
import {Character} from "../../../../src/engine/character";
import {Global} from "../../../../src/engine";
import {Direction} from "../../../../src/engine/input";

describe('Move Character action test', () => {
    const sut = MoveCharacter;
    let global: StubbedInstance<Global>;
    let character: StubbedInstance<Character>;

    beforeEach(() => {
        character = stubInterface<Character>();
        global = mockGlobal({character});
        jest.clearAllMocks();
    });

    it('Should fail load function is there is no movement key', () => {
        expect(() => sut.load({})).toThrow();
    });

    it('Should fail load function if movement key is not an array', () => {
        expect(() => sut.load({movements: "foo"})).toThrow();
    });

    it('Should fail load function if movement key is an empty array', () => {
        expect(() => sut.load({movements: []})).toThrow();
    });

    it('Should return a valid instance', () => {
        const instance = sut.load({movements: [Direction.DOWN]});
        expect(instance instanceof MoveCharacter).toBeTruthy();
    })

    it('Should move character in the given directions', async () => {
        const movements: Direction[] = [Direction.UP, Direction.RIGHT, Direction.DOWN];
        const instance = new sut(movements);
        await instance.execute(global);

        expect(character.move.callCount).toBe(movements.length);
        expect(character.move.firstCall.calledWith(movements[0]));
        expect(character.move.secondCall.calledWith(movements[1]));
        expect(character.move.thirdCall.calledWith(movements[2]));
    });

    it('Should not call next movement until the first one is finished', async () => {
        const movements: Direction[] = [Direction.UP, Direction.RIGHT];
        const instance = new sut(movements);
        // Character movement will last one tick
        character.isMoveInProgress.onCall(1).returns(true);
        character.isMoveInProgress.onCall(2).returns(false);
        character.isMoveInProgress.onCall(3).returns(true);


        await instance.execute(global);
        await instance.execute(global);
        await instance.execute(global);

        expect(character.move.callCount).toBe(2);
        expect(character.move.firstCall.calledWith(Direction.UP));
        expect(character.move.firstCall.calledWith(Direction.DOWN));
    });
});
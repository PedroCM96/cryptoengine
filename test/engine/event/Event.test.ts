import {Action, Event, Script, Trigger} from "../../../src/engine/event";
import {StubbedInstance, stubInterface} from "ts-sinon";
import {Global} from "../../../src/engine";
import {mockGlobal} from "../mockGlobal";
import {NonPlayableCharacter} from "../../../src/engine/character/NonPlayableCharacter";
import {PlayableCharacter} from "../../../src/engine/character";
import {getPositionRelativeDirection} from "../../../src/engine/shared";
import {Direction} from "../../../src/engine/input";

jest.mock("../../../src/engine/shared/Position", () => ({
    getPositionRelativeDirection: jest.fn()
}));

describe('Event class test', () => {
    let sut: Event;

    let global: StubbedInstance<Global>;
    let script: StubbedInstance<Script>;
    let firstAction: StubbedInstance<Action>;
    let secondAction: StubbedInstance<Action>;
    let npc: StubbedInstance<NonPlayableCharacter>;
    let character: StubbedInstance<PlayableCharacter>;
    let getPositionRelativeDirectionMock: jest.Mock;


    beforeEach(() => {
        character = stubInterface<PlayableCharacter>();
        global = mockGlobal({character});
        script = stubInterface<Script>();
        firstAction = stubInterface<Action>();
        secondAction = stubInterface<Action>();
        npc = stubInterface<NonPlayableCharacter>();
        getPositionRelativeDirectionMock = getPositionRelativeDirection as jest.Mock;
        sut = new Event(0, Trigger.COLLISION, script, true, true);
        jest.clearAllMocks();
    });

    it('Should reproduce script when executing', () => {
        sut.execute(global);
        expect(script.reproduce.callCount).toBe(1);
    });

    it('Should return enabled true if any script action is enabled', () => {
        firstAction.isEnabled = false;
        secondAction.isEnabled = true;

        script.getActions.returns([firstAction, secondAction]);
        expect(sut.isEnabled()).toBeTruthy();
    });

    it('Should return enabled false if all script actions are disabled', () => {
        firstAction.isEnabled = false;
        secondAction.isEnabled = false;

        script.getActions.returns([firstAction, secondAction]);
        expect(sut.isEnabled()).toBeFalsy();
    });

    it('Should restore script when restoring', () => {
        sut.restore();
        expect(script.restore.callCount).toBe(1);
    });

    it('Should delegate if event is running to script class', () => {
       sut.isRunning();
       expect(script.isCurrentlyRunning.callCount).toBe(1);
    });

    it('Should return false if is not an NPC', () => {
        expect(sut.isNpc()).toBeFalsy();
    });

    it('Should return true if is an NPC', () => {
        sut = new Event(0, Trigger.COLLISION, script, true, true, npc);
        expect(sut.isNpc()).toBeTruthy()
    });

    it('Should reset looking at of npc when restore if has been triggered', () => {
        script.getActions.returns([firstAction, secondAction]);
        npc.shouldResetLookingAt.returns(true);
        npc.hasTriggered.returns(true);
        sut = new Event(0, Trigger.COLLISION, script, true, true, npc);

        sut.restore();

        expect(npc.resetLookingAt.callCount).toBe(1);
    });

    it('Should not reset looking at of npc when restore if has not been triggered', () => {
        script.getActions.returns([firstAction, secondAction]);
        npc.shouldResetLookingAt.returns(true);
        npc.hasTriggered.returns(false);
        sut = new Event(0, Trigger.COLLISION, script, true, true, npc);

        sut.restore();

        expect(npc.resetLookingAt.callCount).toBe(0);
    });


    it('Should not reset looking at of npc when restore if resetLookingAt is disabled', () => {
        script.getActions.returns([firstAction, secondAction]);
        npc.shouldResetLookingAt.returns(false);
        sut = new Event(0, Trigger.COLLISION, script, true, true, npc);

        sut.restore();

        expect(npc.resetLookingAt.callCount).toBe(0);
    });

    it('Should look at character position when execute', () => {
        const characterPosition = {x: 10, y: 20};
        const npcPosition = {x: 14, y: 50};
        const relativeDirection = Direction.RIGHT;
        character.getPosition.returns(characterPosition);
        npc.shouldLookAtInteract.returns(true);
        npc.getPosition.returns(npcPosition);
        getPositionRelativeDirectionMock.mockReturnValue(relativeDirection);
        sut = new Event(0, Trigger.COLLISION, script, true, true, npc);

        sut.execute(global);

        expect(getPositionRelativeDirectionMock.mock.calls).toHaveLength(1);
        expect(getPositionRelativeDirectionMock.mock.calls[0][0]).toBe(characterPosition);
        expect(getPositionRelativeDirectionMock.mock.calls[0][1]).toBe(npcPosition);
        expect(npc.lookAt.callCount).toBe(1);
        expect(npc.lookAt.calledWith(relativeDirection));
    });
});
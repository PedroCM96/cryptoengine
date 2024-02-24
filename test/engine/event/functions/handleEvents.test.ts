import {StubbedInstance, stubInterface} from "ts-sinon";
import {Character} from "../../../../src/engine/character";
import {Global, Map} from "../../../../src/engine";
import {Event, handleEvents, Trigger} from "../../../../src/engine/event";
import {Position} from "../../../../src/engine/shared";
import {InputState} from "../../../../src/engine/input";
import sinon from "sinon";
import {mockGlobal} from "../../mockGlobal";

describe('Handle Event function test', () => {
    const sut = handleEvents;

    let map: StubbedInstance<Map>;
    let character: StubbedInstance<Character>;
    let global: StubbedInstance<Global>;
    let event: StubbedInstance<Event>
    let inputState: InputState;

    beforeEach(() => {
        map = stubInterface<Map>();
        character = stubInterface<Character>();
        event = stubInterface<Event>();
        inputState = {} as InputState;

        global = mockGlobal({inputState, character, map}) ;
    });

    afterEach(() => {
        sinon.reset();
    })

    // Collision Trigger Events
    it('Should request event to map in character position', () => {
        const currentCharacterPosition: Position = {x: 20, y: 15};
        character.getPosition.returns(currentCharacterPosition);
        map.hasEventAt.returns(false);

        sut(global);

        expect(map.hasEventAt.calledWith(currentCharacterPosition)).toBeTruthy();
    });

    it('Should do nothing if map has no events in character position', () => {
        map.hasEventAt.returns(false);

        sut(global);

        expect(map.getEventAt.callCount).toBe(0);
    });

    it('Should execute collision event if exist in character position', () => {
        map.hasEventAt.returns(true);
        map.getEventAt.returns(event);
        event.getTrigger.returns(Trigger.COLLISION);

        sut(global);

        expect(event.execute.callCount).toBe(1);
    });

    it('Should not execute collision event if is not colliding with character', () => {
        map.hasEventAt.returns(true);
        map.getEventAt.onFirstCall().returns(null); // Event is not in the same cell as character
        map.getEventAt.onSecondCall().returns(event); // Event is in the character's looking cell
        event.getTrigger.returns(Trigger.COLLISION);

        sut(global);

        expect(event.execute.callCount).toBe(0);
    });

    it('Should execute event if is running', () => {
        map.hasEventAt.returns(true);
        map.getEventAt.returns(event);
        event.isRunning.returns(true);

        sut(global);

        expect(event.execute.callCount).toBe(1);
    });

    // Interact Trigger Events
    it('Should not execute interact event if exist in character position but accept button is not pressed', () => {
        map.hasEventAt.returns(true);
        map.getEventAt.returns(event);
        event.getTrigger.returns(Trigger.INTERACT);

        sut(global);

        expect(event.execute.callCount).toBe(0);
    });

    it('Should execute interact event if exist in character position and accept button is pressed', () => {
        map.hasEventAt.returns(true);
        map.getEventAt.returns(event);
        event.getTrigger.returns(Trigger.INTERACT);
        global.inputState.ACCEPT = true;
        sut(global);

        expect(event.execute.callCount).toBe(1);
    });

    it ('Should not execute interact event if exist in character looking cell position but no accept button is pressed', () => {
        const characterLookingCellPosition: Position = {x: 15, y: 16};

        map.hasEventAt.onFirstCall().returns(false);
        map.getEventAt.onFirstCall().returns(null);
        event.getTrigger.returns(Trigger.INTERACT);
        event.execute.resolves();
        global.inputState.ACCEPT = false;
        character.getLookingCellPosition.returns(characterLookingCellPosition);
        map.hasEventAt.onSecondCall().returns(true);
        map.getEventAt.onSecondCall().returns(event);

        sut(global);

        expect(map.hasEventAt.secondCall.calledWith(characterLookingCellPosition)).toBeTruthy();
        expect(event.execute.callCount).toBe(0);
    });

    it ('Should not execute interact event if exist in character looking cell position but no accept button is pressed', () => {
        const characterLookingCellPosition: Position = {x: 15, y: 16};

        map.hasEventAt.onFirstCall().returns(false);
        map.getEventAt.onFirstCall().returns(null);
        event.getTrigger.returns(Trigger.INTERACT);
        event.execute.resolves();
        global.inputState.ACCEPT = true;
        character.getLookingCellPosition.returns(characterLookingCellPosition);
        map.hasEventAt.onSecondCall().returns(true);
        map.getEventAt.withArgs(characterLookingCellPosition).returns(event)

        sut(global);

        expect(map.hasEventAt.secondCall.calledWith(characterLookingCellPosition)).toBeTruthy();
        expect(event.execute.callCount).toBe(1);
    });
});
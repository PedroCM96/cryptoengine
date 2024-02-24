import {Action, Event, Script, Trigger} from "../../../src/engine/event";
import {StubbedInstance, stubInterface} from "ts-sinon";
import {Global} from "../../../src/engine";
import {mockGlobal} from "../mockGlobal";

describe('Event class test', () => {
    let sut: Event;

    let global: StubbedInstance<Global>;
    let script: StubbedInstance<Script>;
    let firstAction: StubbedInstance<Action>;
    let secondAction: StubbedInstance<Action>;

    beforeEach(() => {
        global = mockGlobal({});
        script = stubInterface<Script>();
        firstAction = stubInterface<Action>();
        secondAction = stubInterface<Action>();
        sut = new Event(0, Trigger.COLLISION, script, true, true);
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

    it('Should restore all script actions when restoring', () => {
        script.getActions.returns([firstAction, secondAction]);
        script.getActions.returns([firstAction, secondAction]);

        sut.restore();

        expect(firstAction.enable.callCount).toBe(1);
        expect(secondAction.enable.callCount).toBe(1);
    });

    it('Should delegate if event is running to script class', () => {
       sut.isRunning();
       expect(script.isCurrentlyRunning.callCount).toBe(1);
    });
});
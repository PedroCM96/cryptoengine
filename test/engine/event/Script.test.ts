import {Action, Script} from "../../../src/engine/event";
import {mockGlobal} from "../mockGlobal";
import {StubbedInstance, stubInterface} from "ts-sinon";
import {Global} from "../../../src/engine";


describe('Script class test', () => {
    const sut = Script;

    let global: StubbedInstance<Global>;
    let firstAction: StubbedInstance<Action>;
    let secondAction: StubbedInstance<Action>;

    beforeEach(() => {
        global = mockGlobal({});
        firstAction = stubInterface<Action>();
        secondAction = stubInterface<Action>()
    });

    it('Should not execute action if is disabled', () => {
        const instance = new sut([firstAction]);
        firstAction.isEnabled = false;
        instance.reproduce(global);
        expect(firstAction.execute.callCount).toBe(0);
    });

    it('Should execute action if is enabled', () => {
        const instance = new sut([firstAction]);
        firstAction.isEnabled = true;
        instance.reproduce(global);
        expect(firstAction.execute.callCount).toBe(1);
    });

    it('Should execute always first action while is enabled', () => {
        const instance = new sut([firstAction, secondAction]);
        firstAction.isEnabled = true;
        instance.reproduce(global);
        instance.reproduce(global);
        instance.reproduce(global);
        expect(firstAction.execute.callCount).toBe(3);
        expect(secondAction.execute.callCount).toBe(0);
    });

    it('Should execute second action when first action is disabled', () => {
        const instance = new sut([firstAction, secondAction]);
        firstAction.isEnabled = false;
        instance.reproduce(global);
        expect(firstAction.execute.callCount).toBe(0);
        expect(secondAction.execute.callCount).toBe(1);
    });

    it('Should return correctly if event is running', async () => {
        const instance = new sut([firstAction, secondAction]);
        expect(instance.isCurrentlyRunning()).toBeFalsy();

        // First execution, should return true since needs to execute the second action
        firstAction.isEnabled = true;
        secondAction.isEnabled = true;

        /* @ts-ignore */
        firstAction.execute = (async (): Promise<void> => {
            firstAction.isEnabled = false;
        })
        await instance.reproduce(global);

        expect(instance.isCurrentlyRunning()).toBeTruthy();
    });
})
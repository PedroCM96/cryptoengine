import {loadAction} from "../../../../src/engine/event/actions";
import {loadEventFromJson, Trigger} from "../../../../src/engine/event";
import {Direction} from "../../../../src/engine/input";

jest.mock("../../../../src/engine/event/actions/loadAction", () => ({
    loadAction: jest.fn()
}));

describe('Load event from JSON function test', () => {
    const sut = loadEventFromJson;

    let loadActionMock: jest.Mock;

    const eventId = 1;
    const trigger = Trigger.INTERACT;
    const allowMove = false;
    const permanent = true;

    const json = {
        id: eventId,
        trigger,
        allowMove,
        permanent,
        script: []
    };

    beforeEach(() => {
        /* @ts-expect-error ignore */
        global.Image = class Image {};
        loadActionMock = loadAction as jest.Mock;
    });

    it('Should load event without actions correctly', async () => {

        const result = await sut(json);
        expect(result.getId()).toBe(eventId);
        expect(result.getTrigger()).toBe(trigger);
        expect(result.allowsMove()).toBe(allowMove);
        expect(result.isPermanent()).toBe(permanent);
        expect(loadActionMock.mock.calls).toHaveLength(0);
    });

    it ('Should throw error if event action has more than one key', async () => {
        const jsonWithInvalidActions = {
            ...json,
            script: [
                {
                    "showMessage": {},
                    "anotherKey": {}
                }
            ]
        };

        await expect(sut(jsonWithInvalidActions)).rejects.toBeTruthy();
    });

    it ('Should load event with actions correctly', async () => {
        const jsonWithActions = {
            ...json,
            script: [
                {
                    "showMessage": {foo: 'bar'},
                },
                {
                    "anotherKey": {bar: 'baz'},
                }
            ]
        };

        const result = await sut(jsonWithActions);
        expect(result.getId()).toBe(eventId);
        expect(result.getTrigger()).toBe(trigger);
        expect(result.allowsMove()).toBe(allowMove);
        expect(result.isPermanent()).toBe(permanent);
        expect(loadActionMock.mock.calls).toHaveLength(2);
        expect(loadActionMock.mock.calls[0][0]).toBe('showMessage');
        expect(loadActionMock.mock.calls[0][1]).toStrictEqual({foo: 'bar'});
        expect(loadActionMock.mock.calls[1][0]).toBe('anotherKey');
        expect(loadActionMock.mock.calls[1][1]).toStrictEqual({bar: 'baz'});
    });

    it('Should load npc event correctly', async () => {
        const jsonWithNpc = {
            ...json,
            npc: {
                resource: "NPC_02.png",
                lookingAt: "DOWN",
                canMove: true,
                lookAtInteract: true,
                resetDirectionAfterInteract: true
            }
        }

        const result = await sut(jsonWithNpc);
        expect(result.isNpc()).toBe(true);
        expect(result.getNpc()).not.toBeNull();
        expect(result.getNpc()?.isLookingAt(Direction.DOWN)).toBeTruthy();
        expect(result.getNpc()?.shouldLookAtInteract()).toBeTruthy();
        expect(result.getNpc()?.shouldResetLookingAt()).toBeTruthy();
    })
})
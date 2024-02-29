import {loadEventFromJson} from "../../../../src/engine/event";
import {loadEventsFromJson} from "../../../../src/engine/map/functions/loadEventsFromJson";

/* @ts-ignore*/
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([
        {
            "id": 0,
            "trigger": "COLLISION",
            "script": [
                {
                    "showMessage": "Foo bar baz baz baz"
                },
                {
                    "showMessage": "Baaz baz baz."
                }
            ],
            "allowMove": false,
            "permanent": true
        }
    ])
}));

jest.mock("../../../../src/engine/event/functions/loadEventFromJson", () => ({
    loadEventFromJson: jest.fn()
}));

describe('Load events from JSON function test', () => {
    const sut = loadEventsFromJson;

    let loadEventFromJsonMock: jest.Mock;

    beforeEach(() => {
        loadEventFromJsonMock = loadEventFromJson as jest.Mock;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should extract correctly events from json', async () => {
        await sut('test/engine/map/functions/events_0.json');
        expect(loadEventFromJsonMock.mock.calls.length).toBe(1);
        expect(loadEventFromJsonMock.mock.calls[0][0]).toStrictEqual({
            "id": 0,
            "trigger": "COLLISION",
            "script": [
                {
                    "showMessage": "Foo bar baz baz baz"
                },
                {
                    "showMessage": "Baaz baz baz."
                }
            ],
            "allowMove": false,
            "permanent": true
        });
    });
})
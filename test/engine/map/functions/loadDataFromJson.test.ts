import { loadMapEvents } from "../../../../src/engine/map/functions/loadMapEvents";
import { Event } from "../../../../src/engine/event";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { loadDataFromJson } from "../../../../src/engine/map/functions/loadDataFromJson";
import { MapData } from "../../../../src/engine";

/* @ts-expect-error ignore*/
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        size: [340, 340],
        collisions: [
          [20, 21],
          [30, 34],
        ],
        initializeCharacterPosition: [10, 40],
      }),
  }),
);

jest.mock("../../../../src/engine/map/functions/loadMapEvents", () => ({
  loadMapEvents: jest.fn(),
}));

describe("Load data from JSON function test", () => {
  const sut = loadDataFromJson;
  let loadMapEventsMock: jest.Mock;
  let event: StubbedInstance<Event>;

  beforeEach(() => {
    loadMapEventsMock = loadMapEvents as jest.Mock;
    event = stubInterface<Event>();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Should load correctly the data", async () => {
    const loadedMapEvents = new Map<string, Event>([["10,10", event]]);

    loadMapEventsMock.mockReturnValue(loadedMapEvents);

    const r: MapData = await sut(
      0,
      "test/engine/map/functions/map_0.json",
      "test/engine/map/functions/events_0.json",
    );
    expect(r.size).toStrictEqual([340, 340]);
    expect(r.collisions).toStrictEqual([
      [20, 21],
      [30, 34],
    ]);
    expect(r.initializeCharacterPosition).toStrictEqual({ x: 10, y: 40 });
    expect(r.events).not.toBeNull();
    expect(r.events.size).toBe(loadedMapEvents.size);
    expect(r.events.get("10,10")).not.toBeNull();
    expect(r.events.get("10,10")).toBe(loadedMapEvents.get("10,10"));
  });
});

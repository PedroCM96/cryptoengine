import { StubbedInstance, stubInterface } from "ts-sinon";
import { Event } from "../../../../src/engine/event";
import { loadEventsFromJson } from "../../../../src/engine/map/functions/loadEventsFromJson";
import { loadMapEvents } from "../../../../src/engine/map/functions/loadMapEvents";

jest.mock("../../../../src/engine/map/functions/loadEventsFromJson", () => ({
  loadEventsFromJson: jest.fn(),
}));
describe("Load Map Events function test", () => {
  const sut = loadMapEvents;

  let loadEventsFromJsonMock: jest.Mock;
  let event1: StubbedInstance<Event>;
  let event2: StubbedInstance<Event>;

  beforeEach(() => {
    loadEventsFromJsonMock = loadEventsFromJson as jest.Mock;
    event1 = stubInterface<Event>();
    event2 = stubInterface<Event>();
    jest.resetAllMocks();
  });

  it("Should return empty if there is no events", async () => {
    expect((await sut(0, [], "relativepath")).size).toBe(0);
  });

  it("Should throw error if map event is not found", async () => {
    const mapEvents: [number, number, number][] = [[1, 1, 1]]; // Will try to load in position (1,1) Event with id 1
    event1.getId.returns(99999);
    loadEventsFromJsonMock.mockReturnValue([event1]);
    await expect(sut(0, mapEvents, "relativepath")).rejects.toBeTruthy();
  });

  it("Should retrieve events of the given path", async () => {
    const mapId = 999;
    const mapEvents: [number, number, number][] = [[1, 1, 1]];
    event1.getId.returns(1);
    loadEventsFromJsonMock.mockReturnValue([event1]);

    await sut(mapId, mapEvents, "relativepath");

    expect(loadEventsFromJsonMock.mock.calls).toHaveLength(1);
    expect(loadEventsFromJsonMock.mock.calls[0][0]).toBe("relativepath");
  });

  it("Should return correctly the map of events", async () => {
    const mapEvents: [number, number, number][] = [
      [1, 1, 1],
      [2, 2, 2],
    ];
    event1.getId.returns(1);
    event2.getId.returns(2);
    loadEventsFromJsonMock.mockReturnValue([event1, event2]);

    const result = await sut(0, mapEvents, "relativepath");

    expect(result.size).toBe(2);
    expect(result.get("1,1")).toBe(event1);
    expect(result.get("2,2")).toBe(event2);
  });

  it("Should replace event if is duplicated", async () => {
    const mapEvents: [number, number, number][] = [
      [1, 1, 1],
      [1, 1, 2],
    ]; // Position (1,1) is twice
    event1.getId.returns(1);
    event2.getId.returns(2);
    loadEventsFromJsonMock.mockReturnValue([event1, event2]);

    const result = await sut(0, mapEvents, "relativepath");
    expect(result.size).toBe(1);
    expect(result.get("1,1")).toBe(event2);
  });
});

import { Position, positionToString } from "../../shared";
import { Event } from "../../event";
import { loadEventsFromJson } from "./loadEventsFromJson.ts";

export async function loadMapEvents(
  mapId: number,
  mapEvents: [number, number, number][],
  mapEventsRelativePath: string,
): Promise<Map<string, Event>> {
  const eventsMap = new Map<string, Event>();
  if (mapEvents.length > 0) {
    const events = await loadEventsFromJson(mapEventsRelativePath);
    for (const mapEvent of mapEvents) {
      const eventPositionX = mapEvent[0];
      const eventPositionY = mapEvent[1];
      const eventId = mapEvent[2] as number;

      const e = events.find((e) => e.getId() === eventId);
      if (!e) {
        throw new Error(`Event with id ${eventId} not found for map ${mapId}`);
      }

      const eventPosition: Position = {
        x: eventPositionX,
        y: eventPositionY,
      };

      eventsMap.set(positionToString(eventPosition), e);
    }
  }

  return eventsMap;
}

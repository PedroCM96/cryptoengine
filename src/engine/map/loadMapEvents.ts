import {Position, positionToString} from "../types";
import {Event} from "../event";
import {loadEventsFromJson} from "./loadEventsFromJson.ts";

export async function loadMapEvents(mapId: number, mapEvents: any): Promise<Map<string, Event>> {
    const eventsMap = new Map<string, Event>();
    if (mapEvents.length > 0) {
        const events = await loadEventsFromJson(0);
        for (const mapEvent of mapEvents) {
            if (mapEvent.length !== 3) {
                throw new Error('Invalid MapEvent in JSON. Should be an array of three numbers [X, Y, EventID]')
            }

            const eventPositionX = mapEvent[0] as number;
            const eventPositionY = mapEvent[1] as number;
            const eventId = mapEvent[2] as number;

            const e = events.find((e) => e.getId() === eventId);
            if (!e) {
                throw new Error(`Event with id ${eventId} not found for map ${mapId}`);
            }

            const eventPosition: Position = {
                x: eventPositionX,
                y: eventPositionY
            };

            eventsMap.set(positionToString(eventPosition), e);
        }
    }

    return eventsMap;
}
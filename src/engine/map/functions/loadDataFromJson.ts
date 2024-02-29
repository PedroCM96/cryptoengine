import {MapData} from "../MapData.ts";
import {loadMapEvents} from "./loadMapEvents.ts";

export async function loadDataFromJson(
    id: number,
    mapDataRelativePath: string,
    mapEventsRelativePath: string
): Promise<MapData> {
    const jsonData = await (await fetch(mapDataRelativePath)).json();
    const mapEvents = await loadMapEvents(id, jsonData.events, mapEventsRelativePath);

    return {
        size: jsonData.size,
        collisions: jsonData.collisions,
        events: mapEvents,
        initializeCharacterPosition: {
            x: jsonData.initializeCharacterPosition[0],
            y: jsonData.initializeCharacterPosition[1]
        }
    };
}
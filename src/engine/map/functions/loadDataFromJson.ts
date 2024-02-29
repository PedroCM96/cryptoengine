import {MapData} from "../MapData.ts";
import {loadMapEvents} from "./loadMapEvents.ts";

export async function loadDataFromJson(
    id: number,
    mapDataRelativePath: string,
    mapEventsRelativePath: string
): Promise<MapData> {
    const jsonData = await import(mapDataRelativePath);
    const mapEvents = await loadMapEvents(id, jsonData.events, mapEventsRelativePath);

    return {
        size: jsonData.size,
        collisions: jsonData.collisions,
        events: mapEvents
    };
}
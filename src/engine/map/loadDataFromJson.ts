import {MapData} from "./MapData.ts";
import {loadMapEvents} from "./loadMapEvents.ts";

export async function loadDataFromJson(id: number): Promise<MapData> {
    const jsonData = await import(`../../data/maps/map_${id}.json`);
    const mapEvents = await loadMapEvents(id, jsonData.events);

    return {
        size: jsonData.size,
        collisions: jsonData.collisions,
        events: mapEvents
    };
}
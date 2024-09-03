import { MapData } from "../MapData.ts";
import { loadMapEvents } from "./loadMapEvents.ts";

export async function loadDataFromJson(
  id: number,
  mapDataRelativePath: string,
  mapEventsRelativePath: string,
): Promise<MapData> {
  const jsonData = await (await fetch(mapDataRelativePath)).json();
  const mapEvents = await loadMapEvents(
    id,
    jsonData.events,
    mapEventsRelativePath,
  );

  const collisions = jsonData.collisions;

  // Loading furniture collisions
/*  for (const furnitureInstance of mapFurniture) {
    const basePosition =  positionFromString(furnitureInstance[0]);
    const size = furnitureInstance[1].size;
    const width = size[0];
    const height = size[1];

    for (let x = basePosition.x; x < basePosition.x + width; x++) {
      for (let y = basePosition.y; y < basePosition.y + height; y++) {
        collisions.push([x, y]);
      }
    }
  } */

  return {
    size: jsonData.size,
    collisions: collisions,
    events: mapEvents,
    initializeCharacterPosition: {
      x: jsonData.initializeCharacterPosition[0],
      y: jsonData.initializeCharacterPosition[1],
    },
    furniture: new Map()
  };
}

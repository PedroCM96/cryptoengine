import { MapData } from "../MapData.ts";
import { loadMapEvents } from "./loadMapEvents.ts";
import { Furniture } from "../../../../test/engine/furniture/Furniture.ts";
import { positionFromString } from "../../shared";

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

  const mapFurniture = new Map<string, Furniture>([
    [
      '9,13', new Furniture('cut_down_tree', 'Cut down tree', false, [1,1]),
    ],
    [
      '10,20', new Furniture('tree_1', 'Tree 1', false, [2,2]),
    ],
  ]);

  const collisions = jsonData.collisions;

  // Loading furniture collisions
  for (const furnitureInstance of mapFurniture) {
    const basePosition =  positionFromString(furnitureInstance[0]);
    const size = furnitureInstance[1].size;
    const width = size[0];
    const height = size[1];

    for (let x = basePosition.x; x < basePosition.x + width; x++) {
      for (let y = basePosition.y; y < basePosition.y + height; y++) {
        collisions.push([x, y]);
      }
    }
  }

  return {
    size: jsonData.size,
    collisions: collisions,
    events: mapEvents,
    initializeCharacterPosition: {
      x: jsonData.initializeCharacterPosition[0],
      y: jsonData.initializeCharacterPosition[1],
    },
    furniture: mapFurniture
  };
}

import { Event } from "../event";
import { Position } from "../shared";
import { Furniture } from "../../../test/engine/furniture/Furniture.ts";

export type MapData = {
  size: [number, number]; // In Cells
  collisions: [number, number][];
  events: Map<string, Event>; // String represents position in "X,Y" format
  initializeCharacterPosition: Position;
  furnitures: Map<string, Furniture> // String represents position in "X,Y" format
};

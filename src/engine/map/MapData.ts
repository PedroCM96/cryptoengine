import {Event} from "../event";

export type MapData = {
    size: [number, number] // In Cells
    collisions: [number, number][],
    events: Map<string, Event> // String represents position in "X,Y" format
}
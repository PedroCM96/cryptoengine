import {Position} from "../shared";
import {Direction} from "../input";

export type TeleportMessage = {
    mapId: number,
    characterPosition: Position,
    characterLookAt: Direction
}
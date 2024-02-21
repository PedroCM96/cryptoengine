import {CELL_SIZE, CHARACTER_RESOURCE, MAP_RESOURCE_EXTENSION, MAP_RESOURCE_PREFIX} from "../config.ts";
import {MapData} from "./MapData.ts";
import {Position, positionToString} from "../types";
import {loadDataFromJson} from "./loadDataFromJson.ts";
import {Event} from "../event";
import {Global} from "../Global.ts";

export class Map {

    constructor(private readonly id: number, private readonly data: MapData) {}

    static async fromId(id: number): Promise<Map> {
        const data = await loadDataFromJson(id);
        return new Map(id, data);
    }

    render(global: Global) {
        const ctx = global.ctx;
        const character = global.character;

        const map = new Image();
        map.src = `${MAP_RESOURCE_PREFIX}${this.id}.${MAP_RESOURCE_EXTENSION}`;
        const char = new Image();
        char.src = CHARACTER_RESOURCE;

        let characterPositionX = character.getPosition().x * CELL_SIZE;
        let characterPositionY = character.getPosition().y * CELL_SIZE;

        const cameraX = characterPositionX - ctx.canvas.width / (2);
        const cameraY = characterPositionY - ctx.canvas.height / (2);

        ctx.drawImage(map, -cameraX, -cameraY);
        ctx.drawImage(char, (ctx.canvas.width / 2 - char.width / 2 - (CELL_SIZE / 2)), (ctx.canvas.height / 2 - char.height / 2 - (CELL_SIZE / 2)));
    }

    willCollide(position: Position): boolean {
        for (const collisionCell of this.data.collisions) {
            if (collisionCell[0] === position.x && collisionCell[1] === position.y) {
                return true;
            }
        }

        return false;
    }

    hasEventAt(position: Position): boolean {
        return this.data.events.has(positionToString(position));
    }

    getEventAt(position: Position): Event|null {
        const event = this.data.events.get(positionToString(position));
        return event ?? null;
    }

    restorePermanentEvents(): void {
        for (const event of this.data.events.values()) {
            if (event.isPermanent()) {
                event.restore();
            }
        }
    }
}
import {MAP_RESOURCE_EXTENSION, MAP_RESOURCE_PREFIX} from "../config.ts";
import {MapData} from "./MapData.ts";
import {Position, positionToString} from "../types";
import {loadDataFromJson} from "./loadDataFromJson.ts";
import {Event} from "../event";
import {Global} from "../Global.ts";
import {Camera} from "./camera";

export class Map {

    private readonly camera: Camera;
    private readonly img: HTMLImageElement;
    constructor(private readonly id: number, private readonly data: MapData) {
        this.img = new Image();
        this.img.src = `${MAP_RESOURCE_PREFIX}${this.id}.${MAP_RESOURCE_EXTENSION}`;
        this.camera = new Camera({x: 0, y: 0});
    }

    static async fromId(id: number): Promise<Map> {
        const data = await loadDataFromJson(id);
        return new Map(id, data);
    }

    render(global: Global) {
        this.camera.render(this.img, global.character, global.ctx);
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
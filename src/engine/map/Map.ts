import {
  MAP_DATA_FOLDER,
  MAP_RESOURCE_EXTENSION,
  MAP_RESOURCE_PREFIX,
  MAPA_EVENTS_FOLDER,
} from "../config.ts";
import { MapData } from "./MapData.ts";
import {
  isEqual,
  Position,
  positionFromString,
  positionToString,
} from "../shared";
import { loadDataFromJson } from "./functions/loadDataFromJson.ts";
import { Event, Trigger } from "../event";
import { Camera } from "./camera";
import { Character } from "../character";
import { NonPlayableCharacter } from "../character/NonPlayableCharacter.ts";
import { getAllDirections } from "../input";

export class Map {
  private readonly camera: Camera;

  constructor(
    private readonly id: number,
    private readonly data: MapData,
    private img: HTMLImageElement,
  ) {
    this.img.src = `${MAP_RESOURCE_PREFIX}${this.id}.${MAP_RESOURCE_EXTENSION}`;
    this.camera = new Camera({ x: 0, y: 0 });
    this.initNpcs();
  }

  static async fromId(id: number, image: HTMLImageElement): Promise<Map> {
    const data = await loadDataFromJson(
      id,
      Map.getMapDataPath(id),
      Map.getMapEventsDataPath(id),
    );
    return new Map(id, data, image);
  }

  render(character: Character, ctx: CanvasRenderingContext2D) {
    this.camera.render(this.img, character, ctx);
    this.renderNpcs(ctx, character.getPosition());
  }

  willCollide(position: Position): boolean {
    for (const collisionCell of this.data.collisions) {
      if (collisionCell[0] === position.x && collisionCell[1] === position.y) {
        return true;
      }
    }

    return this.hasNpcAtPosition(position);
  }

  hasEventAt(position: Position): boolean {
    return this.data.events.has(positionToString(position));
  }

  getInProgressEvent(): Event | null {
    for (const event of this.data.events.values()) {
      if (event.isRunning()) {
        return event;
      }
    }
    return null;
  }
  getEventAt(position: Position): Event | null {
    const event = this.data.events.get(positionToString(position));
    return event ?? null;
  }

  restoreInteractiveEvents(): void {
    for (const event of this.data.events.values()) {
      if (
        event.isPermanent() &&
        !event.isRunning() &&
        event.getTrigger() === Trigger.INTERACT
      ) {
        event.restore();
      }
    }
  }

  restoreCollideEvents(): void {
    for (const event of this.data.events.values()) {
      if (
        event.isPermanent() &&
        !event.isRunning() &&
        event.getTrigger() === Trigger.COLLISION
      ) {
        event.restore();
      }
    }
  }

  getInitializeCharacterPosition(): Position {
    return this.data.initializeCharacterPosition;
  }

  private initNpcs(): void {
    for (const x of this.data.events) {
      if (!x[1].isNpc()) {
        continue;
      }

      const position = positionFromString(x[0]);
      const npc = x[1].getNpc() as NonPlayableCharacter;
      npc.setPosition(position);
    }
  }

  private renderNpcs(
    ctx: CanvasRenderingContext2D,
    referencePosition: Position,
  ): void {
    for (const e of this.data.events.values()) {
      if (!e.isNpc()) {
        continue;
      }

      const npc = e.getNpc() as NonPlayableCharacter;
      if (this.camera.isVisible(npc.getPosition(), referencePosition)) {
        npc.render(ctx, {
          tlp: this.camera.getTopLeftCornerCellPosition(referencePosition),
        });
        this.handleNpcMovement(e, referencePosition);
      } else {
        npc.resetRenderPosition();
      }
    }
  }

  private hasNpcAtPosition(position: Position): boolean {
    const event = this.data.events.get(positionToString(position));
    if (!event) {
      return false;
    }

    return event.isNpc();
  }

  private handleNpcMovement(event: Event, referencePosition: Position) {
    if (event.isRunning()) {
      return;
    }

    const npc = event.getNpc() as NonPlayableCharacter;
    npc.incCooldownCounter();

    // Check cooldown to avoid strange issues
    const isCooledDown = npc.getCooldownCounter() < npc.TICKS_COOLDOWN;

    if (isCooledDown) {
      return;
    }

    // Determine if should move randomly
    const shouldMove =
      Math.floor(Math.random() * 10000) > 9900 && !event.isRunning();

    if (!shouldMove) {
      return;
    }

    const directions = getAllDirections();
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    const oldPosition = npc.getPosition();
    const newPosition = npc.getNextPosition(randomDirection);

    if (isEqual(newPosition, referencePosition)) {
      return;
    }

    npc.move(randomDirection);

    this.data.events.set(positionToString(npc.getPosition()), event);
    this.data.events.delete(positionToString(oldPosition));
  }

  static getMapDataPath(id: number) {
    return `${MAP_DATA_FOLDER}/map_${id}.json`;
  }

  static getMapEventsDataPath(id: number) {
    return `${MAPA_EVENTS_FOLDER}/events_${id}.json`;
  }
}

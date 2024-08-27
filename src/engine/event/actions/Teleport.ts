import { Position } from "../../shared";
import { Global } from "../../Global.ts";
import { BusMessageType, TeleportMessage } from "../../bus";
import { Action } from "../Action.ts";
import { Direction, directionFromString } from "../../input";

export class Teleport extends Action {
  constructor(
    private readonly mapId: number,
    private readonly characterPosition: Position,
    private readonly characterLookAt: Direction,
  ) {
    super();
  }

  static async load(data: any) {
    const mapId = parseInt(data.mapId);
    const characterPosition: Position = {
      x: data.position[0],
      y: data.position[1],
    };
    const lookingAt: Direction = directionFromString(data.lookingAt);
    return new Teleport(mapId, characterPosition, lookingAt);
  }

  protected async doExecute(global: Global): Promise<void> {
    this.start();
    const teleportMessage: TeleportMessage = {
      mapId: this.mapId,
      characterPosition: this.characterPosition,
      characterLookAt: this.characterLookAt,
    };

    global.bus.addMessage([BusMessageType.TELEPORT, teleportMessage]);

    this.disable();
    this.finish();
  }
}

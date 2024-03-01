import { Global } from "../../Global.ts";
import { Action } from "../Action.ts";
import { Direction, directionFromString } from "../../input";

export class MoveCharacter extends Action {
  private moveToExecIndex: number | null = null;
  constructor(private readonly movements: Direction[]) {
    super();
  }
  protected async doExecute(global: Global): Promise<void> {
    this.start();
    for (const movement of this.movements.slice(this.moveToExecIndex || 0)) {
      if (global.character.isMoveInProgress()) {
        break;
      }

      global.character.move(movement);
      this.moveToExecIndex === null
        ? (this.moveToExecIndex = 1)
        : this.moveToExecIndex++;
    }

    if (this.moveToExecIndex === this.movements.length) {
      this.reset();
    }
  }

  static load(data: any): Action {
    const movements = data.movements;
    if (!movements) {
      throw new Error(
        `MoveCharacter load method should receive and object with a key movements`,
      );
    }

    if (!(movements instanceof Array)) {
      throw new Error(
        `MoveCharacter load method: key movements should be an array of at least one movement`,
      );
    }

    if (!movements.length) {
      throw new Error(`movement key should have at least one direction`);
    }
    const movs: Direction[] = [];
    for (const movement of movements) {
      movs.push(directionFromString(movement));
    }

    return new MoveCharacter(movs);
  }

  private reset(): void {
    this.disable();
    this.finish();
    this.moveToExecIndex = null;
  }
}

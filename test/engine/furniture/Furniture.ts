import { Position } from "../../../src/engine/shared";
import { CELL_SIZE, CHARACTER_SPEED } from "../../../src/engine";

export class Furniture {
  currentRenderPosition: Position | null = null;

  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _isWalkable: boolean,
    private readonly _size: [number, number]
  ) {
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get isWalkable(): boolean {
    return this._isWalkable;
  }

  get size(): [number, number] {
    return this._size;
  }

  get img(): any {
    const img =  new Image();
    img.src = `furniture/${this.id}/${this.id}.png`;
    return img;
  }

  render(ctx: CanvasRenderingContext2D, position: Position, tlp: Position): void {
    const diffX = Math.abs((tlp.x - position.x) * CELL_SIZE);
    const diffY = Math.abs((tlp.y - position.y) * CELL_SIZE);

    if (this.currentRenderPosition === null) {
      this.currentRenderPosition = {
        x: diffX,
        y: diffY,
      };
    }

    const targetPositionRenderPosition: Position = { x: diffX, y: diffY };

    const deltaX = Math.round(
      targetPositionRenderPosition.x - this.currentRenderPosition.x,
    );
    const deltaY = Math.round(
      targetPositionRenderPosition.y - this.currentRenderPosition.y,
    );

    this.currentRenderPosition.x += deltaX * CHARACTER_SPEED;
    this.currentRenderPosition.y += deltaY * CHARACTER_SPEED;
    ctx.drawImage(this.img, this.currentRenderPosition.x, this.currentRenderPosition.y);
  }
}
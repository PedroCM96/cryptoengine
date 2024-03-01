import { Position } from "../shared";
import { Direction } from "../input";
import { CHARACTER_HEIGHT, CHARACTER_WIDTH } from "../config.ts";
import { Animable, AnimationMap } from "../animation";

export abstract class Character extends Animable {
  characterDirectionToYOffset: Record<Direction, number> = {
    [Direction.DOWN]: 0,
    [Direction.LEFT]: -48,
    [Direction.RIGHT]: -96,
    [Direction.UP]: -146,
  };

  protected position: Position; // Current position of the character in the map.
  protected lookingAt: Direction; // If character is looking up, looking down...
  protected canMove: boolean; // If character can move after press a direction input. For example, when a TextBox is opened.
  protected isMoving: boolean; // If the character has a movement between cells pending.

  private isMovingLastStates: boolean[] = [];

  protected constructor(
    img: HTMLImageElement,
    position: Position,
    canMove: boolean,
    lookingAt: Direction,
    isMoving: boolean,
    animationMap: AnimationMap,
    animationSpeed: number,
  ) {
    super(animationMap, img, animationSpeed);
    this.position = position;
    this.canMove = canMove;
    this.lookingAt = lookingAt;
    this.isMoving = isMoving;
  }

  move(direction: Direction): boolean {
    if (!this.canMove || this.isMoving) {
      return false;
    }

    this.startMove();
    this.position = this.getNextPosition(direction);
    this.lookingAt = direction;
    return true;
  }

  enableMovement(): void {
    this.canMove = true;
  }

  disableMovement(): void {
    this.canMove = false;
  }

  abstract render(ctx: CanvasRenderingContext2D, args: unknown): void;

  getNextPosition(direction: Direction): Position {
    if (direction === Direction.UP) {
      return {
        x: this.position.x,
        y: this.position.y - 1,
      };
    }

    if (direction === Direction.DOWN) {
      return {
        x: this.position.x,
        y: this.position.y + 1,
      };
    }

    if (direction === Direction.LEFT) {
      return {
        x: this.position.x - 1,
        y: this.position.y,
      };
    }

    // Right
    return {
      x: this.position.x + 1,
      y: this.position.y,
    };
  }

  getPosition(): Position {
    return this.position;
  }

  setPosition(position: Position): void {
    this.position = position;
  }

  lookAt(direction: Direction): void {
    this.lookingAt = direction;
  }

  isLookingAt(direction: Direction): boolean {
    return this.lookingAt === direction;
  }

  isMoveInProgress(): boolean {
    return this.isMoving;
  }

  getLookingCellPosition(): Position {
    if (this.lookingAt === Direction.UP) {
      return { ...this.position, y: this.position.y - 1 };
    }

    if (this.lookingAt === Direction.DOWN) {
      return { ...this.position, y: this.position.y + 1 };
    }

    if (this.lookingAt === Direction.LEFT) {
      return { ...this.position, x: this.position.x - 1 };
    }

    // Right
    return { ...this.position, x: this.position.x + 1 };
  }

  public startMove(): void {
    this.isMoving = true;
  }

  public finishMove(): void {
    this.isMoving = false;
  }

  protected getAnimatedCharacter(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.height = CHARACTER_HEIGHT;
    canvas.width = CHARACTER_WIDTH;
    const ctx2 = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx2.clearRect(0, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT);

    let animationOffset = 0;

    if (this.isMoveInProgressSmooth()) {
      animationOffset = this.getCurrentOffset();
      this.nextFrame();
    } else {
      this.resetAnimation();
    }
    ctx2.drawImage(
      this.img,
      animationOffset,
      this.characterDirectionToYOffset[this.lookingAt],
    );
    this.nextFrame();
    return ctx2.canvas;
  }

  protected isMoveInProgressSmooth(): boolean {
    if (this.isMovingLastStates.length < 2) {
      this.isMovingLastStates.push(this.isMoving);
    } else {
      this.isMovingLastStates = this.isMovingLastStates.slice(1);
      this.isMovingLastStates.push(this.isMoving);
    }
    return !!this.isMovingLastStates.find((s) => s);
  }
}

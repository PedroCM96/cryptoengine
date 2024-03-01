import { Position } from "../shared";
import { Character } from "./Character.ts";
import { Direction } from "../input";
import {
  CELL_SIZE,
  CHARACTER_ANIMATION_MAP,
  CHARACTER_ANIMATION_SPEED,
  CHARACTER_SPEED,
} from "../config.ts";

export class NonPlayableCharacter extends Character {
  public TICKS_COOLDOWN = 40;

  currentRenderPosition: Position | null = null;
  private lookAtInteract: boolean;
  private resetDirectionAfterInteract: boolean;
  private defaultLookingAt: Direction;
  private cooldownCounter: number;
  private triggered = false;

  constructor(
    img: HTMLImageElement,
    position: Position,
    canMove: boolean,
    lookingAt: Direction,
    lookAtInteract: boolean,
    resetDirectionAfterInteract: boolean,
  ) {
    super(
      img,
      position,
      canMove,
      lookingAt,
      false,
      CHARACTER_ANIMATION_MAP,
      CHARACTER_ANIMATION_SPEED,
    );
    this.lookAtInteract = lookAtInteract;
    this.resetDirectionAfterInteract = resetDirectionAfterInteract;
    this.defaultLookingAt = lookingAt;
    this.cooldownCounter = 0;
  }

  private getRenderPosition(tlp: Position): Position {
    const diffX = Math.abs((tlp.x - this.position.x) * CELL_SIZE);
    const diffY = Math.abs((tlp.y - this.position.y) * CELL_SIZE);

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

    if (deltaX === 0 && deltaY === 0 && this.isMoveInProgress()) {
      this.finishMove();
    }

    return {
      x: Math.abs(this.currentRenderPosition.x),
      y: Math.abs(this.currentRenderPosition.y),
    };
  }

  /* eslint-ignore */
  render(ctx: CanvasRenderingContext2D, args: any) {
    const tlp = args.tlp as Position;

    this.isMoving = this.isMoveInProgress();
    const animatedCharacter = this.getAnimatedCharacter();

    const position = this.getRenderPosition(tlp);

    ctx.drawImage(animatedCharacter, position.x, position.y - 12);
  }

  move(direction: Direction): boolean {
    this.cooldownCounter = 0;
    return super.move(direction);
  }

  resetRenderPosition(): void {
    this.currentRenderPosition = null;
  }

  shouldLookAtInteract(): boolean {
    return this.lookAtInteract;
  }

  shouldResetLookingAt(): boolean {
    return this.resetDirectionAfterInteract;
  }

  resetLookingAt(): void {
    this.lookAt(this.defaultLookingAt);
  }

  incCooldownCounter(): void {
    this.cooldownCounter++;
  }

  getCooldownCounter(): number {
    return this.cooldownCounter;
  }

  trigger(): void {
    this.triggered = true;
  }

  halt(): void {
    this.triggered = false;
  }

  hasTriggered(): boolean {
    return this.triggered;
  }
}

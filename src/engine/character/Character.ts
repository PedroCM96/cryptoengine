import {Position} from "../shared";
import {Direction, getInputDirection, InputState} from "../input";
import {
    CELL_SIZE,
    CHARACTER_ANIMATION_MAP,
    CHARACTER_ANIMATION_SPEED,
    CHARACTER_HEIGHT,
    CHARACTER_WIDTH
} from "../config.ts";
import {Animable} from "../animation";

export class Character extends Animable {
    directionToYOffset: Record<Direction, number> = {
        [Direction.DOWN]: 0,
        [Direction.LEFT]: -48,
        [Direction.RIGHT]: -96,
        [Direction.UP]: -146
    }

    private position: Position; // Current position of the character in the map.
    private lookingAt: Direction; // If character is looking up, looking down...
    private canMove: boolean; // If character can move after press a direction input. For example, when a TextBox is opened.
    private isMoving: boolean; // If the character is currently moving.
    private moveInProgress: boolean; // If the character has a movement between cells pending.

    constructor(img: HTMLImageElement, position: Position) {
        super(CHARACTER_ANIMATION_MAP, img, CHARACTER_ANIMATION_SPEED);
        this.position = position;
        this.canMove = true;
        this.lookingAt = Direction.DOWN;
        this.isMoving = false;
        this.moveInProgress = false;
    }

    move(direction: Direction): boolean {
        if (!this.canMove || this.moveInProgress) {
            return false;
        }

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

    render(ctx: CanvasRenderingContext2D, inputState: InputState): void {
        this.isMoving = !!getInputDirection(inputState);
        const animatedCharacter = this.getAnimatedCharacter();

        ctx.drawImage(
            animatedCharacter,
            ctx.canvas.width / 2 - CHARACTER_WIDTH / 2 - (CELL_SIZE / 2),
            ctx.canvas.height / 2 - CHARACTER_HEIGHT / 2 - (CELL_SIZE / 2)
        );
    }

    getNextPosition(direction: Direction): Position {
        if (direction === Direction.UP) {
            return {
                x: this.position.x,
                y: this.position.y - 1
            }
        }

        if (direction === Direction.DOWN) {
            return {
                x: this.position.x,
                y: this.position.y + 1
            }
        }

        if (direction === Direction.LEFT) {
            return {
                x: this.position.x - 1,
                y: this.position.y
            }
        }

        // Right
        return {
            x: this.position.x + 1,
            y: this.position.y
        }
    }

    getPosition(): Position {
        return this.position;
    }

    lookAt(direction: Direction): void {
        this.lookingAt = direction;
    }

    isLookingAt(direction: Direction): boolean {
        return this.lookingAt === direction;
    }

    getLookingCellPosition(): Position {
        if (this.lookingAt === Direction.UP) {
            return {...this.position, y: this.position.y - 1};
        }

        if (this.lookingAt === Direction.DOWN) {
            return {...this.position, y: this.position.y + 1};
        }

        if (this.lookingAt === Direction.LEFT) {
            return {...this.position, x: this.position.x - 1};
        }

        // Right
        return {...this.position, x: this.position.x + 1};
    }

    public startMove(): void {
        this.moveInProgress = true;
    }

    public finishMove(): void {
        this.moveInProgress = false;
    }
    private getAnimatedCharacter(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.height = CHARACTER_HEIGHT;
        canvas.width = CHARACTER_WIDTH;
        const ctx2 = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx2.clearRect(0, 0, CHARACTER_WIDTH, CHARACTER_HEIGHT);

        let animationOffset = 0;

        if (this.isMoving) {
            animationOffset = this.getCurrentOffset();
            this.nextFrame();
        } else {
            this.resetAnimation();
        }
        ctx2.drawImage(this.img, animationOffset, this.directionToYOffset[this.lookingAt]);
        this.nextFrame();
        return ctx2.canvas;
    }
}
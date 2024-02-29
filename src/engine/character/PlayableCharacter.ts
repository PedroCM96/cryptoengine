import {Character} from "./Character.ts";
import {Position} from "../shared";
import {Direction} from "../input";
import {
    CELL_SIZE,
    CHARACTER_ANIMATION_MAP,
    CHARACTER_ANIMATION_SPEED,
    CHARACTER_HEIGHT,
    GAME_CANVAS_SIZE
} from "../config.ts";

export class PlayableCharacter extends Character {
    constructor(img: HTMLImageElement, position: Position) {
        super(img, position, true, Direction.DOWN, false, CHARACTER_ANIMATION_MAP, CHARACTER_ANIMATION_SPEED);
    }

    /* @ts-ignore */
    getRenderPosition(): Position {
        return {
            x: (GAME_CANVAS_SIZE[0] / 2) - CELL_SIZE / 2,
            y: GAME_CANVAS_SIZE[1] / 2 - CHARACTER_HEIGHT / 2 - (CELL_SIZE / 2)
        }
    }

    /* @ts-ignore */
    render(ctx: CanvasRenderingContext2D, args: any) {
        this.isMoving = this.isMoveInProgress();
        const animatedCharacter = this.getAnimatedCharacter();
        const position = this.getRenderPosition();

        ctx.drawImage(
            animatedCharacter,
            position.x,
            position.y + 10
        );
    };
}
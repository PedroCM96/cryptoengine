import {Position} from "../../shared";
import {Character} from "../../character";
import {CELL_SIZE, CHARACTER_SPEED, GAME_CANVAS_SIZE} from "../../config.ts";

export class Camera {
    private initializedCamera = false;

    constructor(private  position: Position) {}
    calculatePosition(position: Position, canvas: HTMLCanvasElement): Position {
        const characterPositionX = position.x * CELL_SIZE;
        const characterPositionY = position.y * CELL_SIZE;

        const x = -(characterPositionX - canvas.width / (2)) + (CELL_SIZE / 2);
        const y = -(characterPositionY - canvas.height / (2) + (CELL_SIZE / 2));

        return {x,y}
    }

    render(mapImage: HTMLImageElement, character: Character, ctx: CanvasRenderingContext2D): void {
        const targetPosition = this.calculatePosition(character.getPosition(), ctx.canvas);

        if (!this.shouldSmooth()) {
            this.initializedCamera = true;
            ctx.drawImage(mapImage, this.position.x, this.position.y);
            this.position.x = targetPosition.x;
            this.position.y = targetPosition.y;
            return;
        }

        const deltaX = Math.round(targetPosition.x - this.position.x);
        const deltaY = Math.round(targetPosition.y - this.position.y);

        this.position.x += deltaX * CHARACTER_SPEED;
        this.position.y += deltaY * CHARACTER_SPEED;

        if (deltaX === 0 && deltaY === 0) {
            character.finishMove();
        }

        ctx.drawImage(mapImage, this.position.x, this.position.y);
    }

    isVisible(position: Position, referencePosition: Position) {
        const xScope = Math.floor(GAME_CANVAS_SIZE[0] / CELL_SIZE / 2);
        const yScope = Math.floor(GAME_CANVAS_SIZE[1] / CELL_SIZE / 2);

        return (position.x <= (referencePosition.x + xScope) && (position.x >= (referencePosition.x - xScope))
            && (position.y <= referencePosition.y + yScope) && ((position.y) >= (referencePosition.y - yScope)));
    }

    getTopLeftCornerCellPosition(referencePosition: Position): Position {
        return {
            x: referencePosition.x - Math.floor(GAME_CANVAS_SIZE[0] / CELL_SIZE / 2),
            y: referencePosition.y - Math.floor(GAME_CANVAS_SIZE[1] / CELL_SIZE / 2)
        }
    }

    private shouldSmooth(): boolean {
        return this.initializedCamera;
    }
}
import {Position} from "../../shared";
import {Character} from "../../character";
import {CELL_SIZE, CHARACTER_SPEED} from "../../config.ts";

export class Camera {
    constructor(private  position: Position) {}
    calculatePosition(position: Position, canvas: HTMLCanvasElement): Position {
        let characterPositionX = position.x * CELL_SIZE;
        let characterPositionY = position.y * CELL_SIZE;

        const x = -(characterPositionX - canvas.width / (2));
        const y = -(characterPositionY - canvas.height / (2));

        return {x,y}
    }

    render(mapImage: HTMLImageElement, character: Character, ctx: CanvasRenderingContext2D): void {
        const targetPosition = this.calculatePosition(character.getPosition(), ctx.canvas);

        if (!this.shouldSmooth()) {
            ctx.drawImage(mapImage, this.position.x, this.position.y);
            this.position.x = targetPosition.x;
            this.position.y = targetPosition.y;
            return;
        }

        const deltaX = Math.round(targetPosition.x - this.position.x);
        const deltaY = Math.round(targetPosition.y - this.position.y);

        this.position.x += deltaX * CHARACTER_SPEED;
        this.position.y += deltaY * CHARACTER_SPEED;

        if (deltaX !== 0 || deltaY !== 0) {
            character.startMove();
        } else {
            character.finishMove();
        }

        ctx.drawImage(mapImage, this.position.x, this.position.y);
    }

    private shouldSmooth(): boolean {
        return this.position.x !== 0 && this.position.y !== 0;
    }
}
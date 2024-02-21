import {Position} from "../types";
import {Direction} from "../input";

export class Character {
    private position: Position;
    private lookingAt: Direction;
    private canMove: boolean;

    constructor() {
        this.position = {x: 1, y: 1};
        this.canMove = true;
        this.lookingAt = Direction.DOWN;
    }

    enableMovement(): void {
        this.canMove = true;
    }

    disableMovement(): void {
        this.canMove = false;
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

    move(direction: Direction): boolean {
        if (!this.canMove) {
            return false;
        }

       this.position = this.getNextPosition(direction);
       this.lookingAt = direction;
       return true;
    }

    getPosition(): Position {
        return this.position;
    }

    isLookingAt(direction: Direction): boolean {
        return this.lookingAt === direction;
    }
}
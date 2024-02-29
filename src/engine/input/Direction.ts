export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export function directionFromString(str: string): Direction {
    if (str === 'UP') {
        return Direction.UP;
    }

    if (str === 'DOWN') {
        return Direction.DOWN;
    }

    if (str === 'LEFT') {
        return Direction.LEFT;
    }

    if (str === 'RIGHT') {
        return Direction.RIGHT;
    }

    throw new Error(`Can not parse ${str} to a valid Direction`);
}

export function getAllDirections(): Direction[] {
    return [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
}
export type Position = {
    x: number,
    y: number
}

export function positionToString(position: Position): string {
    return `${position.x},${position.y}`;
}
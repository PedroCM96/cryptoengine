import { Direction } from "../input";

export type Position = {
  x: number;
  y: number;
};

export function positionToString(position: Position): string {
  return `${position.x},${position.y}`;
}

export function positionFromString(str: string): Position {
  const parts = str.split(",");
  return {
    x: parseInt(parts[0]),
    y: parseInt(parts[1]),
  };
}

export function getPositionRelativeDirection(
  positionA: Position,
  positionB: Position,
): Direction {
  if (positionA.x < positionB.x) {
    return Direction.LEFT;
  }

  if (positionA.x > positionB.x) {
    return Direction.RIGHT;
  }

  if (positionA.y < positionB.y) {
    return Direction.UP;
  }

  return Direction.DOWN;
}

export function isEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

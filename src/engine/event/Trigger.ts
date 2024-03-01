export enum Trigger {
  COLLISION = "COLLISION",
  INTERACT = "INTERACT",
}

export function triggerFromString(str: string): Trigger {
  if (str === "COLLISION") {
    return Trigger.COLLISION;
  }

  if (str === "INTERACT") {
    return Trigger.INTERACT;
  }

  throw new Error(`Can not parse ${str} to a valid event trigger`);
}

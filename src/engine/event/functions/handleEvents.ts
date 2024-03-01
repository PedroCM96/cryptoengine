import { Event } from "../Event.ts";
import { Trigger } from "../Trigger.ts";
import { Global } from "../../Global.ts";

export async function handleEvents(global: Global): Promise<void> {
  const inProgressEvent = global.map.getInProgressEvent();
  if (inProgressEvent) {
    await inProgressEvent.execute(global);
  }

  const currentCharacterPosition = global.character.getPosition();
  const characterLookingCellPosition =
    global.character.getLookingCellPosition();

  const shouldExecuteEvent =
    global.map.hasEventAt(currentCharacterPosition) ||
    global.map.hasEventAt(characterLookingCellPosition);

  if (shouldExecuteEvent) {
    let isCollidingWithEvent = true;
    let event = global.map.getEventAt(currentCharacterPosition);
    if (event === null) {
      event = global.map.getEventAt(characterLookingCellPosition) as Event;
      isCollidingWithEvent = false;
    }

    if (event.isRunning()) {
      await event.execute(global);
      return;
    }

    if (event.getTrigger() === Trigger.COLLISION && isCollidingWithEvent) {
      await event.execute(global);
      return;
    }

    if (event.getTrigger() === Trigger.INTERACT && global.inputState.ACCEPT) {
      await event.execute(global);
      return;
    }
  }
}

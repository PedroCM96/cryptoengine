import {Event} from "./Event.ts";
import {Trigger} from "./Trigger.ts";
import {Global} from "../Global.ts";

export async function handleEvents(global: Global): Promise<void> {
    const currentCharacterPosition = global.character.getPosition();
    const hasAnyEvent = global.map.hasEventAt(currentCharacterPosition);
    if (hasAnyEvent) {
        const event = global.map.getEventAt(currentCharacterPosition) as Event;

        if (event.getTrigger() === Trigger.COLLISION) {
            await event.execute(global);
        }
    }
}
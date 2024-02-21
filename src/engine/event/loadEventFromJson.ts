import {triggerFromString} from "./Trigger.ts";
import {Script} from "./Script.ts";
import {Event} from "./Event.ts";
import {loadAction} from "./actions";
import {Action} from "./Action.ts";

export async function loadEventFromJson(data: any): Promise<Event> {

    const id = parseInt(data.id);
    const trigger = triggerFromString(data.trigger);
    const allowMove = data.allowMove;
    const permanent = data.permanent;

    const actions: Action[] = [];
    for (const action of data.script) {
        if (Object.keys(action).length > 1) {
            throw new Error('Invalid events json. Each event should have just one root key');
        }

        const rootKey = Object.keys(action)[0];
        const a = await loadAction(rootKey, action[rootKey]);
        actions.push(a);
    }

    return new Event(id, trigger, new Script(actions), allowMove, permanent);
}
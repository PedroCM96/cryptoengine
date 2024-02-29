import {triggerFromString} from "../Trigger.ts";
import {Script} from "../Script.ts";
import {Event} from "../Event.ts";
import {loadAction} from "../actions";
import {Action} from "../Action.ts";
import {NonPlayableCharacter} from "../../character/NonPlayableCharacter.ts";

export async function loadEventFromJson(data: any): Promise<Event> {

    const id = parseInt(data.id);
    const trigger = triggerFromString(data.trigger);
    const allowMove = data.allowMove;
    const permanent = data.permanent;
    const jsonNpc = data.npc;

    const actions: Action[] = [];
    for (const action of data.script) {
        if (Object.keys(action).length > 1) {
            throw new Error('Invalid events json. Each event action should have just one root key');
        }

        const rootKey = Object.keys(action)[0];
        const a = await loadAction(rootKey, action[rootKey]);
        actions.push(a);
    }

    let npc: NonPlayableCharacter | null = null;
    if (jsonNpc) {
        const img = new Image();
        img.src = jsonNpc.resource;
        npc = new NonPlayableCharacter(
            img,
            {x: 0, y: 0},
            jsonNpc.canMove,
            jsonNpc.lookingAt,
            jsonNpc.lookAtInteract,
            jsonNpc.resetDirectionAfterInteract
        );
    }

    return new Event(id, trigger, new Script(actions), allowMove, permanent, npc);
}
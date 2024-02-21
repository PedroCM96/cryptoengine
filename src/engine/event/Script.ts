import {Action} from "./Action.ts";
import {Global} from "../Global.ts";

export class Script {
    constructor(public readonly actions: Array<Action>) {}

    async reproduce(global: Global): Promise<void> {
        for (const action of this.actions) {
            if (action.isEnabled) {
                await action.execute(global);
                break;
            }
        }
    }
}
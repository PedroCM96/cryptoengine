import {Action} from "./Action.ts";
import {Global} from "../Global.ts";

export class Script {
    private lastActionExecuted: number|null = null;
    constructor(private readonly actions: Array<Action>) {}

    async reproduce(global: Global): Promise<void> {
        for (let i = 0; i < this.actions.length; i++) {
            const action = this.actions[i];
            if (action.isEnabled) {
                await action.execute(global);
                this.lastActionExecuted = i;
                break;
            }
        }
    }

    isCurrentlyRunning(): boolean {
        return this.lastActionExecuted != null
        && this.lastActionExecuted < this.actions.length - 1;
    }

    getActions(): Action[] {
        return this.actions;
    }
}
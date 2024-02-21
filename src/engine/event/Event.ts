import {Trigger} from "./Trigger.ts";
import {Script} from "./Script.ts";
import {Global} from "../Global.ts";

export  class Event {
    constructor(
        private readonly id: number,
        private readonly trigger: Trigger,
        private readonly script: Script,
        private readonly allowMove: boolean,
        private readonly permanent: boolean
    ) {}

    getTrigger(): Trigger {
       return this.trigger;
    }

    getId(): number {
        return this.id;
    }

    allowsMove(): boolean {
        return this.allowMove;
    }

    isPermanent(): boolean {
        return this.permanent;
    }

    async execute(global: Global): Promise<void> {
        await this.script.reproduce(global);
    }

    isEnabled(): boolean {
        return this.script.actions.filter((a) => a.isEnabled).length > 0
    }

    restore(): void {
        for (const action of this.script.actions) {
            action.enable();
        }
    }
}
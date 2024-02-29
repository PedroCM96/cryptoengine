import {Trigger} from "./Trigger.ts";
import {Script} from "./Script.ts";
import {Global} from "../Global.ts";
import {NonPlayableCharacter} from "../character/NonPlayableCharacter.ts";
import {getPositionRelativeDirection, Position} from "../shared";

export class Event {
    constructor(
        private readonly id: number,
        private readonly trigger: Trigger,
        private readonly script: Script,
        private readonly allowMove: boolean,
        private readonly permanent: boolean,
        private readonly npc: NonPlayableCharacter | null = null
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
        if (this.isNpc()) {
            this.handleNpcExecution(global.character.getPosition());
        }

        await this.script.reproduce(global);
    }

    isEnabled(): boolean {
        return this.script.getActions().filter((a) => a.isEnabled).length > 0
    }

    restore(): void {
       this.script.restore();

        if (this.isNpc() && this.npc?.hasTriggered()) {
            this.npc?.resetLookingAt();
            this.npc?.halt();
        }
    }

    isRunning(): boolean {
        return this.script.isCurrentlyRunning();
    }

    isNpc(): boolean {
        return !!this.npc;
    }

    getNpc(): NonPlayableCharacter | null {
        return this.npc;
    }

    private handleNpcExecution(characterPosition: Position): void {
        const npc = this.getNpc() as NonPlayableCharacter;
        npc.trigger();
        if (npc.shouldLookAtInteract()) {
            npc?.lookAt(getPositionRelativeDirection(characterPosition, npc.getPosition()));
        }
    }
}
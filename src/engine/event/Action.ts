import {Global} from "../Global.ts";
import {resetInputState} from "../input";

export abstract class Action {
    public isEnabled: boolean = true;
    private isExecuting: boolean = false;
    constructor() {}

    protected abstract doExecute(global: Global): Promise<void>;
    public async execute(global: Global): Promise<void> {
        /**
         * We want a clean input state for events execution the very first time this method
         * is called. For example, some Interactive Events depends on Action Buttons, and for
         * activate Interactive Events is mandatory to press the Action Button. So, the first
         * execution, the Action Button will be pressed in InputState, and this can generate
         * problems for example with ShowMessage, that will close the TextBox if Accept Button
         * is pressed.
         */
        if (!this.isExecuting) {
            resetInputState(global.inputState);
        }
        await this.doExecute(global);
    }

    static load(data: any): Action {
        throw new Error(`Should override this method! ${data}`);
    }

    protected start(): void {
        this.isExecuting = true;
    }

    protected finish(): void {
        this.isExecuting = false;
    }

    public enable(): void {
        this.isEnabled = true;
    }

    protected disable(): void {
        this.isEnabled = false;
    }
}
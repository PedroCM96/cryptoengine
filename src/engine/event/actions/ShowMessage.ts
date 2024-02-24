
import {Global} from "../../Global.ts";
import {Action} from "../Action";

export class ShowMessage extends Action {
    constructor(private readonly message: string) {
        super();
    }

    static load(data: any): Action {
        if (typeof data !== 'string') {
            throw new Error('ShowMessage load method should receive an string');
        }

        return new ShowMessage(data);
    }

    async doExecute(global: Global): Promise<void> {
        this.start();
        global.character.disableMovement();
        global.ui.openTextBox(this.message);

        if (global.inputState.ACCEPT) {
            global.ui.closeTextBox();
            global.character.enableMovement();
            this.disable();
            this.finish();
        }
    }
}
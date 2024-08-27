import { Global } from "../../Global.ts";
import { Action } from "../Action";
import { Interpolator } from "../../shared";

export class ShowMessage extends Action {
  constructor(private readonly message: string) {
    super();
  }

  static async load(data: any): Promise<Action> {
    if (typeof data !== "string") {
      throw new Error("ShowMessage load method should receive an string");
    }

    return new ShowMessage(data);
  }

  async doExecute(global: Global): Promise<void> {
    this.start();
    global.character.disableMovement();
    const text = Interpolator.interpolate(this.message, global.variables);
    global.ui.openTextBox(text);

    if (global.inputState.ACCEPT) {
      global.ui.closeTextBox();
      global.character.enableMovement();
      this.disable();
      this.finish();
    }
  }
}

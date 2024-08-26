import { Action } from "./Action.ts";
import { Global } from "../Global.ts";

export class Script {
  private lastActionExecuted: number | null = null;
  private isRunning: boolean = false;
  private _hasFinished: boolean = false;

  constructor(private readonly actions: Array<Action>) {}

  async reproduce(global: Global): Promise<void> {
    this.isRunning = true;
    for (let i = 0; i < this.actions.length; i++) {
      const action = this.actions[i];
      if (action.isEnabled) {
        this._hasFinished = false;
        await action.execute(global);
        if (!action.isEnabled) {
          this.lastActionExecuted = i;
        }
        break;
      }
    }

    if (this.lastActionExecuted === this.actions.length - 1) {
      this.isRunning = false;
      this._hasFinished = true;
    }
  }

  isCurrentlyRunning(): boolean {
    return this.isRunning;
  }

  getActions(): Action[] {
    return this.actions;
  }

  restore(): void {
    for (const action of this.getActions()) {
      action.enable();
    }

    this.isRunning = false;
    this.lastActionExecuted = null;
  }

  hasFinished(): boolean {
    return this._hasFinished;
  }
}

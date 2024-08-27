import { Action } from "../Action.ts";
import { Global } from "../../Global.ts";
import { VariableKey } from "../../variable";
import { Condition, Operator } from "./condition";
import { Script } from "../Script.ts";
import { loadAction } from "./loadAction.ts";

export class Conditional extends Action {
  constructor(
    private readonly _condition: Condition,
    private readonly _then: Script,
    private readonly _else : Script
  ) {
    super();
  }

  protected async doExecute(global: Global): Promise<void> {
    this.start();
    if (this._condition.test(global.variables)) {
      await this._then.reproduce(global);
    } else {
      await this._else.reproduce(global);
    }

    if (this._then.hasFinished()) {
      this._then.restore();
    }

    if (this._else.hasFinished()) {
      this._else.restore();
    }

    if (!this._then.isCurrentlyRunning() && !this._else.isCurrentlyRunning()) {
      this.finish();
      this.disable();
    }
  }

  static async load(data: any): Promise<Action> {
    const variable: VariableKey = data.variable as VariableKey;
    const operator: Operator = data.operator as Operator;
    const value: string = data.value;

    const jsonThen = data.then;
    const jsonElse = data.else;

    const thenActions: Action[] = [];
    const elseActions: Action[] = [];

    for (const action of jsonThen) {
      if (Object.keys(action).length > 1) {
        throw new Error(
          "Invalid events json. Each event action should have just one root key",
        );
      }

      const rootKey = Object.keys(action)[0];
      const a = await loadAction(rootKey, action[rootKey]);
      thenActions.push(a);
    }

    for (const action of jsonElse) {
      if (Object.keys(action).length > 1) {
        throw new Error(
          "Invalid events json. Each event action should have just one root key",
        );
      }

      const rootKey = Object.keys(action)[0];
      const a = await loadAction(rootKey, action[rootKey]);
      elseActions.push(a);
    }

    const thenScript = new Script(thenActions);
    const elseScript = new Script(elseActions);

    const condition = new Condition(variable, operator, value);
    return new Conditional(condition, thenScript, elseScript);
  }
}
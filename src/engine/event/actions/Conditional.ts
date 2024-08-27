import { Action } from "../Action.ts";
import { Global } from "../../Global.ts";
import { VariableKey } from "../../variable";
import { Condition, Operator } from "./condition";

export class Conditional extends Action {
  constructor(private readonly condition: Condition) {
    super();
  }

  protected async doExecute(global: Global): Promise<void> {
    this.start();
    if (this.condition.test(global.variables)) {
      console.log("Condition OK!!");
    } else {
      console.log("Condition NOT OK!!");
    }

    this.disable();
    this.finish();
  }

  static load(data: any): Action {
    const variable: VariableKey = data.variable as VariableKey;
    const operator: Operator = data.operator as Operator;
    const value: string = data.value;

    const condition = new Condition(variable, operator, value);
    return new Conditional(condition);
  }
}
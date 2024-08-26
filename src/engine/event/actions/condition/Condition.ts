import { Variable, VariableKey } from "../../../variable";
import { isNumericOperator, Operator } from "./Operator.ts";

export class Condition {
  constructor(
    private readonly _variable: VariableKey,
    private readonly _operator: Operator,
    private readonly _value: string
  ) {}

  test(variables: Variable): boolean {
    const isNumericComparison = isNumericOperator(this._operator);
    if (isNumericComparison) {
      return this.numericComparison(variables);
    }

    const variable = variables.get<string>(this._variable);
    const value: string | null = (this._value as string).toUpperCase() === 'NULL' ? null : this._value;

    if (this._operator === Operator.EQUAL) {
      return variable?.toUpperCase() === value?.toUpperCase();
    }

    return variable?.toUpperCase() !== value?.toUpperCase();
  }

  private numericComparison(variables: Variable): boolean {
    const variable = variables.get<number>(this._variable) || 0;
    if (this._operator === Operator.LT) {
      return variable < parseInt(this._value);
    }

    if (this._operator === Operator.LTE) {
      return variable <= parseInt(this._value);
    }

    if (this._operator === Operator.GT) {
      return variable > parseInt(this._value);
    }

    // Default GTE
    return variable >= parseInt(this._value);
  }
}
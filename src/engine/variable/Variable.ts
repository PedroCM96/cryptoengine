import { VariableKey } from "./VariableKey.ts";

export class Variable {
  private readonly variables: Map<VariableKey, any> = new Map();

  constructor() {
    this.variables = new Map();
  }

  get<T>(key: VariableKey): T | null {
    const value = this.variables.get(key);
    return value ? value : null;
  }

  set(key: VariableKey, value: any): void {
    this.variables.set(key, value);
  }
}
import { JSON_KEY_TO_ACTION_CLASS } from "./JsonKeyToActionClass.ts";
import { Action } from "../Action";

export async function loadAction(
  actionKey: string,
  actionData: any,
): Promise<Action> {
  const className = JSON_KEY_TO_ACTION_CLASS[actionKey];

  if (!className) {
    throw new Error(`Unknown action key ${actionKey}`);
  }

  const classModule = await import(`../actions/${className}.ts`);
  return await classModule[className].load(actionData);
}

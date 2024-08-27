import { Action } from "../Action.ts";
import { Global } from "../../Global.ts";

export class ConnectWallet extends Action {

  protected async doExecute(global: Global): Promise<void> {
    if (!global.web3) {
      throw new Error('Cannot detect Metamask');
    }

    await global.web3.connect();
    this.disable();
    this.finish();
  }

  static async load(): Promise<Action> {
    return new ConnectWallet();
  }
}
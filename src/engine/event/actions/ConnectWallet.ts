import { Action } from "../Action.ts";
import { Global } from "../../Global.ts";

export class ConnectWallet extends Action {

  protected async doExecute(global: Global): Promise<void> {
    if (!global.ethereum) {
      throw new Error('Cannot detect Metamask');
    }

    await global.ethereum.request({ method: 'eth_requestAccounts' });
    this.disable();
    this.finish();
  }

  static load(): Action {
    return new ConnectWallet();
  }
}
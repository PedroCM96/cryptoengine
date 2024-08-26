import { BrowserProvider } from "ethers";

export class Web3 {
  constructor(private readonly provider: BrowserProvider) {}

  async isConnected(): Promise<boolean> {
    const accounts = await this.provider.send('eth_accounts', []);
    return accounts.length > 0;
  }

  async connect(): Promise<void> {
    await this.provider.send('eth_requestAccounts', []);
  }

  async getUserAddress(): Promise<string> {
    const signer = await this.provider.getSigner();
    return await signer.getAddress();
  }
}
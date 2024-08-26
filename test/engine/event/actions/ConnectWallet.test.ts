import { ConnectWallet } from "../../../../src/engine/event/actions";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { Global } from "../../../../src/engine";
import { mockGlobal } from "../../mockGlobal";
import { MetaMaskInpageProvider } from "@metamask/providers";

describe('Connect Wallet action test', () => {
  const sut = ConnectWallet;
  let global: StubbedInstance<Global>;
  let ethereum: StubbedInstance<MetaMaskInpageProvider>;

  beforeEach(() => {
    ethereum = stubInterface<MetaMaskInpageProvider>();
    global = mockGlobal({ethereum});
    jest.clearAllMocks();
  });

  it("Should load correctly the action without any argument", () => {
    expect(sut.load()).toBeInstanceOf(ConnectWallet);
  });

  it("Should request for connection to web3 provider", async () => {
    await new sut().execute(global);
    expect(ethereum.request.callCount).toBe(1);
    expect(ethereum.request.calledWith({ method: 'eth_requestAccounts' })).toBeTruthy();

  });
})
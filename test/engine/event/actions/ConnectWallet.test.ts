import { ConnectWallet } from "../../../../src/engine/event/actions";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { Global } from "../../../../src/engine";
import { mockGlobal } from "../../mockGlobal";
import { Web3 } from "../../web3";

describe('Connect Wallet action test', () => {
  const sut = ConnectWallet;
  let global: StubbedInstance<Global>;
  let web3: StubbedInstance<Web3>;

  beforeEach(() => {
    web3 = stubInterface<Web3>();
    global = mockGlobal({web3});
    jest.clearAllMocks();
  });

  it("Should load correctly the action without any argument", async () => {
    const instance = await sut.load();
    expect(instance).toBeInstanceOf(ConnectWallet);
  });

  it("Should request for connection to web3 provider", async () => {
    await new sut().execute(global);
    expect(web3.connect.callCount).toBe(1);
  });
})
import { StubbedInstance, stubConstructor } from "ts-sinon";
import { Global, UI } from "../../src/engine";
import { Map } from "../../src/engine";
import { InputState } from "../../src/engine/input";
import { Character, PlayableCharacter } from "../../src/engine/character";
import { Bus } from "../../src/engine/bus";
import { MetaMaskInpageProvider } from "@metamask/providers";

type GlobalNullableConstructor = {
  ctx?: CanvasRenderingContext2D;
  inputState?: InputState;
  character?: Character;
  map?: Map;
  ui?: UI;
  bus?: Bus;
  document?: Document;
  ethereum?: MetaMaskInpageProvider;
};
export function mockGlobal(
  args: GlobalNullableConstructor,
): StubbedInstance<Global> {
  // @ts-ignore
  return stubConstructor(
    Global,
    args.ctx as CanvasRenderingContext2D,
    args.inputState as InputState,
    args.character as PlayableCharacter,
    args.map as Map,
    args.ui as UI,
    args.bus as Bus,
    args.document as Document,
    args.ethereum as MetaMaskInpageProvider
  );
}

import { StubbedInstance, stubConstructor } from "ts-sinon";
import { Global, Map, UI } from "../../src/engine";
import { InputState } from "../../src/engine/input";
import { Character, PlayableCharacter } from "../../src/engine/character";
import { Bus } from "../../src/engine/bus";
import { Web3 } from "./web3";

type GlobalNullableConstructor = {
  ctx?: CanvasRenderingContext2D;
  inputState?: InputState;
  character?: Character;
  map?: Map;
  ui?: UI;
  bus?: Bus;
  document?: Document;
  web3?: Web3;
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
    args.web3 as Web3
  );
}

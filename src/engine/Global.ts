import { InputState } from "./input";
import { PlayableCharacter } from "./character";
import { Map } from "./map";
import { UI } from "./ui";
import { Bus } from "./bus";
import { Web3 } from "../../test/engine/web3";

export class Global {
  constructor(
    public readonly ctx: CanvasRenderingContext2D,
    public readonly inputState: InputState,
    public readonly character: PlayableCharacter,
    public readonly map: Map,
    public readonly ui: UI,
    public readonly bus: Bus,
    public readonly document: Document,
    public readonly web3: Web3
  ) {}
}

import {InputState} from "./input";
import {Character} from "./character";
import {Map} from "./map";
import {UI} from "./ui";

export class Global {
    constructor(
        public readonly ctx: CanvasRenderingContext2D,
        public readonly inputState: InputState,
        public readonly character: Character,
        public readonly map: Map,
        public readonly ui: UI
    ) {}
}
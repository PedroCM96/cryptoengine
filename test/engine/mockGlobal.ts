import {StubbedInstance, stubConstructor} from "ts-sinon";
import {Global, UI} from "../../src/engine";
import {Map} from "../../src/engine";
import {InputState} from "../../src/engine/input";
import {Character} from "../../src/engine/character";
import {Bus} from "../../src/engine/bus";

type GlobalNullableConstructor = {
    /* @ts-ignore*/
    ctx?: CanvasRenderingContext2D,
    inputState?: InputState,
    character?: Character,
    map?: Map,
    ui?: UI,
    bus?: Bus,
    /* @ts-ignore */
    document?: Document
}
export function mockGlobal(args: GlobalNullableConstructor): StubbedInstance<Global> {
    return stubConstructor(
        Global,
        args.ctx,
        args.inputState,
        args.character,
        args.map,
        args.ui,
        args.bus,
        args.document
        );
}
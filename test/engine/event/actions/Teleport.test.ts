import { Teleport } from "../../../../src/engine/event/actions/Teleport";
import { Direction } from "../../../../src/engine/input";
import { Position } from "../../../../src/engine/shared";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { Bus, BusMessageType } from "../../../../src/engine/bus";
import { Global } from "../../../../src/engine";
import { mockGlobal } from "../../mockGlobal";

describe("Teleport action test", () => {
  const sut = Teleport;
  let bus: StubbedInstance<Bus>;
  let global: StubbedInstance<Global>;

  beforeEach(() => {
    bus = stubInterface<Bus>();
    global = mockGlobal({ bus });
  });

  it("Should return a valid instance", async () => {
    const data = {
      mapId: 1,
      position: [10, 10],
      lookingAt: "UP",
    };

    const instance = await sut.load(data);
    /* @ts-expect-error ignore */
    expect(instance.mapId).toBe(1);
    /* @ts-expect-error ignore */
    expect(instance.characterPosition).toStrictEqual({ x: 10, y: 10 });
    /* @ts-expect-error ignore */
    expect(instance.characterLookAt).toBe(Direction.UP);
  });

  it("Should add teleport message to bus", async () => {
    const mapId = 99;
    const characterPosition: Position = { x: 104, y: 424 };
    const characterLookAt: Direction = Direction.RIGHT;
    const instance = new sut(mapId, characterPosition, characterLookAt);

    await instance.execute(global);

    expect(bus.addMessage.callCount).toBe(1);
    expect(bus.addMessage.getCall(0).args).toStrictEqual([
      [BusMessageType.TELEPORT, { mapId, characterPosition, characterLookAt }],
    ]);
  });
});

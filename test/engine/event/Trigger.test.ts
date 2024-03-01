import { Trigger, triggerFromString } from "../../../src/engine/event";

describe("Test triggerFromString function test", () => {
  it("Should throw error if string is not valid", () => {
    expect(() => triggerFromString("Invalid string")).toThrow();
  });

  it("Should return Trigger.COLLISION", () => {
    const trigger = triggerFromString("COLLISION");
    expect(trigger).toBe(Trigger.COLLISION);
  });

  it("Should return Trigger.INTERACT", () => {
    const trigger = triggerFromString("INTERACT");
    expect(trigger).toBe(Trigger.INTERACT);
  });
});

import { ShowMessage } from "../../../../src/engine/event/actions";
import { InputState, resetInputState } from "../../../../src/engine/input";
import { Global, UI } from "../../../../src/engine";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { mockGlobal } from "../../mockGlobal";
import { Character } from "../../../../src/engine/character";

jest.mock("../../../../src/engine/input/InputState", () => ({
  resetInputState: jest.fn(),
}));

describe("Show Message action test", () => {
  const message = "Hello world!!";
  const sut = ShowMessage;

  let resetInputStateMock: jest.Mock;
  let character: StubbedInstance<Character>;
  let ui: StubbedInstance<UI>;
  let inputState: InputState;
  let global: StubbedInstance<Global>;

  beforeEach(() => {
    resetInputStateMock = resetInputState as jest.Mock;
    character = stubInterface<Character>();
    ui = stubInterface<UI>();
    inputState = {} as InputState;

    global = mockGlobal({ inputState, character, ui });
  });

  it("Should fail load function if data type is not string", () => {
    expect(() => sut.load({})).toThrow();
  });

  it("Should return a valid instance", () => {
    const instance = sut.load(message);
    expect(instance.constructor.name).toBe("ShowMessage");
  });

  it("Should reset input state at first execution", () => {
    const instance = new sut(message);
    instance.execute(global);
    expect(resetInputStateMock.mock.calls).toHaveLength(1);
    instance.execute(global); // 2nd execution should not call resetInputState
    expect(resetInputStateMock.mock.calls).toHaveLength(1);
  });

  it("Should maintain TextBox opened if ACCEPT button is not pressed", () => {
    const instance = new sut(message);
    instance.execute(global);
    expect(ui.openTextBox.callCount).toBe(1);
    expect(ui.closeTextBox.callCount).toBe(0);
  });

  it("Should disable character movement if event is not finished", () => {
    const instance = new sut(message);
    instance.execute(global);
    expect(character.disableMovement.callCount).toBe(1);
    expect(character.enableMovement.callCount).toBe(0);
  });

  it("Should close TextBox if ACCEPT button is pressed", () => {
    const instance = new sut(message);
    instance.execute(global);
    // Next execution after input state reset
    inputState.ACCEPT = true;
    instance.execute(global);
    expect(ui.closeTextBox.callCount).toBe(1);
  });

  it("Should enable character movement if ACCEPT button is pressed", () => {
    const instance = new sut(message);
    instance.execute(global);
    // Next execution after input state reset
    inputState.ACCEPT = true;
    instance.execute(global);
    expect(character.enableMovement.callCount).toBe(1);
  });
});

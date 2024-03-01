import {
  Direction,
  getInputDirection,
  InputState,
} from "../../../../src/engine/input";
import { shouldMoveCharacter } from "../../../../src/engine/character";

jest.mock("../../../../src/engine/input/functions/getInputDirection", () => ({
  getInputDirection: jest.fn(),
}));

describe("Should Move Character functions test", () => {
  const sut = shouldMoveCharacter;

  let getInputDirectionMock: jest.Mock;
  let inputState: InputState;

  beforeEach(() => {
    getInputDirectionMock = getInputDirection as jest.Mock;
    inputState = {} as InputState;
  });

  it("Should return false if getInputDirection returns false", () => {
    getInputDirectionMock.mockReturnValue(null);
    expect(sut(inputState)).toBeFalsy();
  });

  it("Should return false if getInputDirection returns false", () => {
    getInputDirectionMock.mockReturnValue(Direction.UP);
    expect(sut(inputState)).toBeTruthy();
  });
});

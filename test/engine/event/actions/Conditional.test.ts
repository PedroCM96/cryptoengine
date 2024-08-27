import { Conditional } from "../../../../src/engine/event/actions/Conditional";

describe("Conditional action test", () => {
  const sut = Conditional;

  it('Should return a valid instance', async () => {
    const instance = await sut.load({
      variable: 'USER_ADDRESS',
      operator: 'EQUAL',
      value: 'null',
      then: [],
      else: []
    });

    expect(instance instanceof Conditional).toBeTruthy();
  });
});
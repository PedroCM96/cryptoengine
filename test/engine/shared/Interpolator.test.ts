import { Interpolator } from "../../../src/engine/shared";
import { StubbedInstance, stubInterface } from "ts-sinon";
import { Variable, VariableKey } from "../../../src/engine/variable";

describe("Interpolator test", () => {
  const sut = Interpolator;
  let variables: StubbedInstance<Variable>;

  beforeEach(() => {
    variables = stubInterface<Variable>();
  });

  it("Should leave intact a text without template", () => {
    const template = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    const result = sut.interpolate(template, variables);
    expect(result).toEqual(template);
    expect(variables.get.callCount).toBe(0);
  });

  it("Should interpolate an string with one template", () => {
    const template = 'Lorem ipsum dolor {{FOO}} amet, consectetur adipiscing elit';
    variables.get.onFirstCall().returns('Bar');

    const result = sut.interpolate(template, variables);
    expect(variables.get.calledWith('FOO' as VariableKey)).toBeTruthy();
    expect(result).toEqual('Lorem ipsum dolor Bar amet, consectetur adipiscing elit');
  });

  it("Should interpolate an string with two templates", () => {
    const template = 'Lorem ipsum dolor {{FOO}} amet, {{BAR}} consectetur adipiscing elit';
    variables.get.onFirstCall().returns('Baz');
    variables.get.onSecondCall().returns('Coz');

    const result = sut.interpolate(template, variables);
    expect(result).toBe('Lorem ipsum dolor Baz amet, Coz consectetur adipiscing elit');
  });
});
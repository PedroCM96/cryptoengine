import { Condition, Operator } from "../../../../../src/engine/event/actions/condition";
import { Variable, VariableKey } from "../../../../../src/engine/variable";
import { StubbedInstance, stubInterface } from "ts-sinon";

describe("Condition class test", () => {
  let variables: StubbedInstance<Variable>;

  beforeEach(() => {
    variables = stubInterface<Variable>();
  });

  it("Should apply properly EQUAL operator", () => {
    const sut = new Condition(VariableKey.USER_ADDRESS, Operator.EQUAL, 'foo');
    variables.get.returns('foo')
    expect(sut.test(variables)).toBeTruthy()
  });

  it("Should apply properly EQUAL operator case insensitive", () => {
    const sut = new Condition(VariableKey.USER_ADDRESS, Operator.EQUAL, 'foo');
    variables.get.returns('FoO')
    expect(sut.test(variables)).toBeTruthy()
  });

  it("Should apply properly DISTINCT operator", () => {
    const sut = new Condition(VariableKey.USER_ADDRESS, Operator.EQUAL, 'foo');
    variables.get.returns('bar')
    expect(sut.test(variables)).toBeFalsy()
  });

  it("Should apply properly LT operator", () => {
    const sut = new Condition(VariableKey.USER_ADDRESS, Operator.LT, '100');
    variables.get.returns(99)
    expect(sut.test(variables)).toBeTruthy();

    const sut2 = new Condition(VariableKey.USER_ADDRESS, Operator.LT, '100');
    variables.get.returns(100)
    expect(sut2.test(variables)).toBeFalsy();
  });

  it("Should apply properly LTE operator", () => {
    const sut = new Condition(VariableKey.USER_ADDRESS, Operator.LTE, '100');
    variables.get.returns(99)
    expect(sut.test(variables)).toBeTruthy();

    const sut2 = new Condition(VariableKey.USER_ADDRESS, Operator.LTE, '100');
    variables.get.returns(100)
    expect(sut2.test(variables)).toBeTruthy();
  });

  it("Should apply properly GT operator", () => {
    const sut = new Condition(VariableKey.USER_ADDRESS, Operator.GT, '99');
    variables.get.returns(100)
    expect(sut.test(variables)).toBeTruthy();

    const sut2 = new Condition(VariableKey.USER_ADDRESS, Operator.GT, '100');
    variables.get.returns(100)
    expect(sut2.test(variables)).toBeFalsy();
  });

  it("Should apply properly GTE operator", () => {
    const sut = new Condition(VariableKey.USER_ADDRESS, Operator.GTE, '99');
    variables.get.returns(100)
    expect(sut.test(variables)).toBeTruthy();

    const sut2 = new Condition(VariableKey.USER_ADDRESS, Operator.GTE, '100');
    variables.get.returns(100)
    expect(sut2.test(variables)).toBeTruthy();
  });

});
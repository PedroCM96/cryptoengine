export enum Operator {
  'EQUAL' = 'EQUAL',
  'DISTINCT' = 'DISTINCT',
  'GT' = 'GT',
  'GTE' = 'GTE',
  'LT' = 'LT',
  'LTE' = 'LTE'
}

export function isNumericOperator(operator: Operator): boolean {
  return [Operator.GT, Operator.GTE, Operator.LT, Operator.LTE].includes(operator);
}
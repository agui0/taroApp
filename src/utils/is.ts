export function isNum(value: any): value is number {
  return typeof value === 'number';
}

export function isStr(value: any): value is string {
  return typeof value === 'string';
}

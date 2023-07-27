export type ComparisionResult = 'lower' | 'equals' | 'higher';

export function compareNumbers(compared: number, comparator: number): ComparisionResult {
  if (comparator === compared) return 'equals';
  if (comparator > compared) return 'lower';
  return 'higher';
}

export function convertToMin2Digit(value: number) {
  if (value < 10) return `0${value}`;
  return `${value}`;
}

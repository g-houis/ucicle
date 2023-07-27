export function convertToMin2Digit(value: number) {
  if (value < 10) return `0${value}`;
  return `${value}`;
}

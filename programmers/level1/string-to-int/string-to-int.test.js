const stringToInt = (str) => {
  return parseInt(str, 10);
}

test('stringToInt', () => {
  expect(stringToInt('1')).toBe(1);
  expect(stringToInt('+1')).toBe(1);
  expect(stringToInt('-1')).toBe(-1);
});
const isHashadNumber = (num) => noRemainder(num, sumDigits(num));

const sumDigits = (num) => {
  if (num < 10) {
    return num;
  }

  return num % 10 + sumDigits(Math.floor(num / 10));
};

const noRemainder = (num, divider) => num % divider === 0;

test('isHashadNumber', () => {
  expect(isHashadNumber(10)).toBe(true);
});

test('sumDigits', () => {
  expect(sumDigits(10)).toBe(1);
  expect(sumDigits(111)).toBe(3);
  expect(sumDigits(151)).toBe(7);
});

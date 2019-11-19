const sumOfDigits = (n) => {
  if (n < 10) {
    return n;
  }

  const digit = n % 10;

  return digit + sumOfDigits((n - digit) / 10);
};

test('sumOfDigits', () => {
  expect(sumOfDigits(123)).toBe(6);
  expect(sumOfDigits(987)).toBe(24);
});
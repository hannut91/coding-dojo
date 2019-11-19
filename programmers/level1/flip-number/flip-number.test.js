const flipNumbers = (n, numbers) => {
  if (n < 10) {
    return [...numbers, n]
  }

  const digit  = n % 10;
  return flipNumbers((n - digit) / 10, [...numbers, digit])
};

test('flipNumbers', () => {
  expect(flipNumbers(1, [])).toEqual([1]);
  expect(flipNumbers(12, [])).toEqual([2, 1]);
  expect(flipNumbers(123, [])).toEqual([3, 2, 1]);
  expect(flipNumbers(12345, [])).toEqual([5, 4, 3, 2, 1]);
});
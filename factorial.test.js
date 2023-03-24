// factorial(1) = 1
// factorial(2) = 2
// factorial(3) = 6
// factorial(4) = 24
// factorial(5) = 120

const factorial = n => {
  if (n <= 0) { return 0; }
  if (n === 1) { return n; }
  return n * factorial(n - 1);
};

test('factorial', () => {
  expect(factorial(-1)).toBe(0);
  expect(factorial(1)).toBe(1);
  expect(factorial(2)).toBe(2);
  expect(factorial(3)).toBe(6);
  expect(factorial(4)).toBe(24);
});

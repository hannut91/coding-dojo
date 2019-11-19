const sumBetween = (a, b) => {
  if (a > b) {
    [a, b] = [b, a]
  }
  
  let sum = 0;

  for (let i = a; i <= b; i++) {
    sum += i;
  }

  return sum;
};

test('sumBetween', () => {
  expect(sumBetween(3, 5)).toBe(12);
  expect(sumBetween(-1, 1)).toBe(0);
  expect(sumBetween(5, 3)).toBe(12);
});
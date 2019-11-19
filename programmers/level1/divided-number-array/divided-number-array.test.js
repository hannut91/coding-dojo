const dividedNumbers = (numbers, divisor) => {
  const n = numbers
    .filter(i => i % divisor === 0)
    .sort((a, b) => a - b);

  return n.length === 0 ? [-1]: n; 
};

test('dividedNumbers', () => {
  expect(dividedNumbers([5, 9, 7, 10], 5)).toEqual([5, 10]);
  expect(dividedNumbers([2, 36, 1, 3], 1)).toEqual([1, 2, 3, 36]);
  expect(dividedNumbers([3, 2, 6], 10)).toEqual([-1]);
});
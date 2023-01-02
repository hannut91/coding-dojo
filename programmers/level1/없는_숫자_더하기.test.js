const allNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const run = numbers => allNumbers
  .filter(number => !numbers.includes(number))
  .reduce((acc, cur) => acc + cur);

test('없는 숫자 더하기', () => {
  expect(run([1, 2, 3, 4, 6, 7, 8, 0])).toBe(14);
  expect(run([5, 8, 4, 0, 6, 7, 9])).toBe(6);
});

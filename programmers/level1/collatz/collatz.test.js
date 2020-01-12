const MAX_COUNT = 500;

const isEven = num => num % 2 === 0;

const collatz = (num, count = 0) => {
  if (num == 1) {
    return count;
  }

  if (count === MAX_COUNT) {
    return -1;
  }

  const newNum = isEven(num) ? num / 2 : num * 3 + 1;
  return collatz(newNum, count + 1);
}

test('collatz', () => {
  expect(collatz(6)).toBe(8);
  expect(collatz(16)).toBe(4);
  expect(collatz(626331)).toBe(-1);
});
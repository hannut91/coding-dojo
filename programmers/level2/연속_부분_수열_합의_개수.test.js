const cases = (numbers, unit, result) => {
  for (let i = 0; i < numbers.length; i++) {
    let sum = 0;

    for (let j = i; j < i + unit; j++) {
      const current = j % numbers.length;
      sum += numbers[current];
    }

    result[sum] = true;
  }

  return result;
};

const run = numbers => {
  const result = {};

  numbers.forEach((_, index) => {
    cases(numbers, index + 1, result);
  });

  return Object.keys(result).length;
};

test('run', () => {
  expect(run([7, 9, 1, 1, 4])).toBe(18);
});

test('cases', () => {
  expect(cases([7, 9, 1, 1, 4], 1)).toEqual([7, 9, 1, 1, 4]);
  expect(cases([7, 9, 1, 1, 4], 2)).toEqual([16, 10, 2, 5, 11]);
  expect(cases([7, 9, 1, 1, 4], 3)).toEqual([17, 11, 6, 12, 20]);
  expect(cases([7, 9, 1, 1, 4], 4)).toEqual([18, 15, 13, 21, 21]);
  expect(cases([7, 9, 1, 1, 4], 5)).toEqual([22, 22, 22, 22, 22]);
});

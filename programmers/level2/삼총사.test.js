const run = numbers => {
  let count = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        const sum = numbers[i] + numbers[j] + numbers[k];
        if (sum === 0) {
          count++;
        }
      }
    }
  }

  return count;
};

test('run', () => {
  expect(run([-2, 3, 0, 2, -5])).toBe(2);
  expect(run([-3, -2, -1, 0, 1, 2, 3])).toBe(5);
  expect(run([-1, 1, -1, 1])).toBe(0);
});

const run = (a, b) => a.reduce((acc, cur, index) => acc + (cur * b[index]), 0);

test('내적', () => {
  expect(run([1, 2, 3, 4], [-3, -1, 0, 2])).toBe(3);
  expect(run([1, 2, 3, 4], [-3, -1, 0, 2])).toBe(3);
  expect(run([-1, 0, 1], [1, 0, -1])).toBe(-2);
});

const run = (arrays, commands) => commands
  .map(([i, j, k]) => arrays
    .slice(i - 1, j)
    .sort((a, b) => a - b)[k - 1]);

test('run', () => {
  expect(
    run([1, 2, 3], [[1, 3, 3]]),
  ).toEqual([3]);
});

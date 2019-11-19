const kNumber = (array, commands) =>
  commands.map(([i, j, k]) =>
    array.slice(i - 1, j)
      .sort((a, b) => a - b)[k - 1]);

test('kNumber', () => {
  expect(kNumber(
    [1, 5, 2, 6, 3, 7, 4],
    [[2, 5, 3], [4, 4, 1], [1, 7, 3]]
  )).toEqual(
    [5, 6, 3]
  );
});
const spacedByX = (x, n) =>
  Array(n)
    .fill(x)
    .map((v, i) => v * (i + 1));

    test('spacedByX', () => {
  expect(spacedByX(2, 5)).toEqual([2, 4, 6, 8, 10]);
  expect(spacedByX(4, 3)).toEqual([4, 8, 12]);
  expect(spacedByX(-4, 2)).toEqual([-4, -8]);
});

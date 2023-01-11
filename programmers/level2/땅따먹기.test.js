const splice = (arr, index, count) => [
  ...arr.slice(0, index),
  ...arr.slice(index + count),
];

const run = lands =>
  Math.max(
    ...lands.slice(1)
      .reduce((arr, row) =>
        row.map((it, index) => it + Math.max(...splice(arr, index, 1))),
      lands[0]),
  );

test('run', () => {
  expect(run(
    [
      [1, 2, 3, 5],
      [5, 6, 7, 8],
      [4, 3, 2, 1],
    ],
  )).toBe(16);
});

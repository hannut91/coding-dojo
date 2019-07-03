const maxHeightsRowCol = buildings => ({
  row: buildings.map((heights, row) => buildings.reduce(
    (acc, cur) => (acc[row] > cur[row] ? acc : cur),
    [],
  )[row]),
  col: buildings.map(heights => heights.reduce(
    (acc, cur) => (acc > cur ? acc : cur),
    0,
  )),
});

const increase = buildings => {
  const maxHeights = maxHeightsRowCol(buildings);

  let sum = 0;

  buildings.forEach(
    (heights, col) => heights.forEach(
      (height, row) => {
        sum += (Math.min(maxHeights.row[row], maxHeights.col[col]) - height);
      },
    ),
  );

  return sum;
};

test('increase building height', () => {
  expect(increase([
    [1, 2],
    [3, 4],
  ])).toBe(1);

  expect(increase([
    [3, 0, 8, 4],
    [2, 4, 5, 7],
    [9, 2, 6, 3],
    [0, 3, 1, 0],
  ])).toEqual(35);
});

test('maxHeightsRowCol', () => {
  expect(maxHeightsRowCol([
    [1, 2],
    [3, 4],
  ])).toEqual({
    row: [3, 4],
    col: [2, 4],
  });

  expect(maxHeightsRowCol([
    [3, 0, 8, 4],
    [2, 4, 5, 7],
    [9, 2, 6, 3],
    [0, 3, 1, 0],
  ])).toEqual({
    row: [9, 4, 8, 7],
    col: [8, 7, 9, 3],
  });
});

const run = (board, types) => {
  const [type, x1, y1, x2, y2, value] = types[0];

  board[x1][y1] = board[x1][y1] - value;

  return board.reduce((acc, rows) => acc + rows.reduce((a, c) => (c > 0 ? a + 1 : a), 0), 0);
};

test('run', () => {
  expect(run(
    [
      [10],
    ],
    [
      [1, 0, 0, 0, 0, 5],
    ],
  )).toBe(1);

  expect(run(
    [
      [7, 3],
    ],
    [
      [1, 0, 1, 0, 1, 2],
    ],
  )).toBe(2);
});

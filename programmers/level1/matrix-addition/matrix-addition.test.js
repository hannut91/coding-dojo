const matrixAddition = (matrix1, matrix2) =>
  matrix1.map((row, y) =>
    row.map((v, x) => v + matrix2[y][x]));

test('matrixAddition', () => {
  expect(matrixAddition([[1, 2], [2, 3]], [[3, 4], [5, 6]]))
    .toEqual([[4, 6], [7, 9]]);
  expect(matrixAddition([[1],[2]], [[3],[4]]))
    .toEqual([[4], [6]]);
});
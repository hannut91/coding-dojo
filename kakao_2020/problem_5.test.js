const construct = (n, frames) =>
  matrixToResult(
    frames.reduce((matrix, frame) =>
      transform(matrix, frame), createMatrix(n)));

const matrixToResult = (matrix) => {
  const n = matrix.length - 1;

  const result = [];

  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= n; y++) {
      for (let a = 0; a < 2; a++) {
        if (matrix[x][y][a]) {
          result.push([x, y, a]);
        }
      }
    }
  }

  return result;
}

const transform = (matrix, [x, y, a, b]) => {
  const nextMatrix = copyMatrix(matrix);

  nextMatrix[x][y][a] = !!b;

  return validMatrix(nextMatrix) ? nextMatrix : matrix;
}

const createMatrix = (n) =>
  [...Array(n + 1)].map(() =>
    [...Array(n + 1)].map(() => [false, false]));

const copyMatrix = (matrix) =>
  JSON.parse(JSON.stringify(matrix));

const checkPillar = (matrix, x, y) =>
  matrix[x][y - 1][0] ||
  matrix[x][y][1] ||
  (x > 0 && matrix[x - 1][y][1]);

const checkBeam = (matrix, x, y) =>
  matrix[x][y - 1][0] ||
  matrix[x + 1][y - 1][0] ||
  (x > 0 && matrix[x - 1][y][1] && matrix[x + 1][y][1]);

const validMatrix = (matrix) => {
  const n = matrix.length - 1;
  const fs = [checkPillar, checkBeam];

  for (let x = 0; x <= n; x++) {
    for (let y = 1; y <= n; y++) {
      for (let a = 0; a < 2; a++) {
        if (matrix[x][y][a] && !fs[a](matrix, x, y)) {
          return false;
        }
      }
    }
  }

  return true;
};

test('construct example1', () => {
  expect(
    construct(5, [
      [1, 0, 0, 1],
      [1, 1, 1, 1],
      [2, 1, 0, 1],
      [2, 2, 1, 1],
      [5, 0, 0, 1],
      [5, 1, 0, 1],
      [4, 2, 1, 1],
      [3, 2, 1, 1]
    ])
  ).toEqual([
    [1, 0, 0], [1, 1, 1], [2, 1, 0], [2, 2, 1], [3, 2, 1],
    [4, 2, 1], [5, 0, 0], [5, 1, 0]
  ]);
});

test('construct example2', () => {
  expect(
    construct(5, [
      [0, 0, 0, 1], [2, 0, 0, 1], [4, 0, 0, 1], [0, 1, 1, 1],
      [1, 1, 1, 1], [2, 1, 1, 1], [3, 1, 1, 1], [2, 0, 0, 0],
      [1, 1, 1, 0], [2, 2, 0, 1]
    ])
  ).toEqual([
    [0, 0, 0], [0, 1, 1], [1, 1, 1], [2, 1, 1], [3, 1, 1],
    [4, 0, 0]
  ]);
});

test('validMatrix', () => {
  const matrix = createMatrix(5);

  expect(validMatrix(matrix)).toBeTruthy();

  matrix[0][1][0] = true;

  expect(validMatrix(matrix)).toBeFalsy();

  matrix[0][0][0] = true;

  expect(validMatrix(matrix)).toBeTruthy();

  matrix[1][1][1] = true;

  expect(validMatrix(matrix)).toBeFalsy();
});

test('matrixToResult', () => {
  const matrix = createMatrix(5);

  expect(matrixToResult(matrix)).toEqual([]);

  matrix[1][0][1] = true;

  expect(matrixToResult(matrix)).toEqual([[1, 0, 1]]);

  matrix[1][1][1] = true;

  expect(matrixToResult(matrix)).toEqual([
    [1, 0, 1], [1, 1, 1]
  ]);

  matrix[2][0][1] = true;

  expect(matrixToResult(matrix)).toEqual([
    [1, 0, 1], [1, 1, 1], [2, 0, 1],
  ]);
});

const createMatrix = (rows, columns) => Array
  .from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) =>
      (i) * columns + j + 1));

// 서비스
const spin = (matrix, [y1, x1, y2, x2]) => {
  let temp = matrix[y1][x1];
  let minimum = temp;

  for (let i = x1 + 1; i <= x2; i++) {
    const t = matrix[y1][i];
    matrix[y1][i] = temp;
    temp = t;
    if (temp < minimum) {
      minimum = temp;
    }
  }

  for (let i = y1 + 1; i <= y2; i++) {
    const t = matrix[i][x2];
    matrix[i][x2] = temp;
    temp = t;
    if (temp < minimum) {
      minimum = temp;
    }
  }

  for (let i = x2 - 1; i >= x1; i--) {
    const t = matrix[y2][i];
    matrix[y2][i] = temp;
    temp = t;
    if (temp < minimum) {
      minimum = temp;
    }
  }


  for (let i = y2 - 1; i > y1; i--) {
    const t = matrix[i][x1];
    matrix[i][x1] = temp;
    temp = t;
    if (temp < minimum) {
      minimum = temp;
    }
  }

  matrix[y1][x1] = temp;

  return [
    matrix,
    minimum,
  ];
};

const run = (rows, columns, quries) => {
  const initialMatrix = createMatrix(rows, columns);
  return quries.map(it => it.map(i => i - 1))
    .reduce(({ matrix, result }, query) => {
      const [newMatrix, minimum] = spin(matrix, query);
      return {
        matrix: newMatrix,
        result: [...result, minimum],
      };
    }, {
      matrix: initialMatrix,
      result: [],
    }).result;
};

test('행렬 테두리 회전하기', () => {
  expect(run(6, 6, [[2, 2, 5, 4], [3, 3, 6, 6], [5, 1, 6, 3]])).toEqual([8, 10, 25]);
  expect(run(3, 3, [[1, 1, 2, 2], [1, 2, 2, 3], [2, 1, 3, 2], [2, 2, 3, 3]])).toEqual([1, 1, 5, 3]);
  expect(run(100, 97, [[1, 1, 100, 97]])).toEqual([1]);
});

test('createMatrix', () => {
  expect(createMatrix(3, 3)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
});

test('spin', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  expect(spin(matrix, [0, 0, 1, 1])).toEqual([
    [
      [4, 1, 3],
      [5, 2, 6],
      [7, 8, 9],
    ],
    1,
  ]);
  expect(spin(matrix, [0, 0, 2, 2])).toEqual([
    [
      [4, 1, 2],
      [7, 5, 3],
      [8, 9, 6],
    ],
    1,
  ]);

  // expect(spin([
  //   [4, 1, 3],
  //   [5, 2, 6],
  //   [7, 8, 9],
  // ], [0, 1, 1, 2])).toEqual([
  //   [
  //     [4, 2, 1],
  //     [5, 6, 3],
  //     [7, 8, 9],
  //   ],
  //   1,
  // ]);
  // expect(spin([
  //   [4, 2, 1],
  //   [5, 6, 3],
  //   [7, 8, 9],
  // ], [1, 0, 2, 1])).toEqual([
  //   [
  //     [4, 2, 1],
  //     [7, 5, 3],
  //     [8, 6, 9],
  //   ],
  //   5,
  // ]);
});

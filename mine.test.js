/**
 * ## 이해
 *
 * 미지의 것: 매트릭이 주어졌을 때 깃발의 개수를 구하여라
 * 자료
 *   - 깃발의 개수는 주변에 지뢰가 몇 개 있는지를 나타낸다.
 *   - 지뢰의 개수는 8방향에서 정보를 수집한다.
 * 조건
 *   -
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const MINE = -1;

const flagCount = (matrix, x, y) => {
  if (matrix[y][x] === -1) {
    return 0;
  }

  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]
    .filter(([dx, dy]) => dy >= 0 && dx >= 0 && dy < matrix.length && dx < matrix.length)
    .filter(([dx, dy]) => matrix[dy][dx] === MINE)
    .length;
};

const run = matrix => {
  let count = 0;

  matrix.forEach((rows, y) => {
    rows.forEach((column, x) => {
      count += flagCount(matrix, x, y);
    });
  });

  return count;
};


test('flagCount', () => {
  const matrix = [
    [0, 0, 0, 0],
    [0, 0, -1, 0],
    [0, 0, 0, 0],
    [-1, 0, 0, 0],
  ];

  expect(flagCount(
    matrix,
    0, 0,
  )).toBe(0);
  expect(flagCount(
    matrix,
    1, 0,
  )).toBe(1);
  expect(flagCount(
    matrix,
    2, 0,
  )).toBe(1);
  expect(flagCount(
    matrix,
    3, 0,
  )).toBe(1);

  expect(flagCount(
    matrix,
    0, 1,
  )).toBe(0);
  expect(flagCount(
    matrix,
    1, 1,
  )).toBe(1);
  expect(flagCount(
    matrix,
    2, 1,
  )).toBe(0);
  expect(flagCount(
    matrix,
    3, 1,
  )).toBe(1);

  expect(flagCount(
    matrix,
    0, 2,
  )).toBe(1);
  expect(flagCount(
    matrix,
    1, 2,
  )).toBe(2);
  expect(flagCount(
    matrix,
    2, 2,
  )).toBe(1);
  expect(flagCount(
    matrix,
    3, 2,
  )).toBe(1);

  expect(flagCount(
    matrix,
    0, 3,
  )).toBe(0);
  expect(flagCount(
    matrix,
    1, 3,
  )).toBe(1);
  expect(flagCount(
    matrix,
    2, 3,
  )).toBe(0);
  expect(flagCount(
    matrix,
    3, 3,
  )).toBe(0);
});

test('run', () => {
  expect(
    run(
      [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, -1, 0, 0],
        [-1, 0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0, 0],
        [0, 0, 0, 0, -1, 0],
        [0, 0, 0, 0, 0, 0],
      ],
    ),
  ).toBe(27);
  expect(
    run(
      [
        [0, 0, 0, 0],
        [0, 0, -1, 0],
        [0, 0, 0, 0],
        [-1, 0, 0, 0],
      ],
    ),
  ).toBe(11);
});

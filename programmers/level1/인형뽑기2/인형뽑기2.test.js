const putDoll = (basket, doll) => {
  if (basket[basket.length - 1] === doll) {
    return [
      basket.slice(0, -1),
      true,
    ];
  }

  return [
    [...basket, doll],
    false,
  ];
};

const pick = (matrix, index) => {
  const dollIndex = matrix.findIndex(row => row[index] !== 0);
  if (dollIndex < 0) {
    return [
      matrix,
      0,
    ];
  }

  return [
    matrix.map((row, rowIndex) => {
      if (rowIndex !== dollIndex) {
        return row;
      }

      return row.map((it, columnIndex) => {
        if (columnIndex === index) {
          return 0;
        }
        return it;
      });
    }),
    matrix[dollIndex][index],
  ];
};

const run = (matrix, moves) => moves
  .map(it => it - 1)
  .reduce((acc, cur) => {
    const [newMatrix, doll] = pick(acc.matrix, cur);
    if (!doll) {
      return {
        ...acc,
        matrix: newMatrix,
      };
    }

    const [newBasket, isMatched] = putDoll(acc.basket, doll);
    return {
      matrix: newMatrix,
      basket: newBasket,
      count: acc.count + (isMatched ? 2 : 0),
    };
  }, {
    matrix,
    basket: [],
    count: 0,
  }).count;

test('run', () => {
  expect(
    run(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [4, 2, 4, 4, 2],
        [3, 5, 1, 3, 1],
      ],
      [1, 5, 3, 5, 1, 2, 1, 4],
    ),
  ).toBe(4);
});

test('pick', () => {
  expect(
    pick(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [4, 2, 4, 4, 2],
        [3, 5, 1, 3, 1],
      ],
      0,
    ),
  ).toEqual([
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [0, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    4,
  ]);

  expect(
    pick(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [0, 2, 4, 4, 2],
        [3, 5, 1, 3, 1],
      ],
      0,
    ),
  ).toEqual([
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [0, 2, 4, 4, 2],
      [0, 5, 1, 3, 1],
    ],
    3,
  ]);

  // 인형이 없어요
  expect(
    pick(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [0, 2, 4, 4, 2],
        [0, 5, 1, 3, 1],
      ],
      0,
    ),
  ).toEqual([
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [0, 2, 4, 4, 2],
      [0, 5, 1, 3, 1],
    ],
    0,
  ]);
});

test('putDoll', () => {
  expect(putDoll([], 1))
    .toEqual([[1], false]);

  expect(putDoll([1], 2))
    .toEqual([[1, 2], false]);

  expect(putDoll([1, 2], 2))
    .toEqual([[1], true]);
});

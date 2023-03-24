const solution = (board, moves) => {
  let sum = 0;
  const basket = [];
  moves.forEach(move => {
    const doll = pick(board, move);
    if (doll === 0) {
      return;
    }

    basket.push(doll);
    sum += remove(basket);
  });

  return sum * 2;
};

const remove = basket => {
  if (basket.length < 2) {
    return 0;
  }
  if (basket[basket.length - 2] === basket[basket.length - 1]) {
    basket.pop();
    basket.pop();
    return 1;
  }

  return 0;
};

const pick = (board, move) => {
  for (let y = 0; y < board.length; y++) {
    const doll = board[y][move - 1];
    if (doll !== 0) {
      board[y][move - 1] = 0;
      return doll;
    }
  }
  return 0;
};

const put = (basket, doll) => [...basket, doll];

test('remove', () => {
  const basket = [4, 1, 2, 2];
  expect(remove(basket)).toBe(1);
  expect(basket).toEqual([4, 1]);
});

test('remove', () => {
  expect(remove([4, 1, 2, 2])).toBe(1);
  expect(remove([4, 1, 2])).toBe(0);
  expect(remove([])).toBe(0);
  expect(remove([1])).toBe(0);
  expect(remove([1, 2])).toBe(0);
  expect(remove([2, 2])).toBe(1);
});


test('인형 넣기', () => {
  expect(put([], 4)).toEqual([4]);
});

test('뽑기', () => {
  const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 3],
    [0, 2, 5, 0, 1],
    [4, 2, 4, 4, 2],
    [3, 5, 1, 3, 1],
  ];
  expect(pick(board, 1))
    .toBe(4);
  expect(board[3][0]).toBe(0);

  expect(
    pick(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [4, 2, 4, 4, 2],
        [3, 5, 1, 3, 1],
      ],
      5,
    ),
  )
    .toBe(3);

  expect(
    pick(
      [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 3],
        [0, 2, 5, 0, 1],
        [0, 2, 4, 4, 2],
        [0, 5, 1, 3, 1],
      ],
      1,
    ),
  )
    .toBe(0);
});

test('인형뽑기', () => {
  expect(solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4],
  )).toBe(4);
});

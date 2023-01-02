/**
 * ## 이해
 *
 * 미지의 것: 벽면의 크기 n, 기둥과 보를 설치하거나 삭제하는 작업이 순서대로 담긴 2차원
 *    배열 build_frame이 매개변수로 주어질 때, 모든 명령어를 수행한 후 구조물의 상태를
 *    return 하도록 solution 함수를 완성해주세요.
 * 자료
 *   - 기둥과 보는 길이가 1인 선분으로 표현된다
 *   - 기둥은 바닥 위에 있거나 보의 한 쪽 끝 부분 위 있거나 다른 기둥 위에 있어야 한다
 *   - 보는 한쪽 끝 부분이 기둥위에 있거나 양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 한다.
 *   - 2차원 벽면은 n * n 크기 정사각 격자이다.
 *   - 각 격자는 1 * 1의 크기다.
 *   - 맨 처음 벽면은 비어있는 상태다
 *   - 기둥과 보는 격자선의 교차점에 걸치지 않고, 격자 칸의 각 변에 정확히 일치하도록 설치할 수 있다
 *   - 기둥과 보를 삭제할 수 있다. 이 때 기둥과 보 또한 위 규칙을 만족해야 한다
 *   - 작업을 수행한 결과가 조건을 만족하지 않는 경우 해당 작업은 무시된다
 * 조건
 *   - 바닥은 벽면의 맨 아래 지면이다
 *   - 바닥에 보를 설치할 수 없다.
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const createBoard = n => Array.from({ length: n }, () => Array.from({ length: n }, () => null));

const invalidPosition = (board, x, y) => {
  if (board[y][x] === null) {
    return false;
  }

  if (board[y][x] === 1) {
    // 아래 기둥이 없는 경우
    // 오른쪽에 기둥이 없는 경우
    // 왼족 오른쪽 둘다 보가 없는 경우
    if (board[y - 1][x] !== 0
      && board[y - 1][x + 1] !== 0
      && !(board[y][x - 1] === 1 && board[y][x + 1] === 1)
    ) {
      return true;
    }
  }

  // 기둥일 때
  if (board[y][x] === 0) {
    // 설치할 곳에 기둥이나 보가 없어서 설치할 수 없는 경우
    if (board[y - 1][x] === null) {
      return true;
    }
  }

  return false;
};

const isInvalid = (board, x, y, type) => [
  [x - 1, y],
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
].filter(([dx, dy]) => dx >= 0 && dy >= 0 && dx <= board.length - 1 && dy <= board.length - 1)
  .some(([dx, dy]) => {
    const r = invalidPosition(board, dx, dy, type);
    return r;
  });

const remove = (board, [x, y, type]) => {
  const newBoard = board.map((rows, dy) => rows.map((col, dx) => ((x === dx && y === dy) ? null : col)));
  if (isInvalid(newBoard, x, y, type)) {
    return board;
  }

  return newBoard;
};

const build = (board, [x, y, type]) => {
  // 바닥에는 보를 설치할 수 없다
  if (type === 1 && y === 0) {
    return board;
  }

  // 맨 오른쪽에는 보를 설치할 수 없다
  if (type === 1 && x === board.length - 1) {
    return board;
  }

  // 이미 무엇인가 설치되어 있는 경우에는 설치하지 못한다.
  if (board[y][x] !== null) {
    return board;
  }

  // 바닥이 아닌 경우
  if (y !== 0) {
    if (type === 1) {
      // 아래 기둥이 없는 경우
      // 오른쪽에 기둥이 없는 경우
      // 왼족 오른쪽 둘다 보가 없는 경우
      if (board[y - 1][x] !== 0
        && board[y - 1][x + 1] !== 0
        && (board[y][x - 1] !== 1 && board[y][x + 1] !== 1)
      ) {
        return board;
      }
    }

    // 기둥일 때
    if (type === 0) {
      // 설치할 곳에 기둥이나 보가 없어서 설치할 수 없는 경우
      if (board[y - 1][x] !== 0 && board[y][x - 1] !== 1) {
        return board;
      }
    }
  }

  board[y][x] = type;
  return board;
};


const r = (board, frames) => {
  if (frames.length === 0) {
    return board;
  }

  const [current] = frames;
  if (current[3] === 1) {
    return r(build(board, current), frames.slice(1));
  }
  return r(remove(board, current), frames.slice(1));
};

const run = (n, frames) => {
  const board = createBoard(n + 1);
  const newBoard = r(board, frames);
  return newBoard.reduce((acc, rows, y) => [
    ...acc,
    ...rows
      .map((it, x) => [x, y, it])
      .filter(([,, it]) => it !== null),
  ], [])
    .sort(([x, y, type], [dx, dy, dType]) => {
      if (x < dx) {
        return -1;
      }

      if (x > dx) {
        return 1;
      }

      if (y < dy) {
        return -1;
      }

      if (y > dy) {
        return 1;
      }

      if (type < dType) {
        return -1;
      }

      if (type > dType) {
        return 1;
      }

      return 0;
    });
};

test('run', () => {
  expect(run(
    5,
    [
      [0, 0, 0, 1],
      [2, 0, 0, 1],
      [4, 0, 0, 1],
      [0, 1, 1, 1],
      [1, 1, 1, 1],
      [2, 1, 1, 1],
      [3, 1, 1, 1],
      [2, 0, 0, 0],
      [1, 1, 1, 0],
      [2, 2, 0, 1],
    ],
  )).toEqual(
    [[0, 0, 0], [0, 1, 1], [1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 0, 0]],
  );

  expect(run(
    5,
    	[[1, 0, 0, 1], [1, 1, 1, 1], [2, 1, 0, 1], [2, 2, 1, 1], [5, 0, 0, 1], [5, 1, 0, 1], [4, 2, 1, 1], [3, 2, 1, 1]],
  )).toEqual(
    [[1, 0, 0], [1, 1, 1], [2, 1, 0], [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 0, 0], [5, 1, 0]],
  );
});

test('build', () => {
  // 바닥에 기둥을 설치하는 경우
  expect(build([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 0, 0, 1,
  ])).toEqual([
    [0, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 맨 오른쪽에는 보를 설치할 수 없다
  expect(build([
    [null, null, null, null, 0],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    4, 1, 1, 1,
  ])).toEqual([
    [null, null, null, null, 0],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 기둥위에 기둥설치하는 경우
  expect(build([
    [0, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 1, 0, 1,
  ])).toEqual([
    [0, null, null, null, null],
    [0, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 기둥위에 보 설치하는 경우
  expect(build([
    [0, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 1, 1, 1,
  ])).toEqual([
    [0, null, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 바닥에 보를 설치하는 경우는 안된다
  expect(build([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 0, 1, 1,
  ])).toEqual([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 설치할 곳 바닥에 기둥이 없으면 기둥을 설치할 수 없다.
  expect(build([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 1, 0, 1,
  ])).toEqual([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 이미 설치된 것이 있으면 설치할 수 없다.
  expect(build([
    [0, null, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 1, 0, 1,
  ])).toEqual([
    [0, null, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 보는 오른쪽 기둥이 있을 때 설치할 수 있다
  expect(build([
    [null, 0, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 1, 1, 1,
  ])).toEqual([
    [null, 0, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 보는 왼쪽 오른쪽 둘다 보가 있으면 설치할 수 있다
  expect(build([
    [0, null, null, 0, null],
    [1, null, 1, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    1, 1, 1, 1,
  ])).toEqual([
    [0, null, null, 0, null],
    [1, 1, 1, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 보는 아래 기둥이 없으면 설치할 수 없다
  expect(build([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 1, 1, 1,
  ])).toEqual([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 한쪽으로만 이어진 보는 설치할 수 없다
  expect(remove([
    [0, null, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    1, 1, 1, 0,
  ])).toEqual([
    [0, null, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);
});
test('remove', () => {
  // 지울 수 있는 경우
  expect(remove([
    [0, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 0, 0, 0,
  ])).toEqual([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 바닥이 비는 경우 지울 수 없다
  expect(remove([
    [0, null, null, null, null],
    [0, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 0, 0, 0,
  ])).toEqual([
    [0, null, null, null, null],
    [0, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);
  expect(remove([
    [0, null, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    0, 0, 0, 0,
  ])).toEqual([
    [0, null, null, null, null],
    [1, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  // 보가 연결되어 있는 경우 지울 수 없다
  expect(remove([
    [0, null, null, null, 0],
    [1, 1, 1, 1, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [
    2, 1, 1, 0,
  ])).toEqual([
    [0, null, null, null, 0],
    [1, 1, 1, 1, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  expect(remove([
    [0, null, 0, null, 0],
    [1, 1, 1, 1, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ], [2, 0, 0, 0])).toEqual([
    [0, null, null, null, 0],
    [1, 1, 1, 1, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);
});

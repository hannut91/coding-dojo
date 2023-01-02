/**
 * ## 이해
 *
 * 미지의 것: 사과의 위치와 뱀의 이동경로가 주어질 때 이 게임이 몇 초에 끝나는지 계산하라.
 * 자료
 *   - 게임은 N * N 정사각 보드 위에서 진행된다.
 *   - 보드의 상하좌우 끝에 벽이 있다.
 *   - 시작점은 맨위 맨좌측이고 뱀의 길이는 1이다.
 *   - 뱀의 처음 방향은 오른쪽이다.
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

const APPLE = 1;

const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const invalidPosition = (board, [x, y]) => x < 0 || y < 0 || x >= board.length || y >= board.length;

const move = (board, snake, direction) => {
  const [dx, dy] = directions[direction];
  const head = [snake[0][0] + dx, snake[0][1] + dy];
  if (invalidPosition(board, head)) {
    return [
      board, snake, false,
    ];
  }

  if (board[head[1]][head[0]] === 1) {
    board[head[1]][head[0]] = 0;
    snake.unshift(head);
    return [
      board, snake, true,
    ];
  }

  if (snake.find(([x, y]) => x === head[0] && y === head[1])) {
    return [
      board, snake, false,
    ];
  }

  return [
    board,
    [head, ...snake.slice(0, -1)],
    true,
  ];
};

const next = (n, direction) => {
  if (direction === 'D') {
    return (n + 1) % 4;
  }
  const x = n - 1;
  if (x < 0) {
    return 3;
  }
  return x;
};

const r = (board, snake, changeDirections, direction, seconds = 0) => {
  if (changeDirections.length > 0) {
    const [time, changeDirection] = changeDirections[0];
    if (time === seconds) {
      changeDirections = changeDirections.slice(1);
      direction = next(direction, changeDirection);
    }
  }
  const [newBoard, newSnake, moved] = move(board, snake, direction);
  if (!moved) {
    return seconds + 1;
  }

  return r(newBoard, newSnake, changeDirections, direction, seconds + 1);
};

const run = (n, apples, changeDirections) => {
  const board = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
  apples.forEach(([x, y]) => {
    board[x - 1][y - 1] = APPLE;
  });
  const snake = [
    [0, 0],
  ];
  return r(board, snake, changeDirections, 0);
};

test('run', () => {
  expect(run(
    6,
    [
      [3, 4],
      [2, 5],
      [5, 3],
    ],
    [
      [3, 'D'],
      [15, 'L'],
      [17, 'D'],
    ],
  )).toBe(9);

  expect(run(
    10,
    [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ],
    [
      [8, 'D'],
      [10, 'D'],
      [11, 'D'],
      [13, 'L'],
    ],
  )).toBe(21);

  expect(run(
    10,
    [
      [1, 5],
      [1, 3],
      [1, 2],
      [1, 6],
      [1, 7],
    ],
    [
      [8, 'D'],
      [10, 'D'],
      [11, 'D'],
      [13, 'L'],
    ],
  )).toBe(13);
});


test('next', () => {
  expect(next(0, 'D')).toBe(1);
  expect(next(1, 'D')).toBe(2);
  expect(next(2, 'D')).toBe(3);
  expect(next(3, 'D')).toBe(0);

  expect(next(0, 'L')).toBe(3);
  expect(next(1, 'L')).toBe(0);
  expect(next(2, 'L')).toBe(1);
  expect(next(3, 'L')).toBe(2);
});

test('move', () => {
  // 움직일 수 있는 경우
  expect(move([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ], [[0, 0]], 0)).toEqual([
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 0],
    ],
    true,
  ]);

  expect(move([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ], [[1, 1], [1, 0], [0, 0]], 1)).toEqual([
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 2], [1, 1], [1, 0],
    ],
    true,
  ]);

  // 벽에 부딪힌 경우
  expect(move([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ], [[5, 0]], 0)).toEqual([
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      [5, 0],
    ],
    false,
  ]);

  // 사과를 먹은 경우
  expect(move([
    [0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ], [[0, 0]], 0)).toEqual([
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 0], [0, 0],
    ],
    true,
  ]);

  // 자기 꼬리에 부딪힌 경우
  expect(move([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ], [
    [1, 1], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [0, 0],
  ], 0)).toEqual([
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ],
    [
      [1, 1], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [0, 0],
    ],
    false,
  ]);
});

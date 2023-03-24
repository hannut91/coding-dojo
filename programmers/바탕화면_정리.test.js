/**
 * ## 이해
 *
 * 미지의 것: 바탕화면의 파일들을 한 번에 삭제하기 위해 최소한의 이동거리를 갖는 드래그의 시작점과
 *   끝점을 담은 정수 배열을 return하는 solution 함수를 작성해 주세요
 * 자료
 *   - 바탕화면은 각 칸이 정사각형 격자판이다.
 *   - 빈칸은 . 파일이 있는 칸은 #
 * 조건
 *   -
 *
 * ## 계획
 *   - 가장 왼쪽 위 파일을 찾는다.
 *   - 가장 오른쪽 아래 파일을 찾는다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */
const createBoard = wallpaper => wallpaper.map(it => it.split(''));

const findTop = board => board.findIndex(rows => rows.find(col => col === '#'));
const findBottom = board => {
  const height = board.length;

  for (let i = height - 1; i >= 0; i--) {
    const found = board[i].find(col => col === '#');
    if (found) {
      return i;
    }
  }
};

const findLeft = board => {
  const width = board[0].length;

  for (let i = 0; i < width; i++) {
    const found = board.find(rows => rows[i] === '#');
    if (found) {
      return i;
    }
  }
};
const findRight = board => {
  const width = board[0].length;

  for (let i = width - 1; i >= 0; i--) {
    const found = board.find(rows => rows[i] === '#');
    if (found) {
      return i;
    }
  }
};

const run = wallpaper => {
  const board = createBoard(wallpaper);
  const top = findTop(board);
  const left = findLeft(board);
  const bottom = findBottom(board);
  const right = findRight(board);
  return [top, left, bottom + 1, right + 1];
};

const run2 = wallpaper => {
  const board = createBoard(wallpaper);
  const positions = [];
  board.forEach((rows, y) => {
    rows.forEach((col, x) => {
      if (col === '#') {
        positions.push([x, y]);
      }
    });
  });
  return [
    Math.min(...positions.map(([, y]) => y)),
    Math.min(...positions.map(([x]) => x)),
    Math.max(...positions.map(([, y]) => y)) + 1,
    Math.max(...positions.map(([x]) => x)) + 1,
  ];
};

test('findRight', () => {
  expect(findRight(
    [
      ['.', '#', '.', '.', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '.', '.', '#', '.'],
    ],
  )).toBe(3);
  expect(findRight(
    [
      ['.', '#', '.', '.', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '.', '.', '.', '.'],
    ],
  )).toBe(2);
  expect(findRight(
    [
      ['.', '.'],
      ['#', '.'],
    ],
  )).toBe(0);
});


test('findLeft', () => {
  expect(findLeft(
    [
      ['.', '#', '.', '.', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '.', '.', '#', '.'],
    ],
  )).toBe(1);
  expect(findLeft(
    [
      ['.', '#', '.', '.', '.'],
      ['#', '.', '#', '.', '.'],
      ['.', '.', '.', '#', '.'],
    ],
  )).toBe(0);
});

test('findTop', () => {
  expect(findTop(
    [
      ['.', '#', '.', '.', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '.', '.', '#', '.'],
    ],
  )).toBe(0);
  expect(findTop(
    [
      ['.', '.', '.', '.', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '.', '.', '#', '.'],
    ],
  )).toBe(1);
});

test('findBottom', () => {
  expect(findBottom(
    [
      ['.', '#', '.', '.', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '.', '.', '#', '.'],
    ],
  )).toBe(2);
  expect(findBottom(
    [
      ['.', '.', '.', '.', '.'],
      ['.', '.', '#', '.', '.'],
      ['.', '.', '.', '.', '.'],
    ],
  )).toBe(1);
  expect(findBottom(
    [
      ['.', '.'],
      ['#', '.'],
    ],
  )).toBe(1);
});

test('run', () => {
  expect(run(
    ['.#...', '..#..', '...#.'],
  )).toEqual([0, 1, 3, 4]);
  expect(run(
    ['..........', '.....#....', '......##..', '...##.....', '....#.....'],
  )).toEqual([1, 3, 5, 8]);
  expect(run(
    ['.##...##.', '#..#.#..#', '#...#...#', '.#.....#.', '..#...#..', '...#.#...', '....#....'],
  )).toEqual([0, 0, 7, 9]);
  expect(run(
    ['..', '#.'],
  )).toEqual([1, 0, 2, 1]);
  expect(run2(
    ['.#...', '..#..', '...#.'],
  )).toEqual([0, 1, 3, 4]);
});

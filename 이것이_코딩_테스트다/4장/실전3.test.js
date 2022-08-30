/**
 * ## 이해
 *
 * 미지의 것: 캐릭터가 움직일 수 없을 때 까지 움직였을 때 이동한 횟수를 구하여라
 * 자료
 *   - 좌표는 방향이 있다.
 *   - 방향을 도는 것은 북 -> 서 -> 남 -> 동 순서다.
 *   - 캐릭터가 움직일 수 없다는 것은 4면이 바다 혹은 이미 간 곳이다. 그리고
 *     뒤에가 바다인 경우다.
 * 조건
 *   - 캐릭터는 좌표 바깥으로 넘어갈 수 없다.
 *
 * ## 계획
 *   - 캐릭터가 현재 움직일 수 있는 방향 순서대로 갈 수 있는 방향을 찾는다.
 *   - 캐릭터가 움직일 수 있는 곳이 있다면, 현재 위치를 표시하고 카운트를
 *     증가시키고 움직인다.
 *   - 캐릭터가 움직일 수 없다면 뒤로 갈 수 있는지 확인한다.
 *     - 뒤로 갈 수 있다면 뒤로 간 후 다시 반복한다.
 *     - 뒤로 갈 수 없다면 카운트 값을 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 *   - 예외인 케이스에 대해서 자세히 검증하지 않아서 해맸다. 그리고 함수가
 *     계산이 아니라서 의도하지 않은대로 동작해서 어려움이 있었다. 아직은
 *     매트릭스를 이뮤터블하게 다루는데 익숙하지 않아서 일단 편한 방법으로
 *     코드를 짠 것 같다.
 *     매트릭스를 이뮤터블하게 하는 것도 충분히 숙달해야겠다.
 */

const directions = [0, 3, 2, 1];

const backMoves = {
  0: 2,
  1: 3,
  2: 0,
  3: 1,
};

const moves = {
  0: ([x, y]) => [x, y - 1],
  1: ([x, y]) => [x + 1, y],
  2: ([x, y]) => [x, y + 1],
  3: ([x, y]) => [x - 1, y],
};

const getMoves = direction => {
  const d = [...directions];
  for (let i = 0; i < direction; i++) {
    const temp = d.pop();
    d.unshift(temp);
  }
  return d;
};

const isPossible = (matrix, position, direction) => {
  const [x, y] = moves[direction](position);
  if (y >= matrix.length || x >= matrix[0].length || x < 0 || y < 0) {
    return false;
  }

  if (matrix[y][x] === 1) {
    return false;
  }

  if (matrix[y][x] === 2) {
    return false;
  }

  return true;
};

const move = (matrix, position, direction) => {
  const nextPosition = moves[direction](position);
  return [
    matrix.map((rows, y) => {
      if (y !== position[1]) {
        return rows;
      }

      return  rows.map((col, x) => (x === position[0] ? 2: col));
    }),
    nextPosition,
  ];
};

const run = (matrix, position, direction, count = 0) => {
  const nextDirection = getMoves(direction).find(it => isPossible(matrix, position, it));
  if (nextDirection !== undefined) {
    const [newMatrix, nextPosition] = move(matrix, position, nextDirection);
    return run(newMatrix, nextPosition, nextDirection, count + 1);
  }

  const plusCount = matrix[position[1]][position[0]] === 0 ? 1 : 0;

  const backDirection = backMoves[direction];
  const [x, y] = moves[backDirection](position);
  if (matrix[y][x] !== 2) {
    return count + plusCount;
  }

  
  const [newMatrix, nextPosition] = move(matrix, position, backDirection);
  return run(newMatrix, nextPosition, direction, count + plusCount);
};

test('run', () => {
  expect(run([
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ], [1, 1], 0)).toBe(3);

  expect(run([
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 0, 1],
  ], [1, 1], 0)).toBe(4);
  expect(run([
    [0, 0, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ], [0, 0], 0)).toBe(2);
});

test('getMoves', () => {
  expect(getMoves(0)).toEqual([0, 3, 2, 1]);
  expect(getMoves(1)).toEqual([1, 0, 3, 2]);
  expect(getMoves(2)).toEqual([2, 1, 0, 3]);
  expect(getMoves(3)).toEqual([3, 2, 1, 0]);
});


test('isPossible', () => {
  expect(isPossible([
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ], [1, 1], 0)).toBe(false);

  expect(isPossible([
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ], [1, 1], 1)).toBe(true);
});

test('move', () => {
  expect(move([
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ], [1, 1], 1)).toEqual([
    [
      [1, 1, 1, 1],
      [1, 2, 0, 1],
      [1, 1, 0, 1],
      [1, 1, 1, 1],
    ],
    [2, 1]]);

  expect(move([
    [1, 1, 1, 1],
    [1, 2, 2, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ], [2, 2], 0)).toEqual([
    [
      [1, 1, 1, 1],
      [1, 2, 2, 1],
      [1, 1, 2, 1],
      [1, 1, 1, 1],
    ],
    [2, 1]]);
});

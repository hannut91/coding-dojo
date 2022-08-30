/**
 * ## 이해
 *
 * 미지의 것: 여행가가 움직이는 게획서가 주어졌을 때 여행가 A가 최종적으로
 * 도착할 지점의 좌표를 구하여라
 * 자료
 *   - 여행가는 상, 하, 좌, 우로 움직을 수 있다.

 * 조건
 *   - 공간은 1 * 1 정사각형으로 나누어져 있다.
 *   - 가장 왼쪽 위 좌표는 1, 1 가장 아래 오른쪽 좌표는 N, N이다.
 *   - 시작 좌표는 항상 1, 1이다.
 *   - 여행가가 좌표를 벗어나는 움직임은 무시된다.
 *
 * ## 계획
 *   - 주어진 방향에 따라, 다음 좌표를 구한다.
 *   - 이 때 지도를 벗어나는 움직임은 무시한다.
 *   - 움직임이 끝났을 때 좌표를 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 * - 문제에서 좌표를 어떻게 처리하는지 확인하지 않고 풀어서 큰일 날 뻔 했지만, 내가 익숙한 방식으로 먼저 풀고 변환을 해주면 그만이었다.
 */

const movesMap = {
  L: ([x, y]) => [x - 1, y],
  R: ([x, y]) => [x + 1, y],
  U: ([x, y]) => [x, y - 1],
  D: ([x, y]) => [x, y + 1],
};

const move = (n, position, direction) => {
  const [x, y] = movesMap[direction](position);
  if (x < 0 || x >= n) {
    return position;
  }

  if (y < 0 || y >= n) {
    return position;
  }

  return [x, y];
};

const run = (n, moves) => {
  const [x, y] = moves
    .reduce((position, cur) =>
      move(n, position, cur),
    [0, 0]);
  return [y + 1, x + 1];
};

test('run', () => {
  expect(run(5, ['R', 'R', 'R', 'U', 'D', 'D'])).toEqual([3, 4]);
});

test('move', () => {
  expect(move(5, [0, 0], 'R')).toEqual([1, 0]);
  expect(move(5, [1, 0], 'R')).toEqual([2, 0]);
  expect(move(5, [2, 0], 'R')).toEqual([3, 0]);
  expect(move(5, [3, 0], 'U')).toEqual([3, 0]);
  expect(move(5, [3, 0], 'D')).toEqual([3, 1]);
  expect(move(5, [3, 1], 'D')).toEqual([3, 2]);
});

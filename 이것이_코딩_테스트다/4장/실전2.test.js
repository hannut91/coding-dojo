/**
 * ## 이해
 *
 * 미지의 것: 8 * 8 좌표 평면에 나이트의 위치가 주어졌을 때 나이트가 이동할 수 있는 모든 경우의 수를 출력하는 프로그램을 작성하라
 * 자료
 *   - 수평은 좌 우로 움직일 수 있다.
 *   - 수직은 상 하로 움직일 수 있다.
 *   - 말이 움직일 수 있는 최대 8가지다.
 * 조건
 *   - 나이트는 수평으로 두 칸 이동한 뒤에 수직으로 한 칸 이동 혹은 수직으로 두
 *     칸 이동한 후에 수평으로 한 칸 이동 밖에 할 수 없다.
 *
 * ## 계획
 *   - 말이 움직이는 8가지 움직임을 구현한다.
 *   - 말이 움직였을 때 가능한 움직임인지 확인하여, 가능한 경우의 수만 더한다.
 *
 * ## 실행
 *
 * ## 반성
 * - 말이 움직일 수 있는 경우를 모두 함수로 만들었었는데, 어차피 모든 경우를 순회해야 하므로
 *   함수로 만들 필요 없이 그냥 값만 가지고 있다가 모든 경우의 수를 만들어서 했을 수도 있겠다.
 *
 */

const axiosX = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const directions = {
  LU: ([x, y]) => [x - 2, y + 1],
  LD: ([x, y]) => [x - 2, y - 1],
  RU: ([x, y]) => [x + 2, y + 1],
  RD: ([x, y]) => [x + 2, y - 1],
  UL: ([x, y]) => [x - 1, y + 2],
  UR: ([x, y]) => [x + 1, y + 2],
  DL: ([x, y]) => [x - 1, y - 2],
  DR: ([x, y]) => [x + 1, y - 2],
};

const isPossible = (position, direction) => {
  const [x, y] = directions[direction](position);
  if (x < 0 || y < 0 || x > 7 || y > 7) {
    return false;
  }
  return true;
};

const run = coordinate => {
  const x = axiosX.findIndex(it => it === coordinate[0]);
  const y = Number(coordinate[1]) - 1;
  return ['LU', 'LD', 'RU', 'RD', 'UL', 'UR', 'DL', 'DR'].reduce((acc, direction) => (isPossible([x, y], direction) ? acc + 1 : acc), 0);
};

test('run', () => {
  expect(run('a1')).toBe(2);
  expect(run('d4')).toBe(8);
});

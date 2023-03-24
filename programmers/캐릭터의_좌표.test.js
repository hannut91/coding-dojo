/**
 * ## 이해
 *
 * 미지의 것: 캐릭터는 항상 [0,0]에서 시작할 때 키 입력이 모두 끝난 뒤에 캐릭터의 좌표 [x, y]를
 *   return하도록 solution 함수를 완성
 * 자료
 *   - 위, 아래, 왼쪽, 오른쪽 방향키가 있다.
 *   - 각 키를 누르면 한 칸씩 이동한다
 *   -
 * 조건
 *   - board의 크기를 벗어난 방향키 입력은 무시합니다
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */
const movement = {
  up: ([x, y]) => [x, y + 1],
  down: ([x, y]) => [x, y - 1],
  left: ([x, y]) => [x - 1, y],
  right: ([x, y]) => [x + 1, y],
};

const move = (position, command, limit) => {
  const [x, y] = movement[command](position);
  if (x < limit.left || x > limit.right || y < limit.down || y > limit.up) {
    return position;
  }

  return [x, y];
};

const run = (commands, [width, height]) => {
  const limit = {
    left: -((width - 1) / 2),
    right: ((width - 1) / 2),
    up: ((height - 1) / 2),
    down: -((height - 1) / 2),
  };
  return commands
    .reduce((position, command) => move(position, command, limit), [0, 0]);
};

test('run', () => {
  expect(run(['left', 'right', 'up', 'right', 'right'], [11, 11]))
    .toEqual([2, 1]);
  expect(run(['down', 'down', 'down', 'down', 'down'], [7, 9]))
    .toEqual([0, -4]);
});

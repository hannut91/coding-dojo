/**
 * ## 이해
 *
 * 미지의 것: 롤러로 페인트칠해야 하는 최소 횟수를 return
 * 자료
 *   - 벽을 1미터 길이의 구역 n개로 나누고, 각 구역에 왼쪽부터 순서대로
 *     1번부터 n번까지 번호를 붙였습니다
 *   - 롤러의 길이는 m이다.
 *   - 롤러가 벽에서 벗어나면 안 됩니다.
 *   - 구역의 일부분만 포함되도록 칠하면 안 됩니다.
 *   - 한 구역에 페인트를 여러 번 칠해도 되고 다시 칠해야 할 구역이 아닌 곳에 페인트를 칠해도
 *   되지만 다시 칠하기로 정한 구역은 적어도 한 번 페인트칠을 해야 합니다
 * 조건
 *   -
 *
 * ## 계획
 *   - n만큼 빈 벽을 만든다.
 *   - 원래 칠해진 것을 칠한다.
 *   - 왼쪽부터 순회하면서 안칠해진벽을 찾는다.
 *     - 찾았으면 페인트 길이 만큼 칠한다.
 *     - 칠할때마다 카운트를 증가시킨다.
 *   - 페인트 길이 이후부터 안칠해진 벽을 칠한다. 끝까지
 *
 * ## 실행
 *
 * ## 반성
 *
 */
const createWall = (n, sections) => {
  const wall = Array.from({ length: n }, () => 1);
  sections.forEach(it => {
    wall[it - 1] = 0;
  });
  return wall;
};

const run = (n, m, sections) => {
  const wall = createWall(n, sections);
  let count = 0;
  for (let i = 0; i < wall.length; i++) {
    if (wall[i] === 0) {
      i += (m - 1);
      count++;
    }
  }
  return count;
};

test('run', () => {
  expect(
    run(
      8, 4, [2, 3, 6],
    ),
  ).toBe(2);
  expect(
    run(
      5,	4,	[1, 3],
    ),
  ).toBe(1);
  expect(
    run(
      4,	1,	[1, 2, 3, 4],
    ),
  ).toBe(4);
});

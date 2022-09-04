/**
 * ## 이해
 *
 * 미지의 것: 가로의 길이가 N 세로의 길이가 2인 직사각형을 채우는 모든 경우의 수를 구하여라
 * 자료
 *   - 세로의 길이는 2이다
 *   - 가로의 길이는 N이다
 *   - 덮개는 1 * 2, 2 * 1, 2 * 2덮개가 있다.
 * 조건
 *   -
 *
 * ## 계획
 *   - 셋중에 하나를 선택해서 가능한 경우인지 확인한다.
 *   - 가능한 경우 선택하고 남은 것으로 계속 진행하여, 가능한 경우만 횟수를 센다
 *
 * ## 실행
 *
 * ## 반성
 *   - 이전에 풀어본 문제 개미 전사를 풀어봐서 그런지 쉽게 풀 수 있었다.
 *     여러가지 경우의 수를 계산하는데, 반복해서 계산해야되는 것이 많은 경우 DP로 풀 수 있겠다.
 *   - 그리고 직접 해봐서 패턴을 파악하는 것도 중요한 것 같다.
 */

// 2 * 2, 2 * 1
// 2 * 1, 2 * 1, 2 * 1
// [1 * 2, 1 * 2], 2 * 1
// 2 * 1, 2 * 2
// 2 * 1, [1 * 2, 1 * 2]

const cache = {};

const run = length => {
  if (cache[length]) {
    return cache[length];
  }

  if (length === 1) {
    return 1;
  }

  if (length === 2) {
    return 3;
  }

  cache[length] = run(length - 1) + run(length - 2) * 2;
  return cache[length];
};

test('run', () => {
  expect(run(1)).toBe(1);
  expect(run(2)).toBe(3);
  expect(run(3)).toBe(5);
  expect(run(6)).toBe(43);
});

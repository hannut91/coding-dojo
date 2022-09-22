/**
 * ## 이해
 *
 * 미지의 것: n을 x로 나눈 나머지가 1이 되도록 하는 가장 작은 자연수 x를 구하라
 * 자료
 *   - n과 x는 자연수다
 *   - 1로 나누면 나머지가 있을수가 없다. 따라서 2부터 나눠야 한다.
 * 조건
 *   - 3 <= n <= 1,000,000
 *
 * ## 계획
 *   - 2부터 시작해서 나눈다.
 *   - 나머지가 1이면 그 때 그 값을 반환한다.
 *   - 나머지가 1이 아니면 값을 1을 증가시켜 위의 단계를 반복한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

// 재귀
const run = (n, x = 2) => {
  if (n % x === 1) {
    return x;
  }

  return run(n, x + 1);
};

// while
const run2 = n => {
  let x = 2;
  while (true) {
    if (n % x === 1) {
      return x;
    }

    x += 1;
  }
};

test('run', () => {
  expect(run(10)).toBe(3);
  expect(run(12)).toBe(11);

  expect(run2(10)).toBe(3);
  expect(run2(12)).toBe(11);
});

/**
 * ## 이해
 *
 * 미지의 것: 2이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수를 작성하라
 * 자료
 *   - F(0) = 0
 *   - F(1) = 1
 *   - F(N) = F(n - 1) + F(n - 2)
 *   - 피보나치 수는 0, 1, 1, 2, 3, 5와 같이 이어진다.
 * 조건
 *   - N은 2 이상이다.
 *
 * ## 계획
 *   - 피보나치 수를 만들어 나가면서 n번째가 되었을 때 그 수를 나눈 나머지를 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const run = (n, count = 0, a = 0, b = 0) => {
  if (n === count) {
    return (a + b) % 1234567;
  }

  if (count === 0) {
    return run(n, count + 1, 0, 0);
  }

  if (count === 1) {
    return run(n, count + 1, 1, a);
  }

  return run(n, count + 1, (a + b) % 1234567, a);
};

test('run', () => {
  expect(run(2)).toBe(1);
  expect(run(3)).toBe(2);
  expect(run(4)).toBe(3);
  expect(run(5)).toBe(5);
  expect(run(6)).toBe(8);
  expect(run(7)).toBe(13);
  // expect(run(15)).toBe(13);
  expect(run(100000)).toBe(13);
});

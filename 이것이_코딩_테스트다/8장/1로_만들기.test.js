/**
 * ## 이해
 *
 * 미지의 것: 정수 X가 주어졌을 때 연산 4개를 적절히 사용해서 1을 만들려고 한다.
 * 이 때 연산을 사용하는 횟수의 최솟값을 구하여라.
 * 자료
 *   - X는 정수다.
 *   - 5로 나누는 것이 가장 1에 가깝게 만들 수 있다.
 *   - 4일 때는 2로만 나눌 수 있다.
 *   - 3일 때는 3으로 나눌 수 있다.
 *   - 2일 때는 2로만 나눌 수 있다.
 *   - 5, 3, 2 모두 안나눠질 때는 무조건 1을 뺴야 한다.
 *   - 1 한게 5로 나누어진다면 빼고 5를 나눈다. 그게 아니라면 3 혹은 2로 나눈다.
 * 조건
 *   - 값은 항상 정수가 되어야 한다.
 *
 * ## 계획
 *   - 5로 나누어진다면 5로 나눈다.
 *   - 1을 뺀 것이 5로 나누어진다면 1을 뺀다.
 *   - 3으로 나누어진다면 3으로 나눈다.
 *   - 2로 나누어진다면 3으로 나눈다.
 *   - 나눌 수 없다면 1을 뺀다.
 * ## 실행
 *
 * ## 반성
 *  - 문제를 풀 때 그리디처럼 풀었는데, 검증을 제대로 하지 못했다. 계속 반복될
 *    수 있다는 특징을 찾지 못했던 것 같다.
 */
const cache = {};

const run = number => {
  if (cache[number]) {
    return cache[number];
  }

  if (number === 1) {
    return 0;
  }

  const value = [run(number - 1) + 1];
  if (number % 5 === 0) {
    value.push(run(number / 5) + 1);
  }

  if (number % 3 === 0) {
    value.push(run(number / 3) + 1);
  }

  if (number % 2 === 0) {
    value.push(run(number / 2) + 1);
  }

  cache[number] = Math.min(...value);
  return cache[number];
};

test('run', () => {
  expect(run(1)).toBe(0);
  expect(run(2)).toBe(1);
  expect(run(3)).toBe(1);
  expect(run(4)).toBe(2);
  expect(run(5)).toBe(1);
  expect(run(6)).toBe(2);
  expect(run(7)).toBe(3);
  expect(run(8)).toBe(3);
  expect(run(9)).toBe(2);
  expect(run(10)).toBe(2);
  expect(run(11)).toBe(3);
  expect(run(12)).toBe(3);
  expect(run(26)).toBe(3);
});

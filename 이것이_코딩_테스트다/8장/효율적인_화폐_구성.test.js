/**
 * ## 이해
 *
 * 미지의 것: N가지 종류의 화폐가 있을 때 화폐들의 개수를 최소한으로 이용해서 그 가치의 합이 M원이 되도록 하라
 * 자료
 *   - 화폐는 무제한이다.
 *   - 순서만 다른 경우는 무시한다.
 *   -
 * 조건
 *   - 불가능할 때는 -1 을 출력한다.
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *   - 캐시를 전역으로 잡아서 테스트가 여러개가 실행될 떄 깨졌다. 캐시를 계속 넘겨주도록 해서 문제를 해결했다.
 */

const r = (coins, target, cache) => {
  if (cache[target]) {
    return cache[target];
  }

  if (target < 0) {
    return -1;
  }

  if (target === 0) {
    return 0;
  }

  const values = coins.map(it => r(coins, target - it, cache))
    .filter(it => it >= 0)
    .map(it => it + 1);
  if (values.length === 0) {
    cache[target] = -1;
  } else {
    cache[target] = Math.min(...values);
  }
  return cache[target];
};

const run = (coins, target) => {
  const descendingCoins = coins.sort((a, b) => b - a);
  const cache = {};
  return r(descendingCoins, target, cache);
};

test('run', () => {
  expect(run([2, 3], 15)).toBe(5);
  expect(run([2, 3], 14)).toBe(5);
  expect(run([2, 3], 14)).toBe(5);
  expect(run([5, 3, 2], 26)).toBe(6);
  expect(run([3, 5, 7], 4)).toBe(-1);
  expect(run([1, 2, 5], 10)).toBe(2);
  expect(run([1, 5, 12], 15)).toBe(3);
});

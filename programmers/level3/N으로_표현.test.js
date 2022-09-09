/**
 * ## 이해
 *
 * 미지의 것: N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요
 * 자료
 *   - 자기 자신을 나눠서 1로 만들 수 있다.
 *   - 자기자신을 붙여서 5, 55, 555 이렇게 만들 수 있다.
 *   - 자기자신을 붙여서 나누면 55/5 = 11 이렇게 만들 수 있다.
 * 조건
 *   - 나누기 연산에서 나머지는 무시합니다
 *   - 최솟값이 8보다 크면 -1을 return
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */
const cache = {
};

const joinValue = (n, count) => Number(`${n}`.repeat(count));

const dfs = (n, target, current = 0, count = 0) => {
  if (cache[`${current}_${count}`]) {
    return cache[`${current}_${count}`];
  }

  if (count > 8) {
    return null;
  }

  if (current === target) {
    return count;
  }

  const result = [];
  for (let i = 1; i < 9 - count; i++) {
    const value = joinValue(n, i);
    const newCount = count + i;
    result.push(
      dfs(n, target, current + value, newCount),
      dfs(n, target, current - value, newCount),
      dfs(n, target, current * value, newCount),
      dfs(n, target, Math.floor(current / value), newCount),
    );
  }

  cache[`${current}_${count}`] = Math.min(...result.filter(it => it !== null));
  return cache[`${current}_${count}`];
};

const run = (n, target) => {
  const min = dfs(n, target);
  return min > 8 ? -1 : min;
};


test('run', () => {
  expect(run(5, 12)).toBe(4);
  console.log('c: ', c);
});

// + 5
// / 5
// * 5
// - 5
// 55 +5 / 5 * 5 - 5
// 555 + 5 / 5 * 5 - 5
// 5555
// 55555
// 555555
// 5555555

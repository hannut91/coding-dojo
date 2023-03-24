/**
 * ## 이해
 *
 * 미지의 것: 무기점의 주인이 무기를 모두 만들기 위해 필요한 철의 무게를 구하라
 * 자료
 *   - 무기를 만들 때, 무기의 공격력 1당 1kg의 철이 필요합니다
 * 조건
 *   - 제한수치를 넘을 경우, 정해진 공격력인 무기를 사용해야 합니다.
 *   - 기사단원은 약수의 개수로 무기를 구매합니다.
 *
 * ## 계획
 *   - 약수의 개수를 구하는 것을 만든다.
 *   - 무게 구하는 것을 만든다.
 *   - 1부터 주어진 number까지 순회하면서 무게를 더해나간다.
 *   - 더한 것을 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const divisorsCount = number => {
  let count = 0;
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      if ((number / i) < i) {
        break;
      }

      if ((number / i) === i) {
        count += 1;
      } else {
        count += 2;
      }
    }
  }
  return count;
};

const run = (number, limit, power) => {
  let kg = 0;

  for (let i = 1; i <= number; i++) {
    const divisor = divisorsCount(i);
    kg += (divisor > limit ? power : divisor);
  }
  return kg;
};

test('run', () => {
  expect(run(5, 3, 2)).toBe(10);
  expect(run(10, 3, 2)).toBe(21);
});


test('divisorsCount', () => {
  expect(divisorsCount(1)).toBe(1);
  expect(divisorsCount(2)).toBe(2);
  expect(divisorsCount(3)).toBe(2);
  expect(divisorsCount(15)).toBe(4);
});

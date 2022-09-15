/**
 * ## 이해
 *
 * 미지의 것: N개의 동전을 이용하여 만들 수 없는 양의 정수 금액 중 최솟값을 구하는 프로그램을 작성하라
 * 자료
 *   - 금액은 자연수다.
 *   - 금액중 가장 작은 금액은 1원이다
 *   - 동전은 중복될 수 있다.
 * 조건
 *   -
 *
 * ## 계획
 *   - 1부터 하나씩 증가하면서 가능한지 확인한다.
 *   - 1부터 증가시켜가며 가능한 동전들을 하나씩 쓰면서 증가시킨다.
 *
 * ## 실행
 *
 * ## 반성
 *   - 정렬하는 것 까지는 맞쳤지만 더 전개를 안해봤다. 뭔가 안될 것 같은 느낌에
 *     더 이상 자세히 살펴보려 하지 않았다.
 */

const run = numbers => {
  numbers.sort((a, b) => a - b);

  let sum = 0;
  for (const number of numbers) {
    if (sum + 1 < number) {
      return sum + 1;
    }

    sum += number;
  }

  return sum + 1;
};

test('run', () => {
  expect(run([1, 2, 3])).toBe(7);
  expect(run([3, 2, 1, 1, 9])).toBe(8);
  expect(run([3, 1, 6, 2, 7, 30, 1])).toBe(21);
});

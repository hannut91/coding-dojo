// 1. 최대 갯수를 N/2로 구한다.
// 2. 중복을 제거한 목록을 구한다.
// 3. 중복을 제거한 갯수와 N/2중 작은 값을 반환한다.

const run = numbers => {
  const maxiumCount = numbers.length / 2;
  const set = new Set(numbers);
  return Math.min(maxiumCount, set.size);
};

test('run', () => {
  expect(run([3, 1, 2, 3])).toBe(2);
  expect(run([3, 3, 3, 2, 2, 4])).toBe(3);
  expect(run([3, 3, 3, 2, 2, 2])).toBe(2);
});

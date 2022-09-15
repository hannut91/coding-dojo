/**
 * ## 이해
 *
 * 미지의 것: 왼쪽부터 오른쪽으로 하나씩 모든 숫자를 확인하며 숫자 사이에 * 혹은
 * + 연산자를 넣어 결과적으로 만들어질 수 있는 가장 큰 수를 구하는 프로그램을 만들어라
 * 자료
 *   - 0을 곱하면 0이다. 따라서 0은 곱할 수 없다.
 *   - 0을 더해도 0이다. 따라서 0은 더할 수 없다.
 *   - 1을 곱해도 1이다. 따라서 1은 곱할 수 없다. 따라서 1은 더해야 한다.
 *
 * 조건
 *   - 모든 연산은 왼쪽에서부터 순서대로 이루어진다.
 *
 * ## 계획
 *   - 숫자를 쪼개서 높은 순으로 정렬하고, 0은 삭제한다.
 *   - 쪼개진 숫자들을 모두 곱한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const run = text => {
  const numbers = text.split('').map(it => Number(it)).filter(it => it !== 0).sort((a, b) => b - a);
  if (numbers.length === 0) {
    return 0;
  }

  return numbers.reduce((acc, cur) => {
    if (cur === 1) {
      return acc + cur;
    }
    return acc * cur;
  });
};

test('run', () => {
  expect(run('02984')).toBe(576);
  expect(run('567')).toBe(210);
  expect(run('0')).toBe(0);
  expect(run('1')).toBe(1);
  expect(run('11')).toBe(2);
});

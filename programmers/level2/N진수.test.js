/**
 * ## 이해
 *
 * 미지의 것: 튜브의 프로그램을 구현하라
 * 자료
 *   -
 * 조건
 *   -
 *
 * ## 계획
 *   - t x m 개의 숫자를 배열에 넣는다.
 *   - 숫자를 한개씩 쪼갠다.
 *   - 이를 순회하면서 p의 순서가 오면 해당 숫자를 결과에 넣고 t-1을 한다.
 *   - t가 0이 되면 결과를 리턴한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const run = (n, t, m, p) => {
  const r = [];
  for (let i = 0; i < t * m; i++) {
    i.toString(n).toUpperCase()
      .split('')
      .forEach(it => {
        r.push(it);
      });
    if (r.length >= m * t) {
      break;
    }
  }

  let result = '';
  for (let i = p - 1; i < r.length; i += m) {
    result += r[i];
    if (result.length === t) {
      break;
    }
  }

  return result;
};

test('run', () => {
  expect(run(10, 4, 2, 1)).toBe('0246');
  expect(run(10, 8, 2, 1)).toBe('02468111');
  expect(run(10, 4, 3, 1)).toBe('0369');
  expect(run(10, 4, 2, 2)).toBe('1357');

  expect(run(2, 4, 2, 1)).toBe('0111');

  expect(run(16, 16, 2, 1)).toBe('02468ACE11111111');
});

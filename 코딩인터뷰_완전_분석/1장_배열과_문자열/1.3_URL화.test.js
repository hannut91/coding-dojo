/**
 * ## 이해
 *
 * 미지의 것: 문자열에 들어있는 공백을 모두 `%20`으로 바꿔 주는 메서드를 작성하라
 * 자료
 *   -
 * 조건
 *   - 최종적으로 모든 문자를 다 담을 수 있을 만큼 충분한 공간이 이미 확보되어 있다.
 *
 * ## 계획
 *   - 1. 정규식을 활용한 방법
 *   - 2. 반복문을 활용한 방법
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const solution1 = text => text.replace(/\s/g, '%20');

test('solution1', () => {
  expect(solution1('Mr John Smith')).toBe('Mr%20John%20Smith');
});

const solution2 = text => text.split('').map(it => (it === ' ' ? '%20' : it)).join('');

test('solution2', () => {
  expect(solution2('Mr John Smith')).toBe('Mr%20John%20Smith');
});

/**
 * ## 이해
 *
 * 미지의 것: N명의 학생 정보가 있을 때 성적이 낮은 순서대로 학생의 이름을 출력하라.
 * 자료
 *   -
 * 조건
 *   -
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const split = text => value => value.split(text);

const first = arr => arr[0];

const run = arr => arr
  .map(split(' '))
  .sort(([, a], [, b]) => Number(a) - Number(b))
  .map(first)
  .join(' ');

test('run', () => {
  expect(run([
    '홍길동 95',
    '이순신 77',
  ])).toBe('이순신 홍길동');
});

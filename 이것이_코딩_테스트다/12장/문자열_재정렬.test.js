/**
 * ## 이해
 *
 * 미지의 것: 모든 알파벳을 오름차순으로 정렬하여 이어서 출력한 뒤에 그 뒤에 모든 숫자를 더한 값을 이어서 출력하라
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

const run = text => {
  const string = (text.match(/[A-Z]/g) || []).sort().join('');
  const number = (text.match(/[0-9]/g) || []).map(it => Number(it))
    .reduce((acc, cur) => acc + cur, 0);
  return `${string}${number}`;
};

test('run', () => {
  expect(run('K1KA5CB7')).toBe('ABCKK13');
  expect(run('AJKDLSI412K4JSJ9D')).toBe('ADDIJJJKKLSS20');
});

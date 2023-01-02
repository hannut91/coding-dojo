/**
 * ## 이해
 *
 * 미지의 것: 문자열 두 개가 주어졌을 때, 문자열을 같게 만들기 위해 편집 횟수가 1회 이내인지 확인하는
 *   함수를 작성하여라
 * 자료
 *   - 문자를 삽입할 수 있다.
 *   - 문자를 삭제할 수 있다.
 *   - 문자를 교체할 수 있다.
 *   - 문자열의 길이가 다르다면, 삭제해야 한다.
 *   - 문자열의 길이가 같다면 교체해야 한다.
 * 조건
 *   - 편집은 한 번 밖에 할 수 없다.
 *   - 편집은 한 번에 하나의 알파벳만 가능하다.
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *   - 문제를 분석하다 보니 문자열을 수정하는 문제에서 다른 문자열 갯수를 찾는
 *     문제로 변경되었다.
 *   - 글자의 갯수가 같은 경우와 다른 경우에 푸는 방식이 다르게 풀었는데, 하나로
 *     풀 수 있는 방법도 찾아봐야겠다.
 */

const solution1 = (a, b) => {
  if (Math.abs(a.length - b.length) >= 2) {
    return false;
  }

  let count = 0;
  if (a.length !== b.length) {
    if (b.length > a.length) {
      const temp = a;
      a = b;
      b = temp;
    }

    let aIndex = 0;
    let bIndex = 0;

    for (let i = 0; i < a.length; i++) {
      if (a[aIndex] === b[bIndex]) {
        aIndex++;
        bIndex++;
      } else {
        count++;
        if (count >= 2) {
          return false;
        }
        aIndex++;
      }
    }
    return true;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      count++;
      if (count >= 2) {
        return false;
      }
    }
  }

  return true;
};

test('solution1', () => {
  expect(solution1('pale', 'ple')).toBe(true);
  expect(solution1('ple', 'pale')).toBe(true);
  expect(solution1('pales', 'pale')).toBe(true);
  expect(solution1('pale', 'bale')).toBe(true);
  expect(solution1('pale', 'bake')).toBe(false);
});

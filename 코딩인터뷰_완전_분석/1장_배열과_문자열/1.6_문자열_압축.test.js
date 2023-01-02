/**
 * ## 이해
 *
 * 미지의 것: 반복되는 문자의 개수를 세는 방식의 기본적인 문자열 압축 메서드를 작성하라
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
 *   - 기존에 비슷한 문제를 풀어봐서 쉽게 풀 수 있었다.
 */

const solution1 = text => {
  let result = '';
  let current = '';
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    if (!current) {
      current = text[i];
      count = 1;
      continue;
    }

    if (current === text[i]) {
      count += 1;
      continue;
    }

    result += `${current}${count}`;
    current = text[i];
    count = 1;
  }

  result += `${current}${count}`;
  if (result.length > text.length) {
    return text;
  }
  return result;
};

test('solution1', () => {
  expect(solution1('abcde')).toBe('abcde');
  expect(solution1('aabcccccaaa')).toBe('a2b1c5a3');
});

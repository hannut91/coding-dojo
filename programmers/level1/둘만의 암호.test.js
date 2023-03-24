/**
 * ## 이해
 *
 * 미지의 것: 두 문자열 s와 skip, 그리고 자연수 index가 매개변수로 주어질 때 위 규칙대로 s를 변환한 결과를 return하라
 * 자료
 *   - 문자열 s의 각 알파벳을 index만큼 뒤의 알파벳으로 바꿔줍니다.
 *   - z를 넘어갈 경우 a로 돌아간다
 *   - skip에 있는 알파벳은 제외하고 건너뛴다
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

const next = (char, skip) => {
  const code = char.charCodeAt(char);
  const nextChar = code === 122 ? 'a' : String.fromCharCode(code + 1);
  if (skip.includes(nextChar)) {
    return next(nextChar, skip);
  }

  return nextChar;
};

const convert = (char, skip, index) => {
  if (index === 0) {
    return char;
  }

  return convert(next(char, skip), skip, index - 1);
};

const run = (s, skip, index) => s.split('')
  .map(char => convert(char, skip, index)).join('');

test('convert', () => {
  expect(convert('a', 'wbqd', 5)).toBe('h');
});

test('run', () => {
  expect(run('aukks', 'wbqd', 5)).toBe('happy');
});

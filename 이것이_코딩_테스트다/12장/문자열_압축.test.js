/**
 * ## 이해
 *
 * 미지의 것: 압축할 문자열 s가 매개변수로 주어질 때, 1개 이상 당뉘로 문자열을
 * 잘라 압축하여 표현한 문자열 중 가장 짧은 것의 길이를 return 하도록 하라
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

const zip = (text, count) => {
  let word = '';
  let wordCount = 0;
  let result = '';

  for (let i = 0; i < text.length; i += count) {
    const current = text.slice(i, i + count);
    if (word === '') {
      word = current;
      wordCount += 1;
      continue;
    }

    if (current === word) {
      wordCount += 1;
    } else if (wordCount === 1) {
      result += word;
      word = current;
      wordCount = 1;
    } else {
      result = `${result}${wordCount}${word}`;
      word = current;
      wordCount = 1;
    }
  }

  if (wordCount === 1) {
    result += word;
  } else {
    result = `${result}${wordCount}${word}`;
  }

  return result;
};

const run = text => {
  const result = [];

  for (let i = 1; i <= Math.ceil(text.length / 2); i++) {
    result.push(zip(text, i).length);
  }

  return Math.min(...result);
};

test('run', () => {
  expect(run('aabbaccc')).toBe(7);
  expect(run('ababcdcdababcdcd')).toBe(9);
  expect(run('abcabcdede')).toBe(8);
  expect(run('abcabcabcabcdededededede')).toBe(14);
  expect(run('xababcdcdababcdcd')).toBe(17);
});

/**
 * ## 이해
 *
 * 미지의 것: 문자열이 주어졌을 때, 이 문자열에 같은 문자가 중복되어 등장하는지 확인하는 알고리즘을 작성하라
 * 자료
 *   -
 * 조건
 *   -
 *
 * ## 계획
 *   - 1. 문자열을 완전 검색하는 방법
 *   - 2. 정렬
 *   - 3. Trie를 이용하는 방법
 *
 * ## 실행
 *
 * ## 반성
 *   - 문제에사 자료구조를 사용할 수 없다고 하여 2중 반복문이 되었다. Trie를
 *     이용해서라도 풀어보고 싶은데, Trie를 구현해 볼 수 없어서 할 수 없었던 것이 아쉬웠다.
 */
const solution1 = words => {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    for (let j = 0; j < words.length; j++) {
      if (i === j) {
        continue;
      }

      if (word === words[j]) {
        return true;
      }
    }
  }

  return false;
};

test('solution1', () => {
  expect(solution1(['Press', 'f', 'to', 'run', 'only', 'failed', 'tests'])).toBe(false);
  expect(solution1(['Press', 'o', 'to', 'only', 'run', 'tests', 'related', 'to', 'changed', 'files'])).toBe(true);
});

const solution2 = words => {
  words.sort();
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i] === words[i + 1]) {
      return true;
    }
  }

  return false;
};

test('solution2', () => {
  expect(solution2(['Press', 'f', 'to', 'run', 'only', 'failed', 'tests'])).toBe(false);
  expect(solution2(['Press', 'o', 'to', 'only', 'run', 'tests', 'related', 'to', 'changed', 'files'])).toBe(true);
});

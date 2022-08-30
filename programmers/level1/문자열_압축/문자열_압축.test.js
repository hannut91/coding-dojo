// 1. 더 이상 문자열이 남아있지 않다면, 만들어진 압축 문자열을 반환한다.
// 2. 현재 압축중인 문자열이 없다면, 압축중인 문자열에 넣는다.
// 3. 현재 압축중인 문자열이 있는데, 같은 문자열을 만난다면 압축중인 문자열에
//    넣는다.
// 4. 만약 현재 압축중인 문자열이 있는데, 다른 문자열을 만난다면, 압축중인 문자열에
//    압축해서 넣는다.
//   a. 이 때 문자열이 하나라면 그냥 넣는다.
//   b. 문자열이 여러개라면 갯수만큼 숫자를 붙이고 문자열을 반환한다.
// 5. 문자열을 반환한다.
const convert = (value, count) => {
  if (count === 0) {
    return '';
  }

  if (count === 1) {
    return value;
  }

  return `${count}${value}`;
};

const run = (string, wordCount = 1, compressed = '', current = '', count = 0) => {
  if (string.length === 0) {
    return [...compressed].join('') + convert(current, count);
  }

  if (current.length === 0) {
    return run(
      string.slice(wordCount),
      wordCount,
      compressed,
      string.slice(0, wordCount),
      count + 1,
    );
  }

  if (current[0] !== string[0]) {
    return run(
      string.slice(wordCount),
      wordCount,
      `${compressed}${convert(current, count)}`,
      string.slice(0, wordCount),
      1,
    );
  }

  return run(
    string.slice(wordCount),
    wordCount,
    compressed,
    string.slice(0, wordCount),
    count + 1,
  );
};

test('run', () => {
  expect(run('')).toBe('');
  expect(run('a')).toBe('a');
  expect(run('aa')).toBe('2a');
  expect(run('ab')).toBe('ab');
  expect(run('abb')).toBe('a2b');
  expect(run('aabb')).toBe('2a2b');
  expect(run('aabbaccc')).toBe('2a2ba3c');
});

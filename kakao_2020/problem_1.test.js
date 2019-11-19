const compress = (chars) => {
  let base = chars[0];
  let count = 0;
  let output = '';
  chars.forEach(char => {
    if (char === base) {
      count += 1;

      return
    }

    output += `${count > 1 ? count : ''}${base}`;
    base = char;
    count = 1;
  });

  return output += `${count > 1 ? count : ''}${base}`;
}

const sliceWithCount = (word, count) => {
  let chars = [];
  for (let i = 0; i < word.length; i += count) {
    chars = [...chars, word.slice(i, i + count)];
  }
  return chars;
}

const run = (word) => {
  const maxCount = Math.ceil(word.length / 2);

  return Math.min(
    ...[...Array(maxCount)]
      .map((v, i) => sliceWithCount(word, i + 1))
      .map(chars => compress(chars).length)
  )
}

test('test', () => {
  expect(run("aabbaccc")).toBe(7);
  expect(run("ababcdcdababcdcd")).toBe(9);
  expect(run("abcabcdede")).toBe(8);
  expect(run("abcabcabcabcdededededede")).toBe(14);
  expect(run("xababcdcdababcdcd")).toBe(17);
});

test('sliceWithCount', () => {
  expect(sliceWithCount("aabbaccc", 1)).toEqual([
    'a', 'a', 'b', 'b', 'a', 'c', 'c', 'c',
  ])
  expect(sliceWithCount("aabbaccc", 2)).toEqual([
    'aa', 'bb', 'ac', 'cc'
  ])
  expect(sliceWithCount("aabbaccc", 3)).toEqual([
    'aab', 'bac', 'cc'
  ])
});

test('compress', () => {
  expect(compress(['a', 'a', 'b', 'b', 'a', 'c', 'c', 'c'])).toBe('2a2ba3c');
  expect(compress(['aa', 'bb', 'ac', 'cc'])).toBe('aabbaccc');
});
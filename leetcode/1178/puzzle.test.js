const validWord = (word, puzzle) => {
  const superset = new Set(puzzle);
  const subset = new Set(word);

  return subset.has(puzzle[0]) && [...subset].every(v => superset.has(v));
};

const countValidWords = (words, puzzle) =>
  words.reduce((acc, word) => acc + (validWord(word, puzzle) ? 1 : 0), 0);

const findValidWords = (words, puzzle) =>
  words.filter(word => validWord(word, puzzle));

test('findNumOfValidWords', () => {
  const words = ['aaaa', 'asas', 'able', 'ability', 'actt', 'actor', 'access'];

  expect(countValidWords(words, 'aboveyz')).toBe(1);
  expect(countValidWords(words, 'abrodyz')).toBe(1);
  expect(countValidWords(words, 'abslute')).toBe(3);
  expect(countValidWords(words, 'absoryz')).toBe(2);
  expect(countValidWords(words, 'actresz')).toBe(4);
  expect(countValidWords(words, 'gaswxyz')).toBe(0);
});

test('findValidWords', () => {
  const words = ['aaaa', 'asas', 'able', 'ability', 'actt', 'actor', 'access'];
  expect(findValidWords(words, 'aboveyz')).toEqual(['aaaa']);
});

test('validWord', () => {
  expect(validWord('a', 'a')).toBeTruthy();
  expect(validWord('a', 'ab')).toBeTruthy();
  expect(validWord('aaaa', 'aboveyz')).toBeTruthy();
  expect(validWord('asas', 'aboveyz')).toBeFalsy();
  expect(validWord('aaaa', 'abslute')).toBeTruthy();
  expect(validWord('asas', 'abslute')).toBeTruthy();
  expect(validWord('ability', 'abslute')).toBeFalsy();
  expect(validWord('beefed', 'abcdefg')).toBeFalsy();
  expect(validWord('based', 'abcdefg')).toBeFalsy();

  expect(validWord('apple', 'aelwxyz')).toBeFalsy();
  expect(validWord('pleas', 'aelwxyz')).toBeFalsy();
  expect(validWord('please', 'aelwxyz')).toBeFalsy();
});

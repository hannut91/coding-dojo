const convert = (word) =>
  word.split('')
    .map((character, i) => i % 2 === 0
      ? character.toUpperCase()
      : character.toLowerCase())
    .join('');

const strangeWord = (word) =>
  word
    .split(' ')
    .map(convert)
    .join(' ');

test('strangeWord', () => {
  expect(strangeWord('try hello world')).toBe('TrY HeLlO WoRlD');
});

test('convert', () => {
  expect(convert('try')).toBe('TrY');
});
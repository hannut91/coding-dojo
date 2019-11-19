const middleWord = (word) => {
  const index = Math.floor(word.length / 2);

  const l = word.length % 2 === 0 ? 1 : 0;

  return word.slice(index - l, index + 1)
};

test('middleWord', () => {
  expect(middleWord('abcde')).toBe('c');
  expect(middleWord('qwer')).toBe('we');
});



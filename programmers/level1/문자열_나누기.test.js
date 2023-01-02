const getIndex = word => {
  const [first] = word;

  let equalsCount = 1;
  let differentCount = 0;
  for (let i = 1; i < word.length; i++) {
    if (word[i] === first) {
      equalsCount += 1;
    } else {
      differentCount += 1;
    }

    if (equalsCount === differentCount) {
      return i;
    }
  }

  return -1;
};

const run = (word, count = 0) => {
  if (!word) {
    return count;
  }

  const index = getIndex(word);
  if (index === -1) {
    return count + 1;
  }

  return run(word.slice(index + 1), count + 1);
};

test('run', () => {
  expect(run('banana')).toBe(3);
  expect(run('abracadabra')).toBe(6);
  expect(run('aaabbaccccabba')).toBe(3);
});

test('getIndex', () => {
  expect(getIndex('banana')).toBe(1);
  expect(getIndex('nana')).toBe(1);
  expect(getIndex('na')).toBe(1);
  expect(getIndex('a')).toBe(-1);
});

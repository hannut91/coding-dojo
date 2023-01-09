const isPossible = (skill, tree) => tree.split('')
  .every((it, index) => it === skill[index]);

const run = (skill, trees) => {
  const regex = RegExp(`[^${skill}]`, 'g');

  return trees
    .map(it => it.replace(regex, ''))
    .filter(tree => isPossible(skill, tree)).length;
};

test('run', () => {
  expect(run('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA'])).toBe(2);
});

test('isPossible', () => {
  expect(isPossible('CBD', 'BCD')).toBe(false);
  expect(isPossible('CBD', 'CBD')).toBe(true);
  expect(isPossible('CBD', 'CB')).toBe(true);
  expect(isPossible('CBD', 'BDA')).toBe(false);
});

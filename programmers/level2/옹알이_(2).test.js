const base = ['aya', 'ye', 'woo', 'ma'];

const removePossible = word => {
  if (word === '') {
    return true;
  }

  const found = base.find(it => word.startsWith(it));
  if (!found) {
    return false;
  }

  const next = word.replace(found, '');
  if (next.startsWith(found)) {
    return false;
  }

  return removePossible(next);
};

const run = babblings => babblings
  .filter(removePossible).length;

test('run', () => {
  expect(run(['ayaye'])).toBe(1);
  expect(run(['ayaye', 'uuu', 'yeye', 'yemawoo', 'ayaayaa'])).toBe(2);
});

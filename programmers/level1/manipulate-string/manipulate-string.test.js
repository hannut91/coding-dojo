const run = (s) => {
  if (s.length !== 4 && s.length !== 6) {
    return false;
  }

  return s.split('').every(i => !isNaN(Number(i)));
};

test('run', () => {
  expect(run('a234')).toBe(false);
  expect(run('1234')).toBe(true);
});
const createDelete = (i, j, max, current = 0, result = '') => {
  if (current > max) {
    return result;
  }

  const bit = (i <= current && current <= j)
    ? 0
    : 1;

  return createDelete(i, j, max, current + 1, bit + result);
};

const b = number => parseInt(number, 2);

const run = (n, m, i, j) => {
  const r = createDelete(i, j, n.length - 1);
  return ((b(r) & b(n)) | (b(m) << i)).toString(2);
};

test('run', () => {
  expect(run('100001111100', '10011', 2, 6)).toBe('100001001100');
  expect(run('111111111111', '10011', 2, 6)).toBe('111111001111');
});

const jewelsCount = (j, s) => s.split('').reduce((acc, cur) => (
  j.includes(cur) ? acc + 1 : acc), 0);

test('Jewels and Stones', () => {
  expect(jewelsCount('aA', 'aAAbbbb')).toBe(3);
  expect(jewelsCount('z', 'ZZ')).toBe(0);
});

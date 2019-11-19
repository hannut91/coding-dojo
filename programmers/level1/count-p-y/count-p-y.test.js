const countPY = (s) => {
  const p = s.match(/p/gi) || [];
  const y = s.match(/y/gi) || [];

  return p.length === y.length;
}

test('countPY', () => {
  expect(countPY('pPoooyY')).toBeTruthy();
  expect(countPY('Pyy')).toBeFalsy();
  expect(countPY('hi')).toBeTruthy();
});
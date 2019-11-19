const decentingOrder = (s) =>
  s.split('')
    .sort((a, b) => a > b ? -1 : 1)
    .join('');


test('decentingOrder', () => {
  expect(decentingOrder('Zbcdefg')).toBe('gfedcbZ');
});
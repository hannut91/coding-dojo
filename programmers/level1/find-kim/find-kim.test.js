const findKim = (seoul) =>
  `김서방은 ${seoul.indexOf('Kim')}에 있다`;

test('findKim', () => {
  expect(findKim(['Jane', 'Kim'])).toBe('김서방은 1에 있다');
});
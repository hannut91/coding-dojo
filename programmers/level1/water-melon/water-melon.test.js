const FRUIT = '수박';

const waterMelon = (n) =>
  FRUIT.repeat(Math.ceil(n / FRUIT.length))
    .slice(0, n);

test('waterMelon', () => {
  expect(waterMelon(4)).toBe('수박수박');
  expect(waterMelon(3)).toBe('수박수');
});
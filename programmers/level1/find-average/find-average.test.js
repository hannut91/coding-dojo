const sum = (a, b) => a + b;

const findAverage = (arr) => arr.reduce(sum, 0) / arr.length;

test('findAverage', () => {
  expect(findAverage([1, 2, 3, 4])).toBe(2.5);
});
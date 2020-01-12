const printCharWithCount = (char) => {
  return (count) => {
    return char.repeat(count);
  }
};

const p = (char, count) => char.repeat(count);

const starsWithCount = printCharWithCount('*');

const rectangularStar = (n, m) =>
  Array(m).fill(n)
    .map(p.bind(this, '*'))
    .join('\n');

test('rectangularStar', () => {
  expect(rectangularStar(5, 3)).toBe("*****\n*****\n*****");
});
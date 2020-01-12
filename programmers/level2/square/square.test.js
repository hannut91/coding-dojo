const wrongRectanglesCount = (width, height) => {
  if (width === height) {
    return width;
  }

  if (width > height) {
    [width, height] = [height, width];
  }

  const ratio = Math.ceil((height / width) * 100000000) / 100000000;
  return ratio * width;
};

const fineRectangle = (width, height) =>
 width * height - wrongRectanglesCount(width, height);


test('wrongRectanglesCount', () => {
  expect(wrongRectanglesCount(1, 1)).toBe(1);
  expect(wrongRectanglesCount(2, 2)).toBe(2);

  expect(wrongRectanglesCount(1, 2)).toBe(2);
  expect(wrongRectanglesCount(2, 4)).toBe(4);

  expect(wrongRectanglesCount(2, 3)).toBe(4);
});

test('fineRectangle', () => {
  expect(fineRectangle(8, 12)).toBe(80);
  expect(fineRectangle(12, 8)).toBe(80);
  expect(fineRectangle(1, 1)).toBe(0);
  expect(fineRectangle(2, 2)).toBe(2);
  expect(fineRectangle(3, 3)).toBe(6);

  expect(fineRectangle(1, 2)).toBe(0);
  expect(fineRectangle(1, 3)).toBe(0);
  expect(fineRectangle(1, 4)).toBe(0);

  expect(fineRectangle(2, 3)).toBe(2);
  expect(fineRectangle(2, 4)).toBe(4);
  expect(fineRectangle(2, 5)).toBe(4);
  expect(fineRectangle(2, 6)).toBe(6);
  expect(fineRectangle(1, 10000)).toBe(0);
});

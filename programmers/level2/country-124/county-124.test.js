const convertToNumbers = (numbers) => {
  const convertTo = (n) => {
    const { length } = numbers;
    if (n <= length) {
      return numbers[n - 1];
    }

    const remain = (n - 1) % length + 1;
    return convertTo(remain) + convertTo((n - remain) / length) * 10;
  }

  return convertTo;
}

const convertTo124 = convertToNumbers([1, 2, 4]);
const convertTo598 = convertToNumbers([5, 9, 8]);

test('convertTo124', () => {
  expect(convertTo124(1)).toBe(1);
  expect(convertTo124(2)).toBe(2);
  expect(convertTo124(3)).toBe(4);
  expect(convertTo124(4)).toBe(11);
  expect(convertTo124(5)).toBe(12);
  expect(convertTo124(6)).toBe(14);
  expect(convertTo124(7)).toBe(21);
});

test('convertTo598', () => {
  expect(convertTo598(1)).toBe(5);
  expect(convertTo598(2)).toBe(9);
  expect(convertTo598(3)).toBe(8);
  expect(convertTo598(4)).toBe(55);
  expect(convertTo598(5)).toBe(59);
  expect(convertTo598(6)).toBe(58);
  expect(convertTo598(7)).toBe(95);
});

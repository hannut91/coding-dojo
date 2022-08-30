const run = (price, count = 0) => {
  if (price % 5 === 0) {
    return count + (price / 5);
  }

  if (price === 1 || price === 3) {
    return -1;
  }

  if (price < 10 && price % 5 !== 0 && price % 2 === 0) {
    return count + (price / 2);
  }

  if (price > 5) {
    return run(price - 5, count + 1);
  }

  return run(price - 2, count + 1);
};

test('run', () => {
  expect(run(1)).toBe(-1);
  expect(run(2)).toBe(1);
  expect(run(3)).toBe(-1);
  expect(run(4)).toBe(2);
  expect(run(5)).toBe(1);
  expect(run(6)).toBe(3);
  expect(run(7)).toBe(2);
  expect(run(8)).toBe(4);
  expect(run(9)).toBe(3);
  expect(run(10)).toBe(2);
  expect(run(11)).toBe(4);
  expect(run(12)).toBe(3);
  expect(run(13)).toBe(5);
  expect(run(14)).toBe(4);
  expect(run(15)).toBe(3);
  expect(run(16)).toBe(5);
  expect(run(17)).toBe(4);
  expect(run(18)).toBe(6);
  expect(run(19)).toBe(5);
  expect(run(20)).toBe(4);
  expect(run(21)).toBe(6);
  expect(run(22)).toBe(5);
  expect(run(22)).toBe(5);
  expect(run(23)).toBe(7);
});

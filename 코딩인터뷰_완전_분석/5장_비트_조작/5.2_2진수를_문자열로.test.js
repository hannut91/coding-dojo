const run = (number, acc = 0, value = 0.5, result = '0.') => {
  if (result.length === 34) {
    return result;
  }
  if (number === 0) {
    return result;
  }

  if (acc + value > number) {
    return run(number, acc, value / 2, `${result}0`);
  }

  return run(number, acc + value, value / 2, `${result}1`);
};

test('run', () => {
  expect(parseFloat(run(0.74), 2)).toBe(0.101);
});


const binary = (number, text = '') => {
  if (number < 2) {
    return `${text}${number}`;
  }

  return binary(Math.floor(number / 2), number % 2 === 0 ? `${text}0` : `${text}1`);
};

const run = (text, count = 0, zeroCount = 0) => {
  if (text === '1') {
    return [count, zeroCount];
  }

  const newText = text.replace(/0/g, '');

  return run(
    binary(newText.length),
    count + 1,
    zeroCount + (text.length - newText.length),
  );
};

test('run', () => {
  expect(run('110010101001')).toEqual([3, 8]);
  expect(run('01110')).toEqual([3, 3]);
  expect(run('1111111')).toEqual([4, 1]);
});

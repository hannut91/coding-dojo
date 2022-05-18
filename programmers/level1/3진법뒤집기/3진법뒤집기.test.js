const convertToTriple = (number, result = '') => {
  if (number < 3) {
    return number.toString() + result;
  }

  return convertToTriple(Math.floor(number / 3), (number % 3) + result);
};

const tripleToDecimal = (triple, number = 0, position = 0) => {
  if (triple.length === 0 || Number(triple) === 0) {
    return number;
  }

  return tripleToDecimal(
    triple.slice(0, -1),
    number + Number(triple[triple.length - 1]) * (3 ** position),
    position + 1,
  );
};

const run = number => {
  const triple = convertToTriple(number);
  const reversed = triple.split('').reverse().join('');
  return tripleToDecimal(reversed);
};

test('run', () => {
  expect(run(45)).toBe(7);
  expect(run(125)).toBe(229);
});

test('3진법으로 변환', () => {
  expect(convertToTriple(0)).toBe('0');
  expect(convertToTriple(1)).toBe('1');
  expect(convertToTriple(2)).toBe('2');
  expect(convertToTriple(3)).toBe('10');
  expect(convertToTriple(4)).toBe('11');
  expect(convertToTriple(45)).toBe('1200');
});

test('10진법으로 변환', () => {
  expect(tripleToDecimal('0')).toBe(0);
  expect(tripleToDecimal('1')).toBe(1);
  expect(tripleToDecimal('2')).toBe(2);
  expect(tripleToDecimal('10')).toBe(3);
  expect(tripleToDecimal('11')).toBe(4);
  expect(tripleToDecimal('1200')).toBe(45);
});

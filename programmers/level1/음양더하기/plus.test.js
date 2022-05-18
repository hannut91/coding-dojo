const convert = (number, sign) => (sign ? number : -number);

const run = (numbers, signs) => numbers
  .map((number, index) => convert(number, signs[index]))
  .reduce((acc, cur) => acc + cur, 0);

test('run', () => {
  expect(
    run(
      [4, 7, 12],
      [true, false, true],
    ),
  ).toBe(9);
  expect(
    run(
      [1, 2, 3],
      [false, false, true],
    ),
  ).toBe(0);
});

describe('convert', () => {
  describe('when number > 0 && +', () => {
    it('return origin value', () => {
      expect(convert(4, true)).toBe(4);
    });
  });

  describe('when number > 0 && -', () => {
    it('returns minus value', () => {
      expect(convert(4, false)).toBe(-4);
    });
  });

  describe('when number is 0', () => {
    it('returns 0', () => {
      expect(convert(0, false)).toBe(0);
      expect(convert(0, true)).toBe(0);
    });
  });
});

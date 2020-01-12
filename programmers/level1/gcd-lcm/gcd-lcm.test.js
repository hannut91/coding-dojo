const gcdLCM = (a, b) => {
  const gcd = calculateGCD(a, b);
  const lcm = calculateLCM(a, b, gcd);
  return [gcd, lcm];
};

const calculateGCD = (a, b) => {
  if (b == 0) {
    return a;
  }

  return calculateGCD(b, a % b);
}

const calculateLCM = (a, b, gcd) => a * b / gcd;

test('gcdLCM', () => {
  expect(gcdLCM(3, 12)).toEqual([3, 12]);
});

test('calculateGCD', () => {
  expect(calculateGCD(3, 12)).toBe(3);
  expect(calculateGCD(2, 5)).toBe(1);
});

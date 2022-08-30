const prmies = {};

const convertToKNumberString = (n, k) => n.toString(k);

const convertToDecimal = n => Number(n);

const isPrime = n => {
  if (n < 2) {
    return false;
  }

  if (prmies[n] !== undefined) {
    return prmies[n];
  }

  for (let j = 2; j <= Math.floor(Math.sqrt(n)); j++) {
    if (n % j === 0) {
      prmies[n] = false;
      return false;
    }
  }

  prmies[n] = true;
  return true;
};

const kNumber = (n, k) => convertToKNumberString(n, k).split('0')
  .map(it => convertToDecimal(it, k))
  .filter(isPrime)
  .length;

test('kNumber', () => {
  expect(kNumber(1, 3)).toBe(0);
  expect(kNumber(2, 3)).toBe(1);
  expect(kNumber(437674, 3)).toBe(3);
  expect(kNumber(110011, 10)).toBe(2);
});

test('isPrime', () => {
  expect(isPrime(0)).toBe(false);
  expect(isPrime(1)).toBe(false);
  expect(isPrime(2)).toBe(true);
  expect(isPrime(3)).toBe(true);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(5)).toBe(true);
  expect(isPrime(6)).toBe(false);
  expect(isPrime(7)).toBe(true);
  expect(isPrime(8)).toBe(false);
  expect(isPrime(9)).toBe(false);
  expect(isPrime(10)).toBe(false);
  expect(isPrime(11)).toBe(true);
});

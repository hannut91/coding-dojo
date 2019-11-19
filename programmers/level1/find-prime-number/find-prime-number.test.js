const isPrimeNumber = (num, result) => {
  for (let i = 2; i < num; i++) {
    if (result[i]) {
      continue
    }

    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

const primeNumbersCount = (n) => {
  let origins = [];

  [...Array(n - 1)].forEach((_, i) => origins[i + 2] = true);

  origins.some((v, i) => {
    if (!v) {
      return false;
    }

    if (isPrimeNumber(i, origins)) {
      for (let j = i * 2; j <= n; j = j += i) {
        origins[j] = false;
      }

      if (i * i > n) {
        return true;
      }
    }
  });

  return origins.filter(i => i).length
};

test('primeNumbersCount', () => {
  expect(primeNumbersCount(10)).toBe(4);
});

test('isPrimeNumber', () => {
  expect(isPrimeNumber(2, {})).toBe(true);
  expect(isPrimeNumber(3, {})).toBe(true);
  expect(isPrimeNumber(6, {})).toBe(false);
  expect(isPrimeNumber(8, {})).toBe(false);
  expect(isPrimeNumber(10, {})).toBe(false);
});
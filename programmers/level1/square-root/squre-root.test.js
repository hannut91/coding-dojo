const squareRoot = (n) => {
  for (let i = 1; i <= n; i++) {
    const s = square(i);
    if (s > n) {
      return -1;
    }

    if (s === n) {
      return i;
    }
  }
};

const square = (n) => n * n;

const nextSquare = (n) => {
  const s = squareRoot(n);
  if (s < 0) {
    return -1;
  }

  return square(s + 1);
}

test('nextSquare', () => {
  expect(nextSquare(121)).toBe(144);
  expect(nextSquare(1)).toBe(4);
  // expect(nextSquare(2)).toBe(-1);
});

test('squareRoot', () => {
  expect(squareRoot(121)).toBe(11);
  expect(squareRoot(3)).toBe(-1);
  expect(squareRoot(2)).toBe(-1);
  expect(squareRoot(1)).toBe(1);
});
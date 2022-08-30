const uniquePaths = (rows, columns, memo = new Map()) => {
  if (rows === 1 || columns === 1) {
    return 1;
  }

  let left;
  const leftData = memo.get(`${rows - 1}-${columns}`);
  if (leftData) {
    left = leftData;
  } else {
    const r = uniquePaths(rows - 1, columns, memo);
    memo.set(`${rows - 1}-${columns}`, r);
    left = r;
  }

  let right;
  const rightData = memo.get(`${rows}-${columns - 1}`);
  if (rightData) {
    right = rightData;
  } else {
    const r = uniquePaths(rows, columns - 1, memo);
    memo.set(`${rows}-${columns - 1}`, r);
    right = r;
  }

  return left + right;
};

test('uniquePaths', () => {
  expect(uniquePaths(3, 5)).toBe(15);
});

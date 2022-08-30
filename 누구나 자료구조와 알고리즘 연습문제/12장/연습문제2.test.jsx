let times = 0;
const golomb = (n, memo = new Map()) => {
  times++;
  if (n === 1) {
    return 1;
  }

  if (!memo.get(n)) {
    memo.set(n, 1 + golomb(n - golomb(golomb(n - 1, memo), memo), memo));
  }

  return memo.get(n);

  // let a;
  // if (memo.get(n - 1)) {
  //   a = memo.get(n - 1);
  // } else {
  //   a = golomb(n - 1, memo);
  //   memo.set(n - 1, a);
  // }

  // let b;
  // if (memo.get(a)) {
  //   b = memo.get(a);
  // } else {
  //   b = golomb(a, memo);
  //   memo.set(a, b);
  // }

  // let c;
  // if (memo.get(n - b)) {
  //   c = memo.get(n - b);
  // } else {
  //   c = golomb(n - b, memo);
  //   memo.set(n - b, c);
  // }

  // return 1 + c;
};

test('golomb', () => {
  expect(golomb(9)).toBe(5);
  console.log('times: ', times);
});

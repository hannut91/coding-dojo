const run = prices => {
  const answer = Array.from({ length: prices.length }, (_, index) => prices.length - index - 1);

  const stack = [];

  for (let i = 0; i < prices.length; i++) {
    while (stack.length && prices[stack[stack.length - 1]] > prices[i]) {
      const top = stack.pop();
      answer[top] = i - top;
    }

    stack.push(i);
  }
};

test('run', () => {
  expect(run([1, 2, 3, 2, 3])).toBe([4, 3, 1, 1, 0]);
});

const run = (tradeCount, rewordCount, bottlesCount, count = 0) => {
  if (bottlesCount < tradeCount) {
    return count;
  }

  const receivedCount = Math.floor(bottlesCount / tradeCount) * rewordCount;
  const remainCount = (bottlesCount % tradeCount);
  return run(
    tradeCount,
    rewordCount,
    remainCount + receivedCount,
    count + receivedCount,
  );
};

test('run', () => {
  expect(run(2, 1, 20)).toBe(19);
});

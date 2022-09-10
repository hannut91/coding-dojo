const range = (n, fun = (_, index) => index + 1) => Array.from({ length: n }, fun);

const run = (n, connections, target) => {
  const minDistances = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity));

  range(n).forEach(it => {
    minDistances[it][it] = 0;
  });

  connections.forEach(([from, to, distance]) => {
    minDistances[from][to] = distance;
  });

  range(n).forEach(base => {
    range(n).filter((it => it !== base)).forEach(from => {
      range(n).filter(i => i !== from && i !== base).forEach(to => {
        minDistances[from][to] = Math.min(
          minDistances[from][to],
          minDistances[from][base] + minDistances[base][to],
        );
      });
    });
  });

  return minDistances[target[0]][target[1]];
};

test('run', () => {
  expect(run(
    4,
    [
      [1, 2, 4],
      [1, 4, 6],
      [2, 1, 3],
      [2, 3, 7],
      [3, 1, 5],
      [3, 4, 4],
      [4, 3, 2],
    ],
    [1, 3],
  )).toBe(8);
});

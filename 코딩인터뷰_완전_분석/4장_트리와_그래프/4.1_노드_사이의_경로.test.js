const run = (n, connections, start, end) => {
  const nodes = Array.from({ length: n }, () => []);
  const visited = Array.from({ length: n }, () => false);

  connections.forEach(([from, to]) => {
    nodes[from] = [...nodes[from], to];
  });

  visited[start] = true;
  const queue = [start];
  while (queue.length > 0) {
    const current = queue.shift();
    nodes[current].filter(it => !visited[it]).forEach(it => {
      visited[it] = true;
      queue.push(it);
    });
  }

  return visited[end];
};

test('run', () => {
  expect(run(
    6,
    [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 1],
      [4, 3],
      [4, 5],
    ],
    0, 1,
  )).toBe(true);

  expect(run(
    6,
    [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 1],
      [4, 3],
      [4, 5],
    ],
    1, 0,
  )).toBe(false);
});

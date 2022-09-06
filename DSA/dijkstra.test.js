const traverse = (nodes, visitedMap, minDistanceMap, node) => {
  if (visitedMap.get(node)) {
    return;
  }

  visitedMap.set(node, true);

  const currentNode = nodes.get(node);
  [...currentNode]
    .filter(([n]) => !visitedMap.get(n))
    .forEach(([n]) => {
      minDistanceMap.set(
        n,
        Math.min(minDistanceMap.get(node) + currentNode.get(n), minDistanceMap.get(n) || Infinity),
      );
    });

  const r = [...minDistanceMap].map(([n]) => n)
    .filter(n => !visitedMap.get(n));
  if (r.length === 0) {
    return;
  }

  const p = r.reduce((acc, cur) => {
    if (minDistanceMap.get(acc) < minDistanceMap.get(cur)) {
      return acc;
    }
    return cur;
  });

  traverse(nodes, visitedMap, minDistanceMap, p);
};

const run = (nodesCount, input, start, target) => {
  const nodes = Array.from({ length: nodesCount }, (_, index) => index + 1)
    .reduce((acc, cur) => {
      acc.set(cur, new Map());
      return acc;
    }, new Map());

  input.forEach(([node, to, size]) => {
    nodes.get(node).set(to, size);
  });

  const visitedMap = new Map();
  const minimumDistanceMap = new Map();
  minimumDistanceMap.set(start, 0);

  traverse(nodes, visitedMap, minimumDistanceMap, start);
  return minimumDistanceMap.get(target);
};

test('run', () => {
  expect(run(6, [
    [1, 2, 2],
    [1, 3, 5],
    [1, 4, 1],
    [2, 3, 3],
    [2, 4, 2],
    [3, 2, 3],
    [3, 6, 5],
    [4, 3, 3],
    [4, 5, 1],
    [5, 3, 1],
    [5, 6, 2],
  ], 1, 2))
    .toBe(2);
});

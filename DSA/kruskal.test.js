const findRoot = (nodes, target) => {
  if (nodes[target] === target) {
    return nodes[target];
  }

  nodes[target] = findRoot(nodes, nodes[target]);
  return nodes[target];
};

const union = (nodes, a, b) => {
  const rootA = findRoot(nodes, a);
  const rootB = findRoot(nodes, b);
  if (rootA < rootB) {
    nodes[rootB] = rootA;
  } else {
    nodes[rootA] = rootB;
  }
};

const isCycle = (nodes, a, b) => {
  const aRoot = findRoot(nodes, a);
  const bRoot = findRoot(nodes, b);
  return aRoot === bRoot;
};

const run = (n, connections) => {
  let sum = 0;
  const nodes = Array.from({ length: n }, (_, index) => index);
  const sortedConnections = connections
    .sort(([, , aDistance], [, , bDistance]) => aDistance - bDistance);
  sortedConnections.forEach(([from, to, distance]) => {
    if (isCycle(nodes, from - 1, to - 1)) {
      return;
    }

    sum += distance;
    union(nodes, from - 1, to - 1);
  });

  return sum;
};

test('run', () => {
  // 최소 신장 트리의 간선의 합을 구하여라
  expect(run(
    7,
    [
      [1, 2, 29],
      [1, 5, 75],
      [2, 3, 35],
      [2, 6, 34],
      [3, 4, 7],
      [4, 6, 23],
      [4, 7, 13],
      [5, 6, 53],
      [6, 7, 25],
    ],
  )).toBe(159);
});

test('union', () => {
  const nodes = [0, 1, 2, 3, 4, 5, 6];

  union(nodes, 2, 3);
  union(nodes, 3, 6);
  union(nodes, 3, 5);
  union(nodes, 1, 0);
  union(nodes, 1, 5);

  expect(isCycle(nodes, 1, 2)).toBe(true);
});

test('findRoot', () => {
  const nodes = [0, 0, 1, 2, 3];
  expect(findRoot(nodes, 4)).toBe(0);
  expect(nodes).toEqual([0, 0, 0, 0, 0]);
});

test('isCycle', () => {
  const nodes = [0, 1, 2, 3];

  expect(isCycle(nodes, 0, 3)).toBe(false);

  union(nodes, 0, 3);

  expect(isCycle(nodes, 0, 3)).toBe(true);
});

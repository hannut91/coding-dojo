/**
 * ## 이해
 *
 * 미지의 것: 최소 경로만 가지도록 나머지 길의 유지비의 합을 최소로하며 마을을 2개로 분리하라
 * 자료
 *   - 도로는 양방향이다.
 *   - 크루스칼 알고리즘을 사용하면 최소 경로만 가지도록 만들 수 있다.
 * 조건
 *   - 마을을 분리할 때는 각 분리된 마을 안에 집들이 서로 연결되도록 분할 해야 한다.
 *   - 마을에는 집이 하나 이상 있어야 한다.
 *
 * ## 계획
 *   - 크루스칼 알고리즘을 사용해서 최소 신장 트리를 만든다.
 *   - 그 중에서 가장 큰 비용의 간선을 자른다.
 *   - 남은 간선의 합을 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const findRoot = (nodes, target) => {
  if (nodes[target] === target) {
    return nodes[target];
  }

  nodes[target] = findRoot(nodes, nodes[target]);
  return nodes[target];
};

test('findRoot', () => {
  const nodes = [0, 1, 2, 3, 4];

  expect(findRoot(nodes, 0)).toBe(0);

  const nodes2 = [0, 0, 1, 2, 3];

  expect(findRoot(nodes2, 4)).toBe(0);

  expect(nodes2).toEqual([0, 0, 0, 0, 0]);
});


const isCycle = (nodes, a, b) => findRoot(nodes, a) === findRoot(nodes, b);

const union = (nodes, a, b) => {
  const rootA = findRoot(nodes, a);
  const rootB = findRoot(nodes, b);
  if (rootA < rootB) {
    nodes[rootB] = rootA;
  } else {
    nodes[rootA] = rootB;
  }
};

test('isCycle', () => {
  const nodes = [0, 1, 2, 3, 4];

  expect(isCycle(nodes, 0, 4)).toBe(false);

  union(nodes, 0, 1);
  union(nodes, 1, 4);

  expect(isCycle(nodes, 0, 4)).toBe(true);
});

const run = (n, connections) => {
  const nodes = Array.from({ length: n }, (_, index) => index);
  const sortedConnections = connections
    .sort(([,, aDistance], [,, bDistance]) => aDistance - bDistance);
  const distances = [];
  sortedConnections.forEach(([from, to, distance]) => {
    if (isCycle(nodes, from - 1, to - 1)) {
      return;
    }

    union(nodes, from - 1, to - 1);
    distances.push(distance);
  });

  return distances.sort((a, b) => b - a).slice(1).reduce((acc, cur) => acc + cur, 0);
};

test('run', () => {
  expect(run(
    7,
    [
      [1, 2, 3],
      [1, 3, 2],
      [3, 2, 1],
      [2, 5, 2],
      [3, 4, 4],
      [7, 3, 6],
      [5, 1, 5],
      [1, 6, 2],
      [6, 4, 1],
      [6, 5, 3],
      [4, 5, 3],
      [6, 7, 4],
    ],
  )).toBe(8);
});

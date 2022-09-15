/**
 * ## 이해
 *
 * 미지의 것: 모든 컴퓨터를 연결하는데 필요한 최소비용을 구하여라
 * 자료
 *   - 크루스칼 알고리즘은 최소 간선으로 모든 노드를 연결할 수 있는 알고리즘이다
 * 조건
 *   - 모든 컴퓨터를 연결할 수 없는 경우는 없다.
 *
 * ## 계획
 *   - 간선을 비용을 낮은 순으로 정렬한다.
 *   - 간선을 하나씩 추가하면서 싸이클이 생기지 않을 경우에만 간선을 추가한다.
 *   - 연결된 간선 비용을 모두 합한다.
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

const run = (n, connections) => {
  const nodes = Array.from({ length: n }, (_, index) => index);
  return [...connections].sort(([, , a], [, , b]) => a - b)
    .reduce((acc, [from, to, value]) => {
      if (isCycle(nodes, from - 1, to - 1)) {
        return acc;
      }

      union(nodes, from - 1, to - 1);
      return acc + value;
    }, 0);
};

test('run', () => {
  expect(run(
    6,
    [
      [1, 2, 5],
      [1, 3, 4],
      [2, 3, 2],
      [2, 4, 7],
      [3, 4, 6],
      [3, 5, 11],
      [4, 5, 3],
      [4, 6, 8],
      [5, 6, 8],
    ],
  )).toBe(23);
});

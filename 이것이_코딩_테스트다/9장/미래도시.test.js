/**
 * ## 이해
 *
 * 미지의 것: K번 회사에 갔다가 다시 X번 회사로 이동할 때 최소 시간을 계산하는 프로그램을 작성하라
 * 자료
 *   - 방문 판매원 A는 현재 1번 회사에 있다.
 *   - 특정 회사끼리는 서로 도로를 통해 연겯뢰어 있다.
 *   - 연결된 회사는 양방향으로 이동이 가능하다
 *   - 각 회사까지 걸리는 시간은 1이다.
 *   - 다익스트라 알고리즘은 최단거리를 계산할 수 있다.
 * 조건
 *   -
 *
 * ## 계획
 *   - 일단 연결된 노드를 만든다.
 *   - K번 회사까지 최단 거리를 구한다.
 *   - X번 회사까지 최단 거리를 구한다.
 *   - 둘을 더한다.
 *
 * ## 실행
 *
 * ## 반성
 *  - 다익스트라를 이미 알고 있어서 문제를 읽을 때부터 어떻게 풀어야 할지 생각이 났다.
 *  - 이번에 풀 때는 저번에 다익스트라 구현할 때 보다 더 단순하게 하기 위해서 Map대신에 객체를 사용했고 인터페이스도 최소 거리만 반환하도록 했다.
 *  - 최소 노드를 찾을 때 O(N)이 걸리는데, Heap자료구조로 해봐야겠다.
 */

const traverse = (nodes, visitedNodes, minDistances, current) => {
  if (visitedNodes[current]) {
    return;
  }

  visitedNodes[current] = true;

  const currentNode = nodes[current];
  const adjacentNodes = Object.keys(currentNode);
  adjacentNodes.forEach(node => {
    minDistances[node] = Math.min(
      minDistances[current] + currentNode[node],
      minDistances[node] || Infinity,
    );
  });

  const notVisitedAdjacentNodes = adjacentNodes
    .filter(it => !visitedNodes[it]);
  if (notVisitedAdjacentNodes.length === 0) {
    return;
  }
  const shortestNode = notVisitedAdjacentNodes
    .reduce((acc, cur) => (minDistances[acc] > minDistances[cur] ? cur : acc));
  traverse(nodes, visitedNodes, minDistances, shortestNode);
};

const minDistance = (nodes, start, end) => {
  const visitedNodes = Object.keys(nodes).reduce((acc, cur) => ({
    ...acc,
    [cur]: false,
  }), {});
  const minDistances = Object.keys(nodes).reduce((acc, cur) => ({
    ...acc,
    [cur]: undefined,
  }), {});

  minDistances[start] = 0;
  traverse(nodes, visitedNodes, minDistances, start);
  if (!minDistances[end]) {
    return null;
  }

  return minDistances[end];
};

const createNodes = (count, connections) => {
  const nodes = Array.from({ length: count }, (_, i) => i + 1)
    .reduce((acc, cur) => ({
      ...acc,
      [cur]: {},
    }), {});
  return connections.reduce((acc, [start, end]) => ({
    ...acc,
    [start]: {
      ...acc[start],
      [end]: 1,
    },
    [end]: {
      ...acc[end],
      [start]: 1,
    },
  }), nodes);
};

const run = (nodesCount, connections, x, k) => {
  const nodes = createNodes(nodesCount, connections);
  const kLength = minDistance(nodes, 1, k);
  if (kLength === null) {
    return -1;
  }
  const xLength = minDistance(nodes, k, x);
  if (xLength === null) {
    return -1;
  }

  return kLength + xLength;
};

test('run', () => {
  expect(run(5, [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [3, 5],
    [4, 5],
  ], 4, 5)).toBe(3);

  expect(run(4, [
    [1, 3],
    [2, 4],
  ], 3, 4)).toBe(-1);
});

test('createNodes', () => {
  expect(createNodes(3, [
    [1, 2],
  ])).toEqual({
    1: {
      2: 1,
    },
    2: {
      1: 1,
    },
    3: {},
  });
});

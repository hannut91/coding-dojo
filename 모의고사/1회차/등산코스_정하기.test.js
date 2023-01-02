/**
 * ## 이해
 *
 * 미지의 것: 당신은 XX산의 출입구 중 한 곳에서 출발하여 산봉우리 중 한 곳만 방문한 뒤
 *  다시 원래의 출입구로 돌아오는 등산코스를 정하려고 합니다 당신은 이러한 규칙을 지키면서
 * intensity가 최소가 되도록 등산코스를 정하려고 합니다.
 * 자료
 *   - 출입구, 쉼터, 산봉우리가 있다.
 *   - 각 지점은 양방향 통행이 가능하다.
 *   - 쉼터 혹은 산봉우리에서는 휴식이 가능하다. 휴식업싱 이동해야 하는 시간 중 가장 긴 시간을
 *     해당 등산코스의 intensity라고 부른다
 * 조건
 *   - 등산코스에서 출입구는 처음과 끝에 한 번씩, 산봉우리는 한 번만 포함되어야 합니다.
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const findRoot = (nodes, a) => {
  if (nodes[a] === a) {
    return a;
  }

  nodes[a] = findRoot(nodes, nodes[a]);
  return nodes[a];
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

const isCycle = (nodes, a, b) => findRoot(nodes, a) === findRoot(nodes, b);

const run = (n, connections, gates, summits) => {
  const nodes = Array.from({ length: n }, (_, index) => index);
  const lines = Array.from({ length: n }, () => []);
  connections.forEach(([from, to, distance]) => {
    lines[from - 1].push([to - 1, distance]);
    lines[to - 1].push([from - 1, distance]);
  });

  const r = gates.map(it => {
    const minDistances = getMinDistances(nodes, lines, it - 1);
    console.log('minDistances: ', minDistances);
    return summits.reduce((acc, cur) => {
      if (acc[1] > minDistances[cur - 1]) {
        return [cur - 1, minDistances[cur - 1]];
      }

      if (acc[1] === minDistances[cur - 1]) {
        if (acc[0] > cur) {
          return [cur - 1, minDistances[cur - 1]];
        }
      }

      return acc;
    }, [0, Infinity]);
  });

  console.log('r: ', r);
  // return [r[0] + 1, r[1]];
};

test('run', () => {
  // expect(run(
  //   6,
  //   [[1, 2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]],
  //   [1, 3],
  //   [5],
  // )).toEqual([5, 3]);

  expect(run(
    7,
    	[[1, 2, 5], [1, 4, 1], [2, 3, 1], [2, 6, 7], [4, 5, 1], [5, 6, 1], [6, 7, 1]],
    [3, 7],
    [1, 5],
  )).toEqual([5, 1]);
});

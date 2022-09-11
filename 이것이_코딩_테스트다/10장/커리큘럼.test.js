/**
 * ## 이해
 *
 * 미지의 것: 동빈이가 듣고자 하는 N개의 강의 정보가 주어졌을 때, N개의 강의에 대하여 수강하기까지 걸리는 최소 시간을 구하라
 * 자료
 *   - 모든 강의는 1번부터 N번까지의 번호를 가진다.
 *   - 동시에 여러개의 강의를 들을 수 있다.
 *   - 선수강의는 다음 강의로 이어지는 간선으로 볼 수 있다.
 * 조건
 *   - 선수강의가 있는 강의는 선수 강의를 먼저 들어야만 해당 강의를 들을 수 있다.
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *   - 위상 정렬까지는 했는데, 정렬되는 과정에서 선수과목들의 시간들을 계산하지 못했다.
 *
 */

const run = (lecturesCount, lectures) => {
  const nodes = Array.from({ length: lecturesCount }, () => 0);
  const lines = Array.from({ length: lecturesCount }, () => []);
  const times = Array.from({ length: lecturesCount }, () => 0);

  lectures.forEach(([time, ...prerequisites], to) => {
    times[to] = time;
    nodes[to] = prerequisites.length;

    prerequisites.forEach(from => {
      lines[from - 1] = [...lines[from - 1], to];
    });
  });
  const result = [...times];

  const queue = [];

  nodes.forEach((node, index) => {
    if (node === 0) {
      queue.push(index);
    }
  });

  while (queue.length > 0) {
    const next = queue.shift();
    lines[next].forEach(node => {
      result[node] = Math.max(result[node], result[next] + times[node]);

      nodes[node] = nodes[node] - 1;
      if (nodes[node] === 0) {
        queue.push(node);
      }
    });
  }

  return nodes.map((_, index) => result[index]);
};

test('run', () => {
  expect(run(
    5,
    [
      [10],
      [10, 1],
      [4, 1],
      [4, 3, 1],
      [3, 3],
    ],
  )).toEqual([
    10, 20, 14, 18, 17,
  ]);
});

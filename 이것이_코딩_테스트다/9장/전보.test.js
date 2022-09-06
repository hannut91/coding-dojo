/**
 * ## 이해
 *
낸 메시지를 받게 되는 도시의 개수와 도시들이 모두
 * 메시지를 받는 데까지 걸리는 시간은 얼마인지 계산하는 프로그램을 만들어라.
 * 자료
 *   - 도시가 X 에서 Y로 향하는 통로가 설치되어 있어야 한다.
 *   - Y에서 X로 향하는 통로가 없다면 Y는 X로 메시지를 보낼 수 없다.
 *   - 다익스트라 알고리즘은 해당 경로에서 연결된 경로들의 모든 최단 거리를 구한다.
 * 조건
 *   -
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *  - 이전 문제랑 거의 똑같아서 복붙할 수 있지만 처음부터 다시 풀어봤다. 그리고 Heap구현한 것을
 *    조금 바꿔서 배열을 받으면 첫번째껄로 정렬하도록 수정해서 문제를 해결했다.
 */

class Heap {
  constructor() {
    this.data = [];
  }

  root() {
    return this.data[0];
  }

  last() {
    return this.data[this.data.length - 1];
  }

  leftChildIndex(index) {
    return (index * 2) + 1;
  }

  rightChildIndex(index) {
    return (index * 2) + 2;
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  isEmpty() {
    return this.data.length === 0;
  }

  insert(value) {
    this.data.push(value);

    let currentIndex = this.data.length - 1;

    while (true) {
      const parentIndex = this.parentIndex(currentIndex);
      if (currentIndex < 0 || parentIndex < 0 || this.data[currentIndex][0] < this.data[parentIndex][0]) {
        break;
      }

      [this.data[parentIndex], this.data[currentIndex]] = [this.data[currentIndex], this.data[parentIndex]];
      currentIndex = parentIndex;
    }
  }

  remove() {
    if (this.data.length === 0) {
      return null;
    }

    if (this.data.length === 1) {
      return this.data.pop();
    }

    const value = this.data[0];
    this.data[0] = this.data.pop();

    let currentIndex = 0;

    while (true) {
      const childIndex = this.largerChild(currentIndex);
      if (childIndex === null) {
        break;
      }

      [this.data[currentIndex], this.data[childIndex]] = [this.data[childIndex], this.data[currentIndex]];

      currentIndex = childIndex;
    }

    return value;
  }

  largerChild(index) {
    const currentValue = this.data[index];
    const leftIndex = this.leftChildIndex(index);
    const rightIndex = this.rightChildIndex(index);
    if (!this.data[leftIndex] && !this.data[rightIndex]) {
      return null;
    }

    if (!this.data[rightIndex]) {
      return currentValue > this.data[leftIndex][0] ? null : this.data[leftIndex];
    }

    if (this.data[leftIndex][0] > this.data[rightIndex][0]) {
      return currentValue > this.data[leftIndex][0] ? null : this.data[leftIndex];
    }

    return currentValue > this.data[rightIndex][0] ? null : this.data[rightIndex];
  }
}

const traverse = (nodes, visitedNodes, minDistances, heap, current) => {
  if (visitedNodes[current]) {
    return;
  }

  visitedNodes[current] = true;

  const adjacentNodes = Object.keys(nodes[current]);
  adjacentNodes.forEach(node => {
    const value = Math.min(
      minDistances[current] + nodes[current][node],
      minDistances[node] || Infinity,
    );
    minDistances[node] = value;
    heap.insert([value, node]);
  });

  let nextNode;
  while (true) {
    if (heap.isEmpty()) {
      break;
    }

    const [, node] = heap.remove();
    if (!visitedNodes[node]) {
      nextNode = node;
      break;
    }
  }
  if (!nextNode) {
    return;
  }

  traverse(nodes, visitedNodes, minDistances, heap, nextNode);
};

const calculateDistances = (nodes, start) => {
  const visitedNodes = Object.keys(nodes).reduce((acc, cur) => ({
    ...acc,
    [cur]: false,
  }), {});
  const minDistances = Object.keys(nodes).reduce((acc, cur) => ({
    ...acc,
  }), {});

  minDistances[start] = 0;
  const heap = new Heap();
  traverse(nodes, visitedNodes, minDistances, heap, start);

  return minDistances;
};

const createNodes = (count, connections) => {
  const nodes = Array.from({ length: count }, (_, i) => i + 1)
    .reduce((acc, cur) => ({
      ...acc,
      [cur]: {},
    }), {});
  return connections.reduce((acc, [start, end, distance]) => ({
    ...acc,
    [start]: {
      ...acc[start],
      [end]: distance,
    },
  }), nodes);
};

const run = (nodesCount, connections, start) => {
  const nodes = createNodes(nodesCount, connections);
  const minDistances = calculateDistances(nodes, start);
  return [
    Object.keys(minDistances).length - 1,
    Math.max(
      ...Object.entries(minDistances).map(([_, distance]) => distance),
    ),
  ];
};

test('run', () => {
  expect(run(
    3,
    [
      [1, 2, 4],
      [1, 3, 2],
    ],
    1,
  )).toEqual([2, 4]);
});

test('createNodes', () => {
  expect(createNodes(3, [
    [1, 2, 4],
    [1, 3, 2],
  ])).toEqual({
    1: {
      2: 4,
      3: 2,
    },
    2: {},
    3: {},
  });
});

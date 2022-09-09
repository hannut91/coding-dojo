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
    const currentValue = this.data[index][0];
    const leftIndex = this.leftChildIndex(index);
    const rightIndex = this.rightChildIndex(index);
    if (!this.data[leftIndex] && !this.data[rightIndex]) {
      return null;
    }

    if (!this.data[rightIndex]) {
      return currentValue > this.data[leftIndex][0] ? null : leftIndex;
    }

    if (this.data[leftIndex][0] > this.data[rightIndex][0]) {
      return currentValue > this.data[leftIndex][0] ? null : leftIndex;
    }

    return currentValue > this.data[rightIndex][0] ? null : rightIndex;
  }
}

const run = (n, connections, target) => {
  const arr = Array(n + 1).fill(Infinity);
  const lines = Array.from({ length: n + 1 }, () => []);

  connections.forEach(([from, to, distance]) => {
    lines[from].push({ to, distance });
    lines[to].push({ to: from, distance });
  });

  const queue = new Heap();
  queue.insert([0, 1]);
  arr[1] = 0;

  while (!queue.isEmpty()) {
    const [, to] = queue.remove();

    lines[to].forEach(next => {
      if (arr[next.to] > arr[to] + next.distance) {
        arr[next.to] = arr[to] + next.distance;
        queue.insert([next.distance, next.to]);
      }
    });
  }

  return arr.slice(1).filter(it => it <= target).length;
};

test('run', () => {
  expect(run(
    5,
    [
      [1, 2, 1],
      [2, 3, 3],
      [5, 2, 2],
      [1, 4, 2],
      [5, 3, 1],
      [5, 4, 2],
    ],
    3,
  )).toBe(4);
  expect(run(
    6,
    [
      [1, 2, 1],
      [1, 3, 2],
      [2, 3, 2],
      [3, 4, 3],
      [3, 5, 2],
      [3, 5, 3],
      [3, 5, 5],
      [3, 5, 9],
      [5, 6, 1],
    ],
    4,
  )).toBe(4);
});

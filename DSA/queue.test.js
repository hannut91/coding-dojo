class Queue {
  constructor() {
    this.data = [];
  }

  enqueue(value) {
    this.data.push(value);
  }

  dequeue() {
    return this.data.shift();
  }

  size() {
    return this.data.length;
  }
}

test('Queue', () => {
  const queue = new Queue();

  queue.enqueue('hello');
  queue.enqueue('world');

  const value = queue.dequeue();

  expect(value).toBe('hello');
  expect(queue.size()).toBe(1);
});

test('printManager', () => {
  const queue = new Queue();

  while (true) {
    const value = queue.dequeue();
    if (!value) {
      return;
    }

    console.log(value);
  }
});

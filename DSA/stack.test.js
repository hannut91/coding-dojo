class Stack {
  constructor() {
    this.data = [];
  }

  push(value) {
    this.data.push(value);
  }

  pop() {
    return this.data.pop();
  }

  top() {
    return this.data[this.data.length - 1];
  }

  isEmpty() {
    return this.data.length === 0;
  }
}

test('Stack', () => {
  const stack = new Stack();
  stack.push('hello');
  stack.push('world');

  expect(stack.top()).toBe('world');

  stack.push('!!!');

  const value = stack.pop();

  expect(value).toBe('!!!');

  expect(stack.top()).toBe('world');
});

module.exports = {
  Stack,
};

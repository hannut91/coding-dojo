class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class MinStack {
  constructor() {
    this.top = null;
    this.min = null;
  }

  push(value) {
    if (this.top === null) {
      this.top = new StackNode(value);
      this.min = value;
      return;
    }

    if (value < this.min) {
      this.min = value;
    }

    const newNode = new StackNode(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    const { value } = this.top;
    if (value === this.min) {
      this.min = this.top.next.value;
    }
    this.top = this.top.next;
    return value;
  }

  peek() {
    return this.top.value;
  }

  getMin() {
    return this.min;
  }

  isEmpty() {
    return this.top === null;
  }
}

test('Stack min', () => {
  const stack = new MinStack();

  stack.push(5);
  stack.push(1);
  stack.push(3);

  expect(stack.getMin(1)).toBe(1);

  stack.pop();
  stack.pop();

  expect(stack.getMin(1)).toBe(5);
});

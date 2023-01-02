class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(value) {
    if (this.top === null) {
      this.top = new StackNode(value);
      return;
    }

    const newNode = new StackNode(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    const { value } = this.top;
    this.top = this.top.next;
    return value;
  }

  peek() {
    return this.top.value;
  }

  isEmpty() {
    return this.top === null;
  }
}

test('push', () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toBe(true);

  stack.push(10);

  expect(stack.isEmpty()).toBe(false);
  expect(stack.peek()).toBe(10);

  stack.push(20);
  stack.push(30);

  expect(stack.peek()).toBe(30);
});

test('pop', () => {
  const stack = new Stack();
  stack.push(10);
  stack.push(20);
  stack.push(30);

  expect(stack.isEmpty()).toBe(false);

  expect(stack.pop()).toBe(30);
  expect(stack.pop()).toBe(20);
  expect(stack.pop()).toBe(10);

  expect(stack.isEmpty()).toBe(true);
});

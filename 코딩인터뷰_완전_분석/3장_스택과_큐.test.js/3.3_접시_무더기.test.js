class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.max = 5;
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

class SetOfStacks {
  constructor() {
    this.stacks = new Stack();
  }

  push(value) {
    if (this.stacks.top === null) {
      this.stacks.push(new Stack());
      this.stacks.top.value.push(value);
      return;
    }

    this.stacks.top.value.push(value);
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

test('run', () => {
  const stack = new SetOfStacks();

  stack.push(1);
  stack.push(2);
  stack.push(3);

  stack.pop();
  stack.pop();
  stack.pop();

  console.log('stack: ', stack);
});

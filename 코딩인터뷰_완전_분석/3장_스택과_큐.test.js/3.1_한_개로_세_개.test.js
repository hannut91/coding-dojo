class Stacks {
  constructor() {
    this.arr = Array.from({ length: 12 }, () => undefined);
    this.pointers = [
      0, 4, 8,
    ];
  }

  push(number, value) {
    const pointer = this.pointers[number];
    if (this.isEmpty(number)) {
      this.arr[pointer] = value;
      return;
    }

    let current = pointer;
    let temp = value;
    while (this.arr[current] !== undefined) {
      const a = this.arr[current];
      this.arr[current] = temp;
      temp = a;
      current += 1;
    }

    this.arr[current] = temp;
  }

  pop(number) {
    const pointer = this.pointers[number];
    const value = this.arr[pointer];

    let current = pointer;
    while (this.arr[current] !== undefined) {
      this.arr[current] = this.arr[current + 1];
      current += 1;
    }
    return value;
  }

  isEmpty(number) {
    const pointer = this.pointers[number];

    if (this.arr[pointer] === undefined) {
      return true;
    }

    return false;
  }

  peek(number) {
    const pointer = this.pointers[number];

    return this.arr[pointer];
  }
}

test('push', () => {
  const stacks = new Stacks();

  expect(stacks.isEmpty(0)).toBe(true);

  stacks.push(0, 10);

  expect(stacks.isEmpty(0)).toBe(false);
  expect(stacks.peek(0)).toBe(10);

  stacks.push(0, 20);
  stacks.push(0, 30);

  expect(stacks.peek(0)).toBe(30);
});

test('pop', () => {
  const stacks = new Stacks();
  stacks.push(0, 10);
  stacks.push(0, 20);
  stacks.push(0, 30);

  expect(stacks.isEmpty(0)).toBe(false);

  expect(stacks.pop(0)).toBe(30);
  expect(stacks.pop(0)).toBe(20);
  expect(stacks.pop(0)).toBe(10);

  expect(stacks.isEmpty(0)).toBe(true);
});

test('test second stack', () => {
  const stacks = new Stacks();
  stacks.push(0, 10);
  stacks.push(0, 20);
  stacks.push(0, 30);

  stacks.push(1, 30);
  stacks.push(1, 20);
  stacks.push(1, 10);

  expect(stacks.isEmpty(0)).toBe(false);
  expect(stacks.isEmpty(1)).toBe(false);
});

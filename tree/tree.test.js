class Node {
  value = null;
  left = null;
  right = null;

  constructor(value) {
    this.value = value;
  }

  insert(value) {
    if (!this.value) {
      this.value = value;
      return;
    }

    if (value < this.value) {
      if (this.left === null) {
        this.left = new Node(value);
        return;
      }

      this.left.insert(value);
      return;
    }

    if (value > this.value) {
      if (this.right === null) {
        this.right = new Node(value);
        return;
      }

      this.right.insert(value);
    }
  }

  has(value) {
    if (value === this.value) {
      return true;
    }

    if (value > this.value) {
      if (!this.right) {
        return false;
      }

      return this.right.has(value);
    }

    if (value < this.value) {
      if (!this.left) {
        return false;
      }

      return this.left.has(value);
    }

    return false;
  }

  delete(value) {
    if (value === this.value) {
      if (this.right) {
        this.value = this.right.minNode().value;
        this.right.delete(value);
      }

      if (!this.right) {
        this.value = null;
      }
    }

    if (value < this.value) {
      if (!this.left) {
        return;
      }

      this.left.delete(value);
    }

    if (value > this.value) {
      if (!this.right) {
        return;
      }

      this.right.delete(value);
    }
  }

  minNode(value) {
    if (!this.left) {
      return this;
    }

    return this.left.minNode(value);
  }

  getHeight() {
    if (!this.value) {
      return 0;
    }

    return 1 + Math.max(this.left ? this.left.getHeight() : 0,
      this.right ? this.right.getHeight() : 0);
  }

  inOrderTraverse(callback) {
    if (this.left) {
      this.left.inOrderTraverse(callback);
    }

    callback(this);

    if (this.right) {
      this.right.inOrderTraverse(callback);
    }
  }

  preOrderTraverse(callback) {
    callback(this);

    if (this.left) {
      this.left.preOrderTraverse(callback);
    }

    if (this.right) {
      this.right.preOrderTraverse(callback);
    }
  }

  postOrderTraverse(callback) {
    if (this.left) {
      this.left.postOrderTraverse(callback);
    }

    if (this.right) {
      this.right.postOrderTraverse(callback);
    }

    callback(this);
  }
}

test('createTree', () => {
  const root = new Node();

  expect(root.getHeight()).toBe(0);

  root.insert(1);

  expect(root.getHeight()).toBe(1);

  root.insert(2);

  expect(root.getHeight()).toBe(2);

  root.insert(0);

  expect(root.getHeight()).toBe(2);

  root.insert(3);

  expect(root.getHeight()).toBe(3);
});

test('inOrderTraverse', () => {
  const root = new Node();

  root.insert(7);
  root.insert(3);
  root.insert(9);
  root.insert(1);
  root.insert(2);
  root.insert(11);
  root.insert(8);

  const values = [];

  root.inOrderTraverse(node => {
    values.push(node.value);
  });

  expect(values).toEqual([1, 2, 3, 7, 8, 9, 11]);
});

test('preOrderTraverse', () => {
  const root = new Node();

  root.insert(7);
  root.insert(3);
  root.insert(9);
  root.insert(1);
  root.insert(2);
  root.insert(11);
  root.insert(8);

  const values = [];

  root.preOrderTraverse(node => {
    values.push(node.value);
  });

  expect(values).toEqual([7, 3, 1, 2, 9, 8, 11]);
});

test('postOrderTraverse', () => {
  const root = new Node();

  root.insert(7);
  root.insert(3);
  root.insert(9);
  root.insert(1);
  root.insert(2);
  root.insert(11);
  root.insert(8);

  const values = [];

  root.postOrderTraverse(node => {
    values.push(node.value);
  });

  expect(values).toEqual([2, 1, 3, 8, 11, 9, 7]);
});

test('has', () => {
  const root = new Node();

  expect(root.has(7)).toBeFalsy();

  root.insert(7);

  expect(root.has(7)).toBeTruthy();

  root.insert(8);

  expect(root.has(8)).toBeTruthy();

  root.insert(3);

  expect(root.has(3)).toBeTruthy();
  expect(root.has(4)).toBeFalsy();
});

test('delete', () => {
  const root = new Node();

  [11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25]
    .forEach(i => root.insert(i));

  expect(root.getHeight()).toBe(4);

  root.delete(11);

  expect(root.value).toBe(12);
  expect(root.has(11)).toBeFalsy();

  root.delete(3);

  expect(root.has(3)).toBeFalsy();
});

test('delete method change height of tree', () => {
  const root = new Node();

  [7, 3].forEach(i => root.insert(i));

  expect(root.getHeight()).toBe(2);

  root.delete(3);

  expect(root.getHeight()).toBe(1);
});

test('minNode', () => {
  const root = new Node();

  [11, 7, 15, 5, 9, 13, 20, 3, 6, 8, 10, 12, 14, 18, 25]
    .forEach(i => root.insert(i));

  expect(root.minNode().value).toBe(3);
});

class Tree {
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

const run = arr => {
  if (arr.length === 0) {
    return null;
  }

  const mid = Math.floor(arr.length / 2);
  const root = new Tree(arr[mid]);
  root.left = run(arr.slice(0, mid));
  root.right = run(arr.slice(mid + 1));
  return root;
};

test('run', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const r = run(arr);
  console.log('r: ', r);
});

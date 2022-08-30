// 5 - 1 - 2 - 9 - 8 - 7
//      5
// 1        9
//   2    8
//      7
class Tree {
  #value = null;
  #left = null;
  #right = null;

  get value() {
    return this.#value;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  setLeft(v) {
    this.#left = v;
  }

  setRight(v) {
    this.#right = v;
  }

  hasOnlyLeft() {
    return this.#left && !this.#right;
  }

  hasOnlyRight() {
    return !this.#left && this.#right;
  }

  deleteLeft() {
    this.#left = null;
  }

  deleteRight() {
    this.#right = null;
  }

  insert(value) {
    if (this.#value === null) {
      this.#value = value;
      return;
    }

    if (this.#value === value) {
      return;
    }

    if (value < this.#value) {
      if (this.#left === null) {
        this.#left = new Tree();
      }
      this.#left.insert(value);
      return;
    }

    if (this.#right === null) {
      this.#right = new Tree();
    }

    this.#right.insert(value);
  }

  search(value) {
    if (value === this.#value) {
      return true;
    }

    if (value < this.#value) {
      if (this.#left === null) {
        return false;
      }

      return this.#left.search(value);
    }

    if (this.#right === null) {
      return false;
    }

    return this.#right.search(value);
  }

  traverseInorder(callback) {
    if (this.#left) {
      this.#left.traverseInorder(callback);
    }

    callback(this);

    if (this.#right) {
      this.#right.traverseInorder(callback);
    }
  }

  traversePreorder(callback) {
    callback(this);

    if (this.#left) {
      this.#left.traversePreorder(callback);
    }

    if (this.#right) {
      this.#right.traversePreorder(callback);
    }
  }

  traversePostorder(callback) {
    if (this.#left) {
      this.#left.traversePostorder(callback);
    }

    if (this.#right) {
      this.#right.traversePostorder(callback);
    }

    callback(this);
  }

  delete(value, parent) {
    if (value < this.#value) {
      if (this.#left) {
        this.#left.delete(value, this);
      }

      return;
    }

    if (value > this.#value) {
      if (this.#right) {
        this.#right.delete(value, this);
      }

      return;
    }


    if (value < parent.value) {
      if (this.hasOnlyRight()) {
        parent.setLeft(this.#right);
        return;
      }

      if (this.hasOnlyLeft()) {
        parent.setLeft(this.#left);
        return;
      }

      parent.deleteLeft();
    } else {
      if (this.hasOnlyRight()) {
        parent.setRight(this.#right);
        return;
      }

      if (this.hasOnlyLeft()) {
        parent.setRight(this.#left);
        return;
      }

      parent.deleteRight();
    }
  }
}

describe('bst', () => {
  describe('new Tree', () => {
    it('returns root has null', () => {
      const root = new Tree();

      expect(root.value).toBeNull();
    });
  });

  describe('insert', () => {
    it('updates root value', () => {
      const root = new Tree();
      root.insert(5);

      expect(root.value).toBe(5);
    });

    describe('when root has value', () => {
      it('creates child node', () => {
        const root = new Tree();
        root.insert(5);
        root.insert(1);
        root.insert(9);

        expect(root.value).toBe(5);
        expect(root.left.value).toBe(1);
        expect(root.right.value).toBe(9);
      });
    });

    describe('when root has already child node', () => {
      it('create child node', () => {
        const root = new Tree();
        root.insert(5);

        expect(root.value).toBe(5);

        root.insert(2);
        root.insert(1);

        expect(root.left.value).toBe(2);
        expect(root.left.left.value).toBe(1);

        root.insert(8);
        root.insert(9);

        expect(root.right.value).toBe(8);
        expect(root.right.right.value).toBe(9);
      });
    });

    describe('when insert with already existing value in tree', () => {
      it('creates nothing', () => {
        const root = new Tree();
        root.insert(5);
        root.insert(5);
        root.insert(5);
        root.insert(5);

        expect(root.value).toBe(5);
        expect(root.left).toBeNull();
        expect(root.right).toBeNull();
      });
    });
  });

  describe('search', () => {
    describe('with existing value', () => {
      it('returns true', () => {
        const root = new Tree();
        root.insert(5);

        expect(root.search(5)).toBe(true);

        root.insert(1);

        expect(root.search(1)).toBe(true);

        root.insert(8);

        expect(root.search(8)).toBe(true);
      });
    });

    describe('with not existing value', () => {
      it('returns false', () => {
        const root = new Tree();
        root.insert(5);

        expect(root.search(1)).toBe(false);
        expect(root.search(8)).toBe(false);
      });
    });
  });

  describe('traverseInorder', () => {
    it('calls handler with inorder', () => {
      const log = jest.fn();

      const root = new Tree();
      root.insert(5);
      root.insert(3);
      root.insert(8);
      root.insert(1);
      root.insert(4);
      root.insert(7);
      root.insert(9);

      root.traverseInorder(node => {
        log(node.value);
      });

      expect(log.mock.calls.map(it => it[0])).toEqual([
        1, 3, 4, 5, 7, 8, 9,
      ]);
    });
  });

  describe('traversePreorder', () => {
    it('calls handler with prderoder', () => {
      const log = jest.fn();

      const root = new Tree();
      root.insert(5);
      root.insert(3);
      root.insert(8);
      root.insert(1);
      root.insert(4);
      root.insert(7);
      root.insert(9);

      root.traversePreorder(node => {
        log(node.value);
      });

      expect(log.mock.calls.map(it => it[0])).toEqual([
        5, 3, 1, 4, 8, 7, 9,
      ]);
    });
  });

  describe('traversePostorder', () => {
    it('calls handler with postorder', () => {
      const log = jest.fn();

      const root = new Tree();
      root.insert(5);
      root.insert(3);
      root.insert(8);
      root.insert(1);
      root.insert(4);
      root.insert(7);
      root.insert(9);

      root.traversePostorder(node => {
        log(node.value);
      });

      expect(log.mock.calls.map(it => it[0])).toEqual([
        1, 4, 3, 7, 9, 8, 5,
      ]);
    });
  });

  describe('delete', () => {
    let root;

    beforeEach(() => {
      root = new Tree();
      root.insert(5);
      root.insert(3);
      root.insert(8);
      root.insert(1);
      root.insert(4);
      root.insert(7);
      root.insert(9);
    });

    describe('with node doesn\'t have child', () => {
      it('deletes left node', () => {
        const log = jest.fn();

        root.delete(1);

        root.traverseInorder(node => {
          log(node.value);
        });

        expect(log.mock.calls.map(it => it[0])).toEqual([
          3, 4, 5, 7, 8, 9,
        ]);
      });

      it('deletes right node', () => {
        const log = jest.fn();

        root.delete(4);

        root.traverseInorder(node => {
          log(node.value);
        });

        expect(log.mock.calls.map(it => it[0])).toEqual([
          1, 3, 5, 7, 8, 9,
        ]);
      });
    });

    describe('with has only right child', () => {
      it('up child node', () => {
        const log = jest.fn();

        root.delete(1);
        root.delete(3);

        root.traverseInorder(node => {
          log(node.value);
        });

        expect(log.mock.calls.map(it => it[0])).toEqual([
          4, 5, 7, 8, 9,
        ]);
      });

      it('up child node', () => {
        const log = jest.fn();

        root.delete(7);
        root.delete(8);

        root.traverseInorder(node => {
          log(node.value);
        });

        expect(log.mock.calls.map(it => it[0])).toEqual([
          1, 3, 4, 5, 9,
        ]);
      });
    });

    describe('with has only left child', () => {
      it('up child node', () => {
        const log = jest.fn();

        root.delete(4);
        root.delete(3);

        root.traverseInorder(node => {
          log(node.value);
        });

        expect(log.mock.calls.map(it => it[0])).toEqual([
          1, 5, 7, 8, 9,
        ]);
      });

      it('up child node', () => {
        const log = jest.fn();

        root.delete(9);
        root.delete(8);

        root.traverseInorder(node => {
          log(node.value);
        });

        expect(log.mock.calls.map(it => it[0])).toEqual([
          1, 3, 4, 5, 7,
        ]);
      });
    });

    describe('when delete', () => {

    });
  });
});

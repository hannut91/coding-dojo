function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function Tree() {
  this.insert = function (value) {
    if (!this.val) {
      this.val = value;
      return;
    }

    if (value < this.val) {
      if (!this.left) {
        this.left = new TreeNode(value);
        return;
      }

      this.left.insert(value);
      return;
    }

    if (value > this.val) {
      if (!this.right) {
        this.right = new TreeNode(value);
        return;
      }

      this.right.insert(value);
    }
  };

  this.toArray = function () {
    const queue = [];
    const output = [];

    queue.push(this);

    while (queue.length > 0) {
      const node = queue.shift();
      output.push(node.val);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return output;
  };
}

Tree.call(TreeNode.prototype);

const createBinaryTree = values => {
  const root = new TreeNode(values.shift());

  const queue = [root];

  while (values.length > 0) {
    const node = queue.shift();

    node.left = new TreeNode(values.shift());
    node.right = new TreeNode(values.shift());

    queue.push(node.left);
    queue.push(node.right);
  }

  return root;
};

const reverseInOrder = (node, callback) => {
  if (node.right && node.right.val !== null) {
    reverseInOrder(node.right, callback);
  }

  callback(node);

  if (node.left && node.left.val !== null) {
    reverseInOrder(node.left, callback);
  }
};

const bstToGst = root => {
  let sum = 0;

  reverseInOrder(root, node => {
    node.val += sum;
    sum = node.val;
  });

  return root;
};

test('create binary tree', () => {
  const root = createBinaryTree([
    4,
    1,
    6,
    0,
    2,
    5,
    7,
    null,
    null,
    null,
    3,
    null,
    null,
    null,
    8,
  ]);

  expect(root.toArray()).toEqual([
    4,
    1,
    6,
    0,
    2,
    5,
    7,
    null,
    null,
    null,
    3,
    null,
    null,
    null,
    8,
  ]);
});

test('bstToGst', () => {
  const root = bstToGst(
    createBinaryTree([
      4,
      1,
      6,
      0,
      2,
      5,
      7,
      null,
      null,
      null,
      3,
      null,
      null,
      null,
      8,
    ]),
  );

  expect(root.toArray()).toEqual([
    30,
    36,
    21,
    36,
    35,
    26,
    15,
    null,
    null,
    null,
    33,
    null,
    null,
    null,
    8,
  ]);
});

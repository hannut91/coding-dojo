function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

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

const rangeSumBST = (root, L, R) => {
  if (!root.val) {
    return 0;
  }

  let sum = (root.val >= L && root.val <= R) ? root.val : 0;

  if (root.left && root.val > L) {
    sum += rangeSumBST(root.left, L, R);
  }

  if (root.right && root.val < R) {
    sum += rangeSumBST(root.right, L, R);
  }

  return sum;
};

test('rangeSumBST', () => {
  expect(rangeSumBST(createBinaryTree([10, 5, 15, 3, 7, null, 18]), 7, 15))
    .toBe(32);

  expect(rangeSumBST(createBinaryTree([10, 5, 15, 3, 7, 13, 18, 1, null, 6]), 6, 10))
    .toBe(23);
});
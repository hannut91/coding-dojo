const run = (queue1, queue2) => {
  const maxCount = queue1.length * 2;
  let count = 0;
  const queue = [...queue1, ...queue2];

  const target = queue.reduce((acc, cur) => acc + cur) / 2;

  let left = 0;
  let right = queue1.length;
  let leftSum = queue1.reduce((acc, cur) => acc + cur);
  let rightSum = queue2.reduce((acc, cur) => acc + cur);
  while (true) {
    if (count > maxCount) {
      return -1;
    }

    if (leftSum === target) {
      return count;
    }

    if (leftSum > rightSum) {
      leftSum -= queue[left];
      rightSum += queue[left];
      left = (left + 1) % (maxCount);
    } else {
      rightSum -= queue[right];
      leftSum += queue[right];
      right = (right + 1) % (maxCount);
    }

    count++;
  }
};

// [1, 2, 1, 2], [1, 10, 1, 2]
// [1, 2, 1, 2, 1] [10, 1, 2]
// [1, 2, 1, 2, 1, 10] [1, 2]
test('run', () => {
  // expect(run([3, 2, 7, 2], [4, 6, 5, 1])).toBe(2);
  expect(run([1, 2, 1, 2], [1, 10, 1, 2])).toBe(7);
});

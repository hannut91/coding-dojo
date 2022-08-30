const sum = arr => arr.reduce((acc, cur) => acc + cur, 0);

const run = (q1, q2, count = 0) => {
  let sumQ1 = sum(q1);
  let sumQ2 = sum(q2);
  const queue = [...q1, ...q2];
  const queueLength = queue.length;
  let qX = 0;
  let qY = q1.length;
  const max = (q1.length + q2.length) * 2;
  while (true) {
    if (count >= max) {
      return -1;
    }

    if (sumQ1 === sumQ2) {
      return count;
    }

    if (sumQ1 > sumQ2) {
      const t = queue[qX];
      qX = (qX + 1) % queueLength;
      sumQ1 -= t;
      sumQ2 += t;
    } else {
      const t = queue[qY];
      qY = (qY + 1) % queueLength;
      sumQ1 += t;
      sumQ2 -= t;
    }
    count += 1;
  }
};

test('run', () => {
  expect(run([1], [1])).toBe(0);
  expect(run([3, 4], [1])).toBe(1);
  expect(run([1], [3, 4])).toBe(1);
  expect(run([1, 1], [1, 5])).toBe(-1);
  expect(run([3, 2, 7, 2], [4, 6, 5, 1])).toBe(2);
  expect(run([1, 2, 1, 2], [1, 10, 1, 2])).toBe(7);
});

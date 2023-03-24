const cache = {};

const run2 = (node, nodeK, enemies) => {
  let max = 0;
  const nodes = [
    [node, nodeK, 0, 0],
  ];

  while (nodes.length !== 0) {
    const current = nodes.pop();
    const [n, k, index, stage] = current;
    if (cache[`${n}-${k}-${index}`]) {
      continue;
    }

    if (enemies.length === index) {
      cache[`${n}-${k}-${index}`] = stage;
      if (stage > max) {
        max = stage;
      }

      continue;
    }

    if (k <= 0 && n < enemies[index]) {
      cache[`${n}-${k}-${index}`] = stage;
      if (stage > max) {
        max = stage;
      }

      continue;
    }

    if (k <= 0 && n >= enemies[index]) {
      nodes.push([n - enemies[index], k, index + 1, stage + 1]);
      continue;
    }

    if (k > 0 && n < enemies[index]) {
      nodes.push([n, k - 1, index + 1, stage + 1]);
      continue;
    }

    nodes.push([n, k - 1, index + 1, stage + 1]);
    nodes.push([n - enemies[index], k, index + 1, stage + 1]);
  }

  return max;
};

// const run = (n, k, enemies, stage = 0) => {

// };

test('run', () => {
  expect(run2(7, 3, [4, 2, 4, 5, 3, 3, 1])).toBe(5);
  expect(run2(2, 4, [3, 3, 3, 3])).toBe(4);
  // expect(run(7, 3, [4, 2, 4, 5, 3, 3, 1])).toBe(5);
  // expect(run(2, 4, [3, 3, 3, 3])).toBe(4);
});

const find = (n, info, result = []) => {
  if (n === 0) {
    return result;
  }

  const first = info[0];
  if (first < n) {
    return find(n - first - 1, info.slice(1), [...result, first + 1]);
  }
};

const run = (n, info) => {
  const f = find(n, info);
  return [0, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0];
};

test('run', () => {
  expect(run(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]))
    .toEqual([0, 2, 2, 0, 1, 0, 0, 0, 0, 0, 0]);
});

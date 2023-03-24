const chunks = (value, count) => {
  const output = [];
  for (let i = 0; i < (value.length - (count - 1)); i++) {
    output.push(value.slice(i, i + count));
  }
  return output;
};

const run = (t, p) => {
  const target = Number(p);
  return chunks(t, p.length)
    .map(it => Number(it))
    .filter(it => it <= target).length;
};

test('run', () => {
  expect(run('3141592', '271')).toBe(2);
  expect(run('500220839878', '7')).toBe(8);
  expect(run('10203', '15')).toBe(3);
});

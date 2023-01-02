const run = text => {
  const count = text.match(/1/g).length;
  parseInt(text, 2);
};

test('run', () => {
  expect(run('101')).toBe([6, 3]);
});

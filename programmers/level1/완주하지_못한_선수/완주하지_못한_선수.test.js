const run = (participants, completions) => {
  const p = [...participants].sort();
  const c = [...completions].sort();
  const result = p.find((it, index) => it !== c[index]);
  return result;
};

test('run', () => {
  expect(run(['leo', 'kiki', 'eden'], ['eden', 'kiki'])).toBe('leo');
  expect(run(['marina', 'josipa', 'nikola', 'vinko', 'filipa'], ['josipa', 'filipa', 'marina', 'nikola'])).toBe('vinko');
  expect(run(['mislav', 'stanko', 'mislav', 'ana'], ['stanko', 'ana', 'mislav'])).toBe('mislav');
});

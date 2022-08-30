const scores = [null, 3, 2, 1, null, 1, 2, 3];

const types = [
  ['R', 'T'],
  ['C', 'F'],
  ['J', 'M'],
  ['A', 'N'],
];

const run = (surveys, choices) => {
  const score = choices.reduce((acc, choice, index) => {
    const [disagree, agree] = surveys[index];
    if (choice === 4) {
      return acc;
    }

    if (choice <= 3) {
      return {
        ...acc,
        [disagree]: acc[disagree] + scores[choice],
      };
    }

    return {
      ...acc,
      [agree]: acc[agree] + scores[choice],
    };
  }, {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0,
  });

  return types.map(([left, right]) => ((score[left] >= score[right]) ? left : right)).join('');
};

test('run', () => {
  expect(run(['AN', 'CF', 'MJ', 'RT', 'NA'], [5, 3, 2, 7, 5])).toBe('TCMA');
  expect(run(['TR', 'RT', 'TR'], [7, 1, 3])).toBe('RCJA');
});

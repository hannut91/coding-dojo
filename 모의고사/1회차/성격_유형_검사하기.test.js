const run = (survey, choices) => {
  const score = survey.reduce((acc, [left, right], index) => {
    const choice = choices[index];
    if (choice === 4) {
      return acc;
    }

    if (choice < 4) {
      acc[left] = (acc[left] || 0) + (4 - choice);
    } else {
      acc[right] = (acc[right] || 0) + (choice - 4);
    }

    return acc;
  }, {});

  return ['RT', 'CF', 'JM', 'AN']
    .map(([left, right]) => ((score[left] || 0) >= (score[right] || 0) ? left : right))
    .join('');
};

test('run', () => {
  expect(run(['AN', 'CF', 'MJ', 'RT', 'NA'], [5, 3, 2, 7, 5])).toBe('TCMA');
});

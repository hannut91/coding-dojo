const deployCount = (progresses, speeds, deploys = []) => {
  if (progresses.length === 0) {
    return deploys;
  }

  const nextProgresses = develop(progresses, speeds);
  const completeLastIndex = serialCompletesIndex(progresses);
  if (completeLastIndex === -1) {
    return deployCount(nextProgresses, speeds, deploys);
  }

  return deployCount(
    nextProgresses.slice(completeLastIndex + 1),
    speeds.slice(completeLastIndex + 1),
    [...deploys, completeLastIndex + 1]
  );
}

const develop = (progresses, speeds) =>
  progresses.map((it, index) =>
    it + speeds[index] > 100 ? 100 : it + speeds[index]);

const serialCompletesIndex = (progresses, index = -1) => {
  if (first(progresses) !== 100) {
    return index;
  }

  return serialCompletesIndex(progresses.slice(1), index + 1);
};

const first = (arr) => arr[0];

test('deployCount', () => {
  expect(deployCount([93, 30, 55], [1, 30, 5])).toEqual([2, 1]);
});

test('serialCompletesIndex', () => {
  expect(serialCompletesIndex([90, 30, 55])).toBe(-1);
  expect(serialCompletesIndex([90, 100, 55])).toBe(-1);
  expect(serialCompletesIndex([90, 55, 100])).toBe(-1);
  expect(serialCompletesIndex([100, 30, 55])).toBe(0);
  expect(serialCompletesIndex([100, 30, 100])).toBe(0);
  expect(serialCompletesIndex([100, 100, 50])).toBe(1);
  expect(serialCompletesIndex([100, 100, 100])).toBe(2);
});
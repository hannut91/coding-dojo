const sum = (start, end) => (end - start + 1) * (start + end) / 2;

const run = number => {
  let count = 0;

  // O(number)
  for (let i = 1; i <= number; i++) {
    // O(log2)
    let start = i;
    let end = number;
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const result = sum(i, mid);
      if (result === number) {
        count++;
        break;
      }

      if (result < number) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  return count;
};

test('run', () => {
  expect(run(15)).toBe(4);
});

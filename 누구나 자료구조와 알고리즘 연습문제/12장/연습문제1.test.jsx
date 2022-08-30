const addUntil100 = arr => {
  if (arr.length === 0) {
    return 0;
  }

  const sum = addUntil100(arr.slice(1));

  if ((arr[0] + sum) > 100) {
    return sum;
  }

  return arr[0] + sum;
};

test('test', () => {
  expect(addUntil100([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17])).toBe(100);
});

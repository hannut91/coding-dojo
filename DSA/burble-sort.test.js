const swap = (arr, index = 0, lastIndex = arr.length - 1, swapped = false) => {
  if (index === lastIndex) {
    return [arr, swapped];
  }

  if (arr[index] < arr[index + 1]) {
    return swap(arr, index + 1, lastIndex, swapped);
  }

  return swap(
    [...arr.slice(0, index), arr[index + 1], arr[index], ...arr.slice(index + 2)],
    index + 1,
    lastIndex,
    true,
  );
};

const burbleSort = (arr, lastIndex = arr.length - 1) => {
  if (lastIndex === 0) {
    return arr;
  }

  const [newArr, swapped] = swap(arr, 0, lastIndex);
  if (!swapped) {
    return arr;
  }
  return burbleSort(newArr, lastIndex - 1);
};


test('burbleSort', () => {
  expect(burbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(burbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(burbleSort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
  // expect(burbleSort([3, 4, 5, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  // expect(burbleSort([2, 1, 5, 3, 4])).toEqual([1, 2, 3, 4, 5]);
});

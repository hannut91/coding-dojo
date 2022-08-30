const swap = (arr, index, targetIndex) => {
  const newArr = [...arr];
  [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];
  return newArr;
};

const selectSort = (arr, index = 0) => {
  if (index >= (arr.length - 1)) {
    return arr;
  }

  const current = arr[index];
  const result = arr.slice(index + 1)
    .reduce((acc, cur, i) => {
      if (cur < acc.min) {
        return {
          index: i + index + 1,
          min: cur,
        };
      }

      return acc;
    }, {
      index,
      min: current,
    });

  return selectSort(
    result.index === index
      ? arr
      : swap(arr, index, result.index),
    index + 1,
  );
};

test('selectionSort', () => {
  expect(selectSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(selectSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(selectSort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
  expect(selectSort([3, 4, 5, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(selectSort([2, 1, 5, 3, 4])).toEqual([1, 2, 3, 4, 5]);
});

test('swap', () => {
  expect(swap([5, 4, 3, 2, 1], 0, 4)).toEqual([1, 4, 3, 2, 5]);
  expect(swap([5, 4, 3, 2, 1], 0, 1)).toEqual([4, 5, 3, 2, 1]);
  expect(swap([5, 4, 3, 2, 1], 0, 1)).toEqual([4, 5, 3, 2, 1]);
  expect(swap([5, 4, 3, 2, 1], 2, 3)).toEqual([5, 4, 2, 3, 1]);
});

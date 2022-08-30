const partition = (arr, left, pivot) => {
  let right = pivot - 1;

  while (true) {
    while (arr[left] < arr[pivot]) {
      left += 1;
    }

    while (arr[right] > arr[pivot]) {
      right -= 1;
    }

    if (left >= right) {
      break;
    }

    [arr[left], arr[right]] = [arr[right], arr[left]];
  }

  [arr[left], arr[pivot]] = [arr[pivot], arr[left]];
  return left;
};

const sort = (arr, leftIndex = 0, rightIndex = arr.length - 1) => {
  if (rightIndex <= leftIndex) {
    return;
  }

  const l = partition(arr, leftIndex, rightIndex);

  sort(arr, leftIndex, l - 1);

  sort(arr, l + 1, rightIndex);

  return arr;
};

test('partition', () => {
  expect(sort([0, 5, 2, 1, 6, 3])).toEqual([0, 1, 2, 3, 5, 6]);
  expect(sort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(sort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(sort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
  expect(sort([3, 4, 5, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(sort([2, 1, 5, 3, 4])).toEqual([1, 2, 3, 4, 5]);
});

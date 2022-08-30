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

const quickSelect = (arr, target, leftIndex = 0, rightIndex = arr.length - 1) => {
  if (rightIndex <= leftIndex) {
    return leftIndex;
  }

  const l = partition(arr, leftIndex, rightIndex);
  if (arr[l] === target) {
    return l;
  }

  if (arr[l] > target) {
    return quickSelect(arr, target, leftIndex, l - 1);
  }
  return quickSelect(arr, target, l + 1, rightIndex);
};

test('quickSelect', () => {
  // expect(quickSelect([0, 5, 2, 1, 6, 3], 2)).toBe(2);
  // expect(quickSelect([0, 5, 2, 1, 6, 3], 1)).toBe(1);
  expect(quickSelect([0, 5, 2, 1, 6, 3], 0)).toBe(0);
});

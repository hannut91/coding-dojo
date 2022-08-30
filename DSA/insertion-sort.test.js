// 1. 책에서 하란대로 한 버전
// const insertionSort = arr => {
//   for (let i = 1; i <= arr.length - 1; i += 1) {
//     const temp = arr[i];

//     delete arr[i];

//     for (let j = i - 1; j >= 0; j -= 1) {
//       if (arr[j] > temp) {
//         arr[j + 1] = arr[j];
//         delete arr[j];
//         continue;
//       }

//       if (arr[j] < temp) {
//         arr[j + 1] = temp;
//         break;
//       }
//     }

//     if (!arr[0]) {
//       arr[0] = temp;
//     }
//   }

//   return arr;
// };

// 2. 책 드에서 나온 예제 버전
// const insertionSort = arr => {
//   for (let i = 1; i <= arr.length - 1; i += 1) {
//     let index = i - 1;
//     const temp = arr[i];

//     for (index = i - 1; index >= 0; index -= 1) {
//       if (arr[index] > temp) {
//         arr[index + 1] = arr[index];
//         continue;
//       }

//       if (arr[index] < temp) {
//         break;
//       }
//     }

//     arr[index + 1] = temp;
//   }

//   return arr;
// };

// 3. 재귀버전
const findPosition = (arr, value) => {
  if (arr[0] > value) {
    return 0;
  }
  const index = arr.findIndex(it => it > value);
  if (index === -1) {
    return arr.length;
  }

  return index;
};

const insertionSort = (arr, index = 1) => {
  if (index > arr.length - 1) {
    return arr;
  }

  const current = arr[index];

  const insertIndex = findPosition(arr.slice(0, index), current);

  return insertionSort(
    [
      ...arr.slice(0, insertIndex),
      current,
      ...arr.slice(insertIndex, index),
      ...arr.slice(index + 1),
    ],
    index + 1,
  );
};

test('insertionSort', () => {
  expect(insertionSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(insertionSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(insertionSort([5, 4, 1, 2, 3])).toEqual([1, 2, 3, 4, 5]);
  expect(insertionSort([3, 4, 5, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(insertionSort([2, 1, 5, 3, 4])).toEqual([1, 2, 3, 4, 5]);
});

test('findPosition', () => {
  expect(findPosition([2, 3, 5], 1)).toBe(0);
  expect(findPosition([2, 3, 5], 4)).toBe(2);
  expect(findPosition([2, 3, 5], 6)).toBe(3);
});

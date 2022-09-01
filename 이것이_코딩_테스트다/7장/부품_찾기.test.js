/**
 * ## 이해
 *
 * 미지의 것: 견적서를 확인해서 부품이 모두 들어 있는지 확인하는 프로그램을 작성하라
 * 자료
 *   - 각 부품은 정수 형태의 고유한 번호가 있다. -> 부품을 구분하는데 사용될 수 있다.
 *   - 주어진 정수가 100만이 넘어간다.
 * 조건
 *   - 부품은 중복되지 않는다.
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *   - sort 또 헷갈렸다. 주의해야겠다.
 *   - 속도 차이 나는 것은 직접 출력해 보았다. 재귀가 생각보다 while보다 속도차이가 나지 않는 것이 흥미로웠다.
 */

// 재귀
const binarySearch = (arr, target, start = 0, end = arr.length - 1) => {
  if (start > end) {
    return false;
  }

  const mid = Math.floor((end + start) / 2);
  if (arr[mid] === target) {
    return true;
  }

  if (target > mid) {
    return binarySearch(arr, target, mid + 1, end);
  }
  return binarySearch(arr, target, start, mid - 1);
};

const binarySearch2 = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (true) {
    if (start > end) {
      return false;
    }

    const mid = Math.floor((end + start) / 2);
    if (arr[mid] === target) {
      return true;
    }

    if (target > mid) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
};

const run = (arr, targets) => {
  const sortedArray = arr.sort((a, b) => a - b);
  console.time('includes');
  targets.map(target => sortedArray.includes(target));
  console.timeEnd('includes');

  console.time('binarySearch with recursive');
  targets.map(target => binarySearch(sortedArray, target));
  console.timeEnd('binarySearch with recursive');

  console.time('binarySearch with while');
  const result = targets.map(target => binarySearch2(sortedArray, target));
  console.timeEnd('binarySearch with while');
  return result;
};

test('run', () => {
  const array = Array.from({ length: 1000000 }, (_, index) => index + 1);
  const targets = Array.from({ length: 100000 }, (_, index) => index + 1);
  const answers = Array.from({ length: 100000 }, (_, index) => true);

  expect(run(array, targets)).toEqual(answers);
});

test('binarySearch', () => {
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toBe(true);
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9)).toBe(true);
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)).toBe(true);
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)).toBe(true);
  expect(binarySearch([1, 2, 3, 4, 5, 6, 8, 9, 10], 7)).toBe(false);
  expect(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 11)).toBe(false);
});

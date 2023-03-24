/**
 * ## 이해
 *
 * 미지의 것: 정수 배열 numbers가 매개변수로 주어질 때, 모든 원소에 대한 뒷 큰수들을 차례로
 *  담은 배열을 return
 * 자료
 *   - 숫자는 정수이다.
 *   - 배열 의 각 원소들에 대해 자신보다 뒤에 있는 숫자 중에서 자신보다 크면서 가장 가까이 있는 수를
 *     뒷 큰수
 * 조건
 *   -
 *
 * ## 계획
 *   - numbers를 돌면서 현재 숫자보다 큰 수가 있으면 그걸 빈배열에 넣는다.
 *   - 큰수가 없으면 -1을 넣는다.
 *   - 숫자를 담은 배열을 리턴한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const run2 = numbers => {
  const bigNumbers = [];

  // O(N)
  for (let i = 0; i < numbers.length; i++) {
    let target = -1;
    // O(N) O(LogN), O(1)
    // 정렬
    // 찾기 O(LogN) 바이너리 서치
    // O(1) 해시맵
    // {
    //   2: 0,
    //   3: [1, 2],
    //   5: [3]
    // }
    // [
    //   [1, 1], [2, 5], [3, 3], [5, 2], [6, 4], [9, 0]
    // ]

    // num 1, 2, 3, 5, 6, 9
    // idx 1, 5, 3, 2, 4, 0
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] < numbers[j]) {
        target = numbers[j];
        break;
      }
    }
    bigNumbers.push(target);
  }

  return bigNumbers;
};
// 6 - 1
// [5, 1, 5, 3, 6, 2]
// 2
// 6
// 3

// [-1, -1, 6, 6, 5, -1]

// [2, 6, 3, 5, 1, 9]
// 9


// [
//   [1, 1], [2, 5], [3, 3], [5, 2], [6, 4], [9, 0]
// ]

// num 1, 2, 3, 5, 6, 9
// idx 1, 5, 3, 2, 4, 0
const run3 = numbers => {
  const result = [];

  let last;
  while (true) {
    if (numbers.length === 0) {
      break;
    }

    const current = numbers.pop();
    if (!last) {
      result.push(-1);
    } else if (last > current) {
      result.push(last);
    } else {
      let target = -1;
      for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] > current) {
          target = result[i];
        }
      }
      result.push(target);
    }
    last = current;
  }

  return result.reverse();
};

test('run', () => {
  // expect(run([2, 3, 3, 5])).toEqual([3, 5, 5, -1]);
  expect(run([9, 1, 5, 3, 6, 2])).toEqual([-1, 5, 6, 6, -1, -1]);
});

// [9, 1, 5, 3, 6, 2]

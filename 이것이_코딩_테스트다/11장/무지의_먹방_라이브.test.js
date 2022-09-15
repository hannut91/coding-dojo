/**
 * ## 이해
 *
 * 미지의 것: 각 음식을 모두 먹는데 필요한 시간이 담겨있는 배열 food_times,
 * 네트워크 장애가 발생한 시간 K 초가 매개변수로 주어질 때 몇 번 음식부터 다시
 * 섭취하면 되는지 return 하도록 solution 함수를 완성하라
 * 자료
 *   - 음식에는 번호가 붙어있다.
 *   - 음식을 섭취하는데 일정 시간이 소요된다.
 *   - 음식은 번호 순서대로 먹는다. 단 이 때 남은 음식 중 다음으로 섭취할 가장 가까운 번호의 음식을 먹는다.
 *   - 마지막 번호의 음식을 섭취한 후에는 처음으로 돌아온다.
 * 비슷한 문제
 *   - 프로그래머스 징검다리 건너는 문제랑 비슷한 듯
 * 조건
 *   - 한 번 더 섭취해야 할 음식이 없다면 -1을 반환한다.
 *
 * ## 계획
 *   - 1초 지날 때마다 음식 섭취 한다.
 *   - K가 될 때 까지 반복한다.
 *
 * ## 실행
 * ## 반성
 *
 */

// O(K)
const eat = (foods, k, sortedFoods) => {
  const totalMinus = 0;
  let index = 0;
  while (true) {
    if (sortedFoods.length > k) {

    }

    if (foods[index][1] === 0) {
      index = (index + 1) % foods.length;
      continue;
    }

    if (k === 0) {
      return foods[index][0];
    }

    foods[index] = [foods[index][0], foods[index][1] - 1];
    if (foods[index][1] === 0) {
      foods.splice(index, 1);
      index %= foods.length;
    } else {
      index = (index + 1) % foods.length;
    }
    k -= 1;
  }
};

const run = (foodTimes, k) => {
  // O(N)
  if (foodTimes.reduce((acc, cur) => acc + cur) <= k) {
    return -1;
  }
  // O(N)
  const foods = foodTimes.map((it, index) => [index, it]);
  const sortedfoods = foodTimes.sort(([, a], [, b]) => a - b);
  const result = eat(foods, k, sortedFoods);
  return result + 1;
};

test('eat', () => {
  expect(eat([[0, 3], [1, 1], [2, 2]], 1)).toBe(1);
  expect(eat([[0, 3], [1, 1], [2, 2]], 2)).toBe(2);
  expect(eat([[0, 3], [1, 1], [2, 2]], 3)).toBe(0);

  expect(eat([[0, 3], [1, 0], [2, 2]], 1)).toBe(2);
});

test('run', () => {
  // expect(run([
  //   3, 1, 2,
  // ], 5)).toBe(1);
  expect(run([
    3, 1, 2,
  ], 6)).toBe(-1);
});


// const eat = (foods, k) => {
//   let index = 0;
//   let emptyCount = 0;
//   while (true) {
//     if (emptyCount === foods.length) {
//       return -2;
//     }
//     if (foods[index][1] === 0) {
//       index = (index + 1) % foods.length;
//       emptyCount++;
//       continue;
//     }

//     if (k === 0) {
//       return index;
//     }

//     foods[index] = [foods[index][0], foods[index][1] - 1];
//     if (foods[index][1] === 0) {
//       if ((emptyCount + 1) === foods.length) {
//         return -1;
//       }
//     }
//     index = (index + 1) % foods.length;
//     k -= 1;
//     emptyCount = 0;
//   }
// };

// const run = (foodTimes, k) => {
//   // }
//   // O(N)
//   const foods = foodTimes.map((it, index) => [index, it]);
//   const result = eat(foods, k);
//   return result + 1;
// };

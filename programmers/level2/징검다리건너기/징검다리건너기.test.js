// const maxCount = (stones, k, count = 0) => {
//   if (pass(stones, k)) {
//     return maxCount(stones, k, count + 1);
//   }
//   return count;
// };

// const pass = (stones, k) => {
//   let i = 0;
//   let stoneCount = 0;
//   while (true) {
//     if (i > (stones.length - 1)) {
//       break;
//     }

//     if (stones[i] > 0) {
//       stones[i] = stones[i] - 1;
//       i++;
//       stoneCount = 0;
//     } else {
//       stoneCount += 1;
//       if (stoneCount >= k) {
//         return;
//       }
//       i++;
//     }
//   }
//   return stones;
// };

const isPossible = (stones, k, peopleCount) => {
  let stoneCount = 0;
  for (it of stones) {
    if ((it - peopleCount) <= 0) {
      stoneCount += 1;
      if (stoneCount >= k) {
        return false;
      }
    } else {
      stoneCount = 0;
    }
  }
  return true;
};

const run = (stones, k) => {
  let min = 1;
  let max = 200000000;
  while (true) {
    const mid = Math.floor((min + max) / 2);
    if (min > max) {
      return min;
    }

    if (isPossible(stones, k, mid)) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
};
// const run = (stones, k) => {
//   let min;
//   let mid = 1;
//   let max = 200000000;
//   while (true) {
//     if (min > max) {
//       return min;
//     }

//     if (isPossible(stones, k, mid)) {
//       min = mid + 1;
//       mid *= 2;
//     } else {
//       max = mid - 1;
//       mid = Math.floor((min + mid) / 2);
//     }
//   }
// };


test('run', () => {
  expect(run([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3)).toBe(3);
});

// test('pass', () => {
//   expect(pass([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3)).toEqual([1, 3, 4, 2, 1, 0, 3, 1, 4, 0]);
//   expect(pass([1, 3, 4, 2, 1, 0, 3, 1, 4, 0], 3)).toEqual([0, 2, 3, 1, 0, 0, 2, 0, 3, 0]);
//   expect(pass([0, 2, 3, 1, 0, 0, 2, 0, 3, 0], 3)).toEqual([0, 1, 2, 0, 0, 0, 1, 0, 2, 0]);
//   expect(pass([0, 1, 2, 0, 0, 0, 1, 0, 2, 0], 3)).toBeUndefined();
// });

// test('maxCount', () => {
// expect(maxCount([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3)).toBe(3);
// });

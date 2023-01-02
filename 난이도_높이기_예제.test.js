// 다른 방법으로 같은 결과를 낼 수 있는가?
// 알고리즘을 풀 때 시간복잡도를 생각하면서 푸는지?
let count = 0;
const isSqrt = number => {
  // 증가 O(number) => O(1)
  // 이진 탐색 => logN
  let start = 0;
  let end = number;

  while (true) {
    count++;
    if (start > end) {
      return -1;
    }

    const mid = Math.floor((start + end) / 2);
    if (mid * mid === number) {
      return true;
    }

    if ((mid * mid) > number) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  // for (let i = 1; i < number; i++) {
  //   count++;
  //   if (i * i === number) {
  //     return true;
  //   }
  // }

  // return false;
};

const run = number => {
  if (isSqrt(number)) {
    return (Math.sqrt(number) + 1) ** 2; // 증가 ㄴㄴ
  }

  return -1;
};

// const run = number => {
//   if (!String(Math.sqrt(number)).includes('.')) {
//     return (Math.sqrt(number) + 1) ** 2;
//   }

//   return -1;
// };

// Math.sqrt
// const run = number => {
//   if (Math.sqrt(number) === Math.floor(Math.sqrt(number))) {
//     return (Math.sqrt(number) + 1) ** 2;
//   }

//   return -1;
// };

test('run', () => {
  run(50000);
  // expect().toBe(144);

  console.log('count: ', count);
});

// 그냥 재귀
// const run = (n, a, b) => {
//   if (n === 1) {
//     return 1;
//   }

//   if (n === 2) {
//     return 2;
//   }

//   return (run(n - 1) % 1000000007) + (run(n - 2) % 1000000007);
// };

// 꼬리 재귀
// const run = (n, current = 1, a = 1, b = 0) => {
//   if (current === n) {
//     return a + b;
//   }

//   if (current === 2) {
//     return run(n, current + 1, 2, 1);
//   }

//   return run(n, current + 1, b + a, a);
// };

// 반복문
const run = n => {
  let a = 1;
  let b = 0;
  let current = 1;

  while (true) {
    if (current === n) {
      return a + b;
    }

    if (current === 2) {
      a = 2;
      b = 1;
    } else {
      const temp = a;
      a = (b + a) % 1000000007;
      b = temp;
    }

    current += 1;
  }
};

test('run', () => {
  expect(run(1)).toBe(1);
  expect(run(2)).toBe(2);
  expect(run(3)).toBe(3);
  expect(run(4)).toBe(5);
  expect(run(60000)).toBe(5);
  // expect(run(4)).toBe(5);
});

// lll
// lㅡ
// ㅡl

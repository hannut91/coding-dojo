// # 거스름돈

const first = arr => arr[0];

// 꼬리 재귀
// const run = (money, coins = [500, 100, 50, 10], count = 0) => {
//   const coin = first(coins);

//   const quotient = Math.floor(money / coin);
//   const remain = money % coin;
//   if (remain === 0) {
//     return count + quotient;
//   }

//   return run(remain, coins.slice(1), count + quotient);
// };

// while
const run = money => {
  let coins = [500, 100, 50, 10];
  let count = 0;

  while (true) {
    const coin = first(coins);
    const quotient = Math.floor(money / coin);
    const remain = money % coin;
    if (remain === 0) {
      return count + quotient;
    }

    money = remain;
    coins = coins.slice(1);
    count += quotient;
  }
};

test('run', () => {
  expect(run(1260)).toBe(6);
});

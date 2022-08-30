// 1. 1000 - 주어진 값을 한다.
// 2. 잔돈 목록을 만든다.
// 2. 제일 큰 잔돈으로 나눈다.
//   나머지가 있는 경우에는 몫을 계속 더해 나가며 나머지를 잔돈으로 바꿔서 재귀로 동작한다.
//   나머지가 없는 경우에는 종료한다.

// 500, 100, 50, 10, 5, 1

const run = price => {
  const exchange = 1000 - price;
  const exchangeCoins = [500, 100, 50, 10, 5, 1];

  const { count } = exchangeCoins.reduce((acc, cur) => {
    const quotient = Math.floor(acc.price / cur);
    const remain = acc.price % cur;
    return {

      price: remain,
      count: acc.count + quotient,
    };
  }, {
    price: exchange,
    count: 0,
  });

  return count;
  // const r = (p, count = 0, coins) => {
  //   const quotient = Math.floor(p / coins[0]);
  //   const remain = p % coins[0];
  //   if (remain === 0) {
  //     return count + quotient;
  //   }

  //   return r(remain, count + quotient, coins.slice(1));
  // };

  // return r(exchange, 0, exchangeCoins);
};

test('run', () => {
  expect(run(500)).toBe(1);
  expect(run(490)).toBe(2);
  expect(run(380)).toBe(4);
});

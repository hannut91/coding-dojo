/**
 * ## 이해
 *
 * 미지의 것: 변환하기 위해 필요한 최소 연산 횟수를 return
 * 자료
 *   -
 * 조건
 *   -
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

// function fibonacci(n) {
//   let prevFibo = 1;
//   let prevPrevFibo = 0;
//   while(true) {
//     if (n < 2) {
//       return prevFibo;
//     }

//     prevFibo =prevFibo + prevPrevFibo;
//     prevPrevFibo = prevFibo
//     n = n - 1;
//     // return fibonacci(n - 1, , prevFibo);
//   }
// }


const run = (x, y, n) => {
  let result = [
    x + n,
    x * 2,
    x * 3,
  ].filter(it => it <= y)
    .map(it => [it, 1]);

  while (true) {
    if (result.length === 0) {
      return -1;
    }

    let min;
    result.filter(([value]) => value === y)
      .forEach(([value, count]) => {
        if (!min) {
          min = count;
          return;
        }

        if (count < min) {
          min = count;
        }
      });
    if (min) {
      return min;
    }

    const r = [];
    result.forEach(it => {
      [
        a => a + n,
        a => a * 2,
        a => a * 3,
      ].forEach(operation => {
        const output = operation(it[0]);
        if (output <= y) {
          r.push([output, it[1] + 1]);
        }
      });
    });

    result = r;
  }
};

const solution = (x, y, n) => {
  const result = run(x, y, n, 0);
  if (result === 9999999) {
    return -1;
  }
  return result;
};

test('run', () => {
  // expect(run(10, 40, 5)).toBe(2);
  expect(run(10, 20, 5)).toBe(1);
  expect(run(10, 40, 5)).toBe(2);
  expect(run(2, 5, 4)).toBe(-1);
});

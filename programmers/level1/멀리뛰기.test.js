/**
 * ## 이해
 *
 * 미지의 것: 멀리뛰기에 사용된 칸의 수 n이 주어질 때, 효진이가 끝에 도달하는
 * 방법이 몇 가지 인지 알아내시오
 * 자료
 *   - 효진이는 한 번에 1칸 또는 2칸을 뛸 수 있습니다.
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

// 1 - 1

// 2 - 1, 1
//     2

// 3 - 1, 1, 1
//     2, 1
//     1, 2

// 4 - 1, 1, 1, 1
//     1, 2, 1
//     1, 1, 2
//     2, 1, 1
//     2, 2

const run = n => {
  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 2;
  }

  let before = 2;
  let beforeBefore = 1;
  let count = 3;

  while (true) {
    if (count === n) {
      return (before + beforeBefore) % 1234567;
    }

    const temp = before;
    before = (before + beforeBefore) % 1234567;
    beforeBefore = temp;

    count++;
  }
};

test('run', () => {
  expect(run(1)).toBe(1);
  expect(run(2)).toBe(2);
  expect(run(3)).toBe(3);
  expect(run(4)).toBe(5);
});

/**
 * ## 이해
 *
 * 미지의 것: 이미지를 표현하는 N * N 행렬이 있을 때 90도 회전하는 메서드를 작성하라
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

0, 0 => 2, 0
1, 0 => 2, 1
2, 0 => 2, 2

0, 1 => 1, 0
1, 1 => 1, 1
2, 1 => 1, 2

0, 2 => 0, 0
1, 2 => 0, 1
2, 2 => 0, 2

const solution1 = matrix => {
  
};

test('solution1', () => {
  expect(solution1([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])).toEqual([
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]);

  // expect(solution1([
  //   [1, 2, 3, 4],
  //   [5, 6, 7, 8],
  //   [9, 10, 11, 12],
  //   [13, 14, 15, 16],
  // ])).toEqual([
  //   [13, 9, 5, 1],
  //   [14, 10, 6, 2],
  //   [15, 11, 7, 3],
  //   [16, 12, 8, 4],
  // ]);
});

function solution(arr) {
  //         0 1 2 3 4 5
  // arr[0] 0 0 0 0 0 0
  // arr[1] 0 0 0 -1 0 0
  // arr[2] -1 0 0 0 0 0
  // arr[3] 0 -1 0 0 0 0
  // arr[4] 0 0 0 0 -1 0
  // arr[5] 0 0 0 0 0 0

  let count = 0;

  arr.forEach((rows, y) => {
    rows.forEach((_, x) => {
      // 어떤 원소의 주변에 -1가 있으면 count 1씩 증가시키기
      // 왼 위, 위, 오 위, 왼, 오, 밑 왼, 밑, 밑 오를 전부 검사하자
      //     
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
      
      if (y === 0) {
        count += edgeCase(arr, y, x);
      } else if (y === 5) {
        count += edgeCase2(arr, y, x);
      } else if (x === 0) {
        count += edgeCase3(arr, y, x);
      } else if (x === 5) {
        count += edgeCase4(arr, y, x);
      } else if (
        arr[y][x - 1] === -1
        || arr[y][x + 1] === -1
        || arr[y - 1][x] === -1
        || arr[y + 1][x] === -1
        // 왼쪽 위 모서리
        // 오른쪽 위
        // 왼쪽 밑
        // 오른쪽 밑
      ) {
        count++;
      }
    });
  });

  console.log(count);

  // return count * 2;
}

test('run', () => {
  expect(
    solution([
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, -1, 0, 0],
      [-1, 0, 0, 0, 0, 0],
      [0, -1, 0, 0, 0, 0],
      [0, 0, 0, 0, -1, 0],
      [0, 0, 0, 0, 0, 0],
    ]),
  ).toEqual(27);
});

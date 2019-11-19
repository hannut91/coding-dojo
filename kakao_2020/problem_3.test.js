const rotateRight = (key) => {
  const n = key.length;

  const matrix = [...Array(n)]
    .map(i => [...Array(n).fill(0)]);

  [...Array(n)]
    .forEach((v, y) => {
      [...Array(n)]
        .forEach((_, x) => {
          matrix[y][x] = key[n - x - 1][y]
        })
    })

  return matrix;
};

const canOpen = (key, lock, moveX, moveY) => {
  const n = key.length;
  const l = lock.length;

  const matrix = JSON.parse(JSON.stringify(lock));

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (matrix[y + moveY] === undefined) {
        continue;
      }

      if (key[y][x] === 1 && matrix[y + moveY][x + moveX] === 1) {
        return false;
      }

      if (key[y][x] === 0 && matrix[y + moveY][x + moveX] === 1) {
        continue
      }

      if (key[y][x] === 1 && matrix[y + moveY][x + moveX] === 0) {
        matrix[y + moveY][x + moveX] = 1;
        continue;
      }
    }
  }

  return matrix.every(y => y.every(i => i === 1))
};


const run = (key, lock) => {
  const n = key.length;
  const l = lock.length;

  const matrixs = [...Array(4)].map((v, i) =>
    [...Array(i)].reduce((acc, cur) => {
      return rotateRight(acc);
    }, key)
  )

  const result = matrixs.find((matrix) => {
    for (let y = -n; y < l; y++) {
      for (let x = -n; x < l; x++) {
        if (canOpen(matrix, lock, x, y)) {
          return true;
        }
      }
    }
  })

  return !!result;
};

test('canOpen', () => {
  expect(canOpen(
    [[0, 1, 0], [1, 0, 0], [1, 0, 0]],
    [[1, 1, 1], [1, 1, 0], [1, 0, 1]],
    0, 0
  )).toBeFalsy();

  expect(canOpen(
    [[0, 1, 0], [1, 0, 0], [1, 0, 0]],
    [[1, 1, 1], [1, 1, 0], [1, 0, 1]],
    0, 1
  )).toBeFalsy();

  expect(canOpen(
    [[0, 1, 0], [1, 0, 0], [1, 0, 0]],
    [[1, 1, 1], [1, 1, 0], [1, 0, 1]],
    1, 0
  )).toBeFalsy();

  expect(canOpen(
    [[0, 1, 0], [1, 0, 0], [1, 0, 0]],
    [[1, 1, 1], [1, 1, 0], [1, 0, 1]],
    1, 1
  )).toBeTruthy();

  expect(canOpen(
    [[1, 1], [1, 0]],
    [[1, 1, 1], [1, 1, 0], [1, 0, 1]],
    -1, -1
  )).toBeFalsy();
});

test('run', () => {
  expect(run(
    [[0, 0, 0], [1, 0, 0], [0, 1, 1]],
    [[1, 1, 1], [1, 1, 0], [1, 0, 1]]
  )).toBeTruthy();

  expect(run(
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
  )).toBeTruthy();
});

test('rotateRight', () => {
  expect(rotateRight(
    [[0, 0, 0], [1, 0, 0], [0, 1, 1]],
  )).toEqual(
    [[0, 1, 0], [1, 0, 0], [1, 0, 0]],
  )

  expect(rotateRight(
    [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
  )).toEqual(
    [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]],
  )
});

// 잠겨있는 자물쇠: 격자 한 칸의 크기가 1 x 1인 N x N 크기의 정사각 격자 형태
// 열쇠: M x M 크기인 정사각 격자 형태, 회전과 이동이 가능
// 자물쇠의 홈과 열쇠의돌기가 딱 맞게 채우면 자물쇠가 열림
// 단 벗어난 부분은 영향을 주지 않음
// 단 열쇠의 돌기와 자물쇠의 돌기가 만나서는 안됨
// key는 M x M(3 ≤ M ≤ 20, M은 자연수)크기 2차원 배열입니다.
// lock은 N x N(3 ≤ N ≤ 20, N은 자연수)크기 2차원 배열입니다.
// M은 항상 N 이하입니다.
// key와 lock의 원소는 0 또는 1로 이루어져 있습니다.
// 0은 홈 부분, 1은 돌기 부분을 나타냅니다.


// 열쇠: key 2찬원 배열
// 자물쇠: lock 2차원 배열

// 열쇠를 열 수 있으면 true, 없으면 false를 리턴하는 함수를 작성하라.
/**
 * ## 이해
 *
 * 미지의 것: 열쇠를 나타내는 2차원 배열 key와 자물쇠를 나타내는 2차원 배열
 * lock이 매개변수로 주어질 때, 열쇠로 자물쇠를 열수 있으면 true를, 열 수 없으면
 * false를 return 하도록 solution 함수를 완성해주세요.
 * 자료
 *   - 자물쇠의 격자 한 칸의 크기는 1 * 1 이다
 *   - 자물쇠는 정사각 격자 형태다.
 *   - 열쇠도 정사각 격자 형태로 되어 있다.
 *   - 자물쇠에는 홈이 파여 있고, 열쇠 또한 홈과 돌기 부분이 있다
 *   - 열쇠는 회전과 이동이 가능하다.
 *   - 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 자물쇠가 열리게 되는 구조다.
 *   - 열쇠가 자물쇠에서 완전히 벗어나는 것은 해볼 필요가 없다. 그말은 즉 최소한
 *     한 칸이라도 겹쳐야 한다. => 열쇠의 크기 - 1 만큼 왼쪽부터 열쇠의 크기 - 1
 *     만큼 오른쪽 까지 갈 수 있다. 정사각형이기 때문에 위와 아래로도
 *     마찬가지다. 즉 -(m - 1) 부터 n - 1까지
 *
 * 조건
 *   - 자물쇠 영역을 벗어난 부분에 있는 열쇠의 홈과 돌기는 자물쇠를 여는 데
 *     영향을 주지 않는다.
 *   - 열쇠의 돌기가 자물쇠의 돌기가 만나서는 안된다.
 *
 * ## 계획
 *   - -(m - 1) 부터 n - 1까지 반복한다.
 *   -   마찬가지로 -(m - 1) 부터 n - 1까지 반복한다.
 *   -     90도 회전해가며 자물쇠를 풀 수 있는지 확인한다. (360도 될 때 까지)
 *
 * ## 실행
 *
 * ## 반성
 */

const move = (key, x, y) => {
  if (y > 0) {
    for (let i = 0; i < y; i++) {
      key.pop();
      key.unshift([0, 0, 0]);
    }
  }

  if (x > 0) {
    for (let i = 0; i < x; i++) {
      key.forEach(rows => {
        rows.pop();
        rows.unshift(0);
      });
    }
  }

  return key;
};

test('move', () => {
  방
});


const run = (key, lock) => {
  for (let i = key.length - 1; i < lock.length; i++) {
    for (let j = key.length - 1; j < lock.length; j++) {
      const newKey = move(key, i, j);
      const matched = [1, 2, 3, 4].some(() => {
        spin(newKey);
        return isMatch(newKey, lock);
      });

      if (matched) {
        return true;
      }
    }
  }
  return false;
};

test('run', () => {
  expect(run([[0, 0, 0], [1, 0, 0], [0, 1, 1]], [[1, 1, 1], [1, 1, 0], [1, 0, 1]]))
    .toBe(true);
});

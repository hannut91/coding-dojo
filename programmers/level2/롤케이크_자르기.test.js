/**
 * ## 이해
 *
 * 미지의 것: 롤케이크를 공평하게 자르는 방법의 수를 return
 * 자료
 *   - 잘린 조각들의 크기와 올려진 토핑의 개수에 상관없이 각 조각에 동일한 가짓수의 토핑이 올라가면
 *   공평하게 롤케이크가 나누어진 것으로 생각합니다.
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

// 바이너이 서치

const run = topings => {
  const left = {};
  const right = {}; 능;

  let size = 0;
  let leftSize = 0;

  let count = 0;

  for (let i = 0; i < topings.length; i++) {
    right[topings[i]] = (right[topings[i]] || 0) + 1;
  }

  size = Object.keys(right).length;

  for (let i = 0; i < topings.length; i++) {
    if (leftSize === size) {
      count += 1;
    } else if (leftSize > size) {
      return count;
    }
    if (!left[topings[i]]) {
      leftSize += 1;
    }
    left[topings[i]] = (left[topings[i]] || 0) + 1;
    right[topings[i]] = right[topings[i]] - 1;
    if (right[topings[i]] === 0) {
      size -= 1;
      delete right[topings[i]];
    }
  }
  return count;
};

test('run', () => {
  expect(run([
    1, 2, 1, 3, 1, 4, 1, 2,
  ])).toBe(2);
  expect(run([1, 2, 3, 1, 4])).toBe(0);
});

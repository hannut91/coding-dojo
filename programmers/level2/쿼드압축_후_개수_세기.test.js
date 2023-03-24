/**
 * ## 이해
 *
 * 미지의 것: arr을 압축했을 때, 배열에 최종적으로 남는 0의 개수와 1의 개수를 배열에 담아서 return
 * 자료
 *   -  S 내부에 있는 모든 수가 같은 값이라면, S를 해당 수 하나로 압축시킵니다.
 *   - 그렇지 않다면, S를 정확히 4개의 균일한 정사각형 영역으로 쪼갠다.
 *      - 각 정사각형 영역에 대해 같은 방식의 압축을 시도합니다.
 *   - arr의 행의 개수는 1 이상 1024 이하이며, 2의 거듭 제곱수 형태
 * 조건
 *   - arr를 4개의 S영역으로 나눈다.
 *   - S 내부가 모두 같은 값이면 압축한다.
 *   - 그렇지 않으면 다시 4개의 S영역으로 나누고 S영역을 압축한다.
 *   - 배열에 최종적으로 남는 0의 개수와 1의 개수를 담아서 return 한다.
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const run = arr => {
  if (arr[0].length === 1) {
    if (arr[0][0] === 1) {
      return [0, 1];
    }
    return [1, 0];
  }

  const sum = [0, 0];
  for (let i = 0; i < arr.length; i++) {
    sum[0] += arr[i].filter(it => it === 0).length;
    sum[1] += arr[i].filter(it => it === 1).length;
  }
  if (sum[0] === 0) {
    return [0, 1];
  }
  if (sum[1] === 0) {
    return [1, 0];
  }

  const section = [];
  for (let i = 0; i < arr.length; i += (arr.length / 2)) {
    const r = [];
    for (let j = 0; j < (arr.length / 2); j++) {
      r.push(
        arr[i + j].slice(0, arr[i].length / 2),
      );
    }
    section.push(r);
  }

  for (let i = 0; i < arr.length; i += (arr.length / 2)) {
    const r = [];
    for (let j = 0; j < (arr.length / 2); j++) {
      r.push(
        arr[i + j].slice(arr[i].length / 2),
      );
    }
    section.push(r);
  }

  const r = section.map(it => run(it));
  const result = [0, 0];
  r.forEach(it => {
    result[0] += it[0];
    result[1] += it[1];
  });
  return result;
};

test('run', () => {
  expect(run([[1]])).toEqual([0, 1]);
  expect(run([[0]])).toEqual([1, 0]);
  expect(run([[1, 1], [1, 0]])).toEqual([1, 3]);
  expect(run([[1, 1], [1, 1]])).toEqual([0, 1]);
  expect(run([[0, 0], [0, 0]])).toEqual([1, 0]);
  expect(run([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])).toEqual([1, 0]);

  expect(run([
    [1, 0, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
  ])).toEqual([8, 8]);

  expect(run([
    [1, 0, 1, 1],
    [1, 0, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
  ])).toEqual([6, 7]);
  expect(run([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
  ])).toEqual([10, 15]);

  // expect(run([[1, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 1], [1, 1, 1, 1]])).toBe([4, 9]);
});

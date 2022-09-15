/**
 * ## 이해
 *
 * 미지의 것: 동빈이를 위해 N명의 모험가에 대한 정보가 주어졌을 때 여행을 떠날 수 있는 그룹 수의 최댓값을 구하라
 * 자료
 *   - 공포도가 적은 사람은 적은 수로 그룹을 구성할 수 있다.
 * 조건
 *   - 모든 모험가를 특정한 그룹에 넣을 필요는 없다
 *
 * ## 계획
 *   - 공포도가 적은 순으로 정렬한다.
 *   - 한 명씩 그룹을 만들어 가면서 그룹의 수를 센다.
 *   - 그룹 수를 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 *   - 처음에 문제가 잘 이해되지 않아서 시간이 오래 걸렸다. 문제에서 원하는 것이 무엇인지 정확하게 파악하는게 중요한 것 같다.
 *   - 처음에 반복문으로 해결하려고 했는데, 해결이 어려워서 재귀로 풀었다. 하나씩 전개하는 것도 충분히 연습해야겠다.
 */

const r = (fears, count = 0) => {
  if (fears.length === 0) {
    return count;
  }
  const [fear] = fears;
  const result = fears.slice(0, fear);
  if (result.length < result[result.length - 1]) {
    return count;
  }

  return r(fears.slice(fear), count + 1);
};

const run = adventurers => {
  const fears = [...adventurers].sort((a, b) => a - b);
  return r(fears);
};

const run2 = adventurers => {
  const fears = [...adventurers].sort((a, b) => a - b);

  let count = 0;
  let result = 0;
  for (let i = 0; i < fears.length; i++) {
    count++;
    if (count >= fears[i]) {
      count = 0;
      result += 1;
    }
  }

  return result;
};

test('run', () => {
  expect(run([2, 3, 1, 2, 2])).toBe(2);
  expect(run2([2, 3, 1, 2, 2])).toBe(2);
});

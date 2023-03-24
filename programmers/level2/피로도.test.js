/**
 * ## 이해
 *
 * 미지의 것: 유저가 탐험할수 있는 최대 던전 수를 return
 * 자료
 *   - "최소 필요 피로도"는 해당 던전을 탐험하기 위해 가지고 있어야 하는 최소한의 피로도를 나타내며,
 *   - "소모 피로도"는 던전을 탐험한 후 소모되는 피로도를 나타냅니다
 * 조건
 *   - 피로도는 0 이상의 정수
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

// 풀이 방법1
const drop = (arr, index) => [...arr.slice(0, index), ...arr.slice(index + 1)];

const run2 = (k, dungeons, count = 0) => {
  if (dungeons.length === 0) {
    return count;
  }

  return Math.max(
    ...dungeons.map(([required, value], index) => {
      if (k >= required) {
        return run2(k - value, drop(dungeons, index), count + 1);
      }

      return run2(k, drop(dungeons, index), count);
    }),
  );
};

// 풀이방법2
function run(k, dungeons) {
  let answer = 0;
  const count = dungeons.length;
  const visited = Array.from({ length: count }, () => false);

  const dfs = (current, fatigue) => {
    answer = Math.max(answer, current);

    for (let i = 0; i < count; i++) {
      if (!visited[i] && fatigue >= dungeons[i][0]) {
        visited[i] = true;
        dfs(current + 1, fatigue - dungeons[i][1]);
        visited[i] = false;
      }
    }
  };

  dfs(0, k);
  return answer;
}

test('run', () => {
  expect(
    run(80, [[80, 20], [50, 40], [30, 10]]),
  ).toBe(3);
});

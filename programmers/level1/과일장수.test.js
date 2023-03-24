/**
 * ## 이해
 *
 * 미지의 것: 과일장수가 얻을 수 있는 최대 이익을 구하라
 * 자료
 *   - 사과는 상태에 따라 1점부터 k점까지의 점수로 뷴류한다.
 *   - k점이 최상품의 사과이고 1점치 최하품의 사과이다.
 *   - 사과 한 상자의 가격은, m개가 있을 때 상자에 담긴 사과 중 가장 낮은 점수가
 *     p점인 경우, 사과 한 상자의 가격은 p * m이다.
 *   - 점수가 낮은 사과를 담지 않는 것이 좋다.
 *
 * 조건
 *   -
 *
 * ## 계획
 *   - 사과 품질을 높은 순으로 정렬한다.
 *   - 사과 상자에 담을 수 있는 만큼 담아서 상자에 담는다.
 *   - 각 사과의 가장 작은 값을 구해서 갯수만큼 곱하낟.
 *   - 모도 더한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const last = array => array[array.length - 1];

const chunks = (array, count) => {
  const result = [];

  for (let i = 0; i < array.length - (count - 1); i += count) {
    result.push(array.slice(i, i + count));
  }

  return result;
};

const run = (k, m, score) => {
  const descendingScores = [...score].sort((a, b) => b - a);

  return chunks(descendingScores, m)
    .reduce((acc, cur) => acc + last(cur) * cur.length, 0);
};

test('run', () => {
  expect(run(3, 4, [1, 2, 3, 1, 2, 3, 1])).toBe(8);
  expect(run(4, 3, [4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2])).toBe(33);
});

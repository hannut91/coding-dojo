/**
 * ## 이해
 *
 * 미지의 것: 서로 다른 무게의 공을 고를려고 할 때 경우의 수를 구하라
 * 자료
 *   - 무게가 같더라도 공의 번호가 다르면 다른 공이다.
 *   - 공의 무게는 1보다 큰 자연수다
 *   - 두 사람 밖에 없다
 * 조건
 *   -
 *
 * ## 계획
 *   - 주어진 갯수 중에서 2개씩 택하는 모든 경우를 구한다.
 *   - 무게가 같은 경우는 제외한다.
 *   - 합을 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

function combineWithoutRepetitions(comboOptions, comboLength) {
  if (comboLength === 1) {
    return comboOptions.map(comboOption => [comboOption]);
  }

  return comboOptions.reduce((acc, currentOption, optionIndex) => {
    const smallerCombos = combineWithoutRepetitions(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1,
    );

    smallerCombos.forEach(smallerCombo => {
      acc.push([currentOption, ...smallerCombo]);
    });

    return acc;
  }, []);
}

const run = balls => combineWithoutRepetitions(balls, 2)
  .filter(([left, right]) => left !== right)
  .length;

test('run', () => {
  expect(run(
    [1, 3, 2, 3, 2],
  )).toBe(8);

  expect(run(
    [1, 5, 4, 3, 2, 4, 5, 2],
  )).toBe(25);
});

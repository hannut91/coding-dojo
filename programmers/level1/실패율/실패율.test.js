// 1. 각 스테이지에 있는 사람의 수를 구한다.
// 2. 각 스테이지별 도전한 사람의 수를 구한다.
//   * 현재 스테이지보다 높은 사람의 수를 모두 합한다.
// 3. 각 스테이지의 실패율을 구한다.
// 4. 내림차순으로 정렬하여, 스테이지를 반환한다.

const run = (stagesCount, currentStageOfPeople) => {
  const peopleCounts = currentStageOfPeople.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, []);
  return Array
    .from({ length: stagesCount }, (_, index) => index + 1)
    .map(stage =>
      peopleCounts.slice(stage)
        .reduce((acc, cur) => acc + cur, 0))
    .map((challengersCount, index) => [
      index + 1,
      (peopleCounts[index + 1] || 0) / challengersCount,
    ])
    .sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] - b[0];
      }
      return b[1] - a[1];
    })
    .map(([stage]) => stage);
};

test('run', () => {
  expect(run(5, [2, 1, 2, 6, 2, 4, 3, 3])).toEqual([3, 4, 2, 1, 5]);
  expect(run(4, [4, 4, 4, 4, 4])).toEqual([4, 1, 2, 3]);
});

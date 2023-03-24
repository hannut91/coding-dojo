/**
 * ## 이해
 *
 * 미지의 것: 각 배포마다 몇 개의 기능이 배포되는지를 return
 * 자료
 *   - 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다
 *   - 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있다
 *   - 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포한다
 * 조건
 *   - 배포는 하루에 한 번만 할 수 있으며, 하루의 끝에 이루어진다고 가정합니다
 *
 * ## 계획
 *   - 스피드 만큼 진행시킨다.
 *   - 100이상인 것들을 확인해서 제거한다.
 *   - 제거된게 있다면 결과에 담는다.
 *   - 모두 진행했으면 결과를 반환한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */
const process = (progresses, speeds) => progresses
  .map((progress, index) => Math.min(progress + speeds[index], 100));

const removeCompleted = progresses => {
  let index = -1;
  for (let i = 0; i < progresses.length; i++) {
    if (progresses[i] === 100) {
      index = i;
    } else {
      break;
    }
  }

  return index;
};

const run = (progresses, speeds, result = []) => {
  // 모두 진행했으면 결과를 반환한다.
  if (progresses.length === 0) {
    return result;
  }

  // 스피드 만큼 진행시킨다.
  const nextPrgoress = process(progresses, speeds);

  // 100이상인 것들을 확인해서 제거한다.
  const index = removeCompleted(nextPrgoress);
  if (index === -1) {
    return run(nextPrgoress, speeds, result);
  }

  return run(
    nextPrgoress.slice(index + 1),
    speeds.slice(index + 1),

    // 제거된게 있다면 결과에 담는다.
    [...result, index + 1],
  );
};

test('run', () => {
  expect(run([93, 30, 55], [1, 30, 5])).toEqual([2, 1]);
});

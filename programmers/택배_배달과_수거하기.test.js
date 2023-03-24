/**
 * ## 이해
 *
 * 미지의 것: 트럭 하나로 모든 배달과 수거를 마치고 물류창고까지 돌아올 수 있는
 *  최소 이동 거리를 return
 * 자료
 *   - 집은 일렬로 나열되어 있다.
 *   - 배달할 물건은 모두 크기가 같다.
 *   - 배달을 다니면서 빈 재활용 택배 상자들을 수거한다
 *   - 트럭에는 재활용 택배 상자를 최대 cap개 실을 수 있습니다
 *   - 각 집에 배달 및 수거할 때, 원하는 개수만큼 택배를 배달 및 수거할 수 있습니다.
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

const pickup = (cap, stack) => {
  while (true) {
    if (cap === 0) {
      return;
    }

    if (stack.length === 0) {
      return;
    }

    const [index, value] = stack.pop();
    if (cap >= value) {
      cap -= value;
    } else {
      stack.push([index, value - cap]);
      cap = 0;
    }
  }
};

const run = (cap, n, deliveries, pickups) => {
  const dStack = deliveries
    .map((it, index) => [index, it])
    .filter(([_, it]) => it > 0);
  const pStack = pickups
    .map((it, index) => [index, it])
    .filter(([_, it]) => it > 0);

  let count = 0;

  while (true) {
    if (dStack.length === 0 && pStack.length === 0) {
      return count;
    }

    const target = Math.max(
      (dStack[dStack.length - 1] || [0])[0],
      (pStack[pStack.length - 1] || [0])[0],
    );

    count += (target + 1) * 2;

    pickup(cap, dStack);
    pickup(cap, pStack);
  }
};

test('run', () => {
  expect(
    run(4, 5, [1, 0, 3, 1, 2], [0, 3, 0, 4, 0]),
  ).toBe(16);
  expect(
    run(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]),
  ).toBe(30);
});

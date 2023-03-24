/**
 * ## 이해
 *
 * 미지의 것: 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return
 * 자료
 *   - 다리에는 트럭이 최대 bridge_length대 올라갈 수 있다.
 *   - 다리는 weight 이하까지의 무게를 견딜 수 있습니다.
 *   - 다리에 완전히 오르지 않은 트럭의 무게는 무시합니다.
 *   - 정해진 순으로 건너야한다.
 * 조건
 *   -
 *
 * ## 계획
 *   - 트럭이 다리를 건넌다
 *     - bridge_length만큼의 빈 배열을 만든다.
 *     - truck_weights 앞에서부터 하나씩 빼서 위 배열에 넣는다.
 *     - 무게를 더한다. 최대 weight까지만 배열에 들어갈 수 있음
 *   - 이때, 다리를 건너는데 소요된 시간을 구한다.
 *     - 더 이상 다리에 올라갈 수 없다면,
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const totalWeight = queue => queue.reduce((acc, cur) => acc + cur, 0);

const run = (bridge_length, weight, truck_weights) => {
  const queue = Array.from({ length: bridge_length }, () => 0);
  let time = 0;
  while (true) {
    if (truck_weights.length === 0 && totalWeight(queue) === 0) {
      return time;
    }

    const current = truck_weights[0];

    queue.push(0);
    queue.shift();

    time += 1;
    if (totalWeight(queue) + current <= weight) {
      queue[queue.length - 1] = truck_weights.shift(0);
    }
  }
};

test('run', () => {
  expect(run(2, 10, [7, 4, 5, 6])).toBe(8);
  // expect(run(100, 100, [10])).toBe(101);
  // expect(run(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])).toBe(110);
});

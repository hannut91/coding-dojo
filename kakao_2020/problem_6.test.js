const calculateDistance = (start, end, clockwise) => {
  let count = 0;

  if (clockwise) {
    while (true) {
      count += 1;
      start += 1;
      if (start == 12) {
        start = 0;
      }

      if (end == start) {
        break;
      }
    }

    return count
  }

  while (true) {
    start--;
    count += 1;
    if (start == 0) {
      start = 12;
    }

    if (end == start) {
      break;
    }
  }
  return count;
};

const fix = (weak, startIndex, distance, clockwise) => {
  const start = weak[startIndex];
  const values = [start];

  while (true) {
    if (clockwise) {
      startIndex += 1;
      if (startIndex >= weak.length) {
        startIndex = 0;
      }
    } else {
      startIndex--;
      if (startIndex < 0) {
        startIndex = weak.length - 1;
      }
    }

    distance = distance - calculateDistance(start, weak[startIndex], clockwise);
    if (distance >= 0) {
      values.push(weak[startIndex]);
    } else {
      break;
    }
  }

  return weak.filter((v, i) => !values.includes(v))
}

const run = (n, weak, dist) => {
  [1, 5, 6, 10]
  let counts = [];
  weak.forEach((v, index) => {
    let fixed = [...weak];

    for (let i = dist.length - 1; i >= 0; i--) {
      fixed = fix(fixed, index, dist[i], false);
      if (fixed.length === 0) {
        counts.push(dist.length - i - 1);
        break;
      }
    }

    // for (let i = 0; i < dist.length; i++) {
    //   let fixed = [...weak];

    //   for (let j = i; j < dist.length; j++) {
    //     fixed = fix(fixed, index, dist[j], true);
    //     if (fixed.length === 0) {
    //       counts.push(dist.length - i);
    //     }
    //   }
    // }
  })

  console.log('counts: ', counts);

  // count ++ 
  // 탐색 (원본, 시작 점: 10)
  // 탐색( 시작 점: 4)
  // 남는게 없으면? return count

  return 2;
};

test('calculateDistance', () => {
  expect(calculateDistance(1, 10, false)).toBe(3);
  expect(calculateDistance(3, 1, false)).toBe(2);
  expect(calculateDistance(1, 3, false)).toBe(10);
  expect(calculateDistance(1, 3, true)).toBe(2);
  expect(calculateDistance(11, 10, true)).toBe(11);
  expect(calculateDistance(5, 6, true)).toBe(1);
  expect(calculateDistance(5, 1, false)).toBe(4);
});
test('run', () => {
  expect(run(12, [1, 5, 6, 10], [1, 2, 3, 4])).toBe(2)
});

test('fix', () => {
  expect(fix([1, 5, 6, 10], 0, 4, false)).toEqual([5, 6]);
  expect(fix([5, 6], 0, 3, true)).toEqual([]);

  expect(fix([1, 5, 6, 10], 1, 4, false)).toEqual([6, 10]);
});



// 레스토랑의 구조는 완전히 동그란 모양이고 외벽의 총 둘레는 n미터
// 점검 시간을 1시간으로 제한
//  정북 방향 지점을 0
// 취약 지점의 위치는 정북 방향 지점으로부터 시계 방향으로 떨어진 거리
// 친구들은 출발 지점부터 시계, 혹은 반시계 방향으로 외벽을 따라서만 이동합니다.
// 외벽의 길이 n
// 취약 지점의 위치가 담긴 배열 weak
//  각 친구가 1시간 동안 이동할 수 있는 거리가 담긴 배열 dist

// 단 
// n은 1 이상 200 이하인 자연수입니다.
// weak의 길이는 1 이상 15 이하입니다.
// 서로 다른 두 취약점의 위치가 같은 경우는 주어지지 않습니다.
// 취약 지점의 위치는 오름차순으로 정렬되어 주어집니다.
// weak의 원소는 0 이상 n - 1 이하인 정수입니다.
// dist의 길이는 1 이상 8 이하입니다.
// dist의 원소는 1 이상 100 이하인 자연수입니다.
// 친구들을 모두 투입해도 취약 지점을 전부 점검할 수 없는 경우에는 -1을 return 해주세요.

// 원하는 것: 취약 지점을 점검하기 위해 보내야 하는 친구 수의 최소값을 return 하도록 solution 함수를 완성
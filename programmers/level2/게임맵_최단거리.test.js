/**
 * ## 이해
 *
 * 미지의 것:캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 최솟값을 구하라
 * 자료
 *   - 검은색 부분은 벽으로 막혀있어 갈 수 없는 길
 *   - 흰색 부분은 갈 수 있는 길
 *   - 캐릭터가 움직일 때는 동, 서, 남, 북 방향으로 한 칸씩 이동하며,
 *   - 게임 맵을 벗어난 길은 갈 수 없습니다.
 *   - 상대 팀 진영에 도착할 수 없을 때는 -1을 return
 *   - maps는 0과 1로만 이루어져 있으며, 0은 벽이 있는 자리, 1은 벽이 없는 자리를 나타냅니다.
 *   - 처음에 캐릭터는 게임 맵의 좌측 상단인 (1, 1) 위치에 있으며,
 *   - 상대방 진영은 게임 맵의 우측 하단인 (n, m) 위치에 있습니다.
 * 조건
 *   -
 *
 * ## 계획
 *   - dfs 로 모든 경로를 확인한다.
 *   - 가장 짧은 경로를 리턴한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const movement = {
  U: ([x, y]) => [x, y - 1],
  D: ([x, y]) => [x, y + 1],
  L: ([x, y]) => [x - 1, y],
  R: ([x, y]) => [x + 1, y],
};
const getAvailableBlokcs = (current, maps) => {
  const blocks = [];
  const next = movement.U(current);
  if (next[0] > -1
    && next[0] < maps[0].length
    && next[1] > -1
    && next[1] < maps.length
    && maps[next[1]][next[0]] === 1) {
    blocks.push(next);
  }

  const next2 = movement.D(current);
  if (next2[0] > -1
    && next2[0] < maps[0].length
    && next2[1] > -1
    && next2[1] < maps.length
    && maps[next2[1]][next2[0]] === 1) {
    blocks.push(next2);
  }

  const next3 = movement.L(current);
  if (next3[0] > -1
    && next3[0] < maps[0].length
    && next3[1] > -1
    && next3[1] < maps.length
    && maps[next3[1]][next3[0]] === 1) {
    blocks.push(next3);
  }

  const next4 = movement.R(current);
  if (next4[0] > -1
    && next4[0] < maps[0].length
    && next4[1] > -1
    && next4[1] < maps.length
    && maps[next4[1]][next4[0]] === 1) {
    blocks.push(next4);
  }

  return blocks;
};

const run = maps => {
  const target = [maps[0].length - 1, maps.length - 1];
  const visited = Array.from({ length: maps.length }, () => Array.from({ length: maps[0].length }, () => false));

  const queue = [[0, 0, 1]];
  visited[0][0] = true;

  while (queue.length > 0) {
    const [x, y, count] = queue.shift();
    if (x === target[0] && y === target[1]) {
      return count;
    }

    if (y - 1 >= 0 && !visited[y - 1][x] && maps[y - 1][x] === 1) {
      queue.push([x, y - 1, count + 1]);
      visited[y - 1][x] = true;
    }
    if (y + 1 < maps.length && !visited[y + 1][x] && maps[y + 1][x] === 1) {
      queue.push([x, y + 1, count + 1]);
      visited[y + 1][x] = true;
    }
    if (x - 1 >= 0 && !visited[y][x - 1] && maps[y][x - 1] === 1) {
      queue.push([x - 1, y, count + 1]);
      visited[y][x - 1] = true;
    }
    if (x + 1 < maps[0].length && !visited[y][x + 1] && maps[y][x + 1] === 1) {
      queue.push([x + 1, y, count + 1]);
      visited[y][x + 1] = true;
    }
  }

  return -1;
};

test('getAvailableBlokcs', () => {
  const maps = [
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [0, 0, 0, 0, 1],
  ];

  expect(getAvailableBlokcs([0, 0], maps))
    .toEqual([[0, 1]]);
  expect(getAvailableBlokcs([0, 3], maps))
    .toEqual([[0, 2], [1, 3]]);
  expect(getAvailableBlokcs([4, 2], maps))
    .toEqual([[4, 1], [4, 3], [3, 2]]);
});

test.only('run', () => {
  expect(run([[1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 0, 1], [0, 0, 0, 0, 1]])).toBe(11);
  // expect(run([[1, 0, 1, 1, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 1], [1, 1, 1, 0, 0], [0, 0, 0, 0, 1]])).toBe(-1);
});

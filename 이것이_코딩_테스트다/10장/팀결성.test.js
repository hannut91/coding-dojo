/**
 * ## 이해
 *
 * 미지의 것: 선생님이 M개의 연산을 수행할 수 있을 때, `같은 팀 여부 확인` 연산에 대한 연산 결과를 출력하는 프로그램을 작성하라
 * 자료
 *   - 0부터 N 총 N + 1개의 팀이 존재한다.
 *   - 팁 합치기 연산은 두 팀을 합친다
 *   - 같은 팀 여부 확인 연산은 특정한 두 학생이 같은 팀에 속하는지 확인한다.
 *
 * ## 계획
 *   - 처음에는 모두 개인 이므로 길이가 1인 배열로 모든 팀을 만든다.
 *   - 합치기 연산은 A팀원들과 B팀원들을 하나로 합친다.
 *   - 같은 팀인지 확인하는 연산은 주어진 A팀 안에 B팀원이 있는지 확인한다.
 * ## 실행
 *
 * ## 반성
 *   - 성급하게 문제를 풀어서 틀릴뻔했다. 팀 array를 돌면서 다른 팀을 합칠려고
 *     했는데, 그러면 이전의 팀을 찾는 방법이 없어진다. 중복이지만 합쳐질 때
 *     둘다 정보를 가지게 해서 합쳐져도 이전 팀을 찾을 수 있도록 해서 문제를
 *     해결했다.
 *   - 중복된 정보를 저장하지 않아도 문제를 해결할 수 있는 방법을 고민해야겠다.
 */
const merge = (teams, a, b) => teams.map((team, index) => {
  if (index === a || index === b) {
    return [...teams[a], ...teams[b]];
  }

  return team;
});

const isSameTeam = (teams, a, b) => teams[a].includes(b);

const r = (teams, commands, result = []) => {
  if (commands.length === 0) {
    return result;
  }

  const [command, a, b] = commands[0];
  if (command === 1) {
    return r(teams, commands.slice(1), [...result, isSameTeam(teams, a, b)]);
  }

  const newTeam = merge(teams, a, b);
  return r(newTeam, commands.slice(1), result);
};

const run = (n, commands) => {
  const teams = Array.from({ length: n + 1 }, (_, index) => [index]);
  return r(teams, commands);
};

const findRoot = (teams, a) => {
  if (teams[a] === a) {
    return a;
  }

  teams[a] = findRoot(teams, teams[a]);
  return teams[a];
};

const union = (teams, a, b) => {
  const aRoot = findRoot(teams, a);
  const bRoot = findRoot(teams, b);
  if (aRoot > bRoot) {
    teams[aRoot] = bRoot;
  } else {
    teams[bRoot] = aRoot;
  }

  return teams;
};

const find = (teams, a, b) => {
  const aRoot = findRoot(teams, a);
  const bRoot = findRoot(teams, b);
  return aRoot === bRoot;
};

test('find', () => {
  expect(find([0, 1, 2, 3], 1, 3))
    .toBe(false);
  expect(find([0, 1, 2, 1], 1, 3))
    .toBe(true);
});

test('findZip', () => {
  const arr = [0, 0, 1, 2];
  expect(find(arr, 0, 3)).toBe(true);
  expect(arr).toEqual([0, 0, 0, 0]);
});


test('union', () => {
  expect(union([0, 1, 2, 3], 1, 3))
    .toEqual([0, 1, 2, 1]);
  expect(union([0, 1, 2, 3], 3, 1))
    .toEqual([0, 1, 2, 1]);
});

const r2 = (teams, commands, result = []) => {
  if (commands.length === 0) {
    return result;
  }

  const [command, a, b] = commands[0];
  if (command === 1) {
    return r2(teams, commands.slice(1), [...result, find(teams, a, b)]);
  }

  const newTeam = union(teams, a, b);
  return r2(newTeam, commands.slice(1), result);
};

const run2 = (n, commands) => {
  const teams = Array.from({ length: n + 1 }, (_, i) => i);
  return r2(teams, commands);
};

test('run', () => {
  expect(run(7, [
    [0, 1, 3],
    [1, 1, 7],
    [0, 7, 6],
    [1, 7, 1],
    [0, 3, 7],
    [0, 4, 2],
    [0, 1, 1],
    [1, 1, 1],
  ])).toEqual([
    false,
    false,
    true,
  ]);
});

test('run2', () => {
  expect(run2(7, [
    [0, 1, 3],
    [1, 1, 7],
    [0, 7, 6],
    [1, 7, 1],
    [0, 3, 7],
    [0, 4, 2],
    [0, 1, 1],
    [1, 1, 1],
  ])).toEqual([
    false,
    false,
    true,
  ]);
});

test('isSameTeam', () => {
  expect(isSameTeam([
    [0],
    [1],
    [2],
    [3],
  ], 1, 3)).toBe(false);
  expect(isSameTeam([
    [0],
    [1, 3],
    [2],
    [1, 3],
  ], 1, 3)).toBe(true);
});


test('merge', () => {
  expect(merge([
    [0],
    [1],
    [2],
    [3],
  ], 1, 3)).toEqual([
    [0],
    [1, 3],
    [2],
    [1, 3],
  ]);
});

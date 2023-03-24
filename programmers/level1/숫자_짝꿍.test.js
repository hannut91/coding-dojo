/**
 * ## 이해
 *
 * 미지의 것: 두 정수 X, Y가 주어졌을 때, X, Y의 짝꿍을 구하라
 * 자료
 *   - X, Y임의의 자리에서 공통으로 나타나는 정수들을 이용하여 만들 수 있는 가장 큰 정수를 두 수의 짝궁이라 부른다.
 *   - 짝꿍이 존재하지 않으면 짝꿍은 -1이다.
 *   - 짝궁이 0으로만 구성되어 있다면 짝꿍은 0이다.
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

const createGreatestNumber = numbers => {
  const result = numbers.sort((a, b) => Number(b) - Number(a))
    .join('');

  if (Number(result) === 0) {
    return '0';
  }

  return result;
};

const intersection = (x, y) => {
  const map = y.split('').reduce((acc, cur) => {
    acc.set(cur, (acc.get(cur) || 0) + 1);
    return acc;
  }, new Map());

  const output = [];

  for (let i = 0; i < x.length; i++) {
    const result = map.get(x[i]);
    if (!result) {
      continue;
    }

    if (result <= 0) {
      continue;
    }

    map.set(x[i], result - 1);
    output.push(x[i]);
  }
  return output;
};

const run = (x, y) => {
  const pair = intersection(x, y);
  if (pair.length === 0) {
    return '-1';
  }

  return createGreatestNumber(pair);
};

test('run', () => {
  expect(run('3403', '13203')).toBe('330');
});

test('intersection', () => {
  expect(intersection('3403', '13203')).toEqual(['3', '0', '3']);
});

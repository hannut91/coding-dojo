/**
 * ## 이해
 *
 * 미지의 것:
 * 자료
 *   -
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

const createBase = n => {
  const base = [];
  for (let i = 1; i <= n; i++) {
    const arr = [];
    for (let j = 0; j < i; j++) {
      arr.push(0);
    }
    base.push(arr);
  }
  return base;
};

const nextDirection = current => (current + 1) % 3;

const go = (n, base) => {
  let direction = 0;
  let position = 0;
  let count = 1;

  while (true) {
    if (base.every(rows => rows.every(column => column !== 0))) {
      return;
    }

    if (direction === 0) {
      const index = base[position].indexOf(0);
      base[position][index] = count;
      if (base[position + 1] === undefined || base[position + 1].indexOf(0) === -1) {
        direction = nextDirection(direction);
        count += 1;
      } else {
        position += 1;
        count += 1;
      }
    } else if (direction === 1) {
      const index = base[position].indexOf(0);
      if (index === -1) {
        direction = nextDirection(direction);
        position -= 1;
      } else {
        base[position][index] = count;
        count += 1;
      }
    } else if (direction === 2) {
      const index = base[position].lastIndexOf(0);
      base[position][index] = count;
      if (base[position - 1] === undefined || base[position - 1].indexOf(0) === -1) {
        direction = nextDirection(direction);
        position += 1;
        count += 1;
      } else {
        position -= 1;
        count += 1;
      }
    }
  }
};

const run = n => {
  const base = createBase(n);
  go(n, base);
  return base.flatMap(it => it);
};

test('run', () => {
  expect(run(4)).toEqual([1, 2, 9, 3, 10, 8, 4, 5, 6, 7]);
  expect(run(5)).toEqual([1, 2, 12, 3, 13, 11, 4, 14, 15, 10, 5, 6, 7, 8, 9]);
  expect(run(6)).toEqual([1, 2, 15, 3, 16, 14, 4, 17, 21, 13, 5, 18, 19, 20, 12, 6, 7, 8, 9, 10, 11]);
});

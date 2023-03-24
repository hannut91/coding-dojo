/**
 * ## 이해
 *
 * 미지의 것: "균형잡힌 괄호 문자열" p가 매개변수로 주어질 때, 주어진 알고리즘을 수행해
 *          "올바른 괄호 문자열"로 변환한 결과를 return
 * 자료
 *   - 균형잡힌 괄호 문자열은 '('와 ')'의 개수가 같은 문자열
 *   - 올바른 괄호 문자열은 '('와 ')'의 괄호의 짝이 모두 맞는 문자열
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

const correct = p => {
  const stack = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') {
      stack.push(p[i]);
    } else {
      stack.pop();
    }
  }
  if (stack.length > 0) {
    return false;
  }
  return true;
};

test('correct', () => {
  expect(correct('()')).toBe(true);
  expect(correct('()()')).toBe(true);
  expect(correct('()()')).toBe(true);
  expect(correct('(())()')).toBe(true);

  expect(correct(')(')).toBe(false);
  expect(correct('))((')).toBe(false);
  expect(correct('))((()')).toBe(false);
});

const split = p => {
  const stack = [];
  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') {
      stack.push(p[i]);
    } else {
      stack.pop();
    }
    console.log('stack: ', stack);
    if (stack.length === 0) {
      return [p.slice(0, i + 1), p.slice(i + 1)];
    }
  }

  // let count = 0;
  // for (let i = 0; i < p.length; i++) {
  //   if (p[i] === '(') {
  //     count++;
  //   } else {
  //     count--;
  //   }
  //   if (count === 0) {금
  //     return [p.slice(0, i + 1), p.slice(i + 1)];
  //   }
  // }
};

test('split', () => {
  expect(split(')(')).toEqual([')(', '']);
  expect(split('(()())()')).toEqual(['(()())', '()']);
  expect(split('()))((()')).toEqual(['()', '))((()']);
});

const run = p => {
  if (p === '') {
    return '';
  }
  const [u, v] = split(p);
  if (correct(u)) {
    return u + run(v);
  }
  const temp = `(${run(v)})`;
  return temp + u.slice(1, -1).split('').map(it => (it === ')' ? '(' : ')')).join('');
};

test('run', () => {
  expect(run(')(')).toBe('()');
  expect(run('(()())()')).toBe('(()())()');
  expect(run('()))((()')).toBe('()(())()');
});

const isCorrect = (w) => {
  let count = w[0] === '(' ? 1 : -1;

  for (let i = 1; i < w.length; i++) {
    if (count < 0) {
      return false;
    }

    if (w[i] === '(') {
      count += 1;
      continue
    }

    if (w[i] === ')') {
      count -= 1;
      continue
    }
  }

  return count === 0;
};
const split = (w) => {
  let count = w[0] === '(' ? 1 : -1;
  let index;

  for (let i = 1; i < w.length; i++) {
    if (count === 0) {
      index = i;
      break;
    }

    if (w[i] === '(') {
      count += 1;
      continue
    }

    if (w[i] === ')') {
      count -= 1;
      continue
    }
  }

  return {
    u: w.slice(0, index || w.length),
    v: w.slice(index || w.length)
  }
};

const run = (w) => {
  if (!w) {
    return '';
  }

  const { u, v } = split(w);
  if (isCorrect(u)) {
    return u + run(v);
  }

  return '(' + run(v) + ')' + u
    .slice(1, u.length - 1)
    .split('')
    .map(i => i === '(' ? ')': '(')
    .join('');
}

test('run', () => {
  expect(run('(()())()')).toBe('(()())()');
  expect(run('')).toBe('');
  expect(run(')(')).toBe('()');
  expect(run('()))((()')).toBe('()(())()');
});

test('split', () => {
  expect(split('(()())()')).toEqual({u: '(()())', v: '()'});
  expect(split('()')).toEqual({ u: '()', v: '' });
  expect(split('()()')).toEqual({ u: '()', v: '()' });
  expect(split('(())')).toEqual({ u: '(())', v: '' });
  expect(split('(())()')).toEqual({ u: '(())', v: '()' });
  expect(split(')(')).toEqual({ u: ')(', v: '' });
  expect(split('()))((()')).toEqual({ u: '()', v: '))((()' });
  expect(split('))((()')).toEqual({ u: '))((', v: '()' });
})

test('isCorrect', () => {
  expect(isCorrect('()')).toBe(true);
  expect(isCorrect(')(')).toBe(false);
  expect(isCorrect('(()))(')).toBe(false);
});

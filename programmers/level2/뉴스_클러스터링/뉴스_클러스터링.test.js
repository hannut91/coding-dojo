const intersection = (left, right) => {
  const leftMap = left.reduce((acc, cur) => ({
    ...acc,
    [cur]: (acc[cur] || 0) + 1,
  }), {});
  const rightMap = right.reduce((acc, cur) => ({
    ...acc,
    [cur]: (acc[cur] || 0) + 1,
  }), {});

  return ([...new Set(left)]).reduce((acc, value) => {
    if (!rightMap[value]) {
      return acc;
    }

    const min = Math.min(leftMap[value], rightMap[value]);
    return [
      ...acc,
      ...Array.from({ length: min }, () => value),
    ];
  }, []);
};

const product = (left, right) => {
  const leftMap = left.reduce((acc, cur) => ({
    ...acc,
    [cur]: (acc[cur] || 0) + 1,
  }), {});
  const rightMap = right.reduce((acc, cur) => ({
    ...acc,
    [cur]: (acc[cur] || 0) + 1,
  }), {});
  return [...new Set([...left, ...right])].reduce((acc, value) => {
    const max = Math.max((leftMap[value] || 0), (rightMap[value] || 0));
    return [
      ...acc,
      ...Array.from({ length: max }, () => value),
    ];
  }, []);
};

const slice = str => {
  const r = [];
  for (let i = 0; i < str.length - 1; i++) {
    r.push(`${str[i]}${str[i + 1]}`);
  }
  return r;
};

const run = (str1, str2) => {
  // 문자열을 소문자로 만든다.
  // 문자열을 2개씩 자른다.
  //   이 때 기타 공백이나 숫자 특수 문자가 들어있는 경우 그 글자쌍을 버린다.
  const left = slice(str1.toLowerCase()).filter(it => it.match(/[a-zA-Z]{2}/));
  const right = slice(str2.toLowerCase()).filter(it => it.match(/[a-zA-Z]{2}/));
  if (left.length === 0 && right.length === 0) {
    return 65536;
  }
  // 다중 집합 교집합을 구한다
  const i = intersection(left, right);
  if (i.length === 0) {
    return 0;
  }
  // 다중 집합 합집합을 구한다.
  const p = product(left, right);
  // 두 수를 나누고 65536을 곱한다.
  return Math.floor((i.length / p.length) * 65536);
};

test('run', () => {
  expect(run('E=M*C^2', 'e=m*c^2')).toBe(65536);
});
test('slice', () => {
  expect(slice('FRANCE')).toEqual(['FR', 'RA', 'AN', 'NC', 'CE']);
});

test('intersection', () => {
  expect(intersection(
    ['fr', 'ra', 'an', 'nc', 'ce'],
    ['fr', 're', 'en', 'nc', 'ch'],
  )).toEqual(['fr', 'nc']);
  expect(intersection(
    ['1', '1', '1', '5'],
    ['1', '1', '1', '1', '1'],
  )).toEqual(['1', '1', '1']);
});

test('product', () => {
  expect(product(
    ['fr', 'ra', 'an', 'nc', 'ce'],
    ['fr', 're', 'en', 'nc', 'ch'],
  )).toEqual(['fr', 'ra', 'an', 'nc', 'ce', 're', 'en', 'ch']);
});

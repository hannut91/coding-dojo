const createCombination = (arr, selectNumber) => {
  const results = [];

  if (selectNumber === 1) {
    return [...arr].map(el => [el]);
  }

  [...arr].forEach((fixed, index, a) => {
    const newArr = a.slice(index + 1);
    const combination = createCombination(newArr, selectNumber - 1);

    const attached = combination.map(el => [fixed, ...el]);
    results.push(...attached);
  });

  return results.map(it => it.join(''));
};

const run = (o, course) => {
  const orders = o.map(it => [...it].sort().join(''));
  const orderMap = new Map();

  course
    .forEach(courseCount => {
      const r = orders.reduce((acc, order) => [
        ...acc,
        ...createCombination(order, courseCount),
      ], []);

      r.forEach(it => {
        const frequentOrderCount = orderMap.get(it);
        orderMap.set(it, (frequentOrderCount || 0) + 1);
      });
    });

  return course.reduce((acc, courseCount) => {
    const sortedOrders = [...orderMap]
      .filter(([c, count]) => c.length === courseCount && count > 1)
      .sort((a, b) => b[1] - a[1]);
    if (sortedOrders.length === 0) {
      return acc;
    }

    const [_, max] = sortedOrders[0];

    const result = sortedOrders.filter(([_, count]) => count === max)
      .map(([c]) => c);
    return [
      ...acc,
      ...result,
    ];
  }, [])
    .sort();
};

test('run', () => {
  expect(run(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]))
    .toEqual(['AC', 'ACDE', 'BCFG', 'CDE']);
  expect(run(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]))
    .toEqual(['ACD', 'AD', 'ADE', 'CD', 'XYZ']);
  expect(run(['XYZ', 'XWY', 'WXA'], [2, 3, 4]))
    .toEqual(['WX', 'XY']);
  expect(run(['ABCDF'], [5]))
    .toEqual([]);
});

test('createCombination', () => {
  expect(createCombination('ABC', 2)).toEqual([
    'AB',
    'AC',
    'BC',
  ]);
  expect(createCombination('ABC', 3)).toEqual([
    'ABC',
  ]);
  expect(createCombination('ABCD', 3)).toEqual([
    'ABC',
    'ABD',
    'ACD',
    'BCD',
  ]);
});

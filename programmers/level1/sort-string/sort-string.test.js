const sortString = (strings, i) =>
  strings.sort((a, b) => {
    if (a[i] === b[i]) {
      return a > b ? 1 : - 1;
    }

    return a[i] > b[i] ? 1 : -1;
  });

test('sortString', () => {
  expect(sortString(['sun', 'bed', 'car'], 1)).toEqual(['car', 'bed', 'sun']);
  expect(sortString(['abce', 'abcd', 'cdx'], 2)).toEqual(['abcd', 'abce', 'cdx']);
});
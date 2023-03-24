/**
 * ## 이해
 *
 * 미지의 것: 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return
 * 자료
 *   - 이전에 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을 코스요리 메뉴로 구성하기로 했습니다.
 *   - 코스요리 메뉴는 최소 2가지 이상의 단품메뉴로 구성
 *   - 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 코스요리 메뉴 후보에 포함
 * 조건
 *   -
 *
 * ## 계획
 *   - 주문한 단품 메뉴들을 조합해서 코스요리 메뉴 후보를 만든다.
 *   - 메뉴 후보 중에서 두번 이상 주문된 것을 고른다.
 *   - 오름차순으로 정렬해서 리턴한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

// A
// AB
// ABC
// ABD
// AC
// ACD
// AD

// B
// BC
// BCD
// BD

// const combination = (string, n, count = n, result = []) => {
//   if (string.length === 0 || count === 0) {
//     return result.filter(it => it.length === n);
//   }

//   return [
//     ...combination(
//       string.slice(1),
//       n,
//       count - 1,
//       result.length === 0 ? [string[0]] : result.map(it => it + string[0]),
//     ),
//     ...combination(
//       string.slice(1),
//       n,
//       count,
//       result,
//     ),
//   ];
// };

function getCombination(arr, selectNum) {
  const result = [];
  if (selectNum === 1) {
    return [...arr];
  }

  [...arr].forEach((fixedNum, index) => {
    const rest = arr.slice(index + 1);

    const combination = getCombination(rest, selectNum - 1);

    const attached = combination.map(c => fixedNum + c);

    result.push(...attached);
  });

  return result;
}


const run = (orders, courses) => {
  orders = orders.map(it => it.split('').sort().join(''));

  return courses.reduce((acc, course) => {
    const count = orders.map(order => getCombination(order, course))
      .reduce((acc, combinations) => {
        combinations.forEach(combination => {
          acc[combination] = (acc[combination] || 0) + 1;
        });

        return acc;
      }, {});
    return [...acc, ...Object.entries(count)
      .filter(([, value]) => value > 1)
      .sort((a, b) => b[1] - a[1])
      .filter(([, value], index, arr) => value === arr[0][1])
      .map(([menu]) => menu)];
  }, [])
    .sort();
};

test('getCombination', () => {
  expect(getCombination('ABCD', 2)).toEqual([
    'AB', 'AC', 'AD', 'BC', 'BD', 'CD',
  ]);
  expect(getCombination('BCD', 2)).toEqual([
    'BC', 'BD', 'CD',
  ]);
  expect(getCombination('CD', 2)).toEqual([
    'CD',
  ]);
  expect(getCombination('ABCD', 3)).toEqual([
    'ABC', 'ABD', 'ACD', 'BCD',
  ]);
});

test('run', () => {
  expect(run(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]))
    .toEqual(['AC', 'ACDE', 'BCFG', 'CDE']);
  expect(run(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5]))
    .toEqual(['ACD', 'AD', 'ADE', 'CD', 'XYZ']);
  expect(run(['XYZ', 'XWY', 'WXA'], [2, 3, 4]))
    .toEqual(['WX', 'XY']);
});

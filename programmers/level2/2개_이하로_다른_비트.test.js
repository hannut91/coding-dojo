/**
 * ## 이해
 *
 * 미지의 것: numbers의 모든 수들에 대하여 각 수의 f 값을 배열에 차례대로 담아 return
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

// 0 0 - 1
// 1 1 - 2
// 2 10 - 3
// 3 11 - 5
// 4 100 - 5
// 5 101 - 6
// 6 110 - 7
// 7 111 - 1011
// 8 1000 - 1001
// 9 1001 - 1010
// 10 1010 - 1011
// 11 1011 - 1101
// 12 1100 - 1101
// 13 1101 - 1110
// 14 1110 - 15
// 15  1111 - 23 10111
// 16 10000
// 17 10001
// 18 10010
// 19 10011 -


const calculateCount = (bit, targetBit) => {
  const r = (bit ^ targetBit).toString(2);
  let count = 0;
  for (let i = 0; i < r.length; i++) {
    if (r[i] === '1') {
      count++;
      if (count > 2) {
        return count;
      }
    }
  }
  return count;
};

const convert = number => {
  const binary = number.toString(2);
  if (binary[binary.length - 1] === '0') {
    return number + 1;
  }

  if (!binary.includes('0')) {
    return parseInt(`10${binary.slice(1)}`, 2);
  }

  if (binary[binary.length - 1] === '1') {
    const index = binary.lastIndexOf('0');

    const b = binary.split('');
    b[index] = '1';
    b[index + 1] = '0';
    return parseInt(b.join('', 2), 2);
  }
};

const run = numbers => numbers.map(number => convert(number));

test('run', () => {
  expect(run([2, 7, 15, 9])).toEqual([3, 11, 23, 10]);
});

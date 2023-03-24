/**
 * ## 이해
 *
 * 미지의 것: k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자
 * 자료
 *   - 숫자는 큰게 앞에 와야 크다.
 *   - 순서를 바꿀수는 없다.
 * 조건
 *   - k는 1 이상 number의 자릿수 미만인 자연수입니다.
 *
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */
const firstIsBiggest = (number, index, k) => {

};

const run = (number, k) => {
  let index = 0;
  let result = '';

  while (true) {
    if (number.length - index === k) {
      return result;
    }

    if (k === 0) {
      return result + number.slice(index);
    }

    let firstIsBiggest = true;
    const first = number[index];
    for (let i = index + 1; i < index + k + 1; i++) {
      if (first < number[i]) {
        firstIsBiggest = false;
        break;
      }
    }

    if (firstIsBiggest) {
      result += number[index];
    } else {
      k -= 1;
    }

    index += 1;
  }
};

test('firstIsBiggest', () => {
  expect(firstIsBiggest('4177', 4)).toBe(false);
  expect(firstIsBiggest('7741', 4)).toBe(true);
  expect(firstIsBiggest('924', 1)).toBe(true);
  expect(firstIsBiggest('24', 1)).toBe(false);
});

test('run', () => {
  expect(run('11', 1)).toBe('1');
  expect(run('12', 1)).toBe('2');
  expect(run('21', 1)).toBe('2');
  expect(run('123', 1)).toBe('23');
  expect(run('321', 1)).toBe('32');
  expect(run('231', 1)).toBe('31');
  expect(run('312', 1)).toBe('32');

  expect(run('1234', 2)).toBe('34');
  expect(run('4321', 2)).toBe('43');
  expect(run('4231', 2)).toBe('43');
  expect(run('4213', 2)).toBe('43');

  expect(run('1924', 2)).toBe('94');
  expect(run('1111', 1)).toBe('111');
  expect(run('12345678', 2)).toBe('345678');
  expect(run('12345678', 7)).toBe('8');
  expect(run('12345678', 1)).toBe('2345678');
  expect(run('1924', 3)).toBe('9');
  expect(run('9421', 1)).toBe('942');
  expect(run('9421', 3)).toBe('9');
  expect(run('94321', 2)).toBe('943');
  expect(run('1231234', 3)).toBe('3234');
  expect(run('4177252841', 4)).toBe('775841');
});

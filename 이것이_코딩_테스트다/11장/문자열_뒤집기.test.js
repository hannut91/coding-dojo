/**
 * ## 이해
 *
 * 미지의 것: 문자열을 뒤집어서 모두 같은 숫자로 만들 때 최소 횟수를 구하여라.
 * 자료
 *   - 문자열 S에서 연속된 하나 이상의 숫자를 잡고 모두 뒤집을 수 있다
 * 조건
 *
 * ## 계획
 *   - 문자열을 연속된 청크로 만든다.
 *   - 그 중에서 작은 수 갯수를 센다.
 *
 * ## 실행
 *
 * ## 반성
 *   - 처음에는 연속된 0 문자열과 연속된 1 문자열을 나눈다음에 개수를 세려고
 *     했다. 그러다보니 개수만 세면 되는 문제라고 생각이 들어서 개수를 셀 수
 *     있는 정규식이 생각이 났다. 그래서 정규식으로 문제를 해결했다.
 *   - 처음 생각했던 문자열 나누기로도 해볼 수 있겠다.
 */

// 정규식을 사용한 풀이
const run = text => {
  const count = (text.match(/0+/g) || []).length;
  const count2 = (text.match(/1+/g) || []).length;
  return Math.min(count, count2);
};

// 문자열 나누기를 사용한 풀이
const run2 = text => {
  let temp = text[0];
  const arr1 = [];
  const arr2 = [];

  for (let i = 0; i < text.length; i++) {
    if (temp[0] === text[i]) {
      temp += text[i];
      continue;
    }

    if (temp[0] === '0') {
      arr1.push(temp);
    } else {
      arr2.push(temp);
    }

    temp = text[i];
  }

  if (temp[0] === '0') {
    arr1.push(temp);
  } else {
    arr2.push(temp);
  }

  return Math.min(arr1.length, arr2.length);
};

test('run', () => {
  expect(run('0001100')).toBe(1);
  expect(run('11111')).toBe(0);
  expect(run('1101100')).toBe(2);
  expect(run('00110001100')).toBe(2);
});

test('run2', () => {
  expect(run2('0001100')).toBe(1);
  expect(run2('11111')).toBe(0);
  expect(run2('1101100')).toBe(2);
  expect(run2('00110001100')).toBe(2);
});

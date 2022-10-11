/**
 * ## 이해
 *
 * 미지의 것: 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성하라
 * 자료
 *   - JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다
 *   - 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다.
 * 조건
 *   - 숫자는 단어의 첫 문자로만 나옵니다.
 *   - 숫자로만 이루어진 단어는 없습니다.
 *   - 공백문자가 연속해서 나올 수 있습니다.
 *
 * ## 계획
 *   - 문자열을 순회하면서, 처음 만난 문자열이 알파벳이면 대문자로 변경한다.
 *   - 만약 처음 만난 문자열이 숫자라면 아무것도 하지 않는다.
 *   - 맨 처음 혹은 중간에 빈 칸 문자열을 만나고 난 후 처음 만난 문자열을 변환한다.
 *
 * ## 실행
 *
 * ## 반성
 *   - 정규식으로 더 단순하게 할 수 있을까하여 word boundary정규식을 이용해서 풀어보았다.
 */

// 정규식 사용 2
const run = text => text
  .toLowerCase()
  .replace(/\b[a-z]+/g, str => `${str[0].toUpperCase() + str.slice(1)}`);

// 정규식 사용 1
// const run = text => text.toLowerCase().split(' ')
//   .map(it => it.replace(/^[a-z]/, str => str.toUpperCase()))
//   .join(' ');

// for 문을 사용하는 방법
// const run = text => {
//   let result = '';
//   let convertable = true;

//   for (let i = 0; i < text.length; i++) {
//     const char = text[i];
//     if (convertable && char !== ' ') {
//       convertable = false;
//       result += char.toUpperCase();
//       continue;
//     }

//     if (!convertable && char !== ' ') {
//       result += char.toLowerCase();
//       continue;
//     }

//     if (char === ' ') {
//       convertable = true;
//       result += char;
//     }
//   }

//   return result;
// };

test('run', () => {
  expect(run('3people unFollowed me')).toBe('3people Unfollowed Me');
  expect(run('32people unFollowed me')).toBe('32people Unfollowed Me');
  expect(run('32people 3unFollowed me')).toBe('32people 3unfollowed Me');
  expect(run('for the last week')).toBe('For The Last Week');
  expect(run('for    the last week')).toBe('For    The Last Week');
});

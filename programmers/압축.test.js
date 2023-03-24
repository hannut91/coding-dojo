/**
 * ## 이해
 *
 * 미지의 것: 주어진 문자열을 압축한 후의 사전 색인 번호를 배열로 출력하라.
 * 자료
 *   - 길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
 *   - 사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾는다.
 *   - w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w를 제거한다.
 *   - 입력에서 처리되지 않은 다음 글자가 남아있다면(c), w+c에 해당하는 단어를 사전에 등록한다.
 *   - 두번째 단계로 이동한다.
 * 조건
 *   -
 *
 * ## 계획
 *   - 현재 단어와 다음 단어를 조합한다.
 *   - 단어가 사전에 존재한다면 그 다음 단어를 더해서 조합한다.
 *   - 단어가 사전에 존재하지 않는다면 사전에 추가하고 조합 전의 색인 번호를 저장해둔다.
 *   - 색인 번호를 리턴한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const run = msg => {
  let last = 26;
  for (let i = 65; i < 91; i++) {
    const word = String.fromCharCode(i);
    words[word] = i - 64;
  }

  const result = [];

  let word = msg[0];
  for (let i = 1; i < msg.length; i++) {
    const next = word + msg[i];
    if (words[next]) {
      word = next;
      continue;
    }

    words[next] = last + 1;
    last++;

    result.push(words[word]);
    word = msg[i];
  }

  result.push(words[word]);
  return result;
};

test('run', () => {
  expect(run('KAKAO')).toEqual([11, 1, 27, 15]);
  expect(run('TOBEORNOTTOBEORTOBEORNOT')).toEqual([20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]);
  expect(run('ABABABABABABABAB')).toEqual([1, 2, 27, 29, 28, 31, 30]);
});

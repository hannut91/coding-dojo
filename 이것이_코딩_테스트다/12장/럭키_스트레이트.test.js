/**
 * ## 이해
 *
 * 미지의 것: 현재 점수 N이 주어지면 럭키 스트레이트를 사용할 수 있는 상태인지 알려주는 프로그램을 작성하라
 * 자료
 *   - 점수를 반으로 나누어 왼쪽 숫자의 자릿수의 합과 오른쪽 숫자의 자릿수 합이 같으면 럭키 스트레이트를 사용할 수 있다.
 * 조건
 *   - 자릿수가 소수인 경우는 입력으로 들어오지 않는다.
 *
 * ## 계획
 *   - 문자열을 반으로 나눈다.
 *   - 각각 자릿수의 합을 더한다.
 *   - 더한값을 비교한다.
 *
 * ## 실행
 *
 * ## 반성
 *   - split 실수하고 테스트 안짜서 실패했음. 문제 풀고나서 충분히 검증해 봐야겠다.
 *
 */

const caclulate = text => text.split('').map(it => Number(it)).reduce((acc, cur) => acc + cur);

const r = (number, sum = 0) => {
  if (number < 10) {
    return sum + number;
  }

  return r(Math.floor(number / 10), (number % 10) + sum);
};

const caclulate2 = text => r(Number(text));

const run = text => {
  const left = text.slice(0, text.length / 2);
  const right = text.slice(text.length / 2);
  return caclulate2(left) === caclulate2(right)
    ? 'LUCKY'
    : 'READY';
};

test('run', () => {
  expect(run('123402')).toBe('LUCKY');
  expect(run('7755')).toBe('READY');
});

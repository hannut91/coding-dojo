/**
 * ## 이해
 *
 * 미지의 것: 행사 목적을 최대한으로 달성했을 때의 이모티콘 플러스 서비스 가입 수와
 *  이모티콘 매출액을 1차원 정수 배열에 담아 return
 * 자료
 *   - 이모티콘 플러스 서비스 가입자를 최대한 늘리는 것이 우선이 그 다음이 이모티콘 판매액을
 *   최대한 늘리는 것
 *   - n명의 카카오톡 사용자들에게 이모티콘 m개를 할인하여 판매합니다.
 *   - 이모티콘마다 할인율은 다를 수 있으며, 할인율은 10%, 20%, 30%, 40% 중 하나로 설정됩니다.
 *   - 각 사용자들은 자신의 기준에 따라 일정 비율 이상 할인하는 이모티콘을 모두 구매합니다.
 *   - 각 사용자들은 자신의 기준에 따라 이모티콘 구매 비용의 합이 일정 가격 이상이 된다면,
 *      이모티콘 구매를 모두 취소하고 이모티콘 플러스 서비스에 가입합니다.
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

const discounts = [10, 20, 30, 40];

const discountCases = (emoticons, result = []) => {
  if (emoticons.length === 0) {
    return result;
  }
  const emoticon = emoticons[0];

  const discountedEmoticons = [];
  discounts.forEach(discount => {
    discountedEmoticons.push([emoticon, discount]);
  });
  if (result.length === 0) {
    return discountCases(emoticons.slice(1), discountedEmoticons.map(it => [it]));
  }

  const p = [];

  result.forEach(r => {
    discountedEmoticons.forEach(it => {
      p.push([...r, it]);
    });
  });

  return discountCases(emoticons.slice(1), p);
};

const calculate = (discountCase, base) => discountCase.reduce((acc, [price, discountRate]) => {
  if (discountRate >= base) {
    return acc + price * (100 - discountRate) * (1 / 100);
  }
  return acc;
}, 0);

const process = (users, discountCase) => users.map(([base, limit]) => {
  const sum = calculate(discountCase, base);
  return [sum, limit];
}).reduce((acc, [sum, limit]) => {
  if (sum >= limit) {
    return [acc[0] + 1, acc[1]];
  }
  return [acc[0], acc[1] + sum];
}, [0, 0]);

const run = (users, emoticons) => discountCases(emoticons)
  .map(i => process(users, i))
  .sort((a, b) => {
    if (a[0] > b[0]) {
      return -1;
    } if (a[0] < b[0]) {
      return 1;
    }
    return b[1] - a[1];
  })[0];

test('run', () => {
  expect(
    run(
      [[40, 10000], [25, 10000]],
      [7000, 9000],
    ),
  ).toEqual([1, 5400]);
  expect(
    run(
      [[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]],
      [1300, 1500, 1600, 4900],
    ),
  ).toEqual([4, 13860]);
});

test('process', () => {
  expect(
    process(
      [[40, 10000], [25, 10000]],
      [[7000, 40], [9000, 40]],
    ),
  ).toEqual([0, 19200]);
  expect(
    process(
      [[40, 10000], [25, 10000]],
      [[7000, 30], [9000, 40]],
    ),
  ).toEqual([1, 5400]);
  expect(
    process(
      [[40, 2900], [23, 10000], [11, 5200], [5, 5900], [40, 3100], [27, 9200], [32, 6900]],
      [[1300, 40], [1500, 40], [1600, 20], [4900, 40]],
    ),
  ).toEqual([4, 13860]);
});

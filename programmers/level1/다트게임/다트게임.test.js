// 1. 자르자 => ['1S', '2D', '3T']
// 2. 숫자와 따블로 구분하다 => [[1, 'S'], [2, 'D'], [3, 'T']] => 숫자로 변환
// 3. 전부 더한다.
//   * S이면 숫자에 1제곱
//   * D이면 숫자에 2제곱
//   * T이면 숫자에 3제곱

// 1. 자르자 [1S* 2D 3T]
// 2. 숫자와 따블로 구분하다 => [[1, 'S', '*'], [2, 'D'], [3, 'T']]
// 3. 전부 더한다
//   만약, 마지막에 상이 *스타상이 있으면, 현재 값과 바로 이전의 값에다가 2배를 한다.
//   그런데 만약에 맨 처음이라면, 현재 값만 두 배로 한다.

const convert = {
  S: 1,
  D: 2,
  T: 3,
};


const split = (value, chunks = []) => {
  if (value.length === 0) {
    return chunks;
  }

  const [foundString] = value.match(/\d+[SDT][*#]?/);
  const index = foundString.length - 1;
  return split(value.slice(index + 1), [...chunks, value.slice(0, index + 1)]);
};

const run = score => {
  const prizes = [];

  const results = split(score)
    .map(it => {
      const [number] = it.match(/\d+/);
      const [string] = it.match(/[SDT]/);
      const [prize] = it.match(/[*#]/) || [];
      prizes.push(prize);
      return [number, convert[string]];
    })
    .map(([number, string]) => (number ** string));

  prizes.forEach((it, index) => {
    if (it === '*') {
      results[index] *= 2;
    }

    if (prizes[index + 1] === '*') {
      results[index] *= 2;
    }

    if (it === '#') {
      results[index] *= -1;
    }
  });

  return results
    .reduce((acc, cur) => acc + cur, 0);
};


test('run', () => {
  expect(run('1S2D*3T')).toBe(37);
  expect(run('1S2D*3T')).toBe(37);
});

test('스타가 있는 경우', () => {
  // 스타가 가장 앞에 있는 경우
  expect(run('1S*2D3T')).toBe(33);
  expect(run('2S*2D3T')).toBe(35);
  expect(run('2S*2D3T')).toBe(35);

  // 스타가 중간에 있는 경우
  expect(run('1S2D*3T')).toBe(37);

  // 스타가 끝에 있는 경우
  expect(run('1D2S3T*')).toBe(59);
});

test('#이 있는 경우', () => {
  // 스타가 가장 앞에 있는 경우
  expect(run('1T2D3D#')).toBe(-4);
});

test('split', () => {
  expect(split('1S2D3T')).toEqual(['1S', '2D', '3T']);
  expect(split('1S*2D3T')).toEqual(['1S*', '2D', '3T']);
  expect(split('1S*2D*3T')).toEqual(['1S*', '2D*', '3T']);

  expect(split('1D2S3T*')).toEqual(['1D', '2S', '3T*']);

  expect(split('1D#2S3T')).toEqual(['1D#', '2S', '3T']);
  expect(split('1D#2S3T#')).toEqual(['1D#', '2S', '3T#']);
});

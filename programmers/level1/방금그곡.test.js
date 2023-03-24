/**
 * ## 이해
 *
 * 미지의 것: 네오는 기억한 멜로디를 재생 시간과 제공된 악보를 직접 보면서
 *   비교하려고 한다. 네오가 찾으려는 음악의 제목을 구하여라
 * 자료
 *   - 방금그곡 서비스에서는 음악 제목, 재생이 시작되고 끝난 시각, 악보를 제공한다.
 *   - 네오가 기억한 멜로디와 악보에 사용되는 음은 C, C#, D, D#, E, F, F#, G, G#, A, A#, B 12개이다.
 *   - 각 음은 1분에 1개씩 재생된다.
 * 조건
 *   - 음악은 반드시 처음부터 재생되며 음악 길이보다 재생된 시간이 길 때는 음악이 끊김 없이 처음부터 반복해서 재생된다.
 *   - 음악 길이보다 재생된 시간이 짧을 때는 처음부터 재생 시간만큼만 재생된다.
 *   - 음악이 00:00를 넘겨서까지 재생되는 일은 없다
 *   - 조건이 일치하는 음악이 여러 개일 때에는 라디오에서 재생된 시간이 제일 긴 음악 제목을 반환한다. 재생된 시간도 같을 경우 먼저 입력된 음악 제목을 반환한다.
 *   - 조건이 일치하는 음악이 없을 때에는 “(None)”을 반환한다.
 * ## 계획
 *   -
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const convertToMinutes = time => {
  const [hour, minute] = time.split(':').map(it => Number(it));
  return hour * 60 + minute;
};

const concat = (playTime, pattern) => {
  let result = '';
  let next = 0;
  for (let i = 0; i < playTime; i++) {
    result += pattern[next];
    if (pattern[next + 1] && pattern[next + 1] === '#') {
      result += '#';
      next++;
    }

    next++;
    if (next === pattern.length) {
      next = 0;
    }
  }

  return result;
};

const isIn = (source, target) => !!target.match(`${source}(?!#)`);

const run = (m, musicinfos) => {
  const result = musicinfos
    .map(it => {
      const [start, end, name, pattern] = it.split(',');
      const playTime = convertToMinutes(end) - convertToMinutes(start);
      const target = concat(playTime, pattern);
      return {
        playTime,
        name,
        target,
      };
    })
    .filter(({ target }) => isIn(m, target));

  if (result.length === 0) {
    return '(None)';
  }

  let max = result[0];

  for (let i = 1; i < result.length; i++) {
    if (max.playTime < result[i].playTime) {
      max = result[i];
    }
  }

  return max.name;
};

test('concat', () => {
  expect(concat(14, 'CDEFGAB')).toBe('CDEFGABCDEFGAB');
  expect(concat(1, 'CDEFGAB')).toBe('C');
  expect(concat(2, 'CC#BCC#BCC#B')).toBe('CC#');
  expect(concat(9, 'CC#BCC#BCC#B')).toBe('CC#BCC#BCC#B');
  expect(concat(12, 'CC#BCC#BCC#B')).toBe('CC#BCC#BCC#BCC#B');
  expect(concat(1, 'C#')).toBe('C#');
  expect(concat(2, 'C#')).toBe('C#C#');
  expect(concat(2, 'C#A')).toBe('C#A');
  expect(concat(4, 'C#A')).toBe('C#AC#A');
});

test('isIn', () => {
  expect(isIn('ABCDEFG', 'CDEFGABCDEFGAB')).toBe(true);
  expect(isIn('ABC', 'C#DEFGABC#DEFGAB')).toBe(false);
  expect(isIn('A', 'ABC')).toBe(true);
  expect(isIn('A', 'A#BC')).toBe(false);
  expect(isIn('A#', 'A#BC')).toBe(true);
  expect(isIn('A#B#', 'A#B#C')).toBe(true);
  expect(isIn('A#B#', 'A#BC')).toBe(false);
  expect(isIn('B#', 'A#BC')).toBe(false);
});

test('run', () => {
  expect(run(
    'ABCDEFG',
    ['12:00,12:14,HELLO,CDEFGAB', '13:00,13:05,WORLD,ABCDEF'],
  )).toBe('HELLO');
  expect(run(
    'ABC',
    ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF'],
  )).toBe('WORLD');
});

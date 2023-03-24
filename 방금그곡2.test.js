/**
 * ## 이해
 *
 * 미지의 것: 조건과 일치하는 음악 제목을 출력
 * 자료
 *   - 방금그곡 서비스에서는 음악 제목, 재생이 시작되고 끝난 시각, 악보를 제공한다.
 *   - 음은 C, C#, D, D#, E, F, F#, G, G#, A, A#, B 12개
 *   - 1분에 1개씩 재생된다
 *   - 음악은 반드시 처음부터 재생되며 음악 길이보다 재생된 시간이 길 때는 음악이
 *     끊김 없이 처음부터 반복해서 재생된다
 * 조건
 *   - 음악이 00:00를 넘겨서까지 재생되는 일은 없다
 *
 * ## 계획
 *   - 조건이 일치하는 음악이 여러 개일 때에는 라디오에서 재생된 시간이 제일 긴
 *     음악 제목을 반환한다. 재생된 시간도 같을 경우 먼저 입력된 음악 제목을 반환한다.
 *   - 악보를 재생 시간 만큼 늘린다.
 *   - m이 있는지 확인한다.
 *   - m이 있는 위치의 다음 인덱스를 확인한다.
 *   - #이 안붙었다면 해당 악보의 음악 제목을 리턴한다.
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const calculateMinute = (start, end) => {
  const [endHour, endMinute] = end.split(':').map(it => Number(it));
  const [startHour, startMinute] = start.split(':').map(it => Number(it));
  return ((endHour * 60) + endMinute) - ((startHour * 60) + startMinute);
};


const score = (music, minute) => {
  let score = '';
  let i = 0;
  while (true) {
    if (minute === 0) {
      if (music[i % music.length] === '#') {
        return `${score}#`;
      }
      return score;
    }
    score += music[i % music.length];
    if (music[i % music.length] !== '#') {
      minute -= 1;
    }
    i++;
  }
};

const run = (m, musicinfos) => {
  const scores = [];
  for (let i = 0; i < musicinfos.length; i++) {
    const [start, end, title, music] = musicinfos[i].split(',');
    const minute = calculateMinute(start, end);
    const newScore = score(music, minute);
    scores.push([title, newScore, minute]);
  }

  const result = [];
  for (let i = 0; i < scores.length; i++) {
    const index = scores[i][1].indexOf(m);
    if (index < 0) {
      continue;
    }

    if (scores[i][1][index + m.length] === '#') {
      continue;
    }

    result.push(scores[i]);
  }


  if (result.length === 0) {
    return '(None)';
  }

  let max;
  result.forEach(([title, newScore, minute]) => {
    if (!max) {
      max = [title, newScore, minute];
      return;
    }

    if (max[2] < minute) {
      max = [title, newScore, minute];
    }
  });
  return max[0];
};

test('calculateMinute', () => {
  expect(calculateMinute('12:00', '12:14')).toBe(14);
  expect(calculateMinute('13:00', '13:05')).toBe(5);
});

test('score', () => {
  expect(score('CDEFGAB', 14)).toBe('CDEFGABCDEFGAB');
  expect(score('ABCDEF', 5)).toBe('ABCDE');
  expect(score('CC#B', 10)).toBe('CC#BCC#BCC#BC');
  expect(score('CC#B#', 9)).toBe('CC#B#CC#B#CC#B#');
});


test('run', () => {
  const m = 'ABCDEFG';
  const musicinfos = [
    '12:00,12:14,HELLO,CDEFGAB',
    '13:00,13:05,WORLD,ABCDEF',
  ];

  const result = run(m, musicinfos);

  expect(result).toBe('HELLO');
  expect(run(
    'CC#BCC#BCC#BCC#B',
    ['03:00,03:30,FOO,CC#B', '04:00,04:08,BAR,CC#BCC#BCC#B'],
  ))
    .toBe('FOO');
  expect(run(
    'ABC',
    ['12:00,12:14,HELLO,C#DEFGAB', '13:00,13:05,WORLD,ABCDEF'],
  ))
    .toBe('WORLD');
});

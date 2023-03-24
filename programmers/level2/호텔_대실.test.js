/**
 * ## 이해
 *
 * 미지의 것: 코니에게 필요한 최소 객실의 수를 구하여라
 * 자료
 *   - 한 번 사용한 객실은 퇴실 시간을 기준으로 10분간 청소를 하고 다음 손님들이 이용할 수 있다.
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

const inIn = (source, target) => {
  const [sourceStart, sourceEnd] = source.map(it => {
    const [hour, minute] = it.split(':').map(i => Number(i));
    return hour * 60 + minute;
  });
  const [targetStart, targetEnd] = target.map(it => {
    const [hour, minute] = it.split(':').map(i => Number(i));
    return hour * 60 + minute;
  });

  if ((targetEnd + 10) <= sourceStart) {
    return true;
  }

  if ((sourceEnd + 10) <= targetStart) {
    return true;
  }

  return false;
};

const isBookable = (room, target) => {
  if (room.length === 0) {
    return true;
  }

  return room.every(source => inIn(source, target));
};

const run = (reservations, rooms = []) => {
  if (reservations.length === 0) {
    return rooms.length;
  }

  const [current] = reservations;

  const index = rooms.findIndex(room => isBookable(room, current));
  if (index === -1) {
    rooms.push([current]);
    return run(reservations.slice(1), rooms);
  }

  rooms[index].push(current);

  return run(reservations.slice(1), rooms);
};

const book = reservations => {
  reservations.sort(([aStart], [bStart]) => {
    const [aHour, aMinute] = aStart.split(':').map(it => Number(it));
    const [bHour, bMinute] = bStart.split(':').map(it => Number(it));
    return ((aHour * 60) + aMinute) - ((bHour * 60) + bMinute);
  });
  return run(reservations);
};

test('isBookable', () => {
  expect(isBookable([], ['14:10', '19:20'])).toBe(true);
  expect(isBookable([['14:10', '19:20']], ['14:20', '15:20'])).toBe(false);
  expect(isBookable([['14:20', '15:20'], ['16:40', '18:20']], ['18:20', '21:20'])).toBe(false);
  expect(isBookable([['09:10', '10:10']], ['10:20', '12:20'])).toBe(true);
  expect(isBookable([['09:10', '10:10']], ['10:15', '12:20'])).toBe(false);
});

test('run', () => {
  expect(
    book([
      ['15:00', '17:00'],
      ['16:40', '18:20'],
      ['14:20', '15:20'],
      ['14:10', '19:20'],
      ['18:20', '21:20'],
    ]),
  ).toBe(3);
});

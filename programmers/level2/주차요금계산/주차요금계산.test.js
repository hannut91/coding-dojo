const getMinute = time => {
  const [hour, minute] = time.split(':').map(it => Number(it));
  return hour * 60 + minute;
};

const calculateMinutes = (start, end) => getMinute(end) - getMinute(start);

const totalMinutes = histories => {
  let sum = 0;

  for (let i = 0; i < histories.length - 1; i += 2) {
    sum += calculateMinutes(histories[i], histories[i + 1]);
  }

  return sum;
};

const calculateFee = ([defaultMinutes, defaultFee, unit, priceOfUnit], histories) => {
  const r = histories.reduce((acc, cur) => {
    const [time, carNumber] = cur.split(' ');
    return {
      ...acc,
      [carNumber]: [...(acc[carNumber] || []), time],
    };
  }, {});

  return Object.entries(r).sort(([a], [b]) => a - b)
    .map(([, h]) => (h.length % 2 === 0 ? h : [...h, '23:59']))
    .map(totalMinutes)
    .map(minute => {
      if (minute <= defaultMinutes) {
        return defaultFee;
      }

      return defaultFee + (Math.ceil((minute - defaultMinutes) / unit)) * priceOfUnit;
    });
};

test('calculateFee', () => {
  expect(calculateFee(
    [180, 5000, 10, 600],
    [
      '05:34 5961 IN',
      '06:00 0000 IN',
      '06:34 0000 OUT',
      '07:59 5961 OUT',
      '07:59 0148 IN',
      '18:59 0000 IN',
      '19:09 0148 OUT',
      '22:59 5961 IN',
      '23:00 5961 OUT',
    ],
  )).toEqual([14600, 34400, 5000]);
});

test('calculateMinutes', () => {
  expect(calculateMinutes('01:00', '02:00')).toBe(60);
  expect(calculateMinutes('06:00', '06:34')).toBe(34);
  expect(calculateMinutes('07:59', '19:09')).toBe(670);
});

test('totalMinutes', () => {
  expect(totalMinutes([
    '05:34',
    '07:59',
    '22:59',
    '23:00',
  ])).toBe(146);

  expect(totalMinutes([
    '06:00', '06:34', '18:59', '23:59',
  ])).toBe(334);
  expect(totalMinutes([
    '07:59', '19:09',
  ])).toBe(670);
});

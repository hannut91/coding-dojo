const DAY = [
  'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT',
];
const YEAR = 2016;

const getDay = (month, day) => {
  const date = new Date(
    new Date().setFullYear(YEAR, month - 1, day)
  );

  return DAY[date.getDay()]
};

test('getDay', () => {
  expect(getDay(5, 24)).toBe('TUE');
});
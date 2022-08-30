const numbers = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const run = string => Number(
  numbers.reduce(
    (acc, word, index) => acc.replace(new RegExp(word, 'g'), index),
    string,
  ),
);

test('run', () => {
  expect(run('one4seveneight')).toBe(1478);
});

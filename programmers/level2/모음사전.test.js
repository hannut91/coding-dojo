const wordMap = {
  A: 'E',
  E: 'I',
  I: 'O',
  O: 'U',
};
const getNext = word => wordMap[word];

const run = (word, position = 1) => {
  if (word.length < 5) {
    return `${word}A`;
  }

  const next = getNext(word[word.length - position]);
  if (!next) {
    return run(word, position + 1);
  }
  return `${word.slice(0, -position)}${next}`;
};

const solution = word => {
  let w = 'A';
  let count = 1;
  while (true) {
    if (w === word) {
      return count;
    }

    w = run(w);
    count++;
  }
};

test('run', () => {
  expect(run('A')).toBe('AA');
  expect(run('AA')).toBe('AAA');
  expect(run('AAAA')).toBe('AAAAA');
  expect(run('AAAAA')).toBe('AAAAE');
  expect(run('AAAAU')).toBe('AAAE');
  expect(run('AAAE')).toBe('AAAEA');
  expect(run('AAAEA')).toBe('AAAEE');
  expect(run('AAAEU')).toBe('AAAI');
  expect(run('AAAI')).toBe('AAAIA');
  expect(run('AAAOU')).toBe('AAAU');
  expect(run('AAAUU')).toBe('AAE');
  expect(run('AAUUU')).toBe('AE');
  expect(run('AUUUU')).toBe('E');
  expect(run('E')).toBe('EA');
  expect(run('EUUUU')).toBe('I');
});

test('solution', () => {
  expect(solution('AAAAE')).toBe(6);
  expect(solution('AAAE')).toBe(10);
  expect(solution('I')).toBe(1563);
  expect(solution('EIO')).toBe(1189);
});
// "A" next "AA"

// "A"
// "AA"
// "AAA"
// "AAAA"
// "AAAAA"
// "AAAAE"6
// "AAAAI"7
// "AAAAO"8
// "AAAAU"9
// "AAAE"10
// "AAAEA"10
// "AAAEI"10
// "AAAEO"10
// "AAAEU"10
// "AAAIA"10
// "AAAUU"10
// "AAE"10
// "AAEA"10
// "AAEAA"10
// "AAE" 14
// "AE" 18
// "AU"
// "E"
// "EA"
// "EAA"
// "EAAA"
// "EAAAA"

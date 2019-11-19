const A = 'A'.charCodeAt();
const Z = 'Z'.charCodeAt();

const a = 'a'.charCodeAt();
const z = 'z'.charCodeAt();

const caesarPassword = (s, n) =>
  s.split('')
    .map(i => i.charCodeAt())
    .map(charCode => {
      if (A <= charCode && charCode <= Z) {
        return charCode + ((charCode + n > Z) ? n - (Z - A) - 1 : n);
      }

      if (a <= charCode && charCode <= z) {
        return charCode + ((charCode + n > z) ? n - (z - a) - 1 : n);
      }

      return charCode;
    })
    .map(i => String.fromCharCode(i))
    .join('');

test('caesarPassword', () => {
  expect(caesarPassword('AB', 1)).toBe('BC');
  expect(caesarPassword('Y', 1)).toBe('Z');
  expect(caesarPassword('Z', 1)).toBe('A');
  expect(caesarPassword('a', 1)).toBe('b');
  expect(caesarPassword('a b', 1)).toBe('b c');
  expect(caesarPassword('z Z', 3)).toBe('c C');
});
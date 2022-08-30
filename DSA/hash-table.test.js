const A_CHAR_CODE = 97;

const hash = value => {
  const sum = value.split('')
    .map(it => it.charCodeAt(0) - A_CHAR_CODE + 1)
    .reduce((acc, cur) => acc + cur, 0);
  return (sum % 16);
};

class HashTable {
  constructor() {
    this.data = new Array(16);
  }

  get(key) {
    // hello 1 + 2 + 3 + 4 +5
    const hashedKey = hash(key);
    const foundValue = this.data[hashedKey];
    if (!foundValue) {
      return null;
    }

    const result = this.data[hashedKey].find(([k]) => k === key);
    if (!result) {
      return null;
    }

    return result[1];
  }

  // hello 1 + 2 + 3 + 4 +5
  set(key, value) {
    const hashedKey = hash(key);
    const foundValue = this.data[hashedKey];
    if (Array.isArray(foundValue)) {
      this.data[hashedKey].push([key, value]);
      return;
    }

    this.data[hashedKey] = [[key, value]];
  }
}

describe('HashTable', () => {
  describe('set', () => {
    it('updates with value', () => {
      const table = new HashTable();
      console.log('table: ', table);
      table.set('hello', 'world');
      console.log('table: ', table);

      expect(table.get('hello')).toBe('world');
    });

    describe('when hashed key', () => {
      it('updates with value', () => {
        const table = new HashTable();
        table.set('hello', 'world');
        table.set('olleh', 'dlrow');

        expect(table.get('hello')).toBe('world');
        expect(table.get('olleh')).toBe('dlrow');
      });
    });
  });

  describe('hash', () => {
    it('returns value', () => {
      expect(hash('a')).toBe(1);
      expect(hash('b')).toBe(2);

      expect(hash('abc')).toBe(6);
      expect(hash('abcd')).toBe(10);
      expect(hash('abcde')).toBe(15);
      expect(hash('abcdea')).toBe(0);
      expect(hash('abcdeaa')).toBe(1);
    });
  });
});

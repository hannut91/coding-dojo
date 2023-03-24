class HashTable {
  constructor() {
    this.table = [];
  }

  get(key) {
    const index = this.hash(key);
    return this.table[index]
      .find(it => it[0] === key)[1];
  }

  set(key, value) {
    const index = this.hash(key);
    if (this.table[index]) {
      this.table[index].push([key, value]);
    } else {
      this.table[index] = [[key, value]];
    }
  }

  hash(value) {
    const result = value.split('').map(it => it.charCodeAt(0))
      .reduce((acc, cur) => acc + cur) % 10;

    return result;
  }
}

const table = new HashTable();

table.set('hi', 'hello');
table.set('hello', 'world');
table.set('ih', 'gwkgowkgwp');

console.log('table.table: ', table.table);

console.log(table.get('hi'));
console.log(table.get('ih'));
console.log(table.get('hello'));

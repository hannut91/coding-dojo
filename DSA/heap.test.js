class Healp {
  constructor() {
    this.data = [];
  }

  root() {
    return this.data[0];
  }

  last() {
    return this.data[this.data.length - 1];
  }

  leftChildIndex(index) {
    return (index * 2) + 1;
  }

  rightChildIndex(index) {
    return (index * 2) + 2;
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  insert(value) {
    this.data.push(value);

    let currentIndex = this.data.length - 1;

    while (true) {
      const parentIndex = this.parentIndex(currentIndex);
      if (currentIndex < 0 || this.data[currentIndex] < this.data[parentIndex] || parentIndex < 0) {
        break;
      }

      [this.data[parentIndex], this.data[currentIndex]] = [this.data[currentIndex], this.data[parentIndex]];
      currentIndex = parentIndex;
    }
  }

  remove() {
    if (this.data.length === 0) {
      return null;
    }

    if (this.data.length === 1) {
      return this.data.pop();
    }

    const value = this.data[0];
    this.data[0] = this.data.pop();

    let currentIndex = 0;

    while (true) {
      const childIndex = this.largerChild(currentIndex);
      if (childIndex === null) {
        break;
      }

      [this.data[currentIndex], this.data[childIndex]] = [this.data[childIndex], this.data[currentIndex]];

      currentIndex = childIndex;
    }

    return value;
  }

  largerChild(index) {
    const currentValue = this.data[index];
    const leftIndex = this.leftChildIndex(index);
    const rightIndex = this.rightChildIndex(index);
    if (!this.data[leftIndex] && !this.data[rightIndex]) {
      return null;
    }

    if (!this.data[rightIndex]) {
      return currentValue > this.data[leftIndex] ? null : this.data[leftIndex];
    }

    if (this.data[leftIndex] > this.data[rightIndex]) {
      return currentValue > this.data[leftIndex] ? null : this.data[leftIndex];
    }

    return currentValue > this.data[rightIndex] ? null : this.data[rightIndex];
  }
}


test('Heap', () => {
  const heap = new Healp();

  heap.insert(1);
  heap.insert(2);
  heap.insert(3);

  console.log(heap.remove());
  console.log(heap.remove());
  console.log(heap.remove());
});

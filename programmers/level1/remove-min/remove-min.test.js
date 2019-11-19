const removeMin = (arr) => {
  if (arr.length === 1) {
    return [-1];
  }

  let index = 0;
  arr.forEach((v, i) => {
    if (v < arr[index]){
      index = i;
    }
  });
  arr.splice(index, 1);
  
  return arr;
};

test('removeMin', () => {
  expect(removeMin([4, 3, 2, 1])).toEqual([4, 3, 2]);
});
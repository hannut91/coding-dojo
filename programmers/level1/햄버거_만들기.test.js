const hamburger = [1, 2, 3, 1];

const findHamburger = (ingredients, start) => {
  for (let i = start; i < ingredients.length - 3; i++) {
    if (
      ingredients[i] === hamburger[0]
      && ingredients[i + 1] === hamburger[1]
      && ingredients[i + 2] === hamburger[2]
      && ingredients[i + 3] === hamburger[3]
    ) {
      return i;
    }
  }
};
const run = ingredients => {
  let count = 0;
  let start = 0;

  while (true) {
    const index = findHamburger(ingredients, start);
    if (index === undefined) {
      return count;
    }

    count++;

    ingredients.splice(index, 4);
    start = index - 3;
  }
};

// const run = ingredients => {
//   let str = ingredients.join('');

//   let count = 0;

//   while (true) {
//     const matches = str.match(/1231/g);
//     if (matches && matches.length > 0) {
//       const result = str.replace(/1231/g, '');
//       str = result;
//       count += matches.length;
//     } else {
//       return count;
//     }
//   }
// };

test('햄버거 만들기', () => {
  expect(run([2, 1, 1, 2, 3, 1, 2, 3, 1])).toBe(2);
  expect(run([1, 2, 3, 1])).toBe(1);
  expect(run([1, 2, 3, 1, 1, 2, 3, 1])).toBe(2);
  expect(run([1, 1, 2, 3, 1, 1, 2, 3, 1])).toBe(2);
  expect(run([2, 3, 1, 2, 3, 1])).toBe(1);
  expect(run([3, 3, 1, 2, 3, 1])).toBe(1);
  expect(run([1, 2, 3, 1, 3, 1, 3, 3, 3, 3])).toBe(1);
  expect(run([1, 3, 2, 1, 2, 1, 3, 1, 2])).toBe(0);
  expect(run([1, 1, 2, 3, 1, 2, 3, 1, 1])).toBe(2);
  expect(run([1, 2, 1, 2, 3, 1, 3, 1])).toBe(2);
  expect(run([])).toBe(0);
});

const maxStudentsHavingGymsuitCount = (n, lost, reserve) => {
  return n - lost.filter(studentNumber => {
    const foundIndex = reserve.indexOf(studentNumber);
    if (foundIndex >= 0) {
      reserve.splice(foundIndex, 1);
      return false;
    }

    return true;
  })
    .filter(i => {
      const foundIndex = reserve.findIndex(studentNumber =>
        studentNumber === (i - 1) || studentNumber === (i + 1));
      if (foundIndex >= 0) {
        reserve.splice(foundIndex, 1);
        return false;
      }
      
      return true;
    }).length;
}

test('maxStudentsCountHavingGymsuit', () => {
  expect(maxStudentsHavingGymsuitCount(5, [2, 4], [1, 3, 5])).toBe(5);
  expect(maxStudentsHavingGymsuitCount(5, [3], [1])).toBe(4);
  expect(maxStudentsHavingGymsuitCount(3, [3], [1])).toBe(2);
  expect(maxStudentsHavingGymsuitCount(3, [1, 2], [2, 3])).toBe(2);
});
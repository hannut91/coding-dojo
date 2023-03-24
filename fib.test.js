// 피보나치
// fib(1) = 1
// fib(2) = 1
// fib(3) = 2
// fib(4) = 3
// fib(5) = 5
// fib(6) = 8
// TDD
// 실패하는 테스트를 작성하고
// 성공시키고
// 리팩터링
// 무한반복

// Magic literal
const fib = n => {
  if (n <= 2) {
    return 1;
  }

  return fib(n - 1) + fib(n - 2);
};

test('fib', () => {
  expect(fib(1)).toBe(1);
  expect(fib(2)).toBe(1);
  expect(fib(3)).toBe(2);
  expect(fib(4)).toBe(3);
  expect(fib(5)).toBe(5);
});

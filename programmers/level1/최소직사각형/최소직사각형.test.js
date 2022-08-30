// 1. 가장 큰 값을 찾는다.
// 2. 가로 세로 중 최소값을 갖는 목록을 만든 후 가장 큰 값을 찾는다.
// 3. 곱한 값을 반환한다.

const max = sizes => sizes.reduce((acc, [width, height]) => {
  const m = width > height ? width : height;
  return acc > m ? acc : m;
}, 0);

const min = sizes => sizes.reduce((acc, [width, height]) => [
  ...acc,
  width < height ? width : height,
], []);

const run = sizes => max(sizes) * Math.max(...min(sizes));

test('run', () => {
  expect(run([[60, 50], [30, 70], [60, 30], [80, 40]])).toBe(4000);
});


test('max', () => {
  expect(max([[60, 50], [30, 70], [60, 30], [80, 40]])).toBe(80);
});

const { Stack } = require('./stack.test');

const openedBracketMap = new Map([['(', true], ['{', true], ['[', true]]);
const closedBracketMap = new Map([[')', true], ['}', true], [']', true]]);

const pairsMap = new Map([
  ['(', ')'],
  ['{', '}'],
  ['[', ']'],
]);

const isOpenBracket = value => openedBracketMap.get(value) || false;

const isClosedBracket = value => closedBracketMap.get(value) || false;

const isPair = (left, right) => pairsMap.get(left) === right;

const isCorrectBracket = value => {
  const stack = new Stack();
  for (let i = 0; i < value.length - 1; i += 1) {
    const current = value[i];

    if (isOpenBracket(current)) {
      stack.push(current);
    } else if (isClosedBracket(current)) {
      if (!isPair(stack.top(), current)) {
        return false;
      }

      stack.pop();
    }
  }

  return stack.isEmpty();
};

test('isCorrectBracket', () => {
  expect(isCorrectBracket('console.log("hello world!");')).toBe(true);
  expect(isCorrectBracket('console.log(("hello world!");')).toBe(false);
  expect(isCorrectBracket('console.log({"hello world!"});')).toBe(true);
  expect(isCorrectBracket('console.log"hello world!");')).toBe(false);
  expect(isCorrectBracket('console.log(["hello world!")];')).toBe(false);
  expect(isCorrectBracket('console.log("hello world!";')).toBe(false);
});

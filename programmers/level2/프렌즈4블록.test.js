/**
 * ## 이해
 *
 * 미지의 것: 지워지는 블록은 모두 몇 개인지 판단하는 프로그램을 제작하라
 * 자료
 *   - 블록이 2×2 형태로 4개가 붙어있을 경우 사라지면서 점수를 얻는 게임
 *    - 같은 블록은 여러 2×2에 포함될 수 있다.
 *    - 지워지는 조건에 만족하는 2×2 모양이 여러 개 있다면 한꺼번에 지워진다.
 *    - 블록이 지워진 후에 위에 있는 블록이 아래로 떨어져 빈 공간을 채우게 된다.
 *    - 만약 빈 공간을 채운 후에 다시 2×2 형태로 같은 모양의 블록이 모이면
 *      다시 지워지고 떨어지고를 반복하게 된다.
 * 조건
 *   -
 *
 * ## 계획
 *   - 블록이 2x2 형태로 붙어있는 부분을 찾는다.
 *     -
 *   - 지운다. -> 몇개 지웠는지 따로 저장해둔다.
 *   - 빈 자리에 블록을 내린다.
 *   - 반복
 *   - 2x2 형태가 없으면 결과 리턴
 *
 * ## 실행
 *
 * ## 반성
 *
 */

const findBlocks = board => {
  const blocks = [];

  for (let i = 0; i < board.length - 1; i++) {
    for (let j = 0; j < board[i].length - 1; j++) {
      if (board[i][j] === ' ') {
        continue;
      }

      if (
        board[i][j] === board[i][j + 1]
        && board[i][j] === board[i + 1][j]
        && board[i][j] === board[i + 1][j + 1]
      ) {
        blocks.push(`${j},${i}`);
        blocks.push(`${j},${i + 1}`);
        blocks.push(`${j + 1},${i}`);
        blocks.push(`${j + 1},${i + 1}`);
      }
    }
  }

  return blocks;
};

const removeBlocks = (board, blocks) => {
  blocks.forEach(value => {
    const [x, y] = value.split(',');
    board[y][x] = ' ';
  });
};

const alignBoard = board => {
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== ' ') {
        continue;
      }

      for (let k = i - 1; k >= 0; k--) {
        if (board[k][j] !== ' ') {
          board[i][j] = board[k][j];
          board[k][j] = ' ';
          break;
        }
      }
    }
  }
};

const run2 = (board, count = 0) => {
  const blocks = findBlocks(board);
  if (blocks.length === 0) {
    return count;
  }

  count += new Set(blocks).size;

  removeBlocks(board, blocks);

  alignBoard(board);

  return run2(board, count);
};

const run = (m, n, b, count = 0) => {
  const board = b.map(it => it.split(''));
  return run2(board);
};

test('run', () => {
  expect(run(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF'])).toBe(14);
  expect(run(4, 5, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ'])).toBe(15);
});

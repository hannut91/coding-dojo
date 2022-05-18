const keypads = {
  1: [0, 0],
  2: [1, 0],
  3: [2, 0],
  4: [0, 1],
  5: [1, 1],
  6: [2, 1],
  7: [0, 2],
  8: [1, 2],
  9: [2, 2],
  0: [1, 3],
};

const shortHand = (number, hand, currentHands) => {
  if ([1, 4, 7].includes(number)) {
    return 'left';
  }

  if ([3, 6, 9].includes(number)) {
    return 'right';
  }

  const coordinate = keypads[number];
  const [leftHandLength, rightHandLength] = currentHands
    .map(it => Math.abs(coordinate[0] - it[0])
  + Math.abs(coordinate[1] - it[1]));

  if (leftHandLength < rightHandLength) {
    return 'left';
  } if (leftHandLength > rightHandLength) {
    return 'right';
  }
  return hand;
};

const move = (number, hand, currentHands) => {
  const whichHand = shortHand(number, hand, currentHands);
  if (whichHand === 'left') {
    return [
      [
        keypads[number],
        currentHands[1],
      ], 'L',
    ];
  }

  return [
    [
      currentHands[0],
      keypads[number],
    ], 'R',
  ];
};

const run = (numbers, hand) => {
  const currentHands = [
    [0, 3],
    [2, 3],
  ];
  const { result } = numbers.reduce((acc, number) => {
    const [hands, r] = move(number, hand, acc.hand);
    return {
      hand: hands,
      result: acc.result + r,
    };
  }, {
    hand: currentHands,
    result: '',
  });
  return result;
};

test('run', () => {
  expect(
    run(
      [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5],
      'right',
    ),
  ).toEqual('LRLLLRLLRRL');
  expect(
    run(
      [7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2],
      'left',
    ),
  ).toEqual('LRLLRRLLLRR');
  expect(
    run(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      'right',
    ),
  ).toEqual('LLRLLRLLRL');
});

test('가장 단순한 경우', () => {
  expect(
    run(
      [1],
      'right',
      'L',
    ),
  ).toEqual('L');
});

test('move', () => {
  // 1, 4, 7 누를 경우
  expect(
    move(1, 'left', [
      [0, 3],
      [2, 3],
    ]),
  ).toEqual([
    [
      [0, 0],
      [2, 3],
    ],
    'L',
  ]);
  expect(
    move(4, 'left', [
      [0, 3],
      [2, 3],
    ]),
  ).toEqual([
    [
      [0, 1],
      [2, 3],
    ],
    'L',
  ]);
  expect(
    move(7, 'left', [
      [0, 3],
      [2, 3],
    ]),
  ).toEqual([
    [
      [0, 2],
      [2, 3],
    ],
    'L',
  ]);

  // 3 6 9 누를 경우
  expect(
    move(3, 'left', [
      [0, 3],
      [2, 3],
    ]),
  ).toEqual([
    [
      [0, 3],
      [2, 0],
    ],
    'R',
  ]);
  expect(
    move(6, 'left', [
      [0, 3],
      [2, 3],
    ]),
  ).toEqual([
    [
      [0, 3],
      [2, 1],
    ],
    'R',
  ]);
  expect(
    move(9, 'left', [
      [0, 3],
      [2, 3],
    ]),
  ).toEqual([
    [
      [0, 3],
      [2, 2],
    ],
    'R',
  ]);
});


test('2, 5, 8, 0을 선택했을 때', () => {
  // 왼쪽이 더 거리가 길 때
  expect(
    move(2, 'left', [
      [0, 0],
      [2, 3],
    ]),
  ).toEqual([
    [
      [1, 0],
      [2, 3],
    ],
    'L',
  ]);
});

test('shortHand', () => {
  expect(shortHand(2, 'left', [
    [0, 0],
    [2, 3],
  ]))
    .toEqual('left');

  expect(shortHand(2, 'left', [
    [0, 3],
    [2, 0],
  ]))
    .toEqual('right');

  expect(shortHand(2, 'left', [
    [0, 0],
    [2, 0],
  ]))
    .toEqual('left');

  expect(shortHand(2, 'right', [
    [0, 0],
    [2, 0],
  ]))
    .toEqual('right');
});

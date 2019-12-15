const minSecondsPassBridge = (bridgeLength, weight, trucks) => {
  let bridge = [];
  let seconds = 0;

  while (true) {
    if (bridge.length === 0 && trucks.length === 0) {
      return seconds;
    }

    [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);

    seconds += 1;
  }
};

const pass = (bridge, trucks, bridgeLength, weight) => {
  if (bridge.length === 0) {
    const nextBridge = [{ weight: trucks[0], position: 1 }, ...bridge];
    return [nextBridge, trucks.slice(1)];
  }

  let nextBridge = bridge.map(i => ({
    ...i,
    position: i.position + 1,
  })).filter(({ position }) => position <= bridgeLength);

  if (trucks.length === 0 || overWeight(nextBridge, trucks[0], weight)) {
    return [nextBridge, trucks];
  }

  nextBridge = [{ weight: trucks[0], position: 1 }, ...nextBridge];
  return [nextBridge, trucks.slice(1)];
};

const overWeight = (bridge, weightOfTruck, maxWeight) => {
  const weightOnBridge = bridge.reduce((acc, { weight }) => acc + weight, 0);
  return (weightOnBridge + weightOfTruck) > maxWeight;
}

test('minimum seconds to pass bridge all trucks', () => {
  expect(minSecondsPassBridge(2, 10, [7, 4, 5, 6])).toBe(8);
  expect(minSecondsPassBridge(100, 100, [10])).toBe(101);
  expect(minSecondsPassBridge(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])).toBe(110);
});

test('pass', () => {
  let bridge = [];
  let trucks = [7, 4, 5, 6];
  const weight = 10;
  const bridgeLength = 2;

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual([{ weight: 7, position: 1 }]);
  expect(trucks).toEqual([4, 5, 6]);

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual([{ weight: 7, position: 2 }]);
  expect(trucks).toEqual([4, 5, 6]);

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual([{ weight: 4, position: 1 }]);
  expect(trucks).toEqual([5, 6]);

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual(
    [{ weight: 5, position: 1 }, { weight: 4, position: 2 }]
  );
  expect(trucks).toEqual([6]);

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual(
    [{ weight: 5, position: 2 }]
  );
  expect(trucks).toEqual([6]);

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual(
    [{ weight: 6, position: 1 }]
  );
  expect(trucks).toEqual([]);

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual(
    [{ weight: 6, position: 2 }]
  );
  expect(trucks).toEqual([]);

  [bridge, trucks] = pass(bridge, trucks, bridgeLength, weight);
  expect(bridge).toEqual([]);
  expect(trucks).toEqual([]);
});
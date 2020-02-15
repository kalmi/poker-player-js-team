const Player = require('./Player');

test('adds 1 + 2 to equal 3', () => {
  expect(3).toBe(3);
});

test('raise for 10 pairs', (done) => {
  Player.betRequest(gameState([
    {
      rank: "10"
    },
    {
      rank: "10"
    }
  ]), value => {
    expect(value).toBe(9);
    done();
  });
});

test('raise for 10 pairs', () => {
  Player.betRequest(gameState([
    {
      rank: "10"
    },
    {
      rank: "10"
    }
  ]), value => {
    expect(value).toBe(9);
  });
});

test('call for random cards', () => {
  Player.betRequest(gameState([
    {
      rank: "A"
    },
    {
      rank: "9"
    }
  ]), value => {
    expect(value).toBe(0);
  });
});

function gameState(hole_cards) {
  return {
    in_action: 0,
    current_buy_in: 10,
    minimum_raise: 1,
    players: [
      {
        bet: 2,
        hole_cards: hole_cards
      }
    ]
  };
}

const Player = require('./Player');

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
    expect(value).toBe(8);
  });
});





test('raise for A K hand', () => {
  Player.betRequest(gameState([
    {
      rank: "A"
    },
    {
      rank: "K"
    }
  ]), value => {
    expect(value).toBe(9);
  });
});

test('raise for Q K hand', () => {
  Player.betRequest(gameState([
    {
      rank: "Q"
    },
    {
      rank: "K"
    }
  ]), value => {
    expect(value).toBe(9);
  });
});

test('raise for Q A hand', () => {
  Player.betRequest(gameState([
    {
      rank: "Q"
    },
    {
      rank: "A"
    }
  ]), value => {
    expect(value).toBe(9);
  });
});

function gameState(hole_cards) {
  return {
    in_action: 0,
    current_buy_in: 10,
    small_blind: 5,
    minimum_raise: 1,
    players: [
      {
        bet: 2,
        hole_cards: hole_cards
      }
    ]
  };
}

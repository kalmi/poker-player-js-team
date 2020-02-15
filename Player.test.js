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

test('return 0 for other cases', () => {
  const game = gameState([
    {
      rank: "2"
    },
    {
      rank: "5"
    }
  ]);
  game.current_buy_in = 100;
  Player.betRequest(game, value => {
    expect(value).toBe(0);
  });
});

function gameState(hole_cards) {
  hole_cards.forEach(card => {
    if (!card.suit) {
      card.suit = "clubs";
    }
  });
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

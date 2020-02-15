const Player = require('./Player');

test('adds 1 + 2 to equal 3', () => {
  expect(3).toBe(3);
});

test('default', (done) => {
  Player.betRequest({
    in_action: 0,
    current_buy_in: 10,
    minimum_raise: 1,
    players: [
      {
        bet: 2,
        hole_cards: [
          {
            rank: "10"
          },
          {
            rank: "10"
          }
        ]
      }
    ]
  }, value => {
    expect(value).toBe(9);
    done();
  });
});

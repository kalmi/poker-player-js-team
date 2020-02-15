class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const currentPlayer = gameState.players[gameState.in_action];
    const holeCards = currentPlayer.hole_cards;
    const isPair = holeCards[0].rank === holeCards[1].rank;
    const goodRanks = ["10", "J", "Q", "K", "A"];
    if (goodRanks.indexOf(holeCards[0].rank) !== -1 && isPair) {
      bet(gameState.current_buy_in - currentPlayer.bet + gameState.minimum_raise);
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

module.exports = Player;

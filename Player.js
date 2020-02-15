class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const currentPlayer = gameState.players[gameState.in_action];
    const holeCards = currentPlayer.hole_cards;
    const isPair = holeCards[0].rank === holeCards[1].rank;
    if (
      holeCards.length === 2 &&
      rank2number(holeCards[0].rank) >= 10 && isPair) {
      bet(gameState.current_buy_in - currentPlayer.bet + gameState.minimum_raise);
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

function rank2number(rank) {
  switch(rank) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    default:
      return Number(rank);
  }
}

function suit2number(rank) {
  switch(rank) {
    case "clubs":
      return 0;
    case "diamonds":
      return 1;
    case "hearts":
      return 2;
    case "spades":
      return 3;
    default:
      throw new Error();
  }
}

module.exports = Player;

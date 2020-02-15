class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    const currentPlayer = gameState.players[gameState.in_action];
    const holeCards = currentPlayer.hole_cards;
    if(holeCards.length !== 2){
      bet(0);
      return;
    }

    const isPair = holeCards[0].rank === holeCards[1].rank;
    if (
      rank2numeric(holeCards[0].rank) >= 10 && isPair) {
      bet(gameState.current_buy_in - currentPlayer.bet + gameState.minimum_raise);
    } else {
      bet(0);
    }
  }

  static showdown(gameState) {
  }
}

function rank2numeric(rank) {
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

module.exports = Player;

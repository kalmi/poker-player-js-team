class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {

    const {holeCards, allCardsStat, holeStat, communityStat} = gameState2friendlyState(gameState);

    console.log(allCardsStat);

    const currentPlayer = gameState.players[gameState.in_action];

    if (holeCards.length !== 2) {
      bet(0);
      return;
    }

    const bigBlind = gameState.small_blind * 2;
    const callValue = gameState.current_buy_in - currentPlayer.bet;
    const raiseValue = callValue + gameState.minimum_raise ;
    const allInValue = 1000;
    const ownBetter = communityStat.score < allCardsStat.score;

    const HighPairScore = 211;
    const OneHighCardScore = 113;

    if (holeStat.score >= HighPairScore) {
      bet(allInValue);
      return;
    }

    if (allCardsStat.score >= HighPairScore  && ownBetter) {
      bet(raiseValue);
      return;
    }

    if (holeCards[0].rank >= 12 && holeCards[1].rank >= 12) {
      bet(raiseValue);
      return;
    }

    if (holeStat.score >= OneHighCardScore) {
      if(callValue <= 500)
      {
        bet(callValue);
        return;
      }
    }

    if (callValue <= bigBlind) {
      bet(callValue);
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

function stringCard2numberCard({rank, suit}) {
  return {
    suit: suit2number(suit),
    rank: rank2number(rank),
  }
}

function cards2stats(numberCards) {

  if (numberCards.length === 0) {
    return {
      type: "none",
      score: 0,
    }
  }

  const rankCount = new Map();
  for (const {rank: cardRank} of numberCards) {
    const count = rankCount.get(cardRank) || 0;
    rankCount.set(cardRank, count + 1);
  }

  const entries = Array.from(rankCount.entries());
  entries.sort((a,b) => {
    let result = b[1] - a[1];
    if (result === 0) {
      result = b[0] - a[0];
    }
    return result;
  });
  const [rank, count] = entries[0];

  return {
    type: "n", // n of a kind
    rank,
    count,
    score: count * 100 + rank
  }
}

function gameState2friendlyState(gameState) {
  const currentPlayer = gameState.players[gameState.in_action];
  const rawHoleCards = currentPlayer.hole_cards;
  const rawCommunityCards = gameState.community_cards || [];

  const holeCards = rawHoleCards.map(stringCard2numberCard);
  const communityCards = rawCommunityCards.map(stringCard2numberCard);
  const allCards = [...holeCards, ...communityCards];

  const holeStat = cards2stats(holeCards);
  const communityStat = cards2stats(communityCards);
  const allCardsStat = cards2stats(allCards);

  return {
    holeCards,
    communityCards,
    allCards,

    holeStat,
    communityStat,
    allCardsStat
  };
}

module.exports = Player;

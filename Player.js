class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    const AllInValue = 800;
    const HighPairScore = 210;
    const OneHighCardScore = 113;

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
    const ownBetter = communityStat.score < allCardsStat.score;

    if (holeStat.score >= HighPairScore) {
      bet(AllInValue);
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

  const rankCountMap = new Map();
  for (const {rank: cardRank} of numberCards) {
    const count = rankCountMap.get(cardRank) || 0;
    rankCountMap.set(cardRank, count + 1);
  }
  const rankEntries = Array.from(rankCountMap.entries());
  rankEntries.sort(([aRank, aCount], [bRank, bCount]) => {
    let result = bCount - aCount;
    if (result === 0) {
      result = bRank - aRank;
    }
    return result;
  });
  const [rank, rankCount] = rankEntries[0];

  return {
    type: "n", // n of a kind
    rank,
    count: rankCount,
    score: rankCount * 100 + rank
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

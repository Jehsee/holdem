export function calculateHandStrength(hand) {
  hand.sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0));
  let flushPossibility = false;
  let isStraight = false;
  let isFlush = false;
  let isRoyalFlush = false;
  let isStraightFlush = false;
  let suitedHand;
  let matchCombos;

  let bestFiveCardHand;
  const combos = {
    fourOfKind: ["41", "14"],
    fullHouse: ["32", "23"],
    threeOfKind: ["311", "131", "113"],
    twoPairs: ["221", "212", "122"],
    onePair: ["2111", "1211", "1121", "1112"]
  };

  // CHECK FOR FLUSH POSSIBILITY
  const suits = ["h", "d", "s", "c"];
  suits.forEach(suit => {
    let suitedCards = hand.filter(card => card.suit === suit);
    if (suitedCards.length > 4) {
      suitedHand = suitedCards;
      flushPossibility = true;
    }
  });

  const possibleStraightHand = hand;
  const bestFiveCardStraightHand = possibleStraightHand.reduce(
    (acc, card, index, arr) => {
      if (acc.length === 5) {
        isStraight = true;

        // return if 5 straight cards have accrued
        return acc;
      } else if (card.score === acc[acc.length - 1].score - 1) {
        // if card has consecutive score, push to acc
        acc.push(card);
      } else {
        // else reset acc
        acc.length = 0;
        acc.push(card);
      }

      // check for low end straight
      if (
        arr[0].score === 14 &&
        arr[3].score === 5 &&
        arr[4].score === 4 &&
        arr[5].score === 3 &&
        arr[6].score === 2
      ) {
        acc.length = 0;
        acc.push(arr[0], arr[3], arr[4], arr[5], arr[6]);
        isStraight = true;
        return acc;
      } else {
        return acc;
      }
    },
    [possibleStraightHand[0]]
  );

  if (flushPossibility && isStraight) {
    const allSuited = bestFiveCardStraightHand.every(
      card => card.suit === bestFiveCardStraightHand[0].suit
    );

    if (
      allSuited &&
      bestFiveCardStraightHand[0].score === 14 &&
      bestFiveCardStraightHand[4].score === 10
    ) {
      bestFiveCardHand = bestFiveCardStraightHand;
      isRoyalFlush = true;
    } else if (allSuited) {
      bestFiveCardHand = bestFiveCardStraightHand;
      isStraightFlush = true;
    } else {
      // there are cases when a flush and a straight co-exist independently
      bestFiveCardHand = suitedHand
        .sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0))
        .slice(0, 5);
      isFlush = true;
    }
  } else if (flushPossibility && !isStraight) {
    bestFiveCardHand = suitedHand
      .sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0))
      .slice(0, 5);
    isFlush = true;
  } else if (!flushPossibility && isStraight) {
    bestFiveCardHand = bestFiveCardStraightHand;
  } else if (!flushPossibility && !isStraight) {
    // handling pair type hands
    let highCards = [];
    bestFiveCardHand = hand.reduce((acc, card, i, arr) => {
      const filtered = arr.filter(elem => elem !== card);

      // separate matched cards and high cards
      if (filtered.some(elem => elem.score === card.score)) {
        acc.push(card);
      } else {
        highCards.push(card);
      }

      // check how many matched cards and fill in remainder of 5 card hand
      if (i === arr.length - 1) {
        switch (acc.length) {
          case 6:
            const lowestPair = acc.slice(4, 6);
            acc.splice(4, 2);

            highCards = highCards
              .concat(lowestPair)
              .sort((a, b) =>
                a.score < b.score ? 1 : b.score < a.score ? -1 : 0
              );

            acc.push(highCards[0]);
            return acc;
          case 5:
            return acc;
          case 4:
            acc.push(highCards[0]);
            return acc;
          case 3:
            acc.push(highCards[0], highCards[1]);
            return acc;
          case 2:
            acc.push(highCards[0], highCards[1], highCards[3]);
            return acc;
          default:
            return highCards.splice(0, 5);
        }
      }
      return acc;
    }, []);

    const matches = [];

    bestFiveCardHand.forEach(card => {
      let matchCount = 0;
      for (let i = 0; i < bestFiveCardHand.length; i++) {
        if (card.score === bestFiveCardHand[i].score) {
          matchCount += 1;
        }
      }

      if (
        // if card.value is not in any of the matches.card.value
        !matches.some(match => match.card.value === card.value)
      ) {
        matches.push({ card: card, count: matchCount });
      }
    });

    // if there are matches, return that card and how many times it matches with each other card.
    // then .reduce to a concactenated string of number.
    matchCombos = matches
      .map(match => match.count)
      .reduce((acc, num) => {
        return acc + num.toString();
      });
  }

  return isRoyalFlush
    ? { name: "Royal Flush", score: 10, hand: bestFiveCardHand }
    : isStraightFlush
    ? { name: "Straight Flush", score: 9, hand: bestFiveCardHand }
    : combos.fourOfKind.includes(matchCombos)
    ? { name: "Four of a Kind", score: 8, hand: bestFiveCardHand }
    : combos.fullHouse.includes(matchCombos)
    ? { name: "Full House", score: 7, hand: bestFiveCardHand }
    : isFlush
    ? { name: "Flush", score: 6, hand: bestFiveCardHand }
    : isStraight
    ? { name: "Straight", score: 5, hand: bestFiveCardHand }
    : combos.threeOfKind.includes(matchCombos)
    ? { name: "Three of a Kind", score: 4, hand: bestFiveCardHand }
    : combos.twoPairs.includes(matchCombos)
    ? { name: "Two Pair", score: 3, hand: bestFiveCardHand }
    : combos.onePair.includes(matchCombos)
    ? { name: "One Pair", score: 2, hand: bestFiveCardHand }
    : { name: "High Card", score: 1, hand: bestFiveCardHand };
}

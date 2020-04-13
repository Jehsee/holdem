export function calculateHandStrength(hand) {
  hand.sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0));
  let isFlush = false;
  let isStraight = false;
  const suits = ["h", "d", "s", "c"];
  let bestFiveCardHand;
  // CHECK FOR FLUSH POSSIBILITY
  suits.forEach(suit => {
    let suitedCards = hand.filter(card => card.suit === suit);
    if (suitedCards.length > 4) {
      bestFiveCardHand = suitedCards
        // SORT BY SCORE
        .sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0))
        //  GRAB 5 HIGHEST CARDS
        .slice(0, 5);
      isFlush = true;
    }
  });

  // CHECK FOR STRAIGHT POSSIBILITY IF NO FLUSH POSSIBILITY AND REMOVE LOWEST CARD
  // sort the cards by high to low card score
  const possibleStraightHand = hand;
  const bestFiveCardStraightHand = possibleStraightHand.reduce(
    (acc, card, index, arr) => {
      if (acc.length === 5) {
        isStraight = true;

        // returning if 5 straight cards have accrued
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

    // if straight hand was not a possibility
  if (bestFiveCardStraightHand.length < 5) {
      const highCards = [];
      bestFiveCardHand = hand.reduce((acc, card, i, arr) => {
        const filtered = arr.filter(elem => elem !== card);

        // separate matched cards and high cards
        if (filtered.some(elem => elem.score === card.score)) {
          acc.push(card)
        } else {
          highCards.push(card);
        }
        if (i === arr.length - 1) {
          switch (acc.length) {
            case 6:
              acc.splice(4, 2);
              acc.push(highCards[0],highCards[1]);
              return acc;
            case 5: 
              return acc;
            case 4: 
              acc.push(highCards[0]);
              return acc;
            case 3:
              acc.push(highCards[0],highCards[1]);
              return acc;
            case 2:
              acc.push(highCards[0],highCards[1],highCards[3]);
              return acc;
            default: 
              return highCards.splice(0,5);
          }
        }
        return acc;
      }, []);
    } else {
      bestFiveCardHand = bestFiveCardStraightHand;
    };

  const isRoyalFlush =
    isFlush && isStraight && bestFiveCardHand[0].score === 14;
  const isStraightFlush = isFlush && isStraight && bestFiveCardHand[0] !== 14;

  // else if matching card scores, handle full house, four of a kind, three of a kind, two pairs, and pairs
  // for each card: check to see if it matches with any other card,
  const matches = [];

  bestFiveCardHand.forEach(card => {
    let matchCount = 0;
    for (let i = 0; i < bestFiveCardHand.length; i++) {
      if (card.score === bestFiveCardHand[i].score) {
        matchCount += 1;
      }
    }

    // if card.value is not in any of the matches.card.value
    if (
      // calling .some on an empty array will always be false.
      !matches.some(match => match.card.value === card.value)
    ) {
      matches.push({ card: card, count: matchCount });
    }
  });

  // if there are matches, return that card and how many times it matches with each other card.
  // then .reduce to a concactenated string of number.
  let matchCombos = matches
    .map(match => match.count)
    .reduce((acc, num) => {
      return acc + num.toString();
    });

  const combos = {
    fourOfKind: ["41", "14"],
    fullHouse: ["32", "23"],
    threeOfKind: ["311", "131", "113"],
    twoPairs: ["221", "212", "122"],
    onePair: ["2111", "1211", "1121", "1112"],
    lowEndStraight: ["145432"]
  };

  // low end straight check
  const lowEndStraightScore = matches
    .map(match => match.card.score)
    .reduce((acc, num) => {
      return acc + num.toString();
    });
  if (combos.lowEndStraight.includes(lowEndStraightScore)) {
    isStraight = true;
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

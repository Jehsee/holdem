export function calculateHandStrength(hand) {
  // sort the cards by high to low card score
  hand.sort((a, b) => (a.score < b.score ? 1 : b.score < a.score ? -1 : 0));
  console.log("hand: ", hand);
  // if all suits are the same, handle flush, straight flush, and royal flush
  const isFlush = hand.every(card => card.suit === hand[0].suit);

  // TODO NEED TO ACCOUNT FOR LOW END STRAIGHT - ACE THROUGH 5
  const isStraight = hand.every((card, index) => {
    return (
      index === hand.length - 1 || card.score === hand[index + 1].score + 1
    );
  });
  const isRoyalFlush = isFlush && isStraight && hand[0].score === 14;
  const isStraightFlush = isFlush && isStraight && hand[0] !== 14;

  console.log("isFlush: ", isFlush);
  console.log("isStraight: ", isStraight);
  console.log("isStraightFlush: ", isStraightFlush);
  console.log("isRoyalFlush: ", isRoyalFlush);

  // else if matching card scores, handle full house, four of a kind, three of a kind, two pairs, and pairs
  // for each card: check to see if it matches with any other card,
  const matches = [];
  hand.forEach(card => {
    let matchCount = 0;
    for (let i = 0; i < hand.length; i++) {
      if (card.score === hand[i].score) {
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

  let matchCombo = matches
    .map(match => match.count)
    .reduce((acc, num) => {
      return acc + num.toString();
    });
  console.log("matchCombo: ", matchCombo);

  const fourOfKind = {
    combos: ["41", "14"]
  };
  const fullHouse = {
    combos: ["32", "23"]
  };
  const threeOfKind = {
    combos: ["311", "131", "113"]
  };
  const twoPairs = {
    combos: ["221", "212", "122"]
  };
  const onePair = {
    combos: ["2111", "1211", "1121", "1112"]
  };

  return isRoyalFlush
    ? { name: "Royal Flush", score: 10 }
    : isStraightFlush
    ? { name: "Straight Flush", score: 9 }
    : fourOfKind.combos.includes(matchCombo)
    ? { name: "Four of a Kind", score: 8 }
    : fullHouse.combos.includes(matchCombo)
    ? { name: "Full House", score: 7 }
    : isFlush
    ? { name: "Flush", score: 6 }
    : isStraight
    ? { name: "Straight", score: 5 }
    : threeOfKind.combos.includes(matchCombo)
    ? { name: "Three of a Kind", score: 4 }
    : twoPairs.combos.includes(matchCombo)
    ? { name: "Two Pair", score: 3 }
    : onePair.combos.includes(matchCombo)
    ? { name: "One Pair", score: 2 }
    : { name: "High Card", score: 1 };
}

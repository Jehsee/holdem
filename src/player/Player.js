import React from "react";

function Player(props) {
  let displayHoleCards = props.holeCards.map(card => card.name);

  return <td>{displayHoleCards}</td>;
}

export default Player;

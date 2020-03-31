import React from "react";
import ReactDOM from "react-dom";
import { DECK } from "../common/Deck";
import Player from "../player/Player";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: DECK };
    this.shuffle = this.shuffle.bind(this);
    this.deal = this.deal.bind(this);
  }

  shuffle() {
    let deck = this.state.deck;
    let currentIndex = deck.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }

    this.setState({ deck });
  }

  deal() {
    let numberOfPlayers = document.querySelectorAll("th.player").length;

    let firstCards = this.state.deck.splice(0, numberOfPlayers);
    let secondCards = this.state.deck.splice(0, numberOfPlayers);

    let holeCards = firstCards.map(function(e, i) {
      return <Player key={i} holeCards={[e, secondCards[i]]} />;
    });

    this.setState(this.state.deck);

    ReactDOM.render(<tr>{holeCards}</tr>, document.getElementById("seats"));
  }

  render() {
    return (
      <div>
        <h1>Rabbit Eye</h1>
        <p>{this.state.deck.map(card => card.name)}</p>
        <button onClick={this.shuffle}>Shuffle</button>
        <button onClick={this.deal}>Deal</button>
        <button>Flop</button>
        <button>Turn</button>
        <button>River</button>
        <table className="warning">
          <thead>
            <tr>
              <th className="player">Player 1</th>
              <th className="player">Player 2</th>
              <th className="player">Player 3</th>
              <th className="player">Player 4</th>
              <th className="player">Player 5</th>
              <th className="player">Player 6</th>
            </tr>
          </thead>
          <tbody id="seats"></tbody>
        </table>
      </div>
    );
  }
}

export default Table;

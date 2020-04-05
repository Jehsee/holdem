import React from "react";
import ReactDOM from "react-dom";
import { DECK } from "../common/Deck";
import Player from "../player/Player";
import { calculateHandStrength } from "../common/HandStrengthCalculator";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: DECK };
    this.shuffle = this.shuffle.bind(this);
    this.deal = this.deal.bind(this);
    this.flop = this.flop.bind(this);
    this.turn = this.turn.bind(this);
    this.river = this.river.bind(this);
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
    const hand = [
      { value: "Five", score: 5, name: "5c", suit: "c" },
      { value: "Ace", score: 14, name: "As", suit: "s" },
      { value: "Nine", score: 9, name: "9c", suit: "c" },
      { value: "Three", score: 3, name: "3s", suit: "s" },
      { value: "Two", score: 2, name: "2s", suit: "s" }
    ];
    console.log("Hand Strength: ", calculateHandStrength(hand));
    let numberOfPlayers = document.querySelectorAll("th.player").length;

    let firstCards = this.state.deck.splice(0, numberOfPlayers);
    let secondCards = this.state.deck.splice(0, numberOfPlayers);

    let holeCards = firstCards.map(function(e, i) {
      return <Player key={i} holeCards={[e, secondCards[i]]} />;
    });

    this.setState(this.state.deck);

    ReactDOM.render(<tr>{holeCards}</tr>, document.getElementById("seats"));
  }

  flop() {
    //   burn a card
    this.state.deck.shift();
    const flopCards = this.state.deck.splice(0, 3).map(card => card.name);
    this.setState(this.state.deck);

    ReactDOM.render(<p>{flopCards}</p>, document.getElementById("flop"));
  }

  turn() {
    //   burn a card
    this.state.deck.shift();

    const turnCard = this.state.deck.splice(0, 1);
    this.setState(this.state.deck);

    ReactDOM.render(<p>{turnCard[0].name}</p>, document.getElementById("turn"));
  }

  river() {
    //   burn a card
    this.state.deck.shift();

    const riverCard = this.state.deck.splice(0, 1);
    this.setState(this.state.deck);

    ReactDOM.render(
      <p>{riverCard[0].name}</p>,
      document.getElementById("river")
    );
  }

  render() {
    return (
      <div>
        <h1>Rabbit Eye</h1>
        <p>{this.state.deck.map(card => card.name)}</p>
        <button onClick={this.shuffle}>Shuffle</button>
        <button onClick={this.deal}>Deal</button>
        <button onClick={this.flop}>Flop</button>
        <button onClick={this.turn}>Turn</button>
        <button onClick={this.river}>River</button>
        <table className="playersTable">
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
        <h2>Board</h2>
        <table className="boardTable">
          <thead>
            <tr>
              <th>Flop</th>
              <th>Turn</th>
              <th>River</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="flop"></td>
              <td id="turn"></td>
              <td id="river"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;

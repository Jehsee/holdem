import React from "react";
import ReactDOM from "react-dom";
import { DECK } from "../common/Deck";
import Player from "../player/Player";
// import { calculateHandStrength } from "../common/HandStrengthCalculator";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: DECK, flop: [], turn: [], river: [] };
    this.shuffle = this.shuffle.bind(this);
    this.deal = this.deal.bind(this);
    this.flop = this.flop.bind(this);
    this.turn = this.turn.bind(this);
    this.river = this.river.bind(this);
    this.displayHandStrengths = this.displayHandStrengths.bind(this);
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

    let playerComponent = firstCards.map(function(e, i) {
      return <Player key={i} holeCards={[e, secondCards[i]]} />;
    });

    this.setState(this.state.deck);
    this.setState({ playerComponent: playerComponent });
  }

  flop() {
    //   burn a card
    this.state.deck.shift();

    const flopCards = this.state.deck.splice(0, 3);
    this.setState(this.state.deck);
    this.setState({ flop: flopCards });
  }

  turn() {
    //   burn a card
    this.state.deck.shift();

    const turnCard = this.state.deck.splice(0, 1);
    this.setState(this.state.deck);
    this.setState({ turn: turnCard });
  }

  river() {
    //   burn a card
    this.state.deck.shift();

    const riverCard = this.state.deck.splice(0, 1);
    this.setState(this.state.deck);
    this.setState({ river: riverCard });
  }

  displayHandStrengths() {
    console.log("this.state.flop: ", this.state.flop);
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
        <button onClick={this.displayHandStrengths}>
          Calculate Hand Strengths
        </button>
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
          <tbody>
            <tr>{this.state.playerComponent}</tr>
          </tbody>
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
              <td>{this.state.flop.map(card => card.name)}</td>
              <td>{this.state.turn.map(card => card.name)}</td>
              <td>{this.state.turn.map(card => card.name)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;

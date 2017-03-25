import React, {Component} from 'react';
import {Block} from './block';

export class Board extends Component {
  constructor() {
    super();
    this.state = {
      size: 10,  // Number of rows or columns on the board
      board: [],
      playerPosition: 0,
      diceValue: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.handleRollDice = this.handleRollDice.bind(this);
  }

  componentWillMount() {
    const tempBoard = [];
    for (let count = 0; count < this.state.size * this.state.size; count++) {
      tempBoard[count] = {
        value: count + 1,
        playerPresent: false
      };
    }
    this.setState({board: tempBoard});
  }

  renderBlock(count) {
    return <Block value={count} playerPresent={this.state.board[count - 1].playerPresent}/>;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleRollDice() {
    const boardCopy = this.state.board;
    const diceValuee = this.getRandomIntInclusive(1, 6);
    let newPosition = this.state.playerPosition + diceValuee;
    this.setState({diceValue: diceValuee});
    if (newPosition > 100) {
      return;
    }
    if (!this.state.playerPosition) {
      newPosition -= 1;
    }
    boardCopy[this.state.playerPosition].playerPresent = false;
    boardCopy[newPosition].playerPresent = true;
    this.setState({board: boardCopy});
    this.setState({playerPosition: newPosition});
  }

  render() {
    const blocks = [];
    let param = this.state.size * this.state.size;
    const temp = [];
    for (let row = 0; row < this.state.size; row++) {
      if (row % 2) {
        for (let col = this.state.size - 1; col >= 0; col--) {
          temp.push(param - col);
          blocks.push(this.renderBlock(this.state.board[param - col - 1].value));
        }
      } else {
        for (let col = 0; col < this.state.size; col++) {
          temp.push(param - col);
          blocks.push(this.renderBlock(this.state.board[param - col - 1].value));
        }
      }
      param -= this.state.size;
    }
    return (
      <div className="board">
        <div className="clearfix">
          {blocks}
        </div>
        <div className="legend clearfix">
          <span className="player-one">1</span>
          <span> Current player position: {this.state.playerPosition}</span>
          <div className="f-right">
            Rolled: {this.state.diceValue} &nbsp;
            <button className="btn" onClick={this.handleRollDice}>Roll Dice</button>
          </div>
        </div>
      </div>
    );
  }
}

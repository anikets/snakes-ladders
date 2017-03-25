import React, {Component} from 'react';
import {Block} from './block';

export class Board extends Component {
  constructor() {
    super();
    this.state = {
      size: 10,  // Number of rows or columns on the board
      board: [],
      playerPosition: 0,
      currentPosRow: 0,
      diceValue: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.handleRollDice = this.handleRollDice.bind(this);
  }

  componentWillMount() {
    const tempBoard = [];
    let param = 0;
    for (let count = 0; count < this.state.size; count++) {
      tempBoard[count] = [];
      for (let innerCount = 0; innerCount < this.state.size; innerCount++) {
        param++;
        tempBoard[count][innerCount] = {
          value: param,
          playerPresent: false
        };
      }
    }
    this.setState({board: tempBoard});
  }

  renderBlock(count, row, col) {
    return <Block value={count} playerPresent={this.state.board[row][col].playerPresent}/>;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleRollDice() {
    const boardCopy = this.state.board;
    const diceValuee = this.getRandomIntInclusive(1, 6);
    const newPosition = this.state.playerPosition + diceValuee;
    let row = this.state.currentPosRow;
    let column = newPosition - 1;
    this.setState({diceValue: diceValuee});
    if (newPosition > this.state.size * (this.state.currentPosRow + 1)) {
      row++;
      this.setState({currentPosRow: row});
    }
    column = (column % (this.state.size - 1)) - 1;
    if (newPosition > 100) {
      return;
    }
    boardCopy[row][this.state.playerPosition].playerPresent = false;
    boardCopy[row][column].playerPresent = true;
    this.setState({board: boardCopy});
    this.setState({playerPosition: newPosition});
  }

  render() {
    const blocks = [];
    for (let count = this.state.size - 1; count >= 0; count--) {
      if (count % 2 === 0) {
        for (let innerCount = this.state.size - 1; innerCount >= 0; innerCount--) {
          blocks.push(this.renderBlock(this.state.board[count][innerCount].value, count, innerCount));
        }
      } else {
        for (let innerCount = 0; innerCount < this.state.size; innerCount++) {
          blocks.push(this.renderBlock(this.state.board[count][innerCount].value, count, innerCount));
        }
      }
    }
    return (
      <div className="board clearfix">
        {blocks}
        <div className="legend clearfix">
          <div className="player-one">1</div>
          <div>{this.state.playerPosition}</div>
          <div className="f-right">
            {this.state.diceValue}
            <button className="btn" onClick={this.handleRollDice}>Roll Dice</button>
          </div>
        </div>
      </div>
    );
  }
}

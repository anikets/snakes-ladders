import React, {Component} from 'react';
import {Block} from './block';

export class Board extends Component {
  constructor() {
    super();
    this.state = {
      size: 10,  // Number of rows or columns on the board
      board: []
    };
  }

  componentWillMount() {
    const tempBoard = [];
    let param = 0;
    for (let count = 0; count < this.state.size; count++) {
      tempBoard[count] = [];
      for (let innerCount = 0; innerCount < this.state.size; innerCount++) {
        param++;
        tempBoard[count][innerCount] = {value: param};
      }
    }
    this.setState({board: tempBoard});
  }

  renderBlock(count) {
    return <Block value={count}/>;
  }

  render() {
    const blocks = [];
    for (let count = this.state.size - 1; count >= 0; count--) {
      if (count % 2 === 0) {
        for (let innerCount = this.state.size - 1; innerCount >= 0; innerCount--) {
          blocks.push(this.renderBlock(this.state.board[count][innerCount].value));
        }
      } else {
        for (let innerCount = 0; innerCount < this.state.size; innerCount++) {
          blocks.push(this.renderBlock(this.state.board[count][innerCount].value));
        }
      }
    }
    return (
      <div className="board">
        {blocks}
      </div>
    );
  }
}

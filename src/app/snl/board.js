import React, {Component} from 'react';
import {Block} from './block';

export class Board extends Component {
  constructor() {
    super();
    this.state = {
      size: 10,  // Number of rows or columns on the board
      board: [],
      playerPosition: 0,
      diceValue: 0,
      hasWon: false,
      ladders: [
        [1, 38], [4, 14], [9, 31], [21, 42], [28, 84], [51, 67], [71, 91], [80, 100],
        [17, 7], [54, 34], [64, 60], [87, 24], [93, 73], [95, 75], [98, 79]
      ],
      diceRollCount: 0,
      ladderEncounterCount: 0,
      snakeEncounterCount: 0,
      moveTo: 0
    };
    // This binding is necessary to make `this` work in the callback
    this.handleRollDice = this.handleRollDice.bind(this);
  }

  hasLadder(pos) {
    let ladder = false;
    this.state.ladders.forEach(v => {
      if (v[0] === pos) {
        ladder = v;
        return false;  // Break out of forEach
      }
    });
    return ladder;
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
    return <Block key={count} value={count} playerPresent={this.state.board[count - 1].playerPresent}/>;
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
    const ladder = this.hasLadder(newPosition);
    let dist = 0;
    this.setState({diceRollCount: ++this.state.diceRollCount});
    this.setState({diceValue: diceValuee});
    if (newPosition === 100) {
      this.setState({hasWon: true});
      // newPosition -= 1;
    }
    if (newPosition > 100) {
      return;
    }
    // if (!this.state.playerPosition) {  // Adjust index for first move.
    //   newPosition -= 1;
    // }
    if (this.state.playerPosition) {
      boardCopy[this.state.playerPosition - 1].playerPresent = false;
    }
    dist = newPosition - this.state.playerPosition;
    if (ladder) {
      console.info('has jump');
      newPosition = ladder[1];
      if (ladder[0] < ladder[1]) {
        this.setState({ladderEncounterCount: ++this.state.ladderEncounterCount});
      } else {
        dist = this.state.playerPosition - newPosition;
        this.setState({snakeEncounterCount: ++this.state.snakeEncounterCount});
      }
    }
    this.setState({moveTo: newPosition});
    console.log(this.state.moveTo, dist);
    boardCopy[newPosition - 1].playerPresent = true;
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
          blocks.push(this.renderBlock(param - col));
        }
      } else {
        for (let col = 0; col < this.state.size; col++) {
          temp.push(param - col);
          blocks.push(this.renderBlock(param - col));
        }
      }
      param -= this.state.size;
    }
    return (
      <div>
        <div className="board clearfix">
          {blocks}
        </div>
        <div className="legend clearfix">
          <span className="f-left">
            Current player position: {this.state.playerPosition} | {this.state.diceRollCount}
            | {this.state.snakeEncounterCount} | {this.state.ladderEncounterCount}
          </span>
          <span className={this.state.hasWon ? 'text-center win-msg' : 'text-center win-msg hidden'}>Congratulations ... you won!</span>
          <div className="f-right">
            Rolled: {this.state.diceValue} &nbsp;
            <button className="btn" onClick={this.handleRollDice}>Roll Dice</button>
          </div>
        </div>
      </div>
    );
  }
}

import React, {Component} from 'react';
import {Block} from './block';
import {Jump} from './jump';
import {Peg} from './peg';

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
        [1, 38], [4, 14], [9, 31], [21, 42], [28, 84], [51, 67], [71, 91], [80, 100],  // Ladders
        [17, 7], [54, 34], [64, 60], [87, 24], [93, 73], [95, 75], [98, 79]  // Snakes
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

  renderJump() {
    const jumpElements = [];
    this.state.ladders.forEach(val => {
      jumpElements.push(<Jump start={val[0]} end={val[1]}/>);
    });
    return jumpElements;
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
    this.setState({diceRollCount: ++this.state.diceRollCount});
    this.setState({diceValue: diceValuee});
    if (newPosition === 100) {
      this.setState({hasWon: true});
    }
    if (newPosition > 100) {
      return;
    }
    if (this.state.playerPosition) {  // Adjust index for first move.
      boardCopy[this.state.playerPosition - 1].playerPresent = false;
    }
    if (ladder) {
      newPosition = ladder[1];
      if (ladder[0] < ladder[1]) {
        this.setState({ladderEncounterCount: ++this.state.ladderEncounterCount});
      } else {
        this.setState({snakeEncounterCount: ++this.state.snakeEncounterCount});
      }
    }
    if (newPosition === 100) {
      this.setState({hasWon: true});
    }
    this.setState({moveTo: newPosition});
    boardCopy[newPosition - 1].playerPresent = true;
    this.setState({board: boardCopy});
    this.setState({playerPosition: newPosition});
  }

  render() {
    const jumps = this.renderJump();
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
          {jumps}
          <Peg pegClass="player-one animated" moveTo={this.state.moveTo}/>
        </div>
        <div className="legend clearfix">
          <span className="f-left">
            <span className="stat-mini">Moves: {this.state.diceRollCount}</span>
            <span className="stat-mini">Ladders climbed: {this.state.ladderEncounterCount}</span>
            <span className="stat-mini">Snakes encountered: {this.state.snakeEncounterCount}</span>
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

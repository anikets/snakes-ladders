import React, {Component} from 'react';
import {Board} from './board';

export class Game extends Component {
  render() {
    return (
      <div className="board-container">
        <span>Board goes here...</span>
        <Board/>
      </div>
    );
  }
}

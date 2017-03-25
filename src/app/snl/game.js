import React, {Component} from 'react';
import {Board} from './board';

export class Game extends Component {
  render() {
    return (
      <div className="board-container">
        <Board/>
        <div className="legend clearfix">
          <div className="player-one">1</div>
          {/* TODO <div className="player-two">2</div> */}
          <button className="btn f-right">Roll Die</button>
        </div>
      </div>
    );
  }
}

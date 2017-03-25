import React, {Component} from 'react';

export class Board extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="board-container">
        <span>Board goes here...</span>
      </div>
    );
  }
}

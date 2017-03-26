import React, {Component} from 'react';

// const styles = {
//   div: {
//     top: this.props.top,
//     left: this.props.left
//   }
// };

export class Peg extends Component {
  getBottom(pos) {
    // return (Math.round(pos / 10) * 10) + 1 + '%';
    if (pos / 10 === Math.floor(pos / 10)) {
      pos--;
    }
    return (Math.floor(pos / 10) * 40) + 8 + 'px';
    // return ((Math.floor(pos / 9) - 1) * 40) + 40 + 'px';
  }
  getLeft(pos) {
    if ((pos >= 1 && pos <= 10) ||
      (pos >= 21 && pos <= 30) ||
      (pos >= 41 && pos <= 50) ||
      (pos >= 61 && pos <= 70) ||
      (pos >= 41 && pos <= 50)) {  // Peg moves left to right.
      return (((pos - 1) % 10) * 10) + 5 + '%';
    }
    return 'auto';
  }
  getRight(pos) {
    if ((pos >= 1 && pos <= 10) ||
      (pos >= 21 && pos <= 30) ||
      (pos >= 41 && pos <= 50) ||
      (pos >= 61 && pos <= 70) ||
      (pos >= 41 && pos <= 50)) {  // Peg moves left to right.
      return 'auto';
    }
    return (((pos - 1) % 10) * 10) + 5 + '%';
  }
  render() {
    return (
      <div className={this.props.pegClass} style={{bottom: this.getBottom(this.props.moveTo), left: this.getLeft(this.props.moveTo), right: this.getRight(this.props.moveTo)}}/>
    );
  }
}

Peg.propTypes = {
  pegClass: React.PropTypes.string,
  moveTo: React.PropTypes.number
};

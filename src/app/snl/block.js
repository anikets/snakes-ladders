import React, {Component} from 'react';

export class Block extends Component {

  render() {
    return (
      <div className={this.props.playerPresent ? 'block player-present' : 'block'}>
        {this.props.value}
      </div>
    );
  }
}

Block.propTypes = {
  value: React.PropTypes.number,
  playerPresent: React.PropTypes.bool
};

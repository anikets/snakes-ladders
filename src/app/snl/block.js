import React, {Component} from 'react';

export class Block extends Component {

  render() {
    return (
      <div className="block">
        {this.props.value}
        <span className={this.props.playerPresent ? 'player-one' : ''}/>
      </div>
    );
  }
}

Block.propTypes = {
  value: React.PropTypes.number,
  playerPresent: React.PropTypes.bool
};

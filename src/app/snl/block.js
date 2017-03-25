import React, {Component} from 'react';

export class Block extends Component {

  render() {
    return (
      <div className="block">
        {this.props.value}
      </div>
    );
  }
}

Block.propTypes = {
  value: React.PropTypes.number
};

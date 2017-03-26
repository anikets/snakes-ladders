import React, {Component} from 'react';

export class Jump extends Component {

  render() {
    return (
      <div className={this.props.start < this.props.end ? 'ladder' : 'snake'}/>
    );
  }
}

Jump.propTypes = {
  start: React.PropTypes.number,
  end: React.PropTypes.number
};

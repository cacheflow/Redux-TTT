import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeMove } from '../actions';

class Tile extends Component {
  handleOnClick = () => {
    const { x, y } = this.props
    this.props.makeMove(x, y)
  }

  render() {
    const { tile } = this.props;
    return (
      <div className="tile" onClick={this.handleOnClick}>
        {tile}
      </div>
    )
  }
}

export default connect(undefined, { makeMove })(Tile);

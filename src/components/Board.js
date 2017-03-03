import React, { Component } from 'react';
import Row from './Row';
import { connect } from 'react-redux';

const Board = ({ board }) => {
  return (
    <div className="board" >
      {board.map((row, i) => {
        return <Row key={i} row={row} x={i} />;
      })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  board: state.default.board,
  movesRemaining: state.default.movesRemaining,
});

export default connect(mapStateToProps)(Board);

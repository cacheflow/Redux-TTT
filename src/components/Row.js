import React from 'react';
import Tile from './Tile';

const Row = ({ row, x }) => {
  return (
    <div className="row" >
      {row.map((tile, i) => {
        return (
          <Tile key={i} tile={tile} x={x} y={i} />
        )
      })}
    </div>
  );
}

export default Row;

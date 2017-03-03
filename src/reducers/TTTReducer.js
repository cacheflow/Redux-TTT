import TicTacToe from './TicTacToe';

const initialState = {
  location: {
    x: null,
    y: null,
  },
  difficulty: 'hard',
  currentPlayer: 1,
  nextPlayer: 1,
  movesRemaining: 9,
  board: [
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
    [ 0, 0, 0 ],
  ]
};

export const game = new TicTacToe(initialState);

export default function tictactoe(state = initialState, action) {
  switch (action.type) {
    case 'MAKE_MOVE':
      const { x, y } = action.location;
      let newState = game.move(x, y);
      return {
        ...newState
      }
    case 'SET_DIFFICULTY':
      const { difficulty } = action;
      return {
        ...state,
        difficulty,
      }
    default:
      return state;
  }
}

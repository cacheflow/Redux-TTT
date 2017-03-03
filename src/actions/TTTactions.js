import * as types from '../constants/ActionTypes';

export const makeMove = (x, y) => {
  return {
    type: types.MAKE_MOVE,
    location: {
      x,
      y
    }
  }
}

export const setDifficulty = (difficulty) => {
  return {
    type: types.SET_DIFFICULTY,
    difficulty,
  }
}

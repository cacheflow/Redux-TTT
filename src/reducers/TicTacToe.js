import AI from './AI'

export default class TicTacToe {
  constructor(state) {
    this.board = new WeakMap();
    this.movesRemaining = new WeakMap();
    this.currentPlayer = new WeakMap();
    this.difficulty = new WeakMap();
    this.setState(state);
  }

  setState(state) {
    return {
      board: this.board.set(this, state.board),
      currentPlayer: this.currentPlayer.set(this, state.currentPlayer),
      movesRemaining: this.movesRemaining.set(this, state.movesRemaining),
      difficulty: this.difficulty.set(this, state.difficulty),
    }
  }

  currentState() {
    return {
       board: this.cloneGrid(this.board.get(this)),
       currentPlayer: this.currentPlayer.get(this),
       movesRemaining: this.movesRemaining.get(this),
       difficulty: this.difficulty.get(this),
       isOver: this.isOver(),
       winner: this.winner(),
     }
  }

  newState(x, y) {
    let { board, currentPlayer, movesRemaining } = this.currentState()

    if (!board[x][y]) {
      board[x][y] = currentPlayer
      movesRemaining -= 1
      currentPlayer = currentPlayer === 1 ? 2 : 1
    }

    return new TicTacToe({
      board,
      currentPlayer,
      movesRemaining,
    })
  }

  isOver() {
    return (this.winner() || this.draw());
  }

  draw() {
    return (!this.winner() && this.movesRemaining.get(this) === 0)
  }

  move(x, y) {
    const board = this.board.get(this)
    let {
      movesRemaining, currentPlayer, isOver, difficulty,
    } = this.currentState();

    if (isOver || board[x][y]) {
      return this.currentState();
    }

    board[x][y] = currentPlayer
    movesRemaining -= 1
    this.movesRemaining.set(this, movesRemaining)

    if (currentPlayer === 1) {
      this.currentPlayer.set(this, 2)

      if (movesRemaining > 0) {
        this.move.apply(this, AI.level(this, difficulty))
      }
    } else {
      this.currentPlayer.set(this, 1)
    }
    return this.currentState();
  }

  cloneGrid(grid) {
    return grid.map((c) => { return c.slice(0) });
  }

  winner() {
    let board = this.board.get(this);

    for (var i = 0; i < board.length; i++) {
      if(board[i][0] === board[i][1] && board[i][0]=== board[i][2] && board[i][0] !== 0) {
        return board[i][0];
      }
     }

     for (var i = 0; i < board.length; i++) {
      if(board[0][i] ===  board[1][i] && board[0][i]=== board[2][i] && board[0][i] !== 0) {
        return board[0][i];
      }
     }

     if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== 0) {
        return board[0][0];
     }

     if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[2][0] !== 0) {
        return board[1][1];
     }
     return false;
   }
 }

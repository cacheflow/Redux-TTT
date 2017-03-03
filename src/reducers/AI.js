export default class AI {
  static level(game, difficulty) {
    switch(difficulty) {
      case 'hard':
        return AI.minimax(game).choice
      case 'easy':
        return AI.randomMove(game)
      default:
        return AI.minimax(game).choice
    }
  }

  static availableMoves(board) {
    return board.reduce((empty, row, i) => {
      return row.reduce((empty, space, j) => {
        return space ? empty : empty.concat([[i, j]]);
      }, empty)
    }, []);
  }

  static score(game, depth = 0) {
    if (game.winner === 1) {
      return 10 - depth;
    } else if (game.winner === 2) {
      return depth - 10;
    } else {
      return 0;
    }
  }

  static randomMove(game) {
    const state = game.currentState();
    const availableMoves = AI.availableMoves(state.board)
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  static minimax (game, depth = 0) {
    const state = game.currentState();

    if (state.isOver) {
      return {
        score: AI.score(state, depth)
      }
    }

    depth += 1
    const moves = []
    const scores = []

    AI.availableMoves(state.board).forEach((move) => {
      const possibleGame = game.newState.apply(game, move)
      scores.push(AI.minimax(possibleGame, depth).score)
      moves.push(move)
    })

    if (state.currentPlayer === 1) {
      let maxScoreIndex = scores.indexOf(Math.max.apply(Math, scores))
      return {
        choice: moves[maxScoreIndex],
        score: scores[maxScoreIndex]
      }
    } else {
      let minScoreIndex = scores.indexOf(Math.min.apply(Math, scores));
      return {
        choice: moves[minScoreIndex],
        score: scores[minScoreIndex]
      }
    }
  }
}

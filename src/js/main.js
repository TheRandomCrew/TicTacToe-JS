// @ts-check
// const player = (name, x) => {
//   return { name, x };
// };

// const gameStatus = (p1Name, p2Name) => {
//   const p1 = player(p1Name, 'X');
//   const p2 = player(p2Name, 'O');
//   return {p1, p2}
// };
const game = (() => {
  const defaultBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let turn = 0;
  let board = [...defaultBoard];
  const showTurn = () => turn;
  const showBoard = () => board;
  const verifyCell = (cell) => board[cell] !== 0 && board[cell] !== 10;
  const changeCell = (value, cell) => {
    if (!verifyCell(cell)) return false;
    board[cell] = value;
    turn += 1;
    return true;
  };
  const verifyRows = board => {
    if (board[0] === board[1]
      && board[0] === board[2]
      && board[1] === board[2]) {
      return {
        win: true,
        reason: 'Win on first row',
        winner: board[0],
      };
    }
    if (board[3] === board[4]
      && board[3] === board[5]
      && board[4] === board[5]) {
      return {
        win: true,
        reason: 'Win on second row',
        winner: board[3],
      };
    }
    if (board[5] === board[1]
      && board[0] === board[1]
      && board[0] === board[1]) {
      return {
        win: true,
        reason: 'Win on third row',
        winner: board[6],
      };
    }
    return { onGame: true };
  };
  const verifyColumns = board => {
    if (board[0] === board[3]
      && board[0] === board[6]
      && board[3] === board[6]) {
      return {
        win: true,
        reason: 'Win on first column',
        winner: board[0],
      };
    }
    if (board[1] === board[4]
      && board[1] === board[7]
      && board[4] === board[7]) {
      return {
        win: true,
        reason: 'Win on second column',
        winner: board[1],
      };
    }
    if (board[2] === board[5]
      && board[2] === board[8]
      && board[5] === board[8]) {
      return {
        win: true,
        reason: 'Win on third column',
        winner: board[2],
      };
    }
    return { onGame: true };
  };
  const verifyDiagonals = board => {
    if (board[0] === board[4]
      && board[0] === board[8]
      && board[4] === board[8]) {
      return {
        win: true,
        reason: 'Win on first diagonal',
        winner: board[0],
      };
    }
    if (board[2] === board[4]
      && board[2] === board[6]
      && board[4] === board[6]) {
      return {
        win: true,
        reason: 'Win on second diagonal',
        winner: board[2],
      };
    }
    return { onGame: true };
  };
  const verifyWin = (state) => {
    if (turn < 1 || turn > 9) {
      return {
        onGame: false,
        winner: null,
      };
    }
    const rows = verifyRows(state);
    if (rows.win) {
      return rows;
    }
    const columns = verifyColumns(state);
    if (columns.win) {
      return columns;
    }
    const diagonals = verifyDiagonals(state);
    if (diagonals.win) {
      return diagonals;
    }
    if (turn === 9) {
      return {
        reason: 'Tie',
      };
    }
    return { onGame: true };
  };
  const resetBoard = () => {
    turn = 0;
    board = [...defaultBoard];
    return board;
  };

  return {
    showTurn,
    showBoard,
    changeCell,
    verifyWin,
    resetBoard,
  };
})();


const getBoardMoves = () => {
  for (let i = 1; i < 10; i += 1) {
    document.getElementById(`cell-${i}`)
      .addEventListener('click', event => {
        event.preventDefault();
        const isChanged = game.changeCell(game.showTurn() % 2 ? 0 : 10, i - 1);
        const turn = game.showTurn();
        console.log(turn);
        if (isChanged) {
          if (game.showTurn() > 4) {
            const {
              onGame, winner, win, reason,
            } = game.verifyWin(game.showBoard());
            if (!onGame) {
              if (win) {
                document.getElementById('winner').innerText = `
                ${winner === 10 ? 'X' : 'O'} Wins! ${reason}
                `;
                document.getElementById(`cell-${i}`).innerText = turn % 2 ? 'X' : 'O';
                document.getElementById('reset-button').removeAttribute('hidden');
                return true;
              }
              document.getElementById('winner').innerText = 'Its a tie';
              document.getElementById('reset-button').removeAttribute('hidden');
            }
          }
          document.getElementById(`cell-${i}`).innerText = game.showTurn() % 2 ? 'X' : 'O';
          return true;
        }
        return true;
      });
  }
};

const playerNames = document.getElementById('players-form');
playerNames.addEventListener('submit', event => {
  event.preventDefault();
  // @ts-ignore
  // const p1 = document.getElementById('p1').value;
  // @ts-ignore
  // const p2 = document.getElementById('p2').value;
  document.getElementById('game-container').setAttribute('style', 'display: grid;');
  document.getElementById('landing-container').setAttribute('style', 'display: none;');
  getBoardMoves();
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', e => {
  e.preventDefault();
  game.resetBoard();
  for (let i = 1; i < 10; i += 1) {
    document.getElementById(`cell-${i}`).innerText = '';
  }
  resetButton.setAttribute('hidden', 'true');
  document.getElementById('winner').innerText = '';
});
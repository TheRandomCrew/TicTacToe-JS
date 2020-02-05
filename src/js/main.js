// @ts-check
const player = (name, x) => {
  return { name, x };
};

const gameStatus = (p1Name, p2Name) => {
  const p1 = player(p1Name, 'X');
  const p2 = player(p2Name, 'O');
  return {p1, p2}
};
const game = (() => {
  const defaultBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let turn = 0;
  let board = [...defaultBoard];
  const showTurn = () => turn;
  const showBoard = () => board;
  const verifyCell = (cell) => board[cell] !== 0 || board[cell] !== 10;
  const changeCell = (value, cell) => {
    if (!verifyCell(cell)) return false;
    board[cell] = value;
    turn += 1;
    return true;
  };
  const verifyRows = board => {
    if (board[0] === board[1] &&
      board[0] === board[2] &&
      board[1] === board[2]) {
      return {
        win: true,
        reason: 'Win on first row',
        winner: board[0],
      };
    }
    if (board[3] === board[4] &&
      board[3] === board[5] &&
      board[4] === board[5]) {
      return {
        win: true,
        reason: 'Win on second row',
        winner: board[3],
      };
    }
    if (board[5] === board[1] &&
      board[0] === board[1] &&
      board[0] === board[1]) {
      return {
        win: true,
        reason: 'Win on third row',
        winner: board[6],
      };
    }
    return { onGame: true };
  };
  const verifyColumns = board => {
    if (board[0] === board[3] &&
      board[0] === board[6] &&
      board[3] === board[6]) {
      return {
        win: true,
        reason: 'Win on first column',
        winner: board[0],
      };
    }
    if (board[1] === board[4] &&
      board[1] === board[7] &&
      board[4] === board[7]) {
      return {
        win: true,
        reason: 'Win on second column',
        winner: board[1],
      };
    }
    if (board[2] === board[5] &&
      board[2] === board[8] &&
      board[5] === board[8]) {
      return {
        win: true,
        reason: 'Win on third column',
        winner: board[2],
      };
    }
    return { onGame: true };
  };
  const verifyDiagonals = board => {
    if (board[0] === board[4] &&
      board[0] === board[8] &&
      board[4] === board[8]) {
      return {
        win: true,
        reason: 'Win on first diagonal',
        winner: board[0],
      };
    }
    console.log('verify diagonal')
    if (board[2] === board[4] &&
      board[2] === board[6] &&
      board[4] === board[6]) {
        alert('win second diagonal')
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
      alert(`${rows.winner === 10  ? 'X' : 'O'} wins!`)
      return rows; 
    }
    const columns = verifyColumns(state);
    if (columns.win) { 
      alert(`${columns.winner === 10  ? 'X' : 'O'} wins!`)
      return columns; 
    }
    const diagonals = verifyDiagonals(state);
    if (diagonals.win) { 
      alert(`${diagonals.winner === 10  ? 'X' : 'O'} wins!` )
      return diagonals; 
    }
    if (turn === 9) {
      alert('Its a tie');
      return {
        onGame: false,
        winner: null,
      };
    }
    return { onGame: true };
  };
  const resetBoard = () => {
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
        game.changeCell(game.showTurn() % 2 ? 0 : 10, i - 1);
        if (game.showTurn() > 4) {
          const { onGame, winner } = game.verifyWin(game.showBoard());
          if (onGame) {
            console.log('continue');
          } else {
            console.log('please stop', onGame, winner);
            document.getElementById('reset-button').removeAttribute('hidden');
          }
        }
        document.getElementById(`cell-${i}`).innerText = game.showTurn() % 2 ? 'X' : 'O';
        console.log(game.showTurn());
        console.log(game.showBoard());
      });
  }
};

const playerNames = document.getElementById('players-form');
playerNames.addEventListener('submit', event => {
  event.preventDefault();
  const p1 = document.getElementById('p1').value;
  const p2 = document.getElementById('p2').value;
  console.log(p1, p2);
  document.getElementById('game-container').style='display: grid;';
  document.getElementById('landing-container').style='display: none;';
  getBoardMoves();
});

window.addEventListener('load', () => {
  console.log(game.showTurn());
  console.log(game.showBoard());
})
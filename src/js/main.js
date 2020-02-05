// @ts-check

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
    console.log(value, cell);
    return true;
  };
  const verifyRows = board => {
    if (board[0] === board[1] &&
      board[0] === board[2] &&
      board[1] === board[2]) {
      return {
        winner: board[0],
        onGame: false
      };
    }
    ;
    if (board[3] === board[4] &&
      board[3] === board[5] &&
      board[4] === board[5]) {
      return {
        winner: board[3],
        onGame: false
      };
    }
    ;
    if (board[5] === board[1] &&
      board[0] === board[1] &&
      board[0] === board[1]) {
      return {
        winner: board[6],
        onGame: false
      };
    }
    ;
    return { onGame: true };
  };
  const verifyColumns = board => {
    if (board[0] === board[3] &&
      board[0] === board[6] &&
      board[3] === board[6]) {
      return {
        winner: board[0],
        onGame: false
      };
    }
    ;
    if (board[1] === board[4] &&
      board[1] === board[7] &&
      board[4] === board[7]) {
      return {
        winner: board[1],
        onGame: false
      };
    }
    ;
    if (board[2] === board[5] &&
      board[2] === board[8] &&
      board[5] === board[8]) {
      return {
        winner: board[2],
        onGame: false
      };
    }
    ;
    return { onGame: true };
  };
  const verifyDiagonals = board => {
    if (board[0] === board[4] &&
      board[0] === board[8] &&
      board[4] === board[8]) {
      return {
        winner: board[0],
        onGame: false
      };
    }
    ;
    if (board[2] === board[4] &&
      board[2] === board[6] &&
      board[4] === board[6]) {
      return {
        winner: board[2],
        onGame: false
      };
    }
    ;
    return { onGame: true };
  };
  const verifyWin = (state) => {
    if (turn < 1 || turn > 9) {
      return {
        onGame: false,
        winner: null
      };
    }

    const rows = verifyRows(state);
    if (rows.onGame) return rows;
    const columns = verifyColumns(state);
    if (columns.onGame) return columns;
    const diagonals = verifyDiagonals(state);
    if (diagonals.onGame) return diagonals;
    if (turn == 9) {
      return {
        onGame: false,
        winner: null
      };
    }
    ;
    return { onGame: false };
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

const player = (name, x) => {
  return { name, x };
};

const gameStatus = (p1Name, p2Name) => {
  const p1 = player(p1Name, 'X');
  const p2 = player(p2Name, 'O');
};

const getBoardMoves = () => {
  for (let i = 1; i < 10; i += 1) {
    document.getElementById(`cell-${i}`)
      .addEventListener('click', event => {
        event.preventDefault();
        document.getElementById(`cell-${i}`).innerText = game.showTurn() % 2 ? 'O' : 'X';
        game.changeCell(game.showTurn() % 2 ? 0 : 10, i - 1);
        const { onGame, winner } = game.verifyWin(game.showBoard());
        if (onGame) {
          console.log('continue');
        } else {
          console.log(winner);
        }
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
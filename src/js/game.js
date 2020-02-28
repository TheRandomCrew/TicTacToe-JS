// @ts-check
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
    if (board[6] === board[7]
        && board[6] === board[8]
        && board[7] === board[8]) {
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

export default game;

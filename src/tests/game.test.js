import game from '../js/game';

const defaultBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('game', () => {
  test('game.showBoard() gives default board state', () => {
    expect(game.showBoard()).toStrictEqual(defaultBoard);
  });

  test('game.getTurn() shows turn zero at first', () => {
    expect(game.showTurn()).toBe(0);
  });

  test('game.changeCell() modify board showed', () => {
    game.changeCell(0, 5);
    expect(game.showBoard()).toStrictEqual([1, 2, 3, 4, 5, 0, 7, 8, 9]);
    game.changeCell(10, 6);
    expect(game.showBoard()).toStrictEqual([1, 2, 3, 4, 5, 0, 10, 8, 9]);
  });

  test('game.changeCell() used with value different as 0 or 10 returns false', () => {
    expect(game.changeCell(-1, 5)).toBe(false);
    expect(game.changeCell(11, 5)).toBe(false);
  });

  test('game.resetBoard() reset board showed', () => {
    game.resetBoard();
    expect(game.showBoard()).toStrictEqual(defaultBoard);
  });

  test('game.changeCell() makes turn to change', () => {
    const originalTurn = game.showTurn();
    game.changeCell(0, 0);
    expect(game.showTurn()).toBe(originalTurn + 1);
    game.changeCell(10, 4);
    expect(game.showTurn()).toBe(originalTurn + 2);
  });

  test('game.verifyWin() shows winner until turn 5', () => {
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    game.changeCell(0, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    game.changeCell(10, 5);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    game.changeCell(0, 2);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    game.resetBoard();
  });

  test('game.verifyWin() end game if you reach 9th turn with a tie', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 0);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 2);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 5);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.changeCell(10, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(6);
    game.changeCell(0, 6);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(7);
    game.changeCell(10, 7);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(8);
    game.changeCell(0, 8);
    expect(game.showTurn()).toBe(9);
    expect(game.verifyWin(game.showBoard()).reason).toBe('Tie');
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling first row', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 0);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 2);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling second row', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 0);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 5);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling third row', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 6);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 7);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 8);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling first column', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 0);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 6);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling second column', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 0);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 7);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling third column', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 2);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 5);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 8);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling first diagonal', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 0);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 8);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });

  test('game.verifyWin() detects if you win by filling second diagonal', () => {
    const originalTurn = game.showTurn();
    expect(originalTurn).toBe(0);
    game.changeCell(0, 2);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(1);
    game.changeCell(10, 1);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(2);
    game.changeCell(0, 4);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(3);
    game.changeCell(10, 3);
    expect(game.verifyWin(game.showBoard()).onGame).toBe(true);
    expect(game.showTurn()).toBe(4);
    game.changeCell(0, 6);
    expect(game.verifyWin(game.showBoard()).win).toBe(true);
    expect(game.showTurn()).toBe(5);
    game.resetBoard();
  });
});
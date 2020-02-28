import game from './game';

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
});
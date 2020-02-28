// eslint-disable-next-line import/extensions
import game from './game.js';

const getBoardMoves = () => {
  for (let i = 1; i < 10; i += 1) {
    document.getElementById(`cell-${i}`)
      .addEventListener('click', event => {
        event.preventDefault();
        const isChanged = game.changeCell(game.showTurn() % 2 ? 0 : 10, i - 1);
        const turn = game.showTurn();
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
  const p1 = document.getElementById('p1');
  const p2 = document.getElementById('p2');
  // @ts-ignore
  const names = [p1.value, p2.value];
  document.getElementById('players-name').innerText = `
    X: ${names[0] || 'Player 1'} VS O: ${names[1] || 'Player 2'}
  `;
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
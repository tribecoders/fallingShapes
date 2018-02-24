import Game from './game.js'

let keyTable = [];

function onKeyDown(key) {
  // W Key is 87
  // Up arrow is 87
  if (key.keyCode === 87 || key.keyCode === 38) {
    window.dispatchEvent(new CustomEvent(Game.GAME_EVENTS.gameStart));
    keyTable.push(Game.KEY_EVENTS.up);
  }

  // S Key is 83
  // Down arrow is 40
  if (key.keyCode === 83 || key.keyCode === 40) {
    keyTable.push(Game.KEY_EVENTS.down);
  }

  // A Key is 65
  // Left arrow is 37
  if (key.keyCode === 65 || key.keyCode === 37) {
    keyTable.push(Game.KEY_EVENTS.left);
  }

  // D Key is 68
  // Right arrow is 39
  if (key.keyCode === 68 || key.keyCode === 39) {
    keyTable.push(Game.KEY_EVENTS.right);
  }
}

document.addEventListener('keydown', onKeyDown);

export default keyTable;
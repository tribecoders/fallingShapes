import Game from './game.js'

let keyTable = [];

function onKeyDown(key) {
  // W Key is 87
  // Up arrow is 87
  if (key.keyCode === 87 || key.keyCode === 38) {
    // If the W key or the Up arrow is pressed, move the player up.
    window.dispatchEvent(new CustomEvent(Game.GAME_EVENTS.gameStart));
    keyTable.push(Game.KEY_EVENTS.up);
  }

  // S Key is 83
  // Down arrow is 40
  if (key.keyCode === 83 || key.keyCode === 40) {
    // If the S key or the Down arrow is pressed, move the player down.
    keyTable.push(Game.KEY_EVENTS.down);
  }

  // A Key is 65
  // Left arrow is 37
  if (key.keyCode === 65 || key.keyCode === 37) {
    // If the A key or the Left arrow is pressed, move the player to the left.
    keyTable.push(Game.KEY_EVENTS.left);
  }

  // D Key is 68
  // Right arrow is 39
  if (key.keyCode === 68 || key.keyCode === 39) {
    // If the D key or the Right arrow is pressed, move the player to the right.
    keyTable.push(Game.KEY_EVENTS.right);
  }
}

document.addEventListener('keydown', onKeyDown);

export default keyTable;
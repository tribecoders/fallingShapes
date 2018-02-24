import Board from './board.js'
import DisplayManager from './displayManager.js'
import ShapeGenerator from './shapeGenerator.js';
import keyTable from './keys.js'

class Game {

  static GAME_EVENTS = Object.freeze({gameStart: 'gameStart', gameEnd: 'gameEnd'});
  static KEY_EVENTS = Object.freeze({up:'up', down: 'down', left: 'left', right: 'right'});

  constructor(container) {
    this.displayManager = new DisplayManager(container);
    this.board = new Board();
    this.shapeGenerator = new ShapeGenerator();
    this.currentTime = 0;
  }

  mainLoop(delta) {
    if (typeof this.fallingShape === 'undefined') {
      this.fallingShape = this.shapeGenerator.getNewShape();
    }

    this.handleKeyMovements();

    this.currentTime += delta;

    if (this.currentTime >= 30) {
      this.currentTime = 0;
      this.calculateMoveY();
    }

    this.displayManager.display();
    this.displayManager.displayShape(this.fallingShape);
  }

  calculateMoveY() {
    if (!this.fallingShape.moveY(this.board)) {
      if (this.fallingShape.y < 0) {
        window.dispatchEvent(new CustomEvent(Game.GAME_EVENTS.gameEnd));
      }

      this.board.shapeToBoard(this.fallingShape);
      this.displayManager.saveShape(this.fallingShape);

      let linesToClear = this.board.findLinesToClear();
      if (typeof linesToClear !== 'undefined' && linesToClear.length > 0) {
        this.displayManager.clearLines(linesToClear)
      }

      this.fallingShape = this.shapeGenerator.getNewShape();
    }
  }

  handleKeyMovements() {
    if (keyTable[0] === Game.KEY_EVENTS.up) {
      this.fallingShape.rotate(this.board);
      keyTable.splice(0,1);
    }

    if (keyTable[0] === Game.KEY_EVENTS.right) {
      this.fallingShape.moveRight(this.board);
      keyTable.splice(0,1);
    }

    if (keyTable[0] === Game.KEY_EVENTS.left) {
      this.fallingShape.moveLeft(this.board);
      keyTable.splice(0,1);
    }

    if (keyTable[0] === Game.KEY_EVENTS.down) {
      this.calculateMoveY();
      keyTable.splice(0,1);
    }
  }
}
export default Game;
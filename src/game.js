import Board from './board.js'
import DisplayManager from './displayManager.js'
import ShapeGenerator from "./shapeGenerator.js";


class Game {


  constructor(container) {
    this.displayManager = new DisplayManager(container);
    this.board = new Board();
    this.shapeGenerator = new ShapeGenerator();
  }

  mainLoop() {
    if (typeof this.fallingShape === 'undefined') {
      this.fallingShape = this.shapeGenerator.getNewShape();
    }

    if (!this.fallingShape.moveY(this.board)) {
      this.board.shapeToBoard(this.fallingShape);
      this.displayManager.saveShape(this.fallingShape);
      this.fallingShape = this.shapeGenerator.getNewShape();
    }

    this.displayManager.display();
    this.displayManager.displayShape(this.fallingShape);
  }
}

export default Game;
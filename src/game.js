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
    if (typeof this.fallingShape === 'undefined' || !this.fallingShape.moveY()) {
      this.fallingShape = this.shapeGenerator.getNewShape();
    }

    this.displayManager.display();
    this.displayManager.displayShape(this.fallingShape);
  }
}

export default Game;
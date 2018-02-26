import Board from './board.js'
import MainScreen from './mainScreen.js'
import ShapeGenerator from './shapeGenerator.js';
import keyTable from './keys.js'
import InitialScreen from "./initialScreen.js";
import ResultScreen from "./resultScreen.js"
import Results from "./results.js";

class Game {

  static GAME_STATES = Object.freeze({initial:'initial', main: 'main', results: 'bestScores'});
  static GAME_EVENTS = Object.freeze({gameStart: 'gameStart', gameEnd: 'gameEnd'});
  static KEY_EVENTS = Object.freeze({up:'up', down: 'down', left: 'left', right: 'right'});
  static SPEED_TABLE = [30, 25, 20, 15, 10 , 5, 1];
  static MAX_POINTS_PER_LEVEL = 100;

  constructor(container) {
    this.state = Game.GAME_STATES.initial;
    this.initialScreen = new InitialScreen(container);
    this.mainScreen = new MainScreen(container);
    this.resultScreen = new ResultScreen(container);
    this.results = new Results();
    this.resetState();

    this.inMainGame = false;
  }

  /*
   * Main game loop
   */
  mainLoop(delta) {
    // Check the state of the game
    if (this.state === Game.GAME_STATES.initial){
      this.initialScreen.display();
    } else if (this.state === Game.GAME_STATES.main) {

      //Initialize first shape
      if (typeof this.fallingShape === 'undefined') {
        this.fallingShape = this.shapeGenerator.getNewShape();
      }

      this.handleKeyMovements();

      this.currentTime += delta;

      // Depending on the level slow movement
      const currentLevel = Math.floor(this.results.currentScore/Game.MAX_POINTS_PER_LEVEL);
      const gameSpeedLength = Game.SPEED_TABLE.length;
      if (currentLevel >= gameSpeedLength || this.currentTime >= Game.SPEED_TABLE[currentLevel]) {
        this.currentTime = 0;
        this.calculateMoveY();
      }

      //Display screen
      this.mainScreen.display(this.results.currentScore);
      this.mainScreen.displayShape(this.fallingShape);
    } else{
      this.resultScreen.display(this.results.bestScores);
    }
  }

  /*
   * Verify if shape can move on Y axis and if not stop and generate a new one
   */
  calculateMoveY() {
    if (!this.fallingShape.moveY(this.board)) {
      // Store falling shape if it is stuck
      if (this.fallingShape.y < 0) {
        this.state = Game.GAME_STATES.bestScores;
        // Store current result
        this.results.storeBestScore();
        window.dispatchEvent(new CustomEvent(Game.GAME_EVENTS.gameEnd));
        this.inMainGame = false;
      }

      // Make shape part of the board
      this.board.shapeToBoard(this.fallingShape);
      this.mainScreen.saveShape(this.fallingShape);

      // Clear lines if any
      let linesToClear = this.board.findLinesToClear();
      if (typeof linesToClear !== 'undefined' && linesToClear.length > 0) {
        this.mainScreen.clearLines(linesToClear);
        this.results.addLine(linesToClear.length)
      }

      //Add score for element
      this.results.addElement();

      // Get new shape
      this.fallingShape = this.shapeGenerator.getNewShape();
    }
  }

  /*
   * Handle key signals
   */
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

  /*
   * Switch to main screen
   */
  goMainGame() {
    this.state = Game.GAME_STATES.main;
    this.initialScreen.hide();
    this.resultScreen.hide();
    this.inMainGame = true;
  }

  /*
   * Switch to results screen
   */
  goResults() {
    this.state = Game.GAME_STATES.result;
    this.mainScreen.hide();
  }

  /*
   * Reset game to begin new one
   */
  reset() {
    if (!this.inMainGame) {
      this.board = new Board();
      this.shapeGenerator = new ShapeGenerator();
      this.currentTime = 0;
      this.mainScreen.reset();
      this.results.reset();
    }
  }
}
export default Game;
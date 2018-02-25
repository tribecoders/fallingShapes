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

  mainLoop(delta) {
    if (this.state === Game.GAME_STATES.initial){
      this.initialScreen.display();
    } else if (this.state === Game.GAME_STATES.main) {

      if (typeof this.fallingShape === 'undefined') {
        this.fallingShape = this.shapeGenerator.getNewShape();
      }

      this.handleKeyMovements();

      this.currentTime += delta;

      const currentLevel = Math.floor(this.results.currentScore/Game.MAX_POINTS_PER_LEVEL);
      const gameSpeedLength = Game.SPEED_TABLE.length;
      if (currentLevel >= gameSpeedLength || this.currentTime >= Game.SPEED_TABLE[currentLevel]) {
        this.currentTime = 0;
        this.calculateMoveY();
      }

      this.mainScreen.display(this.results.currentScore);
      this.mainScreen.displayShape(this.fallingShape);
    } else{
      this.resultScreen.display(this.results.bestScores);
    }
  }

  calculateMoveY() {
    if (!this.fallingShape.moveY(this.board)) {
      if (this.fallingShape.y < 0) {
        this.state = Game.GAME_STATES.bestScores;
        this.results.storeBestScore();
        window.dispatchEvent(new CustomEvent(Game.GAME_EVENTS.gameEnd));
        this.inMainGame = false;
      }

      this.board.shapeToBoard(this.fallingShape);
      this.mainScreen.saveShape(this.fallingShape);

      let linesToClear = this.board.findLinesToClear();
      if (typeof linesToClear !== 'undefined' && linesToClear.length > 0) {
        this.mainScreen.clearLines(linesToClear);
        this.results.addLine(linesToClear.length)
      }

      this.results.addElement();

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

  goMainGame() {
    this.state = Game.GAME_STATES.main;
    this.initialScreen.hide();
    this.resultScreen.hide();
    this.inMainGame = true;
  }

  goResults() {
    this.state = Game.GAME_STATES.result;
    this.mainScreen.hide();
  }

  resetState() {
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
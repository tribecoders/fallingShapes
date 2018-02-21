import AssetsManager from './assetsManager.js'
import DisplayManager from './displayManager.js'

class Game {

  MAX_WIDTH = 10; //width of the board
  MAX_HEIGHT = 20; //height of the board
  STEP_SIZE = 16; //size of an sigle tile in game

  constructor() {
    this.assetsManager = new AssetsManager();
    this.displayManager = new DisplayManager(this.assetsManager);
  }

  display = (container) => {
    this.displayManager.display(container, this);
  };

  mainLoop = () => {

  }
}

export default Game;
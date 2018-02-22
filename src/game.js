import AssetsManager from './assetsManager.js'
import DisplayManager from './displayManager.js'


class Game {

  constructor() {
    this.assetsManager = new AssetsManager();
    this.displayManager = new DisplayManager(this.assetsManager);
  }

  mainLoop = (container) => {
    this.displayManager.display(container);

  }
}

export default Game;
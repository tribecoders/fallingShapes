/* global PIXI */
import config from './config.js'

class DisplayManager {

  boardTiles = [];
  mainContainer = new PIXI.Container();

  constructor(assetsManager) {
    this.assetsManager = assetsManager;
    this.mainContainer.position.x = window.innerWidth / 2 - config.MAX_WIDTH * config.STEP_SIZE / 2;
    this.mainContainer.position.y = window.innerHeight /2 - config.MAX_WIDTH * config.STEP_SIZE;
    let x = 0;
    let y = 0;
    for (x = 0; x <= config.MAX_WIDTH; x++) {
      this.boardTiles[x] = [];
      for (y = 0; y <= config.MAX_HEIGHT; y++) {
        this.boardTiles[x][y] = 0;
      }
    }

  }

  display = (context) => {
    context.addChild(this.mainContainer);

    let x = 0;
    let y = 0;
    for (x = 0; x <= config.MAX_WIDTH; x++) {
      for (y= 0; y <= config.MAX_HEIGHT; y++) {
        let backgroundTile;
        if(this.boardTiles[x][y] === 0){
          backgroundTile = new PIXI.Sprite(this.assetsManager.background);
        } else {
          backgroundTile = new PIXI.Sprite(this.assetsManager.singlesBlocks[this.boardTiles[x][y]]);
        }

        backgroundTile.x = x*config.STEP_SIZE;
        backgroundTile.y = y*config.STEP_SIZE;

        this.mainContainer.addChild(backgroundTile);
      }
    }
  }

  setTileColour(x,y, colour){
    this.boardTiles[x][y] = colour;
  }

  clearRow(y) {
    let x = 0;
    for (x = 0; x <= config.MAX_WIDTH; x++) {
      this.boardTiles[x][y] = 0;
    }
  }
}

export default DisplayManager;
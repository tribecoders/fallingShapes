/* global PIXI */
import AssetsManager from './assetsManager.js'
import Shape from './shape.js'
import config from './config.js'

class MainScreen {

  boardTiles = [];

  colourTable = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'];

  constructor(container) {
    this.container = container;
    this.assetsManager = new AssetsManager();
    this.reset();
  }

  /*
   * Displays main screen with the board
   */
  display(curentResult)  {
    this.container.addChild(this.mainContainer);
    this.mainContainer.removeChild(this.bestScores);
    this.bestScores = new PIXI.Text('Your score: ' + curentResult, {
      fill: '#ffffff'
    });
    this.bestScores.anchor.set(0.5, 0.5);
    this.bestScores.x = config.MAX_WIDTH * config.STEP_SIZE / 2;
    this.bestScores.y = -20;
    this.mainContainer.addChild(this.bestScores);

    let x = 0;
    let y = 0;
    for (x = 0; x < config.MAX_WIDTH; x++) {
      for (y= 0; y < config.MAX_HEIGHT; y++) {
        if(this.boardTiles[x][y] === 0){
          this.displayTileColour(x, y, undefined);
        } else {
          this.displayTileColour(x, y, this.boardTiles[x][y]);
        }
      }
    }
  }

  /*
   * Displays currently falling shape
   */
  displayShape(shape) {
    let row, col;
    for(col = 0; col < Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; col++) {
      for(row = 0; row < Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; row++) {
        if ((shape.getShapeBitTable() & (1<<row* Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE+col)) !== 0) {
          this.displayTileColour(shape.x+col-1, shape.y+row-1, this.colourTable[shape.name]);
        }
      }
    }
  }

  /*
   * Displays one single tile
   */
  displayTileColour(x, y, colour) {
    if (y <0) {
      return;
    }

    let tile;
    if(typeof colour === 'undefined'){
      tile = new PIXI.Sprite(this.assetsManager.background);
    } else {
      tile = new PIXI.Sprite(this.assetsManager.singlesBlocks[colour]);
    }

    tile.x = x*config.STEP_SIZE;
    tile.y = y*config.STEP_SIZE;

    this.mainContainer.addChild(tile);
  }

  /*
   * Converts shape that is falling to colours
   */
  saveShape(shape){
    let row, col;
    for(col = 0; col < Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; col++) {
      for (row = 0; row < Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; row++) {
        if ((shape.getShapeBitTable() & (1 << row * Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE + col)) !== 0) {
          this.boardTiles[shape.x+col-1][shape.y+row-1] = this.colourTable[shape.name];
        }
      }
    }
  }

  /*
   * Remove array of lines to clear
   */
  clearLines(linesToClear) {
    let col, row;
    for (let lineToClear of linesToClear) {
      for (row = lineToClear; row > 0; row--) {
        for (col = 0; col < config.MAX_WIDTH; col++) {
          this.boardTiles[col][row]=this.boardTiles[col][row-1];
          this.displayTileColour(col, row, this.boardTiles[col][row]);
        }
      }
    }
  }

  /*
   * Hide the screen to switch to another
   */
  hide(){
    this.mainContainer.visible = false;
  }

  /*
   * Resets screen state for next game
   */
  reset(){
    this.mainContainer = new PIXI.Container();
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
}

export default MainScreen;
import Shape from './shape.js'
import config from './config.js'

class Board {
  boardTiles = [];

  constructor() {
    let x = 0;
    let y = 0;
    for (x = 0; x < config.MAX_WIDTH; x++) {
      this.boardTiles[x] = [];
      for (y = 0; y < config.MAX_HEIGHT; y++) {
        this.boardTiles[x][y] = 0;
      }
    }
  }

  /*
   * Break falling shape to board single tiles
   */
  shapeToBoard(shape) {
    let row, col;
    for(col = 0; col < Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; col++){
      for (row = 0; row <  Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; row++){
        if ((shape.getShapeBitTable() & (1 << row * Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE + col)) !== 0) {
          this.boardTiles[shape.x+col-1][shape.y+row-1] = 1;
        }
      }
    }
  }

  /*
   * Checks if board field is allowed to be taken by falling shape
   */
  isFieldTaken(x, y) {
    if (y > config.MAX_HEIGHT || x > config.MAX_WIDTH || x - 1  < 0){
      return true;
    }

    return this.boardTiles[x-1][y-1] === 1;
  }

  /*
   * Check winning full lines
   */
  findLinesToClear() {
    let x = 0, y = 0, row, col, isLineFull, linesToDelete = [];
    for (y = 0; y < config.MAX_HEIGHT; y++) {
      isLineFull = true;
      for (x = 0; x < config.MAX_WIDTH ; x++) {
        if (this.boardTiles[x][y] === 0){
          isLineFull = false
        }
      }

      if (isLineFull) {
        for (row = y; row > 0; row--) {
          for (col = 0; col < config.MAX_WIDTH; col++) {
            this.boardTiles[col][row] = this.boardTiles[col][row-1]
          }
        }

        linesToDelete.push(y);
      }
    }
    return linesToDelete;
  }
}

export default Board;
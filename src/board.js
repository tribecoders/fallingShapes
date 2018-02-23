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

  shapeToBoard(shape) {
    let row, col;
    for(col = 0; col<=Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; col++){
      for (row = 0; row <= Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; row++){
        if ((shape.getShapeBitTable() & (1 << row * Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE + col)) !== 0) {
          this.boardTiles[shape.x+col-1][shape.y+row-1] = 1;
        }
      }
    }
  }

  isFieldTaken(x, y) {
    if (y + 1  > config.MAX_HEIGHT){
      return true;
    }

    return this.boardTiles[x-1][y] === 1;
  }
}

export default Board;
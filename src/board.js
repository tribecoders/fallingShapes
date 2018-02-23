import Shape from './shape.js'
import config from './config.js'

class Board {
  boardTiles = [];

  constructor() {
    let x = 0;
    let y = 0;
    for (x = 0; x <= config.MAX_WIDTH; x++) {
      this.boardTiles[x] = [];
      for (y = 0; y <= config.MAX_HEIGHT; y++) {
        this.boardTiles[x][y] = 0;
      }
    }
  }

  canMove(shape){
    let row, col, canMove = true;
    for(col = 0; col<=Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; col++) {
      for (row = 0; row <= Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; row++) {
        if ((shape.getShapeBitTable() & (1<<row* Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE+col)) !== 0 && this.boardTiles[shape.x + col][shape.y + row] === 1 ) {
          canMove = false;
        }
      }
    }
    return canMove
  }
}

export default Board;
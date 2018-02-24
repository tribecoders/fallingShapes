import config from './config.js'

class Shape {

  static SHAPE_NAMES = Object.freeze({l: 0, J: 1, L: 2, O: 3, S: 4, T: 5, Z: 6});
  static NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE = 4;

  availableShapes = [
    [0x4444, 0xF0, 0x2222, 0x00F0],
    [0x44C0, 0x8E00, 0x6440, 0x0E20],
    [0x4460, 0x0E80, 0xC440, 0x2E00],
    [0xCC00, 0xCC00, 0xCC00, 0xCC00],
    [0x06C0, 0x8C40, 0x6C00, 0x4620],
    [0x0E40, 0x4C40, 0x4E00, 0x4640],
    [0x0C60, 0x4C80, 0xC600, 0x2640],
  ];

  constructor(name) {
    this.name = name;
    this.rotation = 0;
    this.x = Math.round(config.MAX_WIDTH / 2) - 2;
    this.y = -Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE;
  }

  moveRight(board) {
<<<<<<< HEAD
    if (this.canMoveOnBoard(board)) {
=======
    if (this.canMoveOnBoard(board, 1)) {
>>>>>>> Keyboard handling added
      this.x++;
      return true;
    }

    return true;
  }

  moveLeft(board) {
<<<<<<< HEAD
    if (this.canMoveOnBoard(board)) {
=======
    if (this.canMoveOnBoard(board, -1)) {
>>>>>>> Keyboard handling added
      this.x--;
      return true;
    }

    return true;
  }

  moveY(board) {
<<<<<<< HEAD
    if (this.canMoveOnBoard(board)) {
=======
    if (this.canMoveOnBoard(board, 0)) {
>>>>>>> Keyboard handling added
      this.y++;
      return true;
    }

    return false;
  }

  rotate() {
    this.rotation++;
    if (this.rotation > this.availableShapes[this.name].length - 1) {
      this.rotation = 0;
    }
  }

<<<<<<< HEAD
  canMoveOnBoard(board){
=======
  canMoveOnBoard(board, planedXmove){
>>>>>>> Keyboard handling added
    let row, col, canMove = true;
    for(col = 0; col < Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; col++) {
      for (row = 0; row < Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE; row++) {
        if ((this.getShapeBitTable() & (1<<row* Shape.NUMBER_OF_COLUMNS_AND_ROWS_PER_SHAPE+col)) !== 0 && board.isFieldTaken(this.x + col + planedXmove, this.y + row)) {
          canMove = false;
        }
      }
    }

    return canMove
  }

  getShapeBitTable() {
    return this.availableShapes[this.name][this.rotation]
  }


}

export default Shape;
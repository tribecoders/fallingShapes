import Shape from './shape.js'

class ShapeGenerator {
  BASE_SHAPE_NAMES = [Shape.SHAPE_NAMES.l,Shape.SHAPE_NAMES.J,Shape.SHAPE_NAMES.O,Shape.SHAPE_NAMES.S,Shape.SHAPE_NAMES.T,Shape.SHAPE_NAMES.Z];
  currentShapesNames = [];

  getNewShape() {
    if (this.currentShapesNames.length <= 1 ) {
      this.currentShapesNames = [...this.BASE_SHAPE_NAMES];
    }

    const randomShape = Math.round(Math.random(0, this.currentShapesNames.length - 1));
    let shape = new Shape(this.currentShapesNames[randomShape]);
    this.currentShapesNames.splice(randomShape, 1);

    return shape
  }
}

export default ShapeGenerator;
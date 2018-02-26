import Shape from './shape.js'

class ShapeGenerator {
  NUMBER_OF_RANDOM = 4;
  BASE_SHAPE_NAMES = [Shape.SHAPE_NAMES.l,Shape.SHAPE_NAMES.J,Shape.SHAPE_NAMES.O,Shape.SHAPE_NAMES.S,Shape.SHAPE_NAMES.T,Shape.SHAPE_NAMES.Z];
  currentShapesNames = [];

  getNewShape() {
    if (this.currentShapesNames.length <= 1 ) {
      let i;
      for (i = 0; i < this.NUMBER_OF_RANDOM; i++) {
        this.currentShapesNames.push(...this.BASE_SHAPE_NAMES);
      }
    }
    
    const randomShapeNumber = Math.floor(Math.random()*(this.currentShapesNames.length - 1));
    let shape = new Shape(this.currentShapesNames[randomShapeNumber]);
    this.currentShapesNames.splice(randomShapeNumber, 1);

    return shape
  }
}

export default ShapeGenerator;
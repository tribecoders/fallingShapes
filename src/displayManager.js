/* global PIXI */

class DisplayManager {

  constructor(assetsManager) {
    this.assetsManager = assetsManager;
  }

  display = (context, config) => {
    let x = 0;
    let y = 0;
    for (x = 0; x <= config.MAX_WIDTH; x++) {
      for (y= 0; y <= config.MAX_HEIGHT; y++) {
        let backgroundTile = new PIXI.Sprite(this.assetsManager.background);
        backgroundTile.x = x*config.STEP_SIZE;
        backgroundTile.y = y*config.STEP_SIZE;

        context.addChild(backgroundTile);
      }
    }
  }
}

export default DisplayManager;